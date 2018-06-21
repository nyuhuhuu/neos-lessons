#!/bin/bash

BASE_URL=http://localhost:3000
API_HOME=${BASE_URL}/
API_LOGIN=${BASE_URL}/login
API_LOGOUT=${BASE_URL}/logout
COOKIES_FILE=.cookies

C='\033[0;33m'
NC='\033[0m'

function prettyprint {
    msg=$1
    echo -e "$C${msg}$NC"
}

function home {
    if [ -f $COOKIES_FILE ] ; then
        cookies=$(cat $COOKIES_FILE)
        prettyprint "curl -i -X GET -b $cookies $API_HOME"
        curl -i -X GET -b $cookies $API_HOME
    else
        prettyprint "curl -i -X GET $API_HOME"
        curl -i -X GET $API_HOME
    fi
}

function invalid_login {
    prettyprint "curl -i -X POST -d username=gabor&password=secret $API_LOGIN"
    curl -i -X POST -d "username=gabor&password=secret" $API_LOGIN
}

function successful_login {
    prettyprint "curl -i -X POST -d username=gabor&password=123456 $API_LOGIN"
    curl -i -X POST -d "username=gabor&password=123456" $API_LOGIN
}

function logout {
    cookies=$(cat $COOKIES_FILE)
    prettyprint "curl -i -X GET -b $cookies $API_LOGOUT"
    curl -i -X GET -b $cookies $API_LOGOUT
    #rm $COOKIES_FILE
}
