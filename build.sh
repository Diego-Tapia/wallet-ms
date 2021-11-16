#Construccion de imagen by dockerfile##
cp PIPELINE/Dockerfile ./Dockerfile
export REGISTRY=759603056066.dkr.ecr.us-east-1.amazonaws.com
export APP=wallet-bff
PIPELINE_VERSION=1.0.0.1
##Build con variables##
docker build --force-rm --rm --no-cache --tag=$REGISTRY/$APP:$PIPELINE_VERSION .
echo "docker build --rm --force-rm --tag=$REGISTRY/$APP:$PIPELINE_VERSION"
echo "building version $PIPELINE_VERSION"
##AWS cli login to push ECR##
DOCKER_LOGIN=`aws ecr get-login --no-include-email --region us-east-1` 
time ${DOCKER_LOGIN}
time docker push $REGISTRY/$APP:$PIPELINE_VERSION



