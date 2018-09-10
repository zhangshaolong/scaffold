#!/bin/bash


npm i
if [ $? -ne 0 ]; then
  exit 1
fi

# build
npm run build
if [ $? -ne 0 ]; then
  exit 1
fi

echo "build success~"

exit 0