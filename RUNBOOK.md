# Runbook

## 1. Common deployment issues

### Pod crash loop
- Check the pod status:
  - `kubectl get pods -n calvin-arieri`
  - `kubectl describe pod <pod-name> -n calvin-arieri`
- Review recent logs:
  - `kubectl logs <pod-name> -n calvin-arieri --all-containers`
- If the issue is a health probe, inspect the deployment probes and confirm the application responds on the expected path.

### High latency
- Check CPU and memory pressure:
  - `kubectl top pods -n calvin-arieri`
  - `kubectl top nodes`
- Review resource requests and limits in the deployment manifests.
- Check ingress controller logs if latency appears only through the public endpoint.

### Image pull failures
- Verify the ECR pull secret exists:
  - `kubectl get secret ecr-secret -n calvin-arieri`
- Confirm the image repository and tag are valid.

## 2. Rollback
- Roll back a deployment with:
  - `kubectl rollout undo deployment/frontend -n calvin-arieri`
  - `kubectl rollout undo deployment/backend -n calvin-arieri`

## 3. Useful commands
- `kubectl get ingress -n calvin-arieri`
- `kubectl get svc -n calvin-arieri`
- `kubectl get deploy -n calvin-arieri`
- `kubectl get pods -n calvin-arieri`
