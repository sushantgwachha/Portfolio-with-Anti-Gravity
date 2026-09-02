# 🚀 Sushant Gwachha - Data Science & ML Portfolio Website

A personal portfolio website created for **Sushant Gwachha** (Aspiring Data Scientist & Machine Learning Developer).

Built with modern **HTML5**, **CSS3**, and **Vanilla JavaScript** (zero external build tools or `npm` dependencies required).

---

## 🌟 Key Highlights & Features

- **Data Science Aesthetic**: Sleek, high-tech interface featuring dark/light mode toggle, glowing gradient accents, and terminal code mockups.
- **Interactive Neural Particle Background**: An interactive HTML5 canvas simulating connected neural networks and data nodes that dynamically respond to cursor interaction.
- **Dynamic Typing Effect**: Seamlessly cycles through Sushant's core areas of focus (Machine Learning, Data Pipelines, NLP, Tableau).
- **Categorized Skills Matrix**: Clear breakdown of ML algorithms, data preprocessing/EDA, NLP, web scraping, Python tools, and BI dashboards.
- **Interactive Project Showcase**:
  - Filterable by tags (*All*, *Machine Learning & NLP*, *Exploratory Data Analysis*, *Tableau & BI*).
  - Status badges (*Ongoing* with pulsing indicator vs. *Completed*).
  - "Project Details" modal with architecture, algorithms, and methodologies.
- **Milestone Timeline**: Chronological journey showcasing BCA studies at Kathmandu College of Technology and hands-on training at TechAxis.
- **ATS-Friendly Printable Resume**:
  - In-browser clean ATS resume sheet.
  - One-click **"Print / Save PDF"** button with dedicated `@media print` CSS for job applications.
- **Interactive Contact Section**: Direct contact items (Email, Phone, LinkedIn, Location) and a quick mailto-backed contact form.
- **Fully Responsive**: Optimized for phones, tablets, laptops, and ultra-wide displays.

---

## 📁 File Structure

```text
sushant-portfolio/
├── index.html        # Main semantic HTML5 webpage & ATS resume modal
├── style.css         # Modern CSS styles, custom properties, animations & print layout
├── script.js         # Interactive canvas, typing effect, filter & modal controllers
└── README.md         # Documentation & deployment instructions
```

---

## 🖥️ How to Run Locally

### Option 1: Direct Browser Launch
Simply double-click `index.html` in your file explorer, or right-click and choose **Open with > Chrome / Edge / Firefox**.

### Option 2: Using VS Code Live Server
1. Open the `sushant-portfolio` folder in **Visual Studio Code**.
2. If installed, click **"Go Live"** in the bottom status bar (or right-click `index.html` -> **"Open with Live Server"**).
3. The site will open at `http://localhost:5500`.

### Option 3: Python Simple Server
In your terminal, navigate to the folder and run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## ✏️ Customization Guide

### 1. Update Contact Details or Country Code
If you want to update your phone number from `+997-9842429269` to Nepal's standard code (`+977-9842429269`):
- Open `index.html` and search for `+9979842429269`.
- Replace with your desired number in the contact links and the resume modal section.

### 2. Add Live Project / GitHub Repository Links
- In `index.html`, inside the `<div class="project-actions">` block of each project card, you can add direct GitHub links:
  ```html
  <a href="https://github.com/your-username/your-repo" target="_blank" class="btn btn-outline btn-sm">
    <i class="fa-brands fa-github"></i> Code
  </a>
  ```

### 3. Add Custom Resume PDF
If you have a pre-compiled PDF resume (e.g. `sushant-gwachha-resume.pdf`), place it in this folder and point the download link directly to it.

---

## 🌐 How to Deploy for Free

### 1. GitHub Pages (Recommended)
1. Initialize a git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Go to your repository settings on GitHub -> **Pages**.
3. Under **Branch**, select `main` and root `/`, then click **Save**.
4. Your website will be live at `https://<your-username>.github.io/<your-repo-name>/` in minutes!

### 2. Vercel
1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **"Add New Project"** and import your GitHub repository.
3. Leave default settings and click **Deploy**.

### 3. Netlify
1. Drag and drop the `sushant-portfolio` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
2. Your site is deployed instantly with a custom URL.
