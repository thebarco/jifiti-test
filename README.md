Hello,
In order to run this project, please follow the instructions below.

Please make sure to have both [Node.js](https://nodejs.org/en/download/) & [docker](https://www.docker.com/products/docker-desktop/) installed on your environment.

# To run it via docker:
## Run the backend:
1. Open the command line and navigate to '/backend' directory
2. Execute: 
  ```
  docker build -f Dockerfile -t barco-server .
  ```
3. Execute: 
  ```
  docker run -it -e AUTH_KEY=<YOUR_AUTH_KEY> -p 8080:8080 barco-server
  ```
  * Notice: you must enter your authorization key instead <YOUR_AUTH_KEY>
  * To make sure that the server is up, you may notice the message that will be printed in the command which will anounce that it is listening to port 8080.
  Also, you can go to http://localhost:8080/auth and make sure that the auth key is your correct authorization key.
  
## Run the client:
1. Open the command line and navigate to the main directory - 'jifity-test'
2. Execute: 
  ```
  docker build -f Dockerfile -t barco-client .
  ```
3. Execute: 
  ```
  docker run -it -p 3000:3000 barco-client
  ```



To start using this application, please navigate to http://localhost:3000/
