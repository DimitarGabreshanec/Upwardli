# Running Plan & Apply

Against dev -

```
$ AWS_PROFILE=upwardli terraform plan -var-file=env.dev.tfvars
```

Against prod -

```
$ AWS_PROFILE=upwardli terraform plan -var-file=env.prod.tfvars
```
