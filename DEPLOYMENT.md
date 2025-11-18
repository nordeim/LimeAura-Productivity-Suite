Deployment GuideThis guide covers the deployment process for the LimeAura application suite.PrerequisitesDocker & Docker Compose installedKubernetes cluster (EKS, GKE, or local Minikube)Terraform installed (for infrastructure provisioning)Access to a container registry (e.g., ECR, GCR, Docker Hub)Environment SetupConfigure Secrets:Create a production .env file or configure secrets in your CI/CD provider (GitHub Actions).Required variables:DATABASE_URLREDIS_URLJWT_SECRETAPI_URLAPP_URLDeployment Steps1. Build Docker Images# Build the web application image
docker build -f infrastructure/docker/Dockerfile.web -t limeaura/web:latest .

# Push to registry
docker push limeaura/web:latest
2. Infrastructure Provisioning (Terraform)Navigate to infrastructure/terraform and run:terraform init
terraform plan -out=tfplan
terraform apply tfplan
This will set up the VPC, RDS (PostgreSQL), ElastiCache (Redis), and Load Balancers.3. Kubernetes DeploymentApply the Kubernetes manifests:kubectl apply -f infrastructure/k8s/deployment.yaml
4. Verify DeploymentCheck the status of pods and services:kubectl get pods -n limeaura
kubectl get services -n limeaura
TroubleshootingDatabase Connection Issues: Ensure security groups allow traffic from the K8s cluster to RDS on port 5432.Pod CrashLoopBackOff: Check pod logs using kubectl logs <pod-name>.Assets Not Loading: Verify CDN configuration and CORS headers.
