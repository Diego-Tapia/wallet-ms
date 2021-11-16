#Construccion de imagen by dockerfile##
cp PIPELINE/Dockerfile ./Dockerfile
PIPELINE_VERSION=1.0.0.2
##Build con variables##
docker build --force-rm --rm --no-cache --tag=valentinobruno/walletbff:$PIPELINE_VERSION.
echo "docker build --rm --force-rm --tag=walletbff:$PIPELINE_VERSION"
echo "building version $PIPELINE_VERSION"
sleep 10 
docker push valentinobruno/walletbff:$PIPELINE_VERSION
