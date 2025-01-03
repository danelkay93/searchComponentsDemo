# PowerShell script to deploy React app to GitHub Pages automatically
$RepoName = "spa-search-demo"
$GitHubUsername = "danelkay93"
$RemoteUrl = "https://github.com/$GitHubUsername/$RepoName.git"

git init
git branch -M main
git add .
git commit -m "Initial commit for SPA search demo deployment"
git remote add origin $RemoteUrl
git push -u origin main

pnpm init
pnpm add -D react react-dom @mui/material react-icons react-select downshift react-tagsinput gh-pages

(Get-Content package.json) -replace '"scripts": {', '"scripts": {
    "predeploy": "pnpm run build",
    "deploy": "gh-pages -d build",' | Set-Content package.json

pnpm run deploy

Write-Host "Deployment complete. Visit https://$GitHubUsername.github.io/$RepoName"
