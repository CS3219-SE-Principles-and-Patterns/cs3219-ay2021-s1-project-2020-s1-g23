# Install Prometheus and Grafana
`helm install stable/prometheus-operator --generate-name`

# View if Prometheus and Grafana is installed
`kubectl get pods`

`kubectl get rs`

`kubectl get deploy`

# Edit the services to expose through a load balancer
`kubectl get svc`

`kubectl edit svc prometheus-operator-158999-prometheus`

`kubectl edit svc prometheus-operator-158999-grafana`

```
Edit type: ClusterIP -> type: LoadBalance
```