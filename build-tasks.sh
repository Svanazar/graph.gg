#!/bin/bash
cd React
npm run build
cp -R build ../django/
cd ..