# ECR repositories - core

resource "aws_ecr_repository" "core" {
  name = "core-${var.environment}"
}

resource "aws_ecr_lifecycle_policy" "core_lifecycle" {
  repository = aws_ecr_repository.core.name

  policy = jsonencode(var.ecr_retention_policy)
}

resource "aws_ecr_repository" "web" {
  name = "web-${var.environment}"
}

resource "aws_ecr_lifecycle_policy" "web_lifecycle" {
  repository = aws_ecr_repository.web.name

  policy = jsonencode(var.ecr_retention_policy)
}

resource "aws_ecr_repository" "web_embedded" {
  name = "web-embedded-${var.environment}"
}

resource "aws_ecr_lifecycle_policy" "web_embedded_lifecycle" {
  repository = aws_ecr_repository.web_embedded.name

  policy = jsonencode(var.ecr_retention_policy)
}

resource "aws_iam_user" "github-actions-core" {
  name = "github-actions-core-user-${var.environment}"
}

resource "aws_iam_access_key" "github-actions-core-access-key-v1" {
  user = aws_iam_user.github-actions-core.name
}

data "aws_iam_policy_document" "github-actions-core-user-document" {
  version = "2012-10-17"
  statement {
    effect = "Allow"

    actions = [
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:GetRepositoryPolicy",
      "ecr:SetRepositoryPolicy",
      "lambda:UpdateFunctionCode",
      "lambda:InvokeFunction"
    ]

    resources = [
      aws_ecr_repository.core.arn,
      aws_ecr_repository.web.arn,
      aws_ecr_repository.web_embedded.arn,
      module.lambda_core.lambda_function_arn,
      module.lambda_core_commands.lambda_function_arn,
      module.lambda_core_tasks.lambda_function_arn
    ]
  }

  statement {
    effect = "Allow"

    actions = [
      "ecr:GetAuthorizationToken"
    ]
    resources = [
      "*"
    ]
  }
}

resource "aws_iam_policy" "github-actions-core-user-policy" {
  name        = "github-actions-core-user-policy-${var.environment}"
  description = "ECR push & lambda update GitHub actions user"
  policy      = data.aws_iam_policy_document.github-actions-core-user-document.json
}

resource "aws_iam_user_policy_attachment" "github-actions-core-user-policy-attach" {
  user       = aws_iam_user.github-actions-core.name
  policy_arn = aws_iam_policy.github-actions-core-user-policy.arn
}


output "access_key_id_v1" {
  value = aws_iam_access_key.github-actions-core-access-key-v1.id
}

output "secret_access_key_id_v1" {
  value     = aws_iam_access_key.github-actions-core-access-key-v1.secret
  sensitive = true
}
