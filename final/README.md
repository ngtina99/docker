# Kubernetes Notes Application

A simple full-stack Notes Application deployed on Kubernetes using Minikube.

The project demonstrates:
- Multi-container architecture
- Kubernetes Deployments and Services
- MongoDB database integration
- ConfigMaps and Secrets
- Ingress configuration
- Internal communication between services inside a Kubernetes cluster

---

# Project Architecture

```text
Browser
   ↓
Ingress (notes.local)
   ↓
Frontend Service
   ↓
Frontend Pod (React + Nginx)
   ↓
Backend Service
   ↓
Backend Pod (Node.js API)
   ↓
Mongo Service
   ↓
MongoDB Pod

# Technologies Used

- React
- Node.js / Express
- MongoDB
- Docker
- Kubernetes
- Minikube
- Nginx Ingress Controller

---

# Kubernetes Resources Used

| Resource | Purpose |
|---|---|
| Deployment | Manages application pods |
| Service | Internal networking between components |
| ConfigMap | Stores non-sensitive configuration |
| Secret | Stores database credentials |
| Ingress | External access through browser |

---

# Start Minikube

```bash
minikube start
```

Enable Ingress Controller:

```bash
minikube addons enable ingress
```

---

# Build Docker Images

Use Minikube Docker environment.

## macOS/Linux

```bash
eval $(minikube docker-env)
```

Build images:

```bash
docker build -t notes-backend:1.0 ./backend
docker build -t notes-frontend:1.0 ./frontend
```

---

# Deploy to Kubernetes

Apply all Kubernetes configurations:

```bash
kubectl apply -f k8s/
```

---

# Verify Deployment

Check pods:

```bash
kubectl get pods
```

Expected output:

```text
backend-deployment-xxxxx    Running
frontend-deployment-xxxxx   Running
mongo-deployment-xxxxx      Running
```

Check services:

```bash
kubectl get svc
```

Check ingress:

```bash
kubectl get ingress
```

Expected output:

```text
notes-ingress   notes.local
```

---

# Configure Local Domain

Get Minikube IP:

```bash
minikube ip
```

Example:

```text
192.168.49.2
```

Edit hosts file.

## macOS/Linux

```bash
sudo nano /etc/hosts
```

## Windows

Edit:

```text
C:\Windows\System32\drivers\etc\hosts
```

Add:

```text
192.168.49.2 notes.local
```

Save the file.

---

# Access the Application

Open browser:

```text
http://notes.local
```

---

# How the Application Works

1. User opens the frontend in the browser
2. Ingress routes traffic to frontend-service
3. Frontend communicates with backend-service
4. Backend stores and retrieves notes from MongoDB
5. MongoDB runs inside the Kubernetes cluster

---

# ConfigMap

The ConfigMap stores non-sensitive configuration:

```text
MONGO_HOST
MONGO_DATABASE
```

---

# Secret

The Secret stores sensitive information:

```text
MONGO_USERNAME
MONGO_PASSWORD
```

---

# Scaling Example

Scale backend pods:

```bash
kubectl scale deployment backend-deployment --replicas=3
```

Check pods again:

```bash
kubectl get pods
```

---

# Useful Kubernetes Commands

Check all resources:

```bash
kubectl get all
```

Describe pod:

```bash
kubectl describe pod <pod-name>
```

View logs:

```bash
kubectl logs <pod-name>
```

Delete all resources:

```bash
kubectl delete -f k8s/
```

---

# Demonstration Flow

1. Start Minikube
2. Enable ingress
3. Build Docker images
4. Deploy Kubernetes resources
5. Show running pods and services
6. Open application in browser
7. Create notes
8. Explain architecture and YAML files
9. Demonstrate scaling