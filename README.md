<div align="center">

# Student Feedback Application  

<img src="https://img.shields.io/badge/AWS-EC2-orange?logo=amazonaws&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-18-green?logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/NGINX-Reverse%20Proxy-brightgreen?logo=nginx&logoColor=white" />
<img src="https://img.shields.io/badge/PM2-Process%20Manager-blue?logo=pm2&logoColor=white" />
<img src="https://img.shields.io/badge/SSL-Let's%20Encrypt-red?logo=letsencrypt&logoColor=white" />

### Production-Grade Deployment with CI/CD Automation

</div>



</div>

---

### Why This Project Matters

✔ Fully Automated CI/CD Pipeline  
✔ Containerized Two-Tier Architecture  
✔ Production-Ready HTTPS Deployment  
✔ Zero Manual Deployment After Push  
✔ Secure Reverse Proxy Configuration  
✔ Backend Not Publicly Exposed  
✔ Infrastructure & Application Separation  

> Code push → Docker build → Image push → SSH deploy → Live in production.

---

## Architecture Overview

### CI/CD Automation Flow

```
Developer Push
      │
      ▼
GitHub Repository
      │
      ▼
GitHub Actions (CI)
      │
      ▼
Build Docker Images
      │
      ▼
Push to Docker Hub
      │
      ▼
GitHub Actions (CD via SSH)
      │
      ▼
AWS EC2
      │
      ▼
Docker Compose Pull & Restart
      │
      ▼
NGINX Reverse Proxy
      │
      ▼
Frontend & Backend Containers
```

---

### Production Traffic Flow

```
User
  │
  ▼
Domain (DNS → Elastic IP)
  │
  ▼
AWS EC2
  │
  ▼
NGINX (Reverse Proxy + SSL Termination)
  │
  ▼
Frontend Container
  │
  ▼
Backend Container
```

---

## Core Technologies

### Infrastructure
- AWS EC2 (Ubuntu)
- Elastic IP
- Custom Domain
- Let’s Encrypt (Certbot)

### Containerization
- Docker
- Docker Compose
- Docker Hub

### CI/CD
- GitHub Actions
- docker/login-action
- appleboy/ssh-action

### Application Layer
- Node.js Backend API
- Static Frontend
- NGINX Reverse Proxy

---

## Implementation Steps (Manual Deployment)

### Launch EC2 (Ubuntu)

### Install Docker

```bash
sudo apt update
```

```bash
sudo apt install docker.io -y
```

```bash
sudo systemctl enable docker
```

---

### Install Docker Compose

```bash
sudo apt install docker-compose -y
```

---

### Clone Repository

```bash
git clone <your-repository-url>
```

```bash
cd student-feedback-ci-cd
```

---

### Generate SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com
```

---

### Start Application

```bash
docker compose up -d
```

---

## CI/CD Pipeline Breakdown

### Continuous Integration (CI)

Triggered on every push to `main`:

- Checkout repository  
- Login to Docker Hub  
- Build backend Docker image  
- Build frontend Docker image  
- Push images to Docker Hub  

---

### Continuous Deployment (CD)

After image push:

```bash
docker compose pull
```

```bash
docker compose up -d
```

✔ Containers updated automatically  
✔ No manual SSH deployment needed  

---

## Docker Architecture

Production `docker-compose.yml` includes:

- nginx (reverse proxy & SSL termination)
- frontend container
- backend container

### Security Model

- Only NGINX exposes ports 80 & 443  
- Backend remains internal  
- Containers use:

```yaml
restart: always
```

---

## Security & Production Readiness

- HTTPS enabled via Let’s Encrypt  
- SSL termination at reverse proxy  
- Backend not publicly exposed  
- SSH-based deployment  
- GitHub Secrets for credentials  
- Containers auto-restart  

---

## Domain & SSL Setup

### DNS Configuration
- A record → EC2 Elastic IP

### SSL Generation

```bash
sudo certbot certonly --nginx -d yourdomain.com
```

### HTTPS Redirect
Configured in `nginx.conf` to force HTTP → HTTPS.

---

## Project Structure

```
student-feedback-ci-cd/
│
├── frontend/
│   └── Dockerfile
│
├── backend/
│   └── Dockerfile
│
├── nginx/
│   └── nginx.conf
│
├── docker-compose.yml
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

### DevOps Concepts Demonstrated

- Infrastructure Automation  
- Reverse Proxy Design  
- Containerized Architecture  
- Secure CI/CD  
- Automated Remote Deployment  
- Environment Consistency  
- Application & Infrastructure Separation  

---

### Author

#### Md Majid  
#### DevOps & SRE Enthusiast  

AWS | Docker | CI/CD | Linux | NGINX  

---

### License

Educational & Portfolio Demonstration Project
