# resource "aws_s3_bucket" "instaclone-images" {
#   bucket = "instaclone-images"
#   acl    = "public-read"

#   tags = {
#     Name        = "instaclone-images"
#     Environment = "production"
#   }
# }

# resource "aws_s3_bucket" "react" {
#   bucket = "simp.social"
#   acl    = "public-read"

#   website {
#     index_document = "index.html"
#     error_document = "index.html"
#   }

#   cors_rule {
#     allowed_headers = ["*"]
#     allowed_methods = ["POST","GET"]
#     allowed_origins = ["*"]
#   }

#   tags = {
#     Name = "website"
#   }
# }

# resource "aws_s3_bucket_policy" "react" {
#   bucket = aws_s3_bucket.react.id

#   policy = <<POLICY
# {
#     "Version": "2012-10-17",
#     "Statement": [
#         {
#             "Sid": "PublicReadGetObject",
#             "Effect": "Allow",
#             "Principal": "*",
#             "Action": "s3:GetObject",
#             "Resource": "arn:aws:s3:::simp.social/*"
#         }
#     ]
# }
# POLICY
# }