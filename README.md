# Chabhouy — Local Cambodian Convenience Store

A feature-based static web application for **Chabhouy** — a local Cambodian store selling kitchen necessities, fresh ingredients, noodles, and local snacks.

## Project Structure

- **`index.html`**: The home page of the website.
- **`shared/`**:
  - `global.css`: Global styling rules and typography reset.
  - `variables.css`: Custom CSS properties for colors, fonts, and spacing.
  - `responsive.css`: Global screen breakpoint media queries.
  - `main.js`: Main JavaScript logic that loads Navbar & Footer components and initializes scrolling features.
  - `utils.js`: Helper functions for currency formatting and debouncing.
- **`components/`**: Reusable page components like `navbar`, `footer`, `cart`, `cta`, `profile`, and `subscribe-modal`.
- **`features/`**: Feature-specific pages and assets (`product`, `home`, `our-story`, `package`, `profile`).
- **`script.py`**: Python setup script to generate the folder and file template.

## Getting Started

Open `index.html` in your browser or serve the root folder with a local server (such as VS Code Live Server) to browse the website.
