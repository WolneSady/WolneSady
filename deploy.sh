#!/bin/bash

target=$1

function PUSH_TO_GH_PAGES {
  remote=$1
  echo "pushing to remote $remote"

  git checkout -B gh-pages
  # TODO how to automate it, what about static files
  git add -f .
  git commit -am "Rebuild website"
  git push -f "$remote" gh-pages
  git checkout -
  git branch -D gh-pages
}

function DEPLOY {
  DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
  cd $DIR 

  domain=$1
  remote=$2
  gh_pages=$3
  
  # Prepare package.json
  mv package.json org.package.json
  printf "{\n  \"homepage\": \"$gh_pages\",\n" > package.json
  tail -n +2 org.package.json >> package.json
  npm run build
  mv org.package.json package.json

  shopt -s dotglob
  mv ./build/* ./release/production
  cd release/production

  # Prepare CNAME
  rm -f CNAME
  echo $domain > CNAME

  PUSH_TO_GH_PAGES $remote
  exit
}

if [ "$target" = "production" ]; then
  DEPLOY "wolnesądy.pl" "git@github.com:WolneWybory/wolne_sady.git" "http://wolnesądy.pl"
fi
if [ "$target" = "preview" ]; then
  DEPLOY "preview.wolnesądy.pl" "git@github.com:WolneWybory/wolne_sady_preview.git" "http://preview.wolnesądy.pl/"
fi
echo "Target invalid, add argument 'production' or 'preview'"
