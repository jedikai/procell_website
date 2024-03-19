#!/bin/sh

# Start your application with PM2
pm2 start ecosystem.config.js

# Keep the container running
tail -f /dev/null
