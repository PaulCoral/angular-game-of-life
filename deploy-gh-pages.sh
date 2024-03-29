#!/bin/bash

git checkout main
npm install
ng b --configuration production --aot --base-href=/angular-game-of-life/

git checkout gh-pages
rm -f *.html *.js *.css *.ico
mv dist/angular-game-of-life/browser/* .

git add .
git commit
git push

git checkout main

