FROM --platform=linux/amd64 239650706937.dkr.ecr.us-east-1.amazonaws.com/node:18-alpine

# update and install dependency
RUN apk update && apk --no-cache add curl nginx

# create destination directory
RUN mkdir -p /usr/src/procell_website
WORKDIR /usr/src/procell_website

# Install PM2 globally
RUN npm install pm2 -g

# copy the app, note .dockerignore
COPY . .
COPY ecosystem.config.js .
RUN npm install --force

# build necessary, even if no static files are needed,
# since it builds the server as well
RUN npm run build

# expose 3000 on container
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/http.d/app.conf
EXPOSE 3000

# Copy the startup script into the container
COPY start.sh /start.sh
# Make the startup script executable
RUN chmod +x /start.sh

# Start Nginx and your application using PM2
CMD ["/start.sh"]
