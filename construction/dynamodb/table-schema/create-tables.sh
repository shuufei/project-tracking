#!/bin/bash
set -euxv

aws dynamodb create-table --cli-input-json file://./Project_User.json --endpoint http://localhost:8000 > /dev/null
aws dynamodb create-table --cli-input-json file://./Board.json --endpoint http://localhost:8000 > /dev/null
aws dynamodb create-table --cli-input-json file://./TaskGroup.json --endpoint http://localhost:8000 > /dev/null
aws dynamodb create-table --cli-input-json file://./Task.json --endpoint http://localhost:8000 > /dev/null
aws dynamodb create-table --cli-input-json file://./Subtask.json --endpoint http://localhost:8000 > /dev/null
