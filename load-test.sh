#!/bin/sh

# Check if MODE environment variable is set to 'production'
if [ "$MODE" = "production" ]; then
    echo "Production mode detected. Exiting script."
    exit 0
fi

artillery run --output load-test-report.json load-tests/normal-flow.yml
artillery report load-test-report.json