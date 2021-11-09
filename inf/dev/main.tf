terraform {
  backend "s3" {
    bucket         = "upwardli-terraform-state"
    key            = "dev/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "terraform-lock"
  }
}

variable "environment" {
  default = "dev"
}

variable "db_core_multi_az" {
  default = false
}

variable "db_core_backup_retention_period" {
  default = 0
}

variable "ecr_retention_policy" {
  default = {
    "rules" : [
      {
        "rulePriority" : 1,
        "description" : "Expire images older than 14 days",
        "selection" : {
          "tagStatus" : "untagged",
          "countType" : "sinceImagePushed",
          "countUnit" : "days",
          "countNumber" : 14
        },
        "action" : {
          "type" : "expire"
        }
      }
    ]
  }
}
