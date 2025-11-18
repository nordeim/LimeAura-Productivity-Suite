# =====================================================
# Terraform Infrastructure Configuration
# Provisions AWS resources (Placeholder structure)
# =====================================================

provider "aws" {
  region = "us-east-1"
}

# --- VPC ---
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "limeaura-vpc"
  }
}

# --- Database (RDS) ---
# resource "aws_db_instance" "default" {
#   allocated_storage    = 20
#   storage_type         = "gp2"
#   engine               = "postgres"
#   engine_version       = "16.1"
#   instance_class       = "db.t3.micro"
#   name                 = "limeaura"
#   username             = "postgres"
#   password             = var.db_password
#   parameter_group_name = "default.postgres16"
# }

# --- Cache (ElastiCache) ---
# resource "aws_elasticache_cluster" "redis" {
#   cluster_id           = "limeaura-redis"
#   engine               = "redis"
#   node_type            = "cache.t3.micro"
#   num_cache_nodes      = 1
#   parameter_group_name = "default.redis7"
#   engine_version       = "7.0"
#   port                 = 6379
# }

# --- ECR Repository ---
resource "aws_ecr_repository" "web_repo" {
  name = "limeaura/web"
}
