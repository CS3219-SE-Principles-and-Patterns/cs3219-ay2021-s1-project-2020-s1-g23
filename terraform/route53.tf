# resource "aws_route53_zone" "main" {
#   name = "simp.social"
# }

# resource "aws_route53_record" "cloudfront" {
#   zone_id = aws_route53_zone.main.zone_id
#   name    = "simp.social"
#   type    = "A"

#   alias {
#     name                   = aws_cloudfront_distribution.s3_distribution.domain_name
#     zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
#     evaluate_target_health = true
#   }
# }

# resource "aws_acm_certificate" "cert" {
#   domain_name       = "simp.social"
#   validation_method = "DNS"

#   tags = {
#     Environment = "production"
#   }

#   lifecycle {
#     create_before_destroy = true
#   }
# }
