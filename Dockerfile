FROM ubuntu:22.04

RUN apt update && apt install -y nodejs npm

WORKDIR /wargame

COPY package.json package-lock.json ./
RUN npm install

COPY nginx.conf .nginx.conf
COPY . .

EXPOSE 80 8000

CMD ["npm", "start"]
