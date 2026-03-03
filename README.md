<div align="center">

## Student Feedback Application

<img src="https://img.shields.io/badge/Kubernetes-k3s-blue?logo=kubernetes&logoColor=white" />
<img src="https://img.shields.io/badge/ArgoCD-GitOps-orange?logo=argo&logoColor=white" />
<img src="https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-Hub-2496ED?logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/Cert--Manager-Let's%20Encrypt-red?logo=letsencrypt&logoColor=white" />

Production-Grade 3-Tier Kubernetes Deployment with GitOps Automation

</div>

---

## Project Overview

The Student Feedback Application is a containerized full-stack web application deployed on Kubernetes using a GitOps workflow powered by ArgoCD.

The system follows a 3-tier architecture:

- Frontend (Static Web Application)
- Backend (Node.js REST API)
- Database (PostgreSQL with Persistent Storage)

Deployment workflow:

Code Push → GitHub Actions → Docker Build → Image Push → K8s Manifest Update → ArgoCD Sync → Live Deployment

This project demonstrates production-grade DevOps practices including containerization, Kubernetes orchestration, GitOps-based deployment, TLS automation, and persistent storage management.

---

## Architecture Overview

### GitOps Deployment Flow

```
Developer Push (App Repo)
        │
        ▼
GitHub Actions (CI)
        │
        ▼
Build Docker Images (Tagged with Commit SHA)
        │
        ▼
Push Images to Docker Hub
        │
        ▼
Update Kubernetes Manifests (K8s Repo)
        │
        ▼
ArgoCD Detects Change
        │
        ▼
Automatic Kubernetes Deployment
```

### Production Traffic Flow

```
User
  │
  ▼
Domain (DNS → VM Public IP)
  │
  ▼
k3s Cluster (GCP VM)
  │
  ▼
Traefik Ingress Controller
  │
  ▼
Frontend Service
  │
  ▼
Backend Service
  │
  ▼
PostgreSQL (Persistent Volume)
```

---

## Core Technologies

### Infrastructure
- GCP VM (Ubuntu 22.04)
- k3s (Lightweight Kubernetes)
- Traefik Ingress Controller
- cert-manager with Let's Encrypt

### GitOps & CI/CD
- GitHub Actions
- Docker Hub
- ArgoCD
- Git-based declarative deployments

### Application Stack
- Node.js Backend
- Static Frontend
- PostgreSQL Database
- Kubernetes Deployments & Services

---

# Complete Deployment Guide (Step-by-Step)

This guide explains how to deploy the entire project from scratch.

---

## 1. Prerequisites

You must have:

- GitHub account
- Docker Hub account
- GCP account (or AWS EC2 alternative)
- Domain name (for HTTPS)
- SSH client installed

---

## 2. Create a Virtual Machine

### On GCP

Create a VM with:

- OS: Ubuntu 22.04 LTS
- Machine Type: e2-medium (2 vCPU, 4GB RAM recommended)
- Boot Disk: 20GB minimum
- Allow HTTP Traffic
- Allow HTTPS Traffic

Open firewall ports:

```
22   (SSH)
80   (HTTP)
443  (HTTPS)
```

---

## 3. SSH Into the VM

```
ssh <username>@<VM_PUBLIC_IP>
```

---

## 4. Install k3s (Kubernetes)

```
curl -sfL https://get.k3s.io | sh -
```

Verify installation:

```
sudo kubectl get nodes
```

Configure kubectl for non-root usage:

```
sudo chmod 644 /etc/rancher/k3s/k3s.yaml
export KUBECONFIG=/etc/rancher/k3s/k3s.yaml
echo 'export KUBECONFIG=/etc/rancher/k3s/k3s.yaml' >> ~/.bashrc
```

---

## 5. Install cert-manager

```
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
```

Wait until all pods are running:

```
kubectl get pods -n cert-manager
```

---

## 6. Install ArgoCD

Create namespace:

```
kubectl create namespace argocd
```

Install ArgoCD:

```
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Verify installation:

```
kubectl get pods -n argocd
```

---

## 7. Expose ArgoCD (Temporary NodePort)

```
kubectl patch svc argocd-server -n argocd \
  -p '{"spec": {"type": "NodePort"}}'
```

Get NodePort:

```
kubectl get svc -n argocd
```

Access ArgoCD:

```
http://<VM_PUBLIC_IP>:<NODEPORT>
```

Get admin password:

```
kubectl -n argocd get secret argocd-initial-admin-secret \
-o jsonpath="{.data.password}" | base64 -d && echo
```

Username: `admin`

---

## 8. Configure DNS

Create an A record:

```
yourdomain.com → <VM_PUBLIC_IP>
```

Wait for DNS propagation.

---

## 9. Deploy the Application via ArgoCD

Clone the Kubernetes repository:

```
git clone https://github.com/majid-gt/student-feedback-k8s.git
cd student-feedback-k8s
```

Apply the ArgoCD application manifest:

```
kubectl apply -f argocd/application.yml
```

ArgoCD will automatically:

- Create namespace
- Deploy PostgreSQL
- Create PersistentVolumeClaim
- Deploy backend
- Deploy frontend
- Configure Ingress
- Generate TLS certificate

---

## 10. Verify Deployment

Check ArgoCD application:

```
kubectl get applications -n argocd
```

Check application pods:

```
kubectl get pods -n student-feedback
```

Check certificates:

```
kubectl get certificate -n student-feedback
```

Access the application:

```
https://yourdomain.com
```

---

# CI/CD Automation

## App Repository Workflow

On every push to `main`:

- Build backend image (tagged with commit SHA)
- Build frontend image
- Push images to Docker Hub
- Update image tags in Kubernetes repo
- Commit and push manifest changes

## GitOps Behavior

ArgoCD:

- Monitors Kubernetes repository
- Detects manifest changes
- Performs rolling deployment
- Maintains revision history
- Enables rollback

---

# Kubernetes Design

### Namespace Isolation

All resources are deployed under:

```
student-feedback
```

### Persistent Storage

PostgreSQL uses:

```
PersistentVolumeClaim (1Gi)
```

### Rolling Updates

Each new image creates a new ReplicaSet.
Older versions remain available for rollback.

---

# Security & Production Features

- HTTPS via Let's Encrypt
- Automatic certificate renewal
- Kubernetes Secrets for credentials
- Backend not publicly exposed
- Ingress-based routing
- Immutable container images
- Commit-based versioning
- Declarative infrastructure
- Git-controlled deployments

---

# Capabilities

- Fully automated GitOps deployment
- Zero manual deployment after push
- 3-tier production architecture
- Persistent database storage
- Automatic TLS provisioning
- Rolling updates with rollback support
- Namespace isolation
- Commit-based image tagging
- Infrastructure and application separation

---

# Repository Structure

```
student-feedback-ci-cd/
│
├── frontend/
├── backend/
├── .github/workflows/
│
student-feedback-k8s/
│
├── k8s/
│   ├── namespace.yml
│   ├── postgres-deployment.yml
│   ├── postgres-service.yml
│   ├── postgres-pvc.yml
│   ├── backend-deployment.yml
│   ├── frontend-deployment.yml
│   ├── ingress.yml
│
└── argocd/
    └── application.yml
```

---

## Author

Md Majid  
DevOps & SRE Enthusiast  

Kubernetes | GitOps | Docker | CI/CD | Cloud Infrastructure

---

## License

Educational & Portfolio Demonstration Project
