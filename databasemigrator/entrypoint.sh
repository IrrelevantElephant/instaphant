#!/bin/bash

set -m

if [ "$CQLPROXY" == "true" ]; then
  cql-proxy &
fi

# defaults for cqlsh
export CQLVERSION=${CQLVERSION:-"3.4.5"}
export CQLSH_HOST=${CQLSH_HOST:-"0.0.0.0"}
export CQLSH_PORT=9042

cqlsh=( cqlsh --cqlversion ${CQLVERSION} )

# test connection to cassandra
echo "Checking connection to cassandra..."
for i in {1..5}; do
  if "${cqlsh[@]}" -e "show host;"; then
    break
  fi
  echo "Can't establish connection, will retry again in $i seconds"
  sleep $i
done

if [ "$i" = 5 ]; then
  echo >&2 "Failed to connect to cassandra at ${CQLSH_HOST}:${CQLSH_PORT}"
  exit 1
fi

# iterate over the cql files in /scripts folder and execute each one
for file in /scripts/*.cql; do
  [ -e "$file" ] || continue
  echo "Executing $file..."
  "${cqlsh[@]}" -f "$file"
done

echo "Done."

exit 0