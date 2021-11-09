module "api_gateway_core" {
  source  = "terraform-aws-modules/apigateway-v2/aws"
  version = "1.4.0"

  name          = "${var.environment}-core-http"
  description   = "Proxy API Gateway for ${var.environment} Core"
  protocol_type = "HTTP"

  create_api_domain_name = false

  cors_configuration = {
    allow_headers = ["content-type", "x-amz-date", "authorization", "x-api-key", "x-amz-security-token", "x-amz-user-agent"]
    allow_methods = ["*"]
    allow_origins = ["*"]
  }

  integrations = {
    "ANY /{proxy+}" = {
      lambda_arn             = module.lambda_core.lambda_function_arn
      payload_format_version = "2.0"
      timeout_milliseconds   = 12000
    }

    "$default" = {
      lambda_arn = module.lambda_core.lambda_function_arn
    }
  }
}

module "lambda_core" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "2.18.0"

  function_name = "${var.environment}-core"
  description   = "backend/core Lambda"

  memory_size = 512
  timeout     = 60

  create_package = false
  package_type   = "Image"

  image_uri                = "${aws_ecr_repository.core.repository_url}:latest"
  image_config_entry_point = ["/usr/bin/python", "-m", "awslambdaric"]

  vpc_subnet_ids         = module.vpc.private_subnets
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  attach_network_policy  = true
  publish                = true

  environment_variables = {
    LAMBDA                    = true
    MYSQL_DATABASE            = module.db_core.db_instance_name
    MYSQL_HOST                = module.db_core.db_instance_address
    MYSQL_USER                = module.db_core.db_instance_username
    MYSQL_PASSWORD_SECRET_ARN = aws_secretsmanager_secret.lambda_core_client_password.arn
    MEDIA_S3_BUCKET           = aws_s3_bucket.core_media_uploads.bucket
    DJANGO_SECRET_KEY_ARN     = aws_secretsmanager_secret.lambda_core_django_secret_key.arn
  }

  attach_policy_statements = true
  policy_statements = [
    {
      effect = "Allow"
      actions = [
        "secretsmanager:GetSecret",
        "secretsmanager:GetSecretValue",
      ]
      resources = [
        aws_secretsmanager_secret.lambda_core_client_password.arn,
        aws_secretsmanager_secret.lambda_core_django_secret_key.arn
      ]
    },
    {
      effect  = "Allow"
      actions = ["s3:*Object*"],
      resources = [
        "${aws_s3_bucket.core_media_uploads.arn}/*"
      ]
    }
  ]

  allowed_triggers = {
    AllowExecutionFromAPIGateway = {
      service    = "apigateway"
      source_arn = "${module.api_gateway_core.apigatewayv2_api_execution_arn}/*/*/*"
    }
  }
}

module "lambda_core_tasks" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "2.18.0"

  function_name = "${var.environment}-core-tasks"
  description   = "backend/core Lambda"

  memory_size = 512
  timeout     = 60

  create_package = false
  package_type   = "Image"

  // placeholder - required but will be overrided on each deploy
  image_uri                = "${aws_ecr_repository.core.repository_url}:latest"
  image_config_entry_point = ["/usr/bin/python", "-m", "awslambdaric"]

  vpc_subnet_ids         = module.vpc.private_subnets
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  attach_network_policy  = true
  publish                = true

  environment_variables = {
    LAMBDA                    = true
    MYSQL_DATABASE            = module.db_core.db_instance_name
    MYSQL_HOST                = module.db_core.db_instance_address
    MYSQL_USER                = module.db_core.db_instance_username
    MYSQL_PASSWORD_SECRET_ARN = aws_secretsmanager_secret.lambda_core_client_password.arn
    MEDIA_S3_BUCKET           = aws_s3_bucket.core_media_uploads.bucket
    DJANGO_SECRET_KEY_ARN     = aws_secretsmanager_secret.lambda_core_django_secret_key.arn
  }

  attach_policy_statements = true
  policy_statements = [
    {
      effect = "Allow"
      actions = [
        "secretsmanager:GetSecret",
        "secretsmanager:GetSecretValue",
      ]
      resources = [
        aws_secretsmanager_secret.lambda_core_client_password.arn,
        aws_secretsmanager_secret.lambda_core_django_secret_key.arn
      ]
    },
    {
      effect  = "Allow"
      actions = ["s3:*Object*"],
      resources = [
        "${aws_s3_bucket.core_media_uploads.arn}/*"
      ]
    }
  ]
}

module "lambda_core_commands" {
  source  = "terraform-aws-modules/lambda/aws"
  version = "2.18.0"

  function_name = "${var.environment}-core-commands"
  description   = "backend/core Task Runner"

  memory_size = 512
  timeout     = 60

  create_package = false
  package_type   = "Image"

  // placeholder - required but will be overrided on each deploy
  image_uri                = "${aws_ecr_repository.core.repository_url}:latest"
  image_config_entry_point = ["/usr/bin/python", "-m", "awslambdaric"]
  image_config_command     = ["config.lambda_handlers.command_handler"]

  vpc_subnet_ids         = module.vpc.private_subnets
  vpc_security_group_ids = [module.vpc.default_security_group_id]
  attach_network_policy  = true
  publish                = true

  environment_variables = {
    LAMBDA                    = true
    MYSQL_DATABASE            = module.db_core.db_instance_name
    MYSQL_HOST                = module.db_core.db_instance_address
    MYSQL_USER                = module.db_core.db_instance_username
    MYSQL_PASSWORD_SECRET_ARN = aws_secretsmanager_secret.lambda_core_client_password.arn
    MEDIA_S3_BUCKET           = aws_s3_bucket.core_media_uploads.bucket
    DJANGO_SECRET_KEY_ARN     = aws_secretsmanager_secret.lambda_core_django_secret_key.arn
  }

  attach_policy_statements = true
  policy_statements = [
    {
      effect = "Allow"
      actions = [
        "secretsmanager:GetSecret",
        "secretsmanager:GetSecretValue",
      ]
      resources = [
        aws_secretsmanager_secret.lambda_core_client_password.arn,
        aws_secretsmanager_secret.lambda_core_django_secret_key.arn
      ]
    },
    {
      effect  = "Allow"
      actions = ["s3:*Object*"],
      resources = [
        "${aws_s3_bucket.core_media_uploads.arn}/*"
      ]
    }
  ]
}
