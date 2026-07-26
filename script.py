#!/usr/bin/env python3
"""
Generates the folder/file structure for Chabhouy — a feature-based
static website front end for a Cambodian local convenience store.

Structure rules for this project:
  - index.html lives at the PROJECT ROOT and is the Home page.
  - Every other page (category, package, our-story, profile) lives
    INSIDE its own feature folder as <page>.html — there are no
    other top-level .html files.
  - Every HTML page (root or nested) includes the same baseline
    plugins: Bootstrap 5 (CSS + JS bundle) and Bootstrap Icons,
    plus the shared design-token/global/responsive CSS and the
    shared main/utils JS.

Run this script from your project root directory.
"""

import os

# Feature folders — each becomes features/<name>/ with <name>.js + <name>.css.
# "home" also gets a feature folder (features/home/home.js, home.css) even
# though its HTML lives at the project root as index.html.
FEATURES = ["home", "category", "package", "our-story", "profile"]

# Which features have their own HTML page inside the feature folder.
# "home" is excluded here because its page is index.html at the root.
NESTED_HTML_PAGES = ["category", "package", "our-story", "profile"]

# Component folders (each gets its own .js and .css named after the folder)
COMPONENTS = ["navbar", "footer", "subscribe-modal", "cta", "cart", "profile"]

# Page-based subfolders, reused under both images/ and fonts/
PAGE_SUBFOLDERS = ["home", "category", "package", "our-story", "profile", "shared"]

# Top-level asset folders (images and fonts get page subfolders, others don't)
ASSET_FOLDERS = ["icons", "logo", "videos"]

# Shared files (filename: content)
SHARED_FILES = {
    "global.css": "/* Global styles */\n",
    "variables.css": ":root {\n  /* CSS variables */\n}\n",
    "responsive.css": "/* Responsive breakpoints */\n",
    "main.js": "// Main entry JS\n",
    "utils.js": "// Shared utility functions\n",
}

# Services
SERVICES_FILES = {
    "chabhouy-api.js": "// Chabhouy API service wrapper\n",
}

# CDN plugins included on every page
BOOTSTRAP_CSS = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
BOOTSTRAP_JS = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
BOOTSTRAP_ICONS_CSS = "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"


def write_file(path, content=""):
    """Create a file with optional starter content, skipping if it already exists."""
    if os.path.exists(path):
        print(f"  SKIP (exists): {path}")
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  CREATED: {path}")


def make_dir(path):
    os.makedirs(path, exist_ok=True)
    print(f"  DIR: {path}")


def html_boilerplate(page, at_root):
    """
    Build the HTML boilerplate for a page.

    at_root=True  -> file sits at the project root (index.html / home).
    at_root=False -> file sits at features/<page>/<page>.html, so shared
                      assets need to be reached with a "../../" prefix,
                      while the page's own js/css sit right next to it.
    """
    title = "Chabhouy" if page == "home" else page.replace("-", " ").title()
    shared_prefix = "" if at_root else "../../"
    feature_css = f"features/{page}/{page}.css" if at_root else f"{page}.css"
    feature_js = f"features/{page}/{page}.js" if at_root else f"{page}.js"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} | Chabhouy</title>

  <!-- Bootstrap 5 CSS -->
  <link href="{BOOTSTRAP_CSS}" rel="stylesheet">
  <!-- Bootstrap Icons -->
  <link href="{BOOTSTRAP_ICONS_CSS}" rel="stylesheet">

  <!-- Custom styles (loaded after Bootstrap so they can override it) -->
  <link rel="stylesheet" href="{shared_prefix}shared/variables.css">
  <link rel="stylesheet" href="{shared_prefix}shared/global.css">
  <link rel="stylesheet" href="{shared_prefix}shared/responsive.css">
  <link rel="stylesheet" href="{feature_css}">
</head>
<body>
  <!-- {title} page content -->

  <!-- Bootstrap 5 JS Bundle (includes Popper) -->
  <script src="{BOOTSTRAP_JS}"></script>

  <script src="{shared_prefix}shared/main.js"></script>
  <script src="{shared_prefix}shared/utils.js"></script>
  <script src="{feature_js}"></script>
</body>
</html>
"""


def main():
    # 1. features/<name>/<name>.js + <name>.css (+ nested <name>.html where applicable)
    print("\n[features/]")
    features_dir = "features"
    make_dir(features_dir)
    for feature in FEATURES:
        feature_dir = os.path.join(features_dir, feature)
        make_dir(feature_dir)
        write_file(
            os.path.join(feature_dir, f"{feature}.js"), f"// {feature} feature logic\n"
        )
        write_file(
            os.path.join(feature_dir, f"{feature}.css"),
            f"/* {feature} feature styles */\n",
        )
        if feature in NESTED_HTML_PAGES:
            write_file(
                os.path.join(feature_dir, f"{feature}.html"),
                html_boilerplate(feature, at_root=False),
            )

    # 2. index.html at project root (Home page)
    print("\n[root]")
    write_file("index.html", html_boilerplate("home", at_root=True))

    # 3. components/<name>/<name>.js + <name>.css
    print("\n[components/]")
    components_dir = "components"
    make_dir(components_dir)
    for component in COMPONENTS:
        component_dir = os.path.join(components_dir, component)
        make_dir(component_dir)
        write_file(
            os.path.join(component_dir, f"{component}.js"),
            f"// {component} component logic\n",
        )
        write_file(
            os.path.join(component_dir, f"{component}.css"),
            f"/* {component} component styles */\n",
        )

    # 4. assets/
    print("\n[assets/]")
    assets_dir = "assets"
    make_dir(assets_dir)

    # 4a. images/<page>/ and fonts/<page>/ (includes a "shared" subfolder for both)
    for parent in ["images", "fonts"]:
        parent_dir = os.path.join(assets_dir, parent)
        make_dir(parent_dir)
        for page in PAGE_SUBFOLDERS:
            make_dir(os.path.join(parent_dir, page))

    # 4b. other flat asset folders (icons, logo, videos)
    for asset_folder in ASSET_FOLDERS:
        make_dir(os.path.join(assets_dir, asset_folder))

    # 5. services/
    print("\n[services/]")
    services_dir = "services"
    make_dir(services_dir)
    for filename, content in SERVICES_FILES.items():
        write_file(os.path.join(services_dir, filename), content)

    # 6. shared/
    print("\n[shared/]")
    shared_dir = "shared"
    make_dir(shared_dir)
    for filename, content in SHARED_FILES.items():
        write_file(os.path.join(shared_dir, filename), content)

    # 7. README.md
    print("\n[README]")
    write_file(
        "README.md",
        "# Chabhouy\n\n"
        "Feature-based static website front end for Chabhouy — "
        "a local Cambodian convenience store selling everyday kitchen "
        "and household necessities, ingredients, and local snacks.\n\n"
        "## Pages\n"
        "- Home (`index.html`, root)\n"
        "- Category (`features/category/category.html`)\n"
        "- Package (`features/package/package.html`)\n"
        "- Our Story (`features/our-story/our-story.html`)\n"
        "- Profile (`features/profile/profile.html`)\n\n"
        "## Components\n"
        "navbar, footer, subscribe-modal, cta, cart, profile\n",
    )

    print("\nDone! Structure created in current directory.")


if __name__ == "__main__":
    main()