#!/bin/sh

docker exec -it "back_flask_1" sh -c "python3 -m pytest -s"