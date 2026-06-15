#!/bin/sh
cd ./qa-sandbox
docker compose up -d
cd ..
npx playwright test --project=apiTests
