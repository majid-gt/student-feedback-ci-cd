<div align="center">

# 🚀 Student Feedback Application  
## Production-Grade Deployment with CI/CD Automation

<br/>

<div style="display: flex; justify-content: center; align-items: center; gap: 40px;">

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" width="110"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="110"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="110"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" width="110"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="110"/>

</div>

<br/>

### ☁ AWS • 🐳 Docker • 🔄 GitHub Actions • 🌐 NGINX • 🟢 Node.js

</div>

---

# 🔥 Why This Project Matters

✔ Fully Automated CI/CD Pipeline  
✔ Containerized Two-Tier Architecture  
✔ Production-Ready HTTPS Deployment  
✔ Zero Manual Deployment After Push  
✔ Secure Reverse Proxy Configuration  
✔ Backend Not Publicly Exposed  
✔ Infrastructure & Application Separation  

> Code push → Docker build → Image push → SSH deploy → Live in production.

---

# 🏗 Architecture Overview

## CI/CD Automation Flow

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

## 🌍 Production Traffic Flow

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

# 🛠 Core Technologies

## ☁ Infrastructure
- AWS EC2 (Ubuntu)
- Elastic IP
- Custom Domain
- Let’s Encrypt (Certbot)

## 🐳 Containerization
- Docker
- Docker Compose
- Docker Hub

## 🔄 CI/CD
- GitHub Actions
- docker/login-action
- appleboy/ssh-action

## 🧩 Application Layer
- Node.js Backend API
- Static Frontend
- NGINX Reverse Proxy

---

# 🚀 Implementation Steps (Manual Deployment)

## 1️⃣ Launch EC2 (Ubuntu)

## 2️⃣ Install Docker

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

## 3️⃣ Install Docker Compose

```bash
sudo apt install docker-compose -y
```

---

## 4️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

```bash
cd student-feedback-ci-cd
```

---

## 5️⃣ Generate SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com
```

---

## 6️⃣ Start Application

```bash
docker compose up -d
```

---

# 🔄 CI/CD Pipeline Breakdown

## ✅ Continuous Integration (CI)

Triggered on every push to `main`:

- Checkout repository  
- Login to Docker Hub  
- Build backend Docker image  
- Build frontend Docker image  
- Push images to Docker Hub  

---

## 🚀 Continuous Deployment (CD)

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

# 🐳 Docker Architecture

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

# 🔐 Security & Production Readiness

- HTTPS enabled via Let’s Encrypt  
- SSL termination at reverse proxy  
- Backend not publicly exposed  
- SSH-based deployment  
- GitHub Secrets for credentials  
- Containers auto-restart  

---

# 🌍 Domain & SSL Setup

## DNS Configuration
- A record → EC2 Elastic IP

## SSL Generation

```bash
sudo certbot certonly --nginx -d yourdomain.com
```

## HTTPS Redirect
Configured in `nginx.conf` to force HTTP → HTTPS.

---

# 📂 Project Structure

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

# 📈 DevOps Concepts Demonstrated

- Infrastructure Automation  
- Reverse Proxy Design  
- Containerized Architecture  
- Secure CI/CD  
- Automated Remote Deployment  
- Environment Consistency  
- Application & Infrastructure Separation  

---

# 🎯 Future Improvements

- Version tagging instead of `latest`
- Health checks in Docker Compose
- Zero-downtime deployments
- Monitoring (Prometheus / CloudWatch)
- Kubernetes migration

---

# 👨‍💻 Author

## Md Majid  
### DevOps & SRE Enthusiast  

AWS | Docker | CI/CD | Linux | NGINX  

---

# 📜 License

Educational & Portfolio Demonstration Project
