FROM --platform=linux/amd64 239650706937.dkr.ecr.us-east-1.amazonaws.com/node:18-alpine

# create destination directory
RUN mkdir -p /usr/src/procell_website
WORKDIR /usr/src/procell_website

# update and install dependency
RUN apk update && apk upgrade
RUN apk --no-cache add curl

# Install PM2 globally
RUN npm install pm2 -g

# copy the app, note .dockerignore
COPY . .
COPY ecosystem.config.js .
RUN npm install --force

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 14047 on container
EXPOSE 14047

# start the app
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
