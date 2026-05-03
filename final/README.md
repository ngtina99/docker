MongoDB + Node.js + React

1. Create project structure

```bash
my-k8s-project/
├── frontend/
├── backend/
├── k8s/
│   ├── mongo.yml
│   ├── backend.yml
│   ├── frontend.yml
```

2. Build your app

Frontend talks to backend:

```bash
Frontend → Backend API → Database
```

Example:

```bash
React app → Node.js API → MongoDB
```

3. Create Dockerfiles

Each app needs a Dockerfile.

```bash
docker build -t frontend-app ./frontend
docker build -t backend-app ./backend
```

4. Start Minikube

```bash
minikube start
```

Use Minikube Docker environment:
```bash
eval $(minikube docker-env)
```

Then build images again inside Minikube:
```bash
docker build -t frontend-app ./frontend
docker build -t backend-app ./backend
```

5. Create Kubernetes YAML files

- Deployment for frontend
- Service for frontend
- Deployment for backend
- Service for backend
- Deployment for database
- Service for database

6. Deploy to Kubernetes
```bash
kubectl apply -f k8s/
```

Check everything:
```bash
kubectl get pods
kubectl get services
kubectl get deployments
```

7. Access the app

For frontend:

```bash
minikube service frontend-service
```

This opens the app in the browser.

8. Demonstrate live

Show:
```bash
kubectl get pods
```

Then open app and add data.

Then show backend/database working.

# Architecture
```bash
User
 ↓
Frontend Service
 ↓
Backend Service
 ↓
Database Service
```

## Kubernetes components used

- Pods → run containers
- Deployments → manage replicas
- Services → allow communication
- Minikube → local Kubernetes cluster

## Scaling demo

Scale backend:
```bash
kubectl scale deployment backend-deployment --replicas=3
```

Check:
```bash
kubectl get pods
```

→ Kubernetes creates more backend pods
→ this is horizontal scaling

## Self-healing demo

Delete one pod:
```bash
kubectl delete pod <pod-name>
```

Then run:
```bash
kubectl get pods
```

→ Kubernetes automatically creates a new pod
→ this is self-healing
