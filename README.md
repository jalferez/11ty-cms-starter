# 11ty CMS Starter

A lightweight and flexible Eleventy (11ty) starter template built for CMS integration.  
This project is designed for developers who want a clean and scalable base to create static sites with optional CMS functionality and modular per page styling and scripting.

It includes:

Snipcart integration, a ready to go out of the box.
Simply uncomment the Snipcart script" line in base.njk and insert your own public API key to enable full shopping cart functionality.
(The integration remains commented by default for security and customization purposes.)

CMS functionality (Netlify CMS) — already configured and live.
You can use it as-is, or easily remove the CMS by deleting the admin/ folder and related passthrough reference in .eleventy.js.

---

## Features

- Organized folder structure for content, assets, and layouts  
- Global and per page CSS and JS file support  
- Includes reusable partials for navbar and footer  
- CMS-ready structure for integration with Netlify CMS or similar platforms  
- Fully responsive navigation with mobile burger menu  
- Clean separation between global and page-specific logic  

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/11ty-cms-starter.git
cd 11ty-cms-starter
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Eleventy Locally
```bash
npm run start
```

The site will be served at `http://localhost:8080`.

### 4. Build for Production
```bash
npm run build
```

---

## Folder Structure

```
11ty-cms-starter/
│
├── _includes/
│   ├── layouts/
│   │   └── base.njk        → Main site layout
│   └── partials/
│       ├── navbar.njk      → Global navbar
│       └── footer.njk      → Global footer
│
├── _site/                  → This is auto gen by 11ty, do not touch unless you know what youre doing
│
├── assets/
│   ├── css/
│   │   ├── global/         → Shared global styles (navbar, layout, footer)
│   │   └── pages/          → Page-specific CSS (e.g., home.css, about.css)
│   └── js/
│       ├── global/         → Shared JS (main.js for navbar, etc.)
│       └── pages/          → Page-specific JS
│
├── content/
│   ├── cms_content/        → Folders for CMS collections (e.g., bread, posts)
│   └── pages/              → All site pages (index.njk, contact.njk, etc.)
│
├── images/
│   └── uploads/            → Uploaded images (from CMS or manual)
│
├── admin/                  → CMS configuration and access (Netlify CMS)
│   ├── config.yml
│   └── index.html
│
├── .eleventy.js            → Eleventy configuration
├── package.json
└── README.md
```

---

## Eleventy Configuration Overview

`.eleventy.js` defines filters, passthrough copies, and collections.

- **Filters**: Includes a `year` filter for auto-updating the year in the footer.
- **Passthrough Copy**:  
  Copies `assets`, `images`, and `admin` folders directly to `_site`.
- **Watch Targets**:  
  Monitors `assets/css/` and can be extended to watch JS as well.
- **Collections**:  
  Includes a `bread` collection as an example for CMS content.

---

## Per-Page CSS and JS

Each page can load its own CSS and JS by adding the following keys in its front matter:

```yaml
---
layout: layouts/base.njk
title: "Home"
css: "home.css"
js: "home.js"
permalink: "index.html"
---
```

The layout automatically includes:

```html
<!-- Global styles -->
<link rel="stylesheet" href="/assets/css/global/navbar.css">
<link rel="stylesheet" href="/assets/css/global/layout.css">
<link rel="stylesheet" href="/assets/css/global/footer.css">

<!-- Page-specific styles -->
{% if css %}
  <link rel="stylesheet" href="/assets/css/pages/{{ css }}">
{% endif %}

<!-- Global and page JS -->
<script src="/assets/js/global/main.js" defer></script>
{% if js %}
  <script src="/assets/js/pages/{{ js }}" defer></script>
{% endif %}
```

This system ensures:
- Global files are always loaded
- Page-specific files are added only when declared

---

## Adding CMS Functionality

### Step 1. Connect to GitHub
Push this repository to GitHub and set it to **public or private**.

### Step 2. Deploy on Netlify
1. Log into [Netlify](https://www.netlify.com/).
2. Click **Add new site → Import an existing project**.
3. Choose your GitHub repo.
4. Set:
   - **Build command:** `npx @11ty/eleventy`
   - **Publish directory:** `_site`
5. Deploy the site.

### Step 3. Enable Netlify Identity
- Go to your site’s **Identity** tab and click **Enable Identity**.
- Enable **Git Gateway** under the “Services” section.
- Add your email as an approved user.

### Step 4. Access the CMS
Visit:
```
https://your-site.netlify.app/admin/
```
You’ll see a login screen for Netlify CMS.

---

## Example CMS Collection (Bread)

In `admin/config.yml`:

```yaml
collections:
  - name: "bread"
    label: "Bread"
    folder: "content/cms_content/bread"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Price", name: "price", widget: "string" }
      - { label: "Image", name: "image", widget: "image" }
      - { label: "Body", name: "body", widget: "markdown" }
```

Each entry created through the CMS will appear inside `content/cms_content/bread/`.

---

## Customizing the Template

- **Navbar and Footer** are in `_includes/partials/`
- **Global Styles** are inside `assets/css/global/`
- **Responsive Navigation** uses the burger toggle logic in `assets/js/global/main.js`
- **Collections** can be added via `.eleventy.js`  
  Example:
  ```js
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("content/cms_content/posts/*.md");
  });
  ```

---

## License

This project is open-source and available under the [MIT License](LICENSE).
