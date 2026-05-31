# 推送个人网站到 GitHub Pages 仓库
# 用法：在 PowerShell 中执行  .\deploy.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ">>> 检查 Git 状态..." -ForegroundColor Cyan
git status -sb

if (-not (git remote get-url origin 2>$null)) {
  git remote add origin "https://github.com/S1LENCE-A/portfolio.git"
  Write-Host "已添加 remote: origin" -ForegroundColor Green
}

Write-Host "`n>>> 推送到 GitHub（首次会弹出登录窗口）..." -ForegroundColor Cyan
git -c http.version=HTTP/1.1 push -u origin main

if ($LASTEXITCODE -ne 0) {
  Write-Host "`n推送失败。常见原因：" -ForegroundColor Yellow
  Write-Host "  1. 未登录 GitHub — 请安装 GitHub Desktop 或使用 Personal Access Token"
  Write-Host "  2. 网络不稳定 — 可开代理后重试，或换手机热点"
  Write-Host "  3. 仓库地址错误 — 确认 https://github.com/S1LENCE-A/portfolio 存在"
  exit 1
}

Write-Host "`n>>> 推送成功！" -ForegroundColor Green
Write-Host @"

下一步（只需做一次）：
  1. 打开 https://github.com/S1LENCE-A/portfolio/settings/pages
  2. Source 选 Deploy from a branch
  3. Branch 选 main，文件夹选 / (root)，Save
  4. 等待 1～3 分钟，访问：

     https://s1lence-a.github.io/portfolio/

  将此链接发给面试官即可。

"@ -ForegroundColor White
