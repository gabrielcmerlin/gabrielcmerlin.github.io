#!/usr/bin/env python3
"""Generate the 1200x630 share image (images/og-image.png).

Uses the site colors, the profile photo, name, role, topics and the menu pills.
Usage:  python3 scripts/make-og-image.py [output.png]
Needs Pillow (pip install pillow) and Arial; set FONT_DIR to use another folder
that has Arial.ttf and "Arial Bold.ttf".
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(REPO, "images", "og-image.png")
S = 2  # supersampling
W, H = 1200 * S, 630 * S
BG, TEXT, MUTED, LINK, BORDER = "#f3f4f5", "#313438", "#5f6368", "#2f5d8a", "#dadde0"
F = os.environ.get("FONT_DIR", "/System/Library/Fonts/Supplemental") + "/"


def font(sz, bold=False):
    return ImageFont.truetype(F + ("Arial Bold.ttf" if bold else "Arial.ttf"), sz * S)


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# photo, circular
D = 300 * S
x0, y0 = 90 * S, (630 * S - D) // 2 - 10 * S
ph = Image.open(REPO + "/images/profile.jpg").convert("RGB").resize((D, D), Image.LANCZOS)
mask = Image.new("L", (D, D), 0)
ImageDraw.Draw(mask).ellipse((0, 0, D - 1, D - 1), fill=255)
d.ellipse((x0 - 4 * S, y0 - 4 * S, x0 + D + 4 * S, y0 + D + 4 * S), outline=BORDER, width=3 * S)
img.paste(ph, (x0, y0), mask)

# text block
tx = x0 + D + 70 * S
d.text((tx, 150 * S), "Gabriel da Costa Merlin", font=font(54, True), fill=TEXT)
d.text((tx, 232 * S), "Undergrad Researcher at LABIC-USP", font=font(30), fill=LINK)
d.text((tx, 290 * S), "Universidade de São Paulo (USP)", font=font(26), fill=MUTED)
d.text((tx, 336 * S), "Time Series · Foundation Models · Deep Learning", font=font(26), fill=MUTED)

# boxed pills
px, py = tx, 410 * S
for label in ["Publications", "Projects", "Events", "CV"]:
    f = font(24)
    w = d.textlength(label, font=f)
    box = (px, py, px + w + 36 * S, py + 50 * S)
    d.rounded_rectangle(box, radius=8 * S, outline=LINK, width=2 * S)
    d.text((px + 18 * S, py + 11 * S), label, font=f, fill=LINK)
    px = box[2] + 16 * S

# domain
d.text((tx, 520 * S), "gabrielcmerlin.github.io", font=font(24), fill=MUTED)

img = img.resize((1200, 630), Image.LANCZOS)
img.save(OUT)
print("ok", img.size)
