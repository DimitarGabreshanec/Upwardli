variable "region" {
  default = "us-east-2"
}

provider "aws" {
  region = var.region
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "${var.environment}-upwardli-vpc"
  cidr = "10.0.0.0/16"

  azs              = ["us-east-2a", "us-east-2b", "us-east-2c"]
  private_subnets  = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets   = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  database_subnets = ["10.0.201.0/24", "10.0.202.0/24", "10.0.203.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = true
  one_nat_gateway_per_az = false

  create_database_subnet_group = true

  tags = {
    Terraform   = "true"
    Environment = var.environment
  }
}

module "bastion_host" {
  source  = "cloudposse/ec2-bastion-server/aws"
  version = "0.28.3"

  name    = "bastion-host"
  enabled = true
  vpc_id  = module.vpc.vpc_id
  subnets = slice(module.vpc.public_subnets, 0, 1)

  instance_type = "t3a.nano"

  stage = var.environment

  associate_public_ip_address = true

  tags = {
    Terraform   = "true"
    Environment = var.environment
  }
}

module "db_security_group" {
  source  = "terraform-aws-modules/security-group/aws"
  version = "~> 4"

  name        = "${var.environment}-core-mysql-sg"
  description = "MySQL security group"
  vpc_id      = module.vpc.vpc_id

  # ingress
  ingress_with_cidr_blocks = [
    {
      from_port   = 3306
      to_port     = 3306
      protocol    = "tcp"
      description = "MySQL access from within VPC"
      cidr_blocks = module.vpc.vpc_cidr_block
    },
  ]

  tags = {
    Terraform   = "true"
    Environment = var.environment
  }
}

resource "random_password" "lambda_core_client" {
  length           = 16
  special          = true
  override_special = "_!%^"
}

resource "aws_secretsmanager_secret" "lambda_core_client_password" {
  name = "${var.environment}-core-db-password"
}

resource "aws_secretsmanager_secret_version" "password" {
  secret_id     = aws_secretsmanager_secret.lambda_core_client_password.id
  secret_string = random_password.lambda_core_client.result
}

resource "random_password" "lambda_core_django_secret_key" {
  length           = 100
  special          = true
  override_special = "_!%^"
}

resource "aws_secretsmanager_secret" "lambda_core_django_secret_key" {
  name = "${var.environment}-core-django-secret-key"
}

resource "aws_secretsmanager_secret_version" "lambda_core_django_secret_key" {
  secret_id     = aws_secretsmanager_secret.lambda_core_django_secret_key.id
  secret_string = random_password.lambda_core_django_secret_key.result
}

module "db_core" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "${var.environment}coredb"

  create_db_option_group    = false
  create_db_parameter_group = false

  multi_az = var.db_core_multi_az

  # All available versions: http://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.VersionMgmt
  engine               = "mysql"
  engine_version       = "5.7"
  family               = "mysql5.7" # DB parameter group
  major_engine_version = "5.7"      # DB option group
  instance_class       = "db.t3.micro"

  iam_database_authentication_enabled = true

  allocated_storage = 20

  name                   = "coredb"
  username               = "core_root"
  password               = random_password.lambda_core_client.result
  create_random_password = false
  port                   = 3306

  subnet_ids             = module.vpc.database_subnets
  vpc_security_group_ids = [module.db_security_group.security_group_id]

  maintenance_window = "Mon:00:00-Mon:03:00"
  backup_window      = "03:00-06:00"

  backup_retention_period = var.db_core_backup_retention_period

  tags = {
    Terraform   = "true"
    Environment = var.environment
  }
}
