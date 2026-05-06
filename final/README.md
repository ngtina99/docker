# Kubernetes Notes Application

A simple full-stack Notes Application deployed on Kubernetes using Minikube.

The project demonstrates:
- Multi-container architecture
- Kubernetes Deployments and Services
- MongoDB database integration
- ConfigMaps and Secrets
- Internal communication between services inside a Kubernetes cluster

# How the Application Works

1. User opens the frontend in the browser
2. The browser accesses the frontend through the frontend-service.
3. Frontend communicates with backend-service
4. Backend stores and retrieves notes from MongoDB
5. MongoDB runs inside the Kubernetes cluster

# ConfigMap

The ConfigMap stores non-sensitive configuration:

```text
MONGO_HOST
MONGO_DATABASE
```

# Secret

The Secret stores sensitive information:

```text
MONGO_USERNAME
MONGO_PASSWORD
```

# Project Architecture

```text
Browser
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
```

# Technologies Used

- React
- Node.js / Express
- MongoDB
- Docker
- Kubernetes
- Minikube

# Kubernetes Resources Used

| Resource | Purpose |
|---|---|
| Deployment | Manages application pods |
| Service | Internal networking between components |
| ConfigMap | Stores non-sensitive configuration |
| Secret | Stores database credentials |

# Start Minikube

- Minikube is a tool that runs Kubernetes locally on your computer.
- Normally Kubernetes runs on cloud servers.
- Minikube creates a small local Kubernetes cluster for development and learning.

```bash
minikube start
```

# Build Docker Images

Use Minikube Docker environment.

```bash
eval $(minikube docker-env)
```

Build images:

```bash
docker build -t notes-backend:1.0 ./backend
docker build -t notes-frontend:1.0 ./frontend
```


This is the main Kubernetes step. It creates everything from your YAML files:
# Deploy to Kubernetes

Apply all Kubernetes configurations:

```bash
kubectl apply -f k8s/
```

To delete the running Kubernetes pods and resources from your project:
```bash
kubectl delete -f k8s/
```

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

# Access the Application

Visual dashboard (BEST OPTION)

Kubernetes has a GUI dashboard.

Run:
```bash
minikube dashboard
```

Run:

```bash
minikube service frontend-service
```

Rebuild:
```bash
eval $(minikube docker-env)      
docker build -t notes-frontend:1.0 ./frontend
kubectl rollout restart deployment frontend-deployment
```

# Scaling Example

Scale backend pods:

```bash
kubectl scale deployment backend-deployment --replicas=3
```

Check pods again:

```bash
kubectl get pods
```

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

```bash
kubectl logs -l app=backend
```

```bash
kubectl logs -l app=mongo
```

```bash
kubectl logs -l app=frontend
```

# SECRET and CONFIGMAP
```bash
kubectl get pods
```

```bash
kubectl exec -it backend-deployment-6d487d97bd-pj9ph -- sh
```

These values came from the Kubernetes ConfigMap.

Your backend connects using:

mongo-service

not a hardcoded IP.

Pods communicate using Kubernetes service names.

```bash
kubectl exec -it mongo-deployment-7c7cb8f79-bd82k -- sh
```

login:
```bash
mongosh -u admin -p password123
```

open your app database:
```bash
use notesdb
```

```bash
show collections
```

```bash
db.notes.find()
```