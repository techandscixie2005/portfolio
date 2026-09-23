# Xiangyu Xie — Research Portfolio

Personal research website of **Xiangyu Xie (谢翔宇)**, **Ph.D. Student at the University of Science and Technology of China (USTC)**, advised by **Prof. Jun Jiang**, **Sep 2026 – Present**.

Research: AI for Science, molecular machine learning, geometric deep learning, computational chemistry, and evidence-grounded scientific agents.

[Public website](https://techandscixie2005.github.io/portfolio/) · [English CV](Xie_Xiangyu_Resume.pdf)

The portfolio is intended for researchers, prospective collaborators, mentors, and research hiring teams. It puts identity, individual contributions, and supporting evidence before a full chronology.

## Selected work

| Work | Nature | Evidence and scope |
| --- | --- | --- |
| QuantumAgent | Independent Developer / Solo Entrant, 2026; completed competition prototype | Public source, historical barrier demonstration, acceptance records, and Second Prize in the Graduate Division, Agent Track of the USTC “107 Cup” competition |
| EGNN for RTP Property Prediction | Undergraduate Thesis, Fall 2025 – Spring 2026 | Reported property-specific R² on 150 test molecules; ~6,000 total with a 4,800/1,050/150 split |
| Multiscale Molecular Simulation | Undergraduate Competition, Fall 2024 – Spring 2025 | MD/DFT methodology and First Prize, Central China Division (2025) |
| Doublet-Emissive Molecular Design | Undergraduate Research, Fall 2023 – Fall 2024 | Synthesis, spectroscopy, and reported emission shift |

Homepage order: Hero → Selected Work → Research & Background → Education → Teaching & Awards → Contact. Historical undergraduate roles are retained as project context. Undergraduate education is described as studies beginning in Fall 2022; no degree conferral month is asserted.

## Local preview and public-file export

Python 3.9+ is sufficient; the static site has no package dependencies or frontend build step.

```sh
python scripts/site.py --port 8000
```

Open [http://127.0.0.1:8000/portfolio/](http://127.0.0.1:8000/portfolio/). Detail pages can be opened directly, for example `/portfolio/details/research-quantum-agent.html`. The preview serves an explicit allowlist and returns 404 for local authoring records. Do not expose a generic HTTP server over the entire working directory if it contains private notes.

To generate public-only files in a **new directory outside this repository**:

```sh
python scripts/site.py --export ../portfolio-public
```

The exporter refuses to overwrite an existing directory. The exported directory is the deployable website; it excludes TeX sources, scripts, reports, drafts, and test screenshots. No command here pushes or deploys.

## GitHub Pages

The site is designed for `https://techandscixie2005.github.io/portfolio/`, with relative asset and download links. Existing branch/root Pages publishing can be retained; `_config.yml` excludes authoring materials from Jekyll output. Alternatively, use the explicit public export as the Pages artifact. Review changes before committing or publishing. `.gitignore` uses an allowlist so local research records and backup files are not accidentally added; extend it deliberately when adding public assets.

All CV links use `Xie_Xiangyu_Resume.pdf`. Static HTML remains readable without JavaScript; JS only enhances theme selection, mobile navigation, and email copying. No remote fonts, icon libraries, tracking scripts, forms, or backend are required.

## CV compilation

`Xie_Xiangyu_Resume.tex` uses the standard `article` class and TeX Live packages (`geometry`, `lmodern`, `microtype`, `enumitem`, `titlesec`, `xcolor`, `amsmath`, `fancyhdr`, `hyperref`). It no longer requires a custom CV class, Chinese font configuration, or bundled fonts.

Run twice from the repository root:

```sh
xelatex -interaction=nonstopmode -halt-on-error Xie_Xiangyu_Resume.tex
xelatex -interaction=nonstopmode -halt-on-error Xie_Xiangyu_Resume.tex
```

Use `-output-directory=<existing private build directory>` to keep auxiliary files outside the repository, then copy the newly compiled PDF to the root. The PDF is an intended deliverable and should be included in a future reviewed commit. Render every page and check extracted text after changes. The target is a readable two-page English CV.

## Sources and assets

- [QuantumAgent source and current architecture](https://github.com/techandscixie2005/Quantum-Agent): Python/FastAPI/LangGraph backend and React/TypeScript workbench.
- [USTC award notice, published 20 Sep 2026](https://www.teach.ustc.edu.cn/notice/notice-info/20582.html): Graduate Division, Agent Track, Second Prize; QuantumAgent; Xiangyu Xie as sole listed member. The competition’s English name is a descriptive translation.
- [Historical screenshot, 18 Sep 2026](https://raw.githubusercontent.com/techandscixie2005/Quantum-Agent/main/docs/implementation/evidence/video-parity-flash-20260918/1366-verify.png): locally encoded as WebP with the original dimensions and content. Visible outcomes belong to the recorded run.
- [Recorded demonstration](https://github.com/techandscixie2005/Quantum-Agent/blob/main/docs/implementation/evidence/video-parity-flash-20260918/main-raw.webm) and [historical acceptance report](https://github.com/techandscixie2005/Quantum-Agent/blob/main/docs/implementation/VIDEO_PARITY_ACCEPTANCE.md): external, click-to-open, no autoplay.
- [Prof. Jun Jiang’s official page](https://faculty.ustc.edu.cn/jiangjun1/en/): advisor name/link only.
- Other project results are summaries of the author’s existing thesis/CV and project records. No new experiments or model evaluation are claimed. Dipole comparison contexts are distinguished; no ambiguous derived error percentage is displayed.
- The molecular graph SVG is a conceptual illustration, not experimental data. The favicon and 1200 × 630 social card are local original text/geometry assets. System fonts provide fallbacks; no font files are distributed.

## Validation

Test at `/portfolio/`, including direct detail navigation, mobile keyboard menu behavior, system and saved theme preferences, storage denial, disabled JavaScript, reduced motion, 200% zoom/reflow, links, PDF downloads, and local asset failures. Use 375/390px mobile, 768px tablet, and 1440px desktop widths. Keep browser screenshots, audit reports, logs, and raw research records outside the public repository/artifact. Browser emulation is not a physical-device or WeChat test.
