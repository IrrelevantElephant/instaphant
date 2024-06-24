#!/bin/bash

# echo "PLAYWRIGHT_BASEURL=$PLAYWRIGHT_BASEURL" >> .env

PLAYWRIGHT_BASEURL=$PLAYWRIGHT_BASEURL /root/.local/share/pnpm/pnpm exec playwright test
