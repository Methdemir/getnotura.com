"""Build the web assets for /mergekin/ from the game repo (read-only source).

Provenance of every raster in public/mergekin/. Run from anywhere with Pillow
(AVIF/WebP) and numpy; fonts were subset separately with fontTools from
runelegion/assets/fonts (Cinzel-Bold, Barlow-Regular/SemiBold, SIL OFL 1.1).
icon-512.png is built but not shipped.
"""
import json
import shutil
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

GAME = Path(r"D:/Projects/Mobile-Portfolio/apps/runelegion")
SHOTS = Path(r"D:/Projects/Mobile-Portfolio/apps/m21-gold-bounty")
OUT = Path(r"D:/Projects/getnotura.com/public/mergekin")
OUT.mkdir(parents=True, exist_ok=True)
manifest = {}


def clean_alpha(im: Image.Image) -> Image.Image:
    """Background-removal left faint speckle (alpha 1-4); drop it to fully clear."""
    if im.mode != "RGBA":
        return im
    a = np.array(im)
    a[a[..., 3] <= 4] = 0
    return Image.fromarray(a, "RGBA")


def trim(im: Image.Image, pad: int = 0) -> Image.Image:
    box = im.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    x0, y0, x1, y1 = box
    return im.crop((max(0, x0 - pad), max(0, y0 - pad), min(im.width, x1 + pad), min(im.height, y1 + pad)))


def fit_w(im, w):
    return im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)


def save(im, name, fmts, q=82):
    for fmt in fmts:
        path = OUT / f"{name}.{fmt}"
        if fmt == "webp":
            im.save(path, "WEBP", quality=q, method=6)
        elif fmt == "avif":
            im.save(path, "AVIF", quality=q - 22 if q > 40 else q, speed=4)
        elif fmt == "jpg":
            im.convert("RGB").save(path, "JPEG", quality=q, optimize=True, progressive=True)
        elif fmt == "png":
            if im.mode == "RGBA":
                im.quantize(256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.FLOYDSTEINBERG).save(path, optimize=True)
            else:
                im.save(path, optimize=True)
        manifest[f"{name}.{fmt}"] = {"w": im.width, "h": im.height, "kb": round(path.stat().st_size / 1024, 1)}


def rgba(path):
    return clean_alpha(Image.open(path).convert("RGBA"))


# Logo (v5, same identity as assets/ui/forge/logo.png at full resolution).
logo = trim(rgba(GAME / "art_source/brand/logo_fusion_v5.png"), 4)
for w in (640, 1200):
    save(fit_w(logo, w), f"logo-{w}", ["avif", "webp"], 86)
save(fit_w(logo, 960), "logo-960", ["png"])

# App icon (launcher design, art_source/brand/icon_v5.png).
icon = Image.open(GAME / "art_source/brand/icon_v5.png").convert("RGB")
for s in (64, 192, 512):
    save(icon.resize((s, s), Image.LANCZOS), f"icon-{s}", ["png"])
save(icon.resize((192, 192), Image.LANCZOS), "icon-192", ["webp"], 86)

# Full-body roster, tier III.
roster = trim(rgba(GAME / "art_source/heroes/roster_t3.png"), 6)
for w in (800, 1600):
    save(fit_w(roster, w), f"roster-t3-{w}", ["avif", "webp"], 84)
save(fit_w(roster, 1200), "roster-t3-1200", ["png"])

# Busts.
heroes = {"aren": "aren", "lumi": "lumi", "vela": "vela", "ket": "ket", "neris": "neris", "sarper": "artillery"}
for hid, src in heroes.items():
    im = rgba(GAME / f"art_source/busts/bust_{src}_t3.png")
    im = fit_w(im, 360)
    save(im, f"bust-{hid}-t3", ["avif", "webp", "png"], 84)
for tier in ("t1", "t2"):
    im = fit_w(rgba(GAME / f"art_source/busts/bust_aren_{tier}.png"), 360)
    save(im, f"bust-aren-{tier}", ["avif", "webp", "png"], 84)

# Rune sigils and region crests.
for rid, src in {"ember": "kor", "frost": "kirag", "storm": "yild"}.items():
    im = trim(rgba(GAME / f"art_source/ui/sigil_{src}.png"), 2)
    save(im.resize((176, round(im.height * 176 / im.width)), Image.LANCZOS), f"sigil-{rid}", ["webp", "png"], 86)
for region in ("gate", "marsh", "forge", "spire"):
    im = trim(rgba(GAME / f"art_source/ui/crest_{region}.png"), 2)
    save(fit_w(im, 128), f"crest-{region}", ["webp", "png"], 86)
coin = trim(rgba(GAME / "art_source/ui/coin.png"), 2)
save(fit_w(coin, 96), "coin", ["webp", "png"], 86)

# Region world art (2:3 portrait).
for region in ("gate", "marsh", "forge", "spire"):
    im = Image.open(GAME / f"art_source/world/{region}.png").convert("RGB")
    save(im.resize((600, 900), Image.LANCZOS), f"region-{region}", ["avif", "webp", "jpg"], 80)

# Hero backdrop: Ash Forge, landscape crop, kept dark by CSS.
forge = Image.open(GAME / "art_source/world/forge.png").convert("RGB")
band = forge.crop((0, 120, 1024, 760))
save(band.resize((1600, 1000), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1.2)), "backdrop-forge", ["avif", "webp", "jpg"], 70)


# Device screenshots (Samsung M21, 1080x2340): crop status bar and navigation bar.
def shot(path):
    im = Image.open(path).convert("RGB")
    assert im.size == (1080, 2340), im.size
    return im.crop((0, 84, 1080, 2212))


shots = {
    "pale-lantern": SHOTS / "perfect-solgunFener-battle.png",
    "stream-mouth": SHOTS / "perfect-dereAgzi-battle.png",
    "dead-lake": SHOTS / "perfect-oluGol-battle.png",
    "cinder-stair": SHOTS / "perfect-curufMerdiveni-battle.png",
    "twin-terraces": SHOTS / "perfect-ikizTeras-battle.png",
}
for sid, path in shots.items():
    im = shot(path)
    for w in (360, 720):
        save(fit_w(im, w), f"shot-{sid}-{w}", ["avif", "webp"], 80)
    save(fit_w(im, 540), f"shot-{sid}-540", ["jpg"], 80)

# Open Graph card 1200x630: forge backdrop, roster, logo.
og = forge.crop((0, 200, 1024, 738)).resize((1200, 630), Image.LANCZOS).filter(ImageFilter.GaussianBlur(3)).convert("RGBA")
shade = Image.new("RGBA", og.size, (14, 9, 7, 170))
og.alpha_composite(shade)
glow = Image.new("RGBA", og.size, (0, 0, 0, 0))
ImageDraw.Draw(glow).ellipse((250, 380, 950, 760), fill=(255, 120, 40, 70))
og.alpha_composite(glow.filter(ImageFilter.GaussianBlur(60)))
r = fit_w(roster, 1080)
og.alpha_composite(r, ((1200 - r.width) // 2, 630 - r.height + 10))
lg = fit_w(logo, 620)
og.alpha_composite(lg, ((1200 - lg.width) // 2, 18))
og.convert("RGB").save(OUT / "og.jpg", "JPEG", quality=84, optimize=True, progressive=True)
manifest["og.jpg"] = {"w": 1200, "h": 630, "kb": round((OUT / "og.jpg").stat().st_size / 1024, 1)}

# Manifest of every file written (size, dimensions) for review.
(Path(__file__).parent / "asset_manifest.json").write_text(json.dumps(manifest, indent=1))
total = sum(v["kb"] for v in manifest.values())
print(json.dumps(manifest, indent=0)[:3000])
print("files", len(manifest), "total KB", round(total))
