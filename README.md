# Xie Xiangyu Portfolio

A personal portfolio website showcasing the academic achievements, research experience, and technical skills of Xie Xiangyu (谢翔宇), a Chemical Physics student at the University of Science and Technology of China (USTC).

## Overview

This portfolio features:
- **Education**: B.S. in Chemical Physics, USTC (Class of 2026)
- **Research Interests**: AI for Science, Graph Neural Networks, Computational Chemistry
- **Teaching Experience**: TA for Complex Analysis, Mathematical Physics Equations, Quantum Physics

## Live Website

Visit the portfolio at: [https://techandscixie2005.github.io/portfolio](https://techandscixie2005.github.io/portfolio)

## Project Structure

```
├── index.html          # Main portfolio page
├── styles.css          # Custom CSS styling
├── script.js           # JavaScript for interactivity
├── details/            # Detailed project pages
│   ├── research-egnn.html
│   ├── research-doublet-emissive.html
│   ├── research-chem-experiment.html
│   ├── teaching-complex-analysis.html
│   ├── teaching-math-physics.html
│   ├── teaching-quantum.html
│   └── award-scholarship.html
├── docs/plans/         # Design and implementation documentation
├── Xie_Xiangyu_Resume.pdf  # PDF resume version
└── README.md           # This file
```

## Features

### Sections
- **Hero**: Introduction with name, title, and research interests
- **Education**: USTC background, GPA trajectory, advisor info, key coursework
- **Research Experience**: 
  - EGNN for Room-Temperature Phosphorescence prediction
  - Doublet-Emissive light-emitting materials
  - Multiscale Molecular Simulation for chemistry education
- **Awards & Honors**: Scholarships and competition achievements
- **Teaching Assistant**: Course assistance experience
- **Technical Skills**: ML, Programming, Computational Chemistry, Mathematical tools
- **Contact**: Email, phone, and university information

### Technical Implementation
- **Responsive Design**: Mobile-first approach with breakpoints at 480px, 768px, and 900px
- **Dark Theme**: Modern dark color scheme with blue/purple accent gradients
- **Animations**: 
  - Fade-in animations on scroll
  - Parallax hero background
  - GPA trajectory bar animations
  - Smooth scrolling navigation
- **Icons**: Lucide icons via CDN
- **Fonts**: Inter font family from Google Fonts

## Usage

### Viewing Locally

Simply open `index.html` in any modern web browser:

```bash
# Option 1: Open directly
open index.html

# Option 2: Use a simple HTTP server
python -m http.server 8000
# Then visit http://localhost:8000
```

### Customization

To customize the portfolio:

1. **Edit `index.html`**: Update personal information, sections, and content
2. **Modify `styles.css`**: Adjust colors, spacing, and visual elements
3. **Update `script.js`**: Add or modify interactive features
4. **Add detail pages**: Create additional pages in the `details/` folder

### Deployment

Deploy to GitHub Pages:

1. Push the repository to GitHub
2. Go to Repository Settings → Pages
3. Select the `main` branch as the source
4. Your site will be available at `https://yourusername.github.io/portfolio`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- HTML5
- CSS3 (CSS Variables, Grid, Flexbox, Animations)
- JavaScript (ES6+)
- [Lucide Icons](https://lucide.dev/)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)

## License

Copyright © 2026 Xie Xiangyu. All rights reserved.

## Contact

- Email: xxy220348@mail.ustc.edu.cn
- Phone: +86 18390703209
- University: University of Science and Technology of China, Department of Chemical Physics
