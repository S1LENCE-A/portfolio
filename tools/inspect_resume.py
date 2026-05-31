# -*- coding: utf-8 -*-
import fitz
import json

path = r"c:\Users\18440\Desktop\个人简历.pdf"
doc = fitz.open(path)
for i, page in enumerate(doc):
    print(f"=== Page {i + 1} ===")
    for block in page.get_text("dict")["blocks"]:
        if block.get("type") != 0:
            continue
        for line in block.get("lines", []):
            text = "".join(s.get("text", "") for s in line.get("spans", []))
            if not text.strip():
                continue
            span = line["spans"][0]
            print(
                f"y={span['bbox'][1]:6.1f} size={span['size']:4.1f} | {text[:80]}"
            )
doc.close()
