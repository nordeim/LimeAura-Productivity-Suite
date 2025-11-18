#!/bin/bash

# =====================================================
# System Health Check Script
# Checks API reachability and DB connection
# =====================================================

API_URL=${1:-"http://localhost:4000"}

echo "Checking system health..."

# Check API
if curl -s "$API_URL/health" | grep "ok" > /dev/null; then
  echo "✅ API is healthy"
else
  echo "❌ API is unreachable or unhealthy"
  exit 1
fi

# Check Docker Containers (Local dev)
if [ "$(docker ps -q -f name=limeaura_postgres)" ]; then
    echo "✅ Database container is running"
else
    echo "❌ Database container is NOT running"
fi

if [ "$(docker ps -q -f name=limeaura_redis)" ]; then
    echo "✅ Redis container is running"
else
    echo "❌ Redis container is NOT running"
fi

echo "Health check complete."
