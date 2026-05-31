# -*- coding: utf-8 -*-
"""在简历 PDF 项目经历中插入「全栈求职作品集网站」条目。"""
from __future__ import annotations

import shutil
from pathlib import Path

import fitz

DESKTOP_PDF = Path(r"c:\Users\18440\Desktop\个人简历.pdf")
SITE_PDF = Path(r"D:\开发\个人网页\assets\resume.pdf")
FONT = Path(r"C:\Windows\Fonts\msyh.ttc")
FONT_NAME = "yahei-ms"
BACKUP = DESKTOP_PDF.with_name("个人简历.backup.pdf")

INSERT_X0 = 49
INSERT_X1 = 566
START_Y = 812

TITLE = "全栈求职作品集网站 | 在线：https://s1lence-a.github.io/portfolio/"
META = "2025.12 - 2026.05 | 个人"
BULLETS = [
    "• 纯 HTML/CSS/JS 静态站点，config.js 一处配置全站内容，零构建依赖；部署于 GitHub Pages 公网可访问。",
    "• 设计实现纸飞机自定义光标、欢迎启动页、作品灯箱多图轮播、技能筛选、复制邮箱与 PDF 简历下载等交互。",
    "• 工程模块化拆分 main / works / ui / splash；成果：已上线作品集站点，便于面试官一站式浏览项目与联系方式。",
]

INTERN_HEADER_RECT = fitz.Rect(48, 822, 200, 848)


def ensure_font(page: fitz.Page) -> None:
    page.insert_font(fontname=FONT_NAME, fontfile=str(FONT))


def write_line(page: fitz.Page, y: float, text: str, size: float = 10.5) -> float:
    page.insert_text(
        (INSERT_X0, y),
        text,
        fontname=FONT_NAME,
        fontsize=size,
        color=(0, 0, 0),
    )
    return y + (20 if size >= 11 else 19)


def insert_portfolio(page: fitz.Page) -> None:
    ensure_font(page)
    y = START_Y + 12
    y = write_line(page, y, TITLE, 11.2)
    y = write_line(page, y, META, 11.2)
    for bullet in BULLETS:
        page.insert_textbox(
            fitz.Rect(INSERT_X0, y, INSERT_X1, y + 22),
            bullet,
            fontname=FONT_NAME,
            fontsize=10.5,
            color=(0, 0, 0),
        )
        y += 20


def update_pdf(target: Path) -> None:
    doc = fitz.open(target)
    page = doc[0]
    page.add_redact_annot(INTERN_HEADER_RECT, fill=(1, 1, 1))
    page.apply_redactions()
    insert_portfolio(page)
    tmp = target.with_suffix(".tmp.pdf")
    doc.save(tmp, garbage=4, deflate=True)
    doc.close()
    tmp.replace(target)


def main() -> None:
    if not DESKTOP_PDF.exists():
        raise FileNotFoundError(DESKTOP_PDF)
    if not FONT.exists():
        raise FileNotFoundError(FONT)
    if not BACKUP.exists():
        shutil.copy2(DESKTOP_PDF, BACKUP)
    update_pdf(DESKTOP_PDF)
    shutil.copy2(DESKTOP_PDF, SITE_PDF)
    print("Updated:", DESKTOP_PDF)
    print("Synced:", SITE_PDF)


if __name__ == "__main__":
    main()
