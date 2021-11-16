FROM node:16.13.0
WORKDIR  /walletbff
COPY ./ /walletbff/
ADD PIPELINE/ENV /opt/ENV/
RUN npm install
RUN npm run build
COPY . .
RUN rm -rf /walletbff/PIPELINE/Scripts /walletbff/PIPELINE/YML /walletbff/PIPELINE/Dockerfile
CMD npm run start && echo "Start npm service"
