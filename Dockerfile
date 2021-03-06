FROM node:12

RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "vim"]
RUN ["apt-get", "-y", "install", "nano"]

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install -g nodemon


# Bundle app source
COPY . .

ENV DD_AGENT_HOST=datadog-agent
ENV DD_TRACE_AGENT_PORT=8126

EXPOSE 3000

CMD [ "nodemon" ]
