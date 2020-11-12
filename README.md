# Project Report
View our Project Report [here](Team-23_PeerPrep.pdf)
# Set Up Process
## Step 1: Create ALB Policy
Go to IAM page and create a need policy. Copy and paste the JSON in the permissions tab. After which copy the Policy ARN and pasted into the varables.tf file, under ALB_role_policy.
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:ModifyListener",
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:DescribeInstances",
                "iam:ListServerCertificates",
                "elasticloadbalancing:RegisterTargets",
                "elasticloadbalancing:SetIpAddressType",
                "elasticloadbalancing:DeleteLoadBalancer",
                "elasticloadbalancing:SetWebAcl",
                "ec2:DescribeInternetGateways",
                "elasticloadbalancing:DescribeLoadBalancers",
                "waf-regional:GetWebACLForResource",
                "acm:GetCertificate",
                "waf-regional:GetWebACL",
                "elasticloadbalancing:CreateRule",
                "ec2:DescribeAccountAttributes",
                "elasticloadbalancing:AddListenerCertificates",
                "elasticloadbalancing:ModifyTargetGroupAttributes",
                "waf-regional:AssociateWebACL",
                "waf-regional:DisassociateWebACL",
                "waf:GetWebACL",
                "iam:GetServerCertificate",
                "ec2:CreateTags",
                "elasticloadbalancing:CreateTargetGroup",
                "ec2:ModifyNetworkInterfaceAttribute",
                "elasticloadbalancing:DeregisterTargets",
                "elasticloadbalancing:DescribeLoadBalancerAttributes",
                "ec2:RevokeSecurityGroupIngress",
                "elasticloadbalancing:DescribeTargetGroupAttributes",
                "acm:DescribeCertificate",
                "elasticloadbalancing:ModifyRule",
                "elasticloadbalancing:AddTags",
                "elasticloadbalancing:DescribeRules",
                "ec2:DescribeSubnets",
                "elasticloadbalancing:ModifyLoadBalancerAttributes",
                "waf-regional:AssociateWebACL",
                "ec2:DescribeAddresses",
                "tag:GetResources",
                "ec2:DeleteTags",
                "elasticloadbalancing:RemoveListenerCertificates",
                "tag:TagResources",
                "elasticloadbalancing:RemoveTags",
                "elasticloadbalancing:CreateListener",
                "elasticloadbalancing:DescribeListeners",
                "ec2:DescribeNetworkInterfaces",
                "ec2:CreateSecurityGroup",
                "acm:ListCertificates",
                "elasticloadbalancing:DescribeListenerCertificates",
                "ec2:ModifyInstanceAttribute",
                "elasticloadbalancing:DeleteRule",
                "cognito-idp:DescribeUserPoolClient",
                "ec2:DescribeInstanceStatus",
                "elasticloadbalancing:DescribeSSLPolicies",
                "elasticloadbalancing:CreateLoadBalancer",
                "waf-regional:DisassociateWebACL",
                "elasticloadbalancing:DescribeTags",
                "ec2:DescribeTags",
                "elasticloadbalancing:*",
                "elasticloadbalancing:SetSubnets",
                "elasticloadbalancing:DeleteTargetGroup",
                "ec2:DescribeSecurityGroups",
                "iam:CreateServiceLinkedRole",
                "ec2:DescribeVpcs",
                "ec2:DeleteSecurityGroup",
                "elasticloadbalancing:DescribeTargetHealth",
                "elasticloadbalancing:SetSecurityGroups",
                "elasticloadbalancing:DescribeTargetGroups",
                "elasticloadbalancing:ModifyTargetGroup",
                "elasticloadbalancing:DeleteListener"
            ],
            "Resource": "*"
        }
    ]
}
```

## Step 2: Get a domain name
Use any method to get a domain name and change the domain name in the variables.tf, under domain_name.

## Step 3: Create a Lambda Edge
Go to AWS Lambda and create a new function from scratch. Use the code below to edit the function.

```javascript
exports.handler = (event, context, callback) => {
    const { response } = event.Records[0].cf;
    
    response.headers["x-xss-protection"] = [{ value: "1; mode=block" }];
    response.headers["x-content-type-options"] = [{ value: "nosniff" }];
    response.headers["x-frame-options"] = [{ value: "DENY" }];
    response.headers["strict-transport-security"] = [
        { value: "max-age=31536000; includeSubDomains" },
    ];
    response.headers["content-security-policy"] = [
    {
      value: "default-src 'none'; script-src 'unsafe-inline' 'self'; script-src-elem 'unsafe-inline' 'self'; script-src-attr 'self'; style-src 'unsafe-inline' 'self' fonts.googleapis.com; style-src-elem 'unsafe-inline' 'self' fonts.googleapis.com; style-src-attr 'unsafe-inline' 'self' fonts.googleapis.com; img-src 'self' data:; font-src 'self' fonts.gstatic.com; connect-src 'self' api.peerprep.live; media-src 'self' data:; object-src 'self'; prefetch-src 'self'; child-src 'self'; frame-src 'self'; worker-src 'self'; frame-ancestors 'none'; form-action 'self'; base-uri 'self'; manifest-src 'self' manifest.json; report-uri; report-to"

    },
  ];
    
    return callback(null, response);
};
```

Deploy the Lambda function and select the "Deploy to Lambda@Edge" in the Actions dropdown.
- Select "configure new CloudFront trigger" option.
- Use the distribution created by the terraform.
- Leave cache behavior as default.
- Select "Viewer Response" for CloudFront event.
- Tick the acknowledgement and press deploy.

CloudFront will take awhile to impletement the function. You may view its progress in the CloudFront dashboard.

## Step 4: Run Terraform
Use the code below to see what will be applied to your AWS account by terraform.

```bash
# cd into the terraform folder
cd /terrform

terraform plan
```

Use the code below to apply the changes to your AWS account.

```bash
terraform apply
```

## Step 5: Create Certificate
Go to the Certificate Manager page and request a public certificate. Enter the domain name with an Asterisk infront (e.g *.simp.social). Select DNS validation and confirm the certificate. Once the certificate is created, create the certificate record in your Route 53. Change the variables.tf, under acm_certificate to your certificate ARN which is used by the ingress.

## Step 6: Get kube config file
Enter the command to output the kube config file into ur .kube folder to access into the kubernetes cluster.

```bash
terraform output kubeconfig > ~/.kube/config
```

# Kubernetes Cluster
## Step 1: RBAC Authorisation
Change line 60 of ALBIngress-rbac-role.yaml to the role terraform-eks-main-cluster ARN.

```yaml
eks.amazonaws.com/role-arn: arn:aws:iam::650965765717:role/terraform-eks-main-cluster
```

After the change have been made, run the following command

```bash
# cd into the kubernetes rbac folder
cd /kubernetes/rbac

# apply all the files in the rbac folder
kubectl apply -f .
```

## Step 2: Namespace

```bash
# cd into the kubernetes namespace folder
cd /kubernetes/namespace

# apply all the files in the namespace folder
kubectl apply -f .
```

## Step 3: Create ECR Repo
Go to AWS ECR can create the repos needed for your microservices. Once created, build and push the docker images into AWS ECR. You need to download [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html)!

```bash
# build image locally
docker image build -t user-deployment:v1 .

# follow the steps provided by AWS on how to push to ECR
# Retrieve an authentication token and authenticate your Docker client to your registry.
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 650965765717.dkr.ecr.ap-southeast-1.amazonaws.com

# After the build completes, tag your image so you can push the image to this repository:
docker tag user-deployment:v1 650965765717.dkr.ecr.ap-southeast-1.amazonaws.com/user-deployment:v1

# Run the following command to push this image to your newly created AWS repository:
docker push 650965765717.dkr.ecr.ap-southeast-1.amazonaws.com/user-deployment:v1
```

Copy the repo URI and paste in the deployment.yaml on line 21.

```yaml
- image: 650965765717.dkr.ecr.ap-southeast-1.amazonaws.com/user-deployment:v1
```

After all the required repos are created, run the command below to apply the deployments and services.

```bash
# Deployment
kubectl apply -f deployment.yaml

# Service
kubectl apply -f service.yaml
```

## Step 4: Create Ingress
Change in alb-ingress-controller.yaml on line 37 to your vpc_id.

```yaml
- --aws-vpc-id=vpc-0d874407e24e9fb0b
```

Change in ingress.yaml on line 14 to your certificate arn that was made perviously.

```yaml
alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:ap-southeast-1:650965765717:certificate/f5027508-dbc8-4919-86e4-f0429f0a5994
```

After changing, run the following command to apply the files

```bash
# cd into kubernetes ingress
cd /kubernetes/ingress

# apply all the files in the ingress folder
kubectl apply -f .
```

## Step 5: Create Metric Server and Cluster Autoscaler
Apply both the metric server and cluster autoscaler.

```bash
# apply metric server
kubectl apply -f metric_server.yaml

# apply cluster autoscaler
kubectl apply -f cluster_autoscaler.yaml
```

To apply the Horizontal Pod Scaling, run the following command for each deployment

```bash
kubectl autoscale deployment user-deployment --cpu-percent=50 --min=3 --max=10
```