# Ashika S. - Personal Portfolio Website

A clean, responsive, and accessible personal portfolio website built with HTML5, CSS3, and JavaScript for **Ashika S.**, an aspiring AI & Cybersecurity Developer and first-year B.Tech AI & ML student at Panimalar Engineering College.

---

## 🚀 Features

- **Accurate & Honest Representation:** Designed specifically for an undergraduate student highlighting genuine coursework, practical simulations, and learning areas without exaggerated claims or fake statistics.
- **Fully Responsive:** Adapts cleanly across mobile phones, tablets, and wide desktop displays.
- **Accessible & SEO-Friendly:** Semantic HTML5 structure, high contrast color ratios (WCAG compliant), screen-reader labels (`aria-*`), keyboard focus management, and skip-to-content links.
- **Dark & Light Mode:** Seamless theme switcher with automatic detection of user system preferences and persistent local storage.
- **Interactive Micro-actions:** Sticky navigation bar, active section tracking on scroll, mobile drawer menu, and one-click email copy button with visual feedback.
- **Customizable Placeholders:** Clear `<!-- EDIT HERE -->` comments and visible tags for certificate completion dates, verification links, contact email, and upcoming projects.

---

## 📁 File Structure

```text
portfolio/
├── index.html        # Main HTML structure with semantic sections and metadata
├── style.css         # Styling, CSS variables, dark/light theme, and media queries
├── script.js         # Theme switching, mobile drawer navigation, active link tracking
└── README.md         # Documentation and guide for updates and free deployment
```

---

## 🛠️ How to Customize Your Portfolio

### 1. Contact Information
Your email is set to:
```html
<a href="mailto:ashika0929@gmail.com" class="contact-value" id="email-link">
  ashika0929@gmail.com
</a>
```

### 2. Update Social & Professional Links
In `index.html`, locate the `<div class="social-grid">` section:
- **LinkedIn:** Change `href="#"` to `href="https://linkedin.com/in/your-username"` and update the handle text.
- **GitHub:** Change `href="#"` to `href="https://github.com/your-username"` and update the handle text.
- **Resume:** Add a link to your Google Drive resume PDF or upload `resume.pdf` to this folder and use `href="resume.pdf"`.

### 3. Add Certificate Dates and Verification Links
In `index.html` under `<section id="certificates">`:
- Replace `[Completion Date]` with your completion date (for example: `October 2024`).
- Replace `href="#"` with your actual Coursera, Forage, or UNICEF verification link:
  ```html
  <a href="https://coursera.org/verify/YOUR_ID" class="cert-link" target="_blank" rel="noopener noreferrer">
    View / Verify Certificate
  </a>
  ```
- For the **Object-Oriented Programming in C++** card: Update the issuer name and title to match your specific certificate.

### 4. Adding Your Photo (Optional)
If you would like to display your real photo instead of initials in the Hero section:
1. Place your photo (e.g. `ashika.jpg`) inside this project folder.
2. In `index.html`, find `<div class="avatar-frame">` and replace `<div class="avatar-initials">` with:
   ```html
   <img src="ashika.jpg" alt="Photo of Ashika S." class="avatar-img">
   ```

### 5. Adding New Projects
When you complete a project, locate `<section id="projects">` in `index.html`:
- Replace the placeholder card title, description, and technology tags.
- Update the project status to `"Status: Completed"` or `"Status: Live Demo Available"`.
- Replace `[GitHub Link Placeholder]` with a link to your repository:
  ```html
  <a href="https://github.com/your-username/your-repo" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
    View on GitHub ↗
  </a>
  ```

---

## 🌐 How to Preview Locally

You can open `index.html` directly in any web browser:
1. Double-click `index.html` in your file explorer.
2. Or use Python's built-in local server (optional):
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser.

---

## 🚀 How to Host Online for Free

### Option A: GitHub Pages (Recommended for Students)
1. Create a free account at [github.com](https://github.com).
2. Create a new repository named `portfolio` (or `<your-username>.github.io`).
3. Upload `index.html`, `style.css`, and `script.js` to the repository.
4. Go to **Settings > Pages**.
5. Under **Branch**, select `main` (or `master`) and folder `/ (root)`, then click **Save**.
6. Your portfolio will be live at `https://<your-username>.github.io/portfolio/`!

### Option B: Netlify or Vercel
1. Drag and drop the `portfolio` folder directly into [Netlify Drop](https://app.netlify.com/drop).
2. Your site will instantly go live with a free custom SSL certificate and URL.
