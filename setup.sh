#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR

mkdir -p release/production
cd release/production

git init
git remote add origin https://github.com/WolneSady/wolne_sady_landing.git

