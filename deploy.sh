lessc options.less ./assets/css/new-material.css
python SiteDeploy.py
python DocsCreator.py
rm -rf node_modules
git remote set-url origin https://github.com/HoustonArt/ArtProject.git
git add --all
git commit -m "site update"
git push origin master
firebase deploy
yarn
