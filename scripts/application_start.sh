#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/math-mentor

#navigate into our working directory where we have all our github files
cd /home/ec2-user/math-mentor

#start our node app in the background
docker-compose build --no-cache
docker-compose up -d