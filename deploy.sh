#/bin/bash

echo 'Deploy started...'
rsync -av --exclude='node_modules' --exclude='.git' ../nodejs-weather/ ubuntu@152.70.74.152:~/projects/weather
ssh ubuntu@152.70.74.152 "cd ~/projects/weather && docker-compose up -d --build"
echo 'Deployed!'
