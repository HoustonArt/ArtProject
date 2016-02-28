python SiteCreator.py
python SiteDeploy.py
rm -rf node_modules
git remote set-url origin https://github.com/HoustonArt/ArtProject.git
git add --all
git commit -m "site update"
git push origin master
firebase deploy
npm install
