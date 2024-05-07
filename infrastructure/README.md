# Prepare Google Cloud resources

The following steps are pre-requisites to provisioning GCP Cloud Run resources.

Ensure you have installed and authenticated the gcloud cli tool.

## Create project

```shell
PROJECT_ID="instaphant";
gcloud projects create $PROJECT_ID;
```

Set the project as default (optional):
```shell
gcloud config set project $PROJECT_ID
```

## Enable Billing for the project

https://support.google.com/googleapi/answer/6158867?hl=en

## Enable GCloud API's

```shell
    gcloud services enable run.googleapis.com compute.googleapis.com artifactregistry.googleapis.com iam.googleapis.com \
    --project=$PROJECT_ID
```

## Create Docker Registry

# Specify the name you want to give to the registry

```shell
REGISTRY_NAME=instaphant

gcloud artifacts repositories create $REGISTRY_NAME --repository-format=docker \
  --location=europe-west2 --description="Docker repository" \
  --project=$PROJECT_ID
```

## Create bucket for terraform/opentofu state and enable versioning

```shell
gcloud storage buckets create "gs://$PROJECT_ID-tf-state" --project $PROJECT_ID
gcloud storage buckets update "gs://$PROJECT_ID-tf-state" --versioning --project $PROJECT_ID
```

## Set up workload identity pool for pipeline

```shell
gcloud iam workload-identity-pools create "wif-pool" \
  --project=$PROJECT_ID \
  --location="global" \
  --display-name="WIF Pool"
```

```shell
gcloud iam workload-identity-pools providers create-oidc "wif-provider" \
  --project=$PROJECT_ID \
  --location="global" \
  --workload-identity-pool="wif-pool" \
  --display-name="WIF provider" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.aud=assertion.aud,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"
```

Create Service Account

```shell
gcloud iam service-accounts create "default" --project $PROJECT_ID;
```

Get project number and set it to $PROJECT_NUMBER:

```shell
gcloud projects describe $PROJECT_ID;
```

Specify your repository

```shell
GITHUB_REPO=IrrelevantElephant/instaphant

gcloud iam service-accounts add-iam-policy-binding "default@$PROJECT_ID.iam.gserviceaccount.com" \
  --project=$PROJECT_ID \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/$PROJECT_NUMBER/locations/global/workloadIdentityPools/wif-pool/attribute.repository/$GITHUB_REPO"
```

## Add roles to service accounts

### Required Roles

* `roles/storage.objectAdmin`
* `roles/artifactregistry.admin`
* `roles/run.admin`

```shell
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:default@$PROJECT_ID.iam.gserviceaccount.com \
    --role=roles/storage.objectAdmin
```

```shell
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:default@$PROJECT_ID.iam.gserviceaccount.com \
    --role=roles/artifactregistry.admin
```

```shell
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:default@$PROJECT_ID.iam.gserviceaccount.com \
    --role=roles/run.admin
```

```shell
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:default@$PROJECT_ID.iam.gserviceaccount.com \
    --role=roles/iam.serviceAccountUser
```

# Set GitHut secrets

# Astra DB

Generate an Astra token, this will be used by terraform to provision the Cassandra database resources.
Create a pipeline variable names ASTRA_API_TOKEN and set it to the generated token.

## Set up GitHub Actions

Configure the PROJECT_ID, PROJECT_NUMBER, DOCKER_REGISTRY and ASTRA_ORG_ID env vars at the top of /.github/workflows/pipeline.yml with the appropriate values.

