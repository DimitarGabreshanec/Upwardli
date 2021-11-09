resource "aws_s3_bucket" "core_media_uploads" {
  bucket = "${var.environment}-core-media-uploads"
  acl    = "public-read"
}
