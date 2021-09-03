#!/bin/bash
set -euxv

readonly BASE_PATH=$(dirname $0)

echo $BASE_PATH

aws dynamodb create-table --cli-input-json file://${BASE_PATH}/Project_User.json --endpoint http://localhost:8000 > /dev/null
aws dynamodb create-table --cli-input-json file://${BASE_PATH}/Board.json --endpoint http://localhost:8000 > /dev/null
aws dynamodb create-table --cli-input-json file://${BASE_PATH}/TaskGroup.json --endpoint http://localhost:8000 > /dev/null
aws dynamodb create-table --cli-input-json file://${BASE_PATH}/Task.json --endpoint http://localhost:8000 > /dev/null
aws dynamodb create-table --cli-input-json file://${BASE_PATH}/Subtask.json --endpoint http://localhost:8000 > /dev/null
