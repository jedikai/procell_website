FROM 063681706505.dkr.ecr.eu-west-1.amazonaws.com/node:16.13.1-alpine

# create destination directory
RUN mkdir -p /usr/src/procell_website
WORKDIR /usr/src/procell_website

# update and install dependency
RUN apk update && apk upgrade
RUN apk --no-cache add curl

# copy the app, note .dockerignore
COPY . .
RUN npm install --force

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 3000 on container
EXPOSE 14047

# start the app
CMD [ "npm", "start" ]
