#!/bin/bash

SERVICE_URL=http://localhost:3000
C='\033[0;33m'
NC='\033[0m'

# Prep

export NODEDB_STORE=mongoose
export NODEDB_TESTDB_URL='mongodb://127.0.0.1:27017/test_nodedb'
export NODEDB_TESTDB_NAME='test_nodedb'
echo -e "use test_nodedb\n db.dropDatabase()" | mongo
node ./scripts/install_mongoose.js

# Tests

echo -e "${C}Getting all the books${NC}"
curl -X GET $SERVICE_URL/books
echo

echo -e "${C}Getting one book${NC}"
curl -X GET $SERVICE_URL/books/5b2ff54c5953638f51215f0f
echo

echo -e "${C}Adding new book${NC}"
curl -X POST -d "title=Test+Driven+Development:+By+Example&isbn13=9780321146533&bookshelf=3" $SERVICE_URL/books
echo

echo -e "${C}Updating new book${NC}"
curl -X PUT -d "bookshelf=3" $SERVICE_URL/books/5b2ff54c5953638f51215f10
echo

echo -e "${C}Deleting book${NC}"
curl -X DELETE $SERVICE_URL/books/5b2ff54c5953638f51215f11
echo
