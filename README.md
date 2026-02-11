<div align="center">

# 🚀 Student Feedback Application  
## Production Deployment with CI/CD

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



# 📌 Project Overview

This project demonstrates a **production-ready deployment** of a two-tier Student Feedback Application using modern DevOps practices.

### Application Components

- 🎨 Frontend (Static UI served via NGINX)
- 🟢 Backend (Node.js API)
- 🌐 Reverse Proxy (NGINX)
- 🐳 Containerization (Docker & Docker Compose)
- 🔄 CI/CD Pipeline (GitHub Actions)
- ☁ Secure Deployment on AWS EC2 with HTTPS

> 🎯 Entire workflow is automated from code commit to production deployment.

---

# 🏗 Architecture Overview

## CI/CD Flow

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

# 🛠 Technologies Used

## ☁ Cloud & Infrastructure

- AWS EC2 (Ubuntu)
- Elastic IP
- Custom Domain (DNS Configured)
- Let’s Encrypt (Certbot)

## 🐳 Containerization

- Docker
- Docker Compose
- Docker Hub (Image Registry)

## 🔄 CI/CD

- GitHub Actions
- docker/login-action
- appleboy/ssh-action

## 🧩 Application Layer

- Node.js (Backend API)
- Static Frontend
- NGINX Reverse Proxy

---

# 🔄 CI/CD Pipeline

## ✅ Continuous Integration (CI)

Triggered on every push to `main`:

1. Checkout repository
2. Login to Docker Hub
3. Build backend Docker image
4. Build frontend Docker image
5. Push images to Docker Hub

---

## 🚀 Continuous Deployment (CD)

After images are pushed:

GitHub Actions connects to EC2 via SSH and runs:

```bash
docker compose pull
```

```bash
docker compose up -d
```

Containers are automatically updated.

> 🔥 No manual deployment required.

---

# 🐳 Docker Architecture

Production `docker-compose.yml` includes:

- nginx (reverse proxy & SSL termination)
- frontend container
- backend container

### Security Model

- Only NGINX exposes ports 80 and 443
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
- Containers auto-restart
- Secure SSH-based deployment
- No credentials stored in repository
- GitHub Secrets used for sensitive data

---

# 🌍 Domain & SSL Setup

## DNS Configuration

- A record mapped to EC2 Elastic IP

## Generate SSL Certificate

```bash
sudo certbot certonly --nginx -d kcmkcmkcmkcmkcmkcmkcm.dpdns.org(you domain url)
```

## Mount Certificates in NGINX Container

Configured inside `nginx.conf` and Docker volumes.

## Force HTTPS Redirect

NGINX configured to redirect HTTP → HTTPS automatically.

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

# 🚀 Manual Deployment Steps (Without CI/CD)

## 1️⃣ Launch EC2 Instance (Ubuntu)

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

## 3️⃣ Install Docker Compose

```bash
sudo apt install docker-compose -y
```

## 4️⃣ Clone Repository

```bash
git clone <your-repository-url>
```

```bash
cd student-feedback-ci-cd
```

## 5️⃣ Generate SSL Certificate

```bash
sudo certbot --nginx -d kcmkcmkcmkcmkcmkcmkcm.dpdns.org(your domain url)
```

## 6️⃣ Start Application

```bash
docker compose up -d
```

---

# 📈 Key DevOps Concepts Demonstrated

- Infrastructure automation
- Reverse proxy configuration
- Containerized microservice-style architecture
- Secure CI/CD pipeline
- Automated deployment via SSH
- Cross-environment consistency
- Separation of application & infrastructure concerns

---

# 🎯 Future Improvements

- Use version tagging instead of `latest`
- Add health checks in Docker Compose
- Implement zero-downtime deployments
- Add monitoring (Prometheus / CloudWatch)
- Migrate to Kubernetes for scalability

---

# 👨‍💻 Author

## Md Majid  
### DevOps & SRE Enthusiast  

AWS | Docker | CI/CD | Linux | NGINX  

---

# 📜 License

This project is intended for educational and portfolio demonstration purposes.
