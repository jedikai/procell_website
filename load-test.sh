#!/bin/sh

# Check if MODE environment variable is set to 'production'
if [ "$MODE" = "production" ]; then
    echo "Production mode detected. Exiting script."
    exit 0
fi

artillery run load-tests/normal-flow.yml