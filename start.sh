#!/bin/sh

# Start Nginx in the background
nginx

# Start your application with PM2
pm2-runtime start ecosystem.config.js

# Keep the container running
tail -f /dev/null
