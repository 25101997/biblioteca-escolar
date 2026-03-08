…or create a new repository on the command line

echo "# biblioteca-escolar-app" >> README.md
git init
git add .
git config --global user.email "dlopez@local.com"
git config --global user.name "dlopez"
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/25101997/biblioteca-escolar.git

git push -u origin main

…or push an existing repository from the command line

git remote add origin https://github.com/25101997/biblioteca-escolar.git

git remote set-url origin https://github.com/25101997/biblioteca-escolar.git

git remote -v

git branch -M main
git push -u origin main