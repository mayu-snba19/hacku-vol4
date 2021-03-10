#!/bin/bash

cd /var/app || exit

sleep 3

uwsgi --ini uwsgi/uwsgi.ini &

python3 schedule.py
