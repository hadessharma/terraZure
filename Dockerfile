FROM node:18-alpine

# Install Terraform
RUN apk add --no-cache curl unzip \
    && curl -LO https://releases.hashicorp.com/terraform/1.5.7/terraform_1.5.7_linux_amd64.zip \
    && unzip terraform_1.5.7_linux_amd64.zip \
    && mv terraform /usr/local/bin/ \
    && rm terraform_1.5.7_linux_amd64.zip

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
