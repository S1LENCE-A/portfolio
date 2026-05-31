# -*- coding: utf-8 -*-
"""在简历 PDF 中插入「全栈求职作品集网站」项目（独立新页，避免第一页底部被裁切）。"""
from __future__ import annotations

import shutil
from pathlib import Path

import fitz

DESKTOP_PDF = Path(r"c:\Users\18440\Desktop\个人简历.pdf")
DESKTOP_OUT = Path(r"c:\Users\18440\Desktop\个人简历.pdf")
DESKTOP_FALLBACK = Path(r"c:\Users\18440\Desktop\个人简历_新版.pdf")
SITE_PDF = Path(r"D:\开发\个人网页\assets\resume.pdf")
SOURCE_PDF = DESKTOP_PDF.with_name("个人简历.backup.pdf")
FONT = Path(r"C:\Windows\Fonts\msyh.ttc")
FONT_NAME = "yahei-ms"

LEFT = 49
RIGHT = 566
DATE_X = 479

TITLE_L1 = "全栈求职作品集网站 | 在线："
TITLE_L2 = "https://s1lence-a.github.io/portfolio/"
PERIOD = "2025.12 - 2026.05"
ROLE = "个人"
BULLETS = [
    "• 技术栈与架构：纯 HTML/CSS/JS 静态站点，config.js 一处配置全站内容，零构建依赖；部署于 GitHub Pages，公网可访问。",
    "• 交互与视觉：设计实现纸飞机自定义光标、欢迎启动页转场、作品灯箱多图轮播、技能分类筛选、阅读进度与 reveal 入场动画。",
    "• 功能与工程：模块化拆分 main / works / ui / splash；支持复制邮箱、PDF 简历下载、GitHub 跳转与作品详情展示。",
    "• 成果：已上线作品集站点（见链接），便于面试官一站式浏览项目、技能、经历与联系方式。",
]


def ensure_font(page: fitz.Page) -> None:
    page.insert_font(fontname=FONT_NAME, fontfile=str(FONT))


def write(page: fitz.Page, x: float, y: float, text: str, size: float) -> None:
    page.insert_text((x, y), text, fontname=FONT_NAME, fontsize=size, color=(0, 0, 0))


def write_bullet(page: fitz.Page, y: float, text: str) -> float:
    rect = fitz.Rect(LEFT, y, RIGHT, y + 36)
    page.insert_textbox(
        rect,
        text,
        fontname=FONT_NAME,
        fontsize=10.5,
        color=(0, 0, 0),
        align=fitz.TEXT_ALIGN_LEFT,
    )
    return y + 19.5


def build_portfolio_page(doc: fitz.Document) -> None:
    doc.insert_page(1, width=doc[0].rect.width, height=doc[0].rect.height)
    page = doc[1]
    ensure_font(page)

    y = 72
    write(page, LEFT, y, "项目经历", 13.5)
    y = 118
    write(page, LEFT, y, TITLE_L1, 11.2)
    y = 138
    write(page, LEFT, y, TITLE_L2, 11.2)
    write(page, DATE_X, 118, PERIOD, 11.2)
    y = 158
    write(page, LEFT, y, ROLE, 11.2)

    y = 188
    for bullet in BULLETS:
        y = write_bullet(page, y, bullet)


def update_pdf(target: Path) -> Path:
    src = SOURCE_PDF if SOURCE_PDF.exists() else target
    doc = fitz.open(src)
    build_portfolio_page(doc)
    tmp = target.with_suffix(".tmp.pdf")
    doc.save(tmp, garbage=4, deflate=True)
    doc.close()
    try:
        tmp.replace(target)
        return target
    except OSError:
        tmp.replace(DESKTOP_FALLBACK)
        return DESKTOP_FALLBACK


def main() -> None:
    if not SOURCE_PDF.exists() and not DESKTOP_PDF.exists():
        raise FileNotFoundError("找不到简历 PDF")
    if not FONT.exists():
        raise FileNotFoundError(FONT)
    out = update_pdf(DESKTOP_OUT)
    shutil.copy2(out, SITE_PDF)
    print("Updated:", out, "(3 pages)")
    print("Synced:", SITE_PDF)
    if out == DESKTOP_FALLBACK:
        print("提示：请关闭正在打开的旧版 PDF，再将 _新版 重命名替换。")


if __name__ == "__main__":
    main()
