# CALVIN-MOREBU-CAPSTONE

## Overview
This repository contains a Django backend, a React/Vite frontend, and Kubernetes manifests for deployment to an EKS cluster.

## Deployment workflow
The GitHub Actions workflow in [.github/workflows/ci-cd.yml](.github/workflows/ci-cd.yml) builds the frontend and backend images, pushes them to ECR, and deploys them to the calvin-arieri namespace on EKS.

## Key services
- Frontend: served by nginx on port 80
- Backend: served by gunicorn on port 8000
- Ingress: routes /api to the backend and / to the frontend

## Local development
- Backend:
  - `cd backend`
  - `python -m venv .venv`
  - `source .venv/bin/activate`
  - `pip install -r requirements.txt`
  - `python manage.py runserver`
- Frontend:
  - `cd frontend`
  - `npm install`
  - `npm run dev`

## Troubleshooting
See [RUNBOOK.md](RUNBOOK.md) for common operations such as pod crash loops, high latency, and rollback steps.
