FROM node:16.13.0
WORKDIR  /walletbff
COPY ./ /walletbff/
ADD PIPELINE/ENV /opt/ENV/
RUN echo "Start npm service"
RUN npm install
RUN npm run build
COPY . .
RUN rm -rf /walletbff/PIPELINE/Scripts /walletbff/PIPELINE/YML /walletbff/PIPELINE/Dockerfile
RUN echo "Start npm service"
CMD npm run start
