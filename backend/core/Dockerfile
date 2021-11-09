FROM ubuntu:20.04 AS base

ENV DEBIAN_FRONTEND=noninteractive

RUN mkdir -p /app
ENV PYTHONPATH "${PYTHONPATH}:/app"
WORKDIR /app

ENV SHELL=/bin/bash

RUN apt-get update -q

# python dependencies
RUN apt-get install -y build-essential python3-dev python3-pip python-is-python3
RUN apt-get install -y libmysqlclient-dev mysql-client cmake autoconf libtool libtool-bin

# Install apig-wsgi for lambda bridge
RUN pip install awslambdaric apig-wsgi

COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

RUN mkdir -p /app/web/out

RUN DJANGO_SETTINGS_MODULE=config.static python manage.py collectstatic --noinput

# Set via Terraform for lambda entrypoint:
# ENTRYPOINT [ "/usr/bin/python", "-m", "awslambdaric" ]
CMD [ "config.wsgi.apig_wsgi_handler" ]

FROM base as dev

# Setup vscode user for development
ARG DEV_UID=1000
ARG DEV_USERNAME=vscode
RUN groupadd --gid $DEV_UID $DEV_USERNAME
RUN useradd --uid $DEV_UID --gid $DEV_UID -m $DEV_USERNAME

# Setup wait-until to wait on mysql in docker-compose
ADD https://raw.githubusercontent.com/nickjj/wait-until/v0.2.0/wait-until /usr/local/bin
RUN chmod +x /usr/local/bin/wait-until

# Required to make tests work
RUN mkdir -p media/
RUN chown ${DEV_USERNAME}:${DEV_USERNAME} media/

RUN pip install black bandit pylint mypy
RUN pip install -r requirements_dev.txt
