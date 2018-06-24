#!/bin/bash

SERVICE_URL=http://localhost:3000
C='\033[0;33m'
NC='\033[0m'

echo -e "${C}Getting all the books${NC}"
curl -X GET $SERVICE_URL/books
echo

echo -e "${C}Getting one book${NC}"
curl -X GET $SERVICE_URL/books/1
echo
