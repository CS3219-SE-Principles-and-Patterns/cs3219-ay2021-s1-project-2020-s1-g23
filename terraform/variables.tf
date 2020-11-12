variable "aws_region" {
  default = "ap-southeast-1"
}

variable "cluster-name" {
  default = "terraform-eks"
  type    = string
}

variable "lambda_edge" {
  default = "arn:aws:lambda:us-east-1:425563513848:function:cps_function:3"
  type    = string
}

variable "acm_certificate" {
  default = "arn:aws:acm:us-east-1:425563513848:certificate/bee9804c-4f48-4062-b52b-f4efe65ed98f"
  type    = string
}