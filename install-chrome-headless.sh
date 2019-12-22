#!/bin/bash

curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable build-essential jq git openssh-server \
    && apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
