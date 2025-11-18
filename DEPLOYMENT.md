# **Deployment Guide**

This guide covers the deployment process for the LimeAura application suite.

## **Prerequisites**

* **Docker** & **Docker Compose** installed  
* **Kubernetes** cluster (EKS, GKE, or local Minikube)  
* **Terraform** installed (for infrastructure provisioning)  
* Access to a container registry (e.g., ECR, GCR, Docker Hub)

## **Environment Setup**

1. Configure Secrets:  
   Create a production .env file or configure secrets in your CI/CD provider (GitHub Actions).  
   Required variables:  
   * DATABASE\_URL  
   * REDIS\_URL  
   * JWT\_SECRET  
   * API\_URL  
   * APP\_URL

## **Deployment Steps**

### **1\. Build Docker Images**

\# Build the web application image  
docker build \-f infrastructure/docker/Dockerfile.web \-t limeaura/web:latest .

\# Push to registry  
docker push limeaura/web:latest

### **2\. Infrastructure Provisioning (Terraform)**

Navigate to infrastructure/terraform and run:

terraform init  
terraform plan \-out=tfplan  
terraform apply tfplan

This will set up the VPC, RDS (PostgreSQL), ElastiCache (Redis), and Load Balancers.

### **3\. Kubernetes Deployment**

Apply the Kubernetes manifests:

kubectl apply \-f infrastructure/k8s/deployment.yaml

### **4\. Verify Deployment**

Check the status of pods and services:

kubectl get pods \-n limeaura  
kubectl get services \-n limeaura

## **Troubleshooting**

* **Database Connection Issues:** Ensure security groups allow traffic from the K8s cluster to RDS on port 5432\.  
* **Pod CrashLoopBackOff:** Check pod logs using kubectl logs \<pod-name\>.  
* **Assets Not Loading:** Verify CDN configuration and CORS headers.
