#!/bin/bash

DIR="/home/ec2-user/math-mentor"
cd $DIR

echo "Stopping any existing node servers"
docker-compose down --remove-orphans --volumes