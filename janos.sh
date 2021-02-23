#!/bin/bash

docker run -v $(PWD):/var/janos janos "$@"
