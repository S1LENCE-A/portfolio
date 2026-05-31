# 黑白线稿 · 求职简历个人站

面向 **投稿 / 简历 / 面试** 的静态作品集。画面简洁（黑白手绘线稿），交互丰富（滚动、筛选、灯箱、展开等）。**内容全部在 `js/config.js` 自定义。**

## 预览

双击 `index.html`，或：

```bash
npx --yes serve .
```

## 视觉与交互（已增强）

- **配色**：在 `config.js` 的 `theme` 中设置三色 + 背景图案（`grid` / `dots` / `cross`）
- **装饰**：漂浮线稿图形、色块光晕、章节序号彩色标签
- **交互**：渐变阅读进度、自定义光标、按钮涟漪、技能数字滚动、经历左侧色条展开、作品卡片 3D 微倾斜、回到顶部

```javascript
theme: {
  accent: '#e07a5f',
  accent2: '#3d8b8b',
  accent3: '#d4a054',
  pattern: 'grid', // grid | dots | cross
},
```

## 你要改的文件

| 文件 | 内容 |
|------|------|
| `js/config.js` | 姓名、介绍、技能、经历、**作品**、联系方式 |
| `assets/images/` | 作品封面、肖像照、PDF 简历 |

## 页面结构

1. **Hero** — 姓名、职位、一句话、线稿肖像  
2. **关于** — 面向面试官的自我介绍  
3. **技能** — 进度条；悬停/点击看说明  
4. **经历** — 时间线卡片，点击展开详情  
5. **作品** — 分类筛选 · 网格/列表切换 · 灯箱多图  
6. **联系** — 复制邮箱、外链  

## 作品配置示例

```javascript
works: {
  categories: [
    { id: 'all', label: '全部' },
    { id: 'product', label: '产品' },
  ],
  items: [
    {
      id: 'p1',
      title: '项目名称',
      category: 'product',
      tags: ['UX'],
      year: '2025',
      cover: 'assets/images/cover.jpg',
      images: ['assets/images/1.jpg', 'assets/images/2.jpg'],
      description: '项目说明与成果',
      link: 'https://...',
      featured: true,
    },
  ],
},
```

## 交互一览

- 顶部 **阅读进度条** + **章节高亮导航**  
- 区块 **滚动入场**动画  
- 技能条 **进入视口后填充**  
- 经历 **手风琴展开**  
- 作品 **分类 / 网格·列表 / 灯箱 / 键盘 ← → Esc**  
- **一键复制邮箱**  

## 可选

- `profile.resumePdf` — 显示「下载简历」  
- `profile.portraitImage` — 替换默认线稿肖像  

## 部署（发给面试官的链接）

本站为**纯静态页面**，部署到 GitHub Pages 后，任何人可通过 `https://` 链接访问；复制邮箱、下载简历、跳转 GitHub 等功能均可正常使用。

### 一次性上线（GitHub Pages）

1. 在 GitHub 新建**公开**仓库，例如 `portfolio`（账号：`S1LENCE-A`）
2. 在本项目目录执行（仓库地址按实际修改）：

```powershell
cd "D:\开发\个人网页"
git remote add origin https://github.com/S1LENCE-A/portfolio.git
git push -u origin main
```

3. 仓库 **Settings → Pages → Build and deployment**  
   - Source：**Deploy from a branch**  
   - Branch：**main** / **/ (root)** → Save  
4. 等待 1～3 分钟，访问：

```text
https://s1lence-a.github.io/portfolio/
```

（若仓库名为 `S1LENCE-A.github.io`，则网址为 `https://s1lence-a.github.io/`）

### 部署后自检

- [ ] 启动页与主页转场  
- [ ] 联系区「复制邮箱」「发送邮件」  
- [ ] 「下载 PDF 简历」与 Hero「下载简历」  
- [ ] GitHub 外链、作品灯箱  

### 更新网站

改完 `config.js` 或资源后：

```powershell
git add .
git commit -m "Update portfolio content"
git push
```

Pages 会在几分钟内自动更新。

### 国内访问备选

若 GitHub Pages 较慢，可将同一文件夹部署到 [Cloudflare Pages](https://pages.cloudflare.com)（拖拽上传或关联 GitHub 仓库），功能相同。

---

也可将整文件夹上传任意静态托管（Netlify、Gitee Pages 等）。
