#!/bin/bash
docker-compose run --rm -e DEBUG=1 -e SQLITE=1 backend pytest -v