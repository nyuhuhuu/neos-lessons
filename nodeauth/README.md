# Node.js/Passport authentication service with client

This lesson contains a backend service using node.js/Express/passport that provides APIs to authenticate a user. There's also a CLI client attached to talk to this service to observe the headers that are being passed around.

## Starting the service

Run `SESSION_SECRET=yoursecretgoeshere npm start` to start the service.

## Using the client

Running `source client.sh` provides the following commands in the shell:

- `home` -- Sends a GET request to index page. Sends content of file `.cookies` along the request if file exists.
- `invalid_login` -- Sends a POST request with invalid credentials to login API.
- `successful_login` -- Sends a POST request with valid credentials to login API.
- `logout` -- Sends a GET request to logout API and removes `.cookies` file.
