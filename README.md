# An instagram clone

## Setup

### Creating the custom domain for github pages

1. set the NS1_APIKEY env var with your NS1 API key

```shell
export NS1_APIKEY=YOURAPIKEY
```

3. Apply the tf configuration, passing your custom domain as a variable

```shell
cd ./infrastructure
tofu init
tofu apply -var="custom_dns=$CUSTOM_DOMAIN" -auto-approve
```
