terraform {
  backend "s3" {
    bucket         = "upwardli-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "terraform-lock"
  }
}

variable "environment" {
  default = "prod"
}

variable "db_core_multi_az" {
  default = true
}

variable "db_core_backup_retention_period" {
  default = 7
}

variable "ecr_retention_policy" {
  default = {
    "rules" : [
      {
        "rulePriority" : 1,
        "description" : "Keep last 30 images",
        "selection" : {
          "tagStatus" : "any",
          "countType" : "imageCountMoreThan",
          "countNumber" : 30
        },
        "action" : {
          "type" : "expire"
        }
      }
    ]
  }
}
