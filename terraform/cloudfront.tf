locals {
  s3_origin_id = "myS3Origin"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = "peerprep.live.s3.amazonaws.com"
    origin_id   = local.s3_origin_id
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  aliases = ["peerprep.live"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    lambda_function_association {
      event_type   = "viewer-response"
      include_body = false
      lambda_arn   = var.lambda_edge
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
  }

  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    acm_certificate_arn = var.acm_certificate
    ssl_support_method = "sni-only"
  }

  custom_error_response {
    error_code = 403
    error_caching_min_ttl = 300
    response_page_path = "/index.html"
    response_code = 200
  }

  custom_error_response {
    error_code = 404
    error_caching_min_ttl = 300
    response_page_path = "/index.html"
    response_code = 200
  }
}