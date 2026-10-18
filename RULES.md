# RULES.md — Veille CNN Presentation

> **Re-read this file before every new phase. Update the Progress log when a phase ends.**

---

## 1. Project Identity

**Title:** "Veille CNN : Comprendre la classification d'images & Application au projet BrainScan"
**Goal #1:** Student teammates UNDERSTAND CNNs. Clarity beats visual effects.
**Audience:** University students, Arabic-speaking, learning Deep Learning for BrainScan project.

---

## 2. Files & Constraints

- Files: `index.html`, `styles.css`, `app.js`, `RULES.md` only — at project root.
- **No build step, no npm.** Opens by double-clicking `index.html`.
- **ZERO external dependencies:** no Tailwind, no Google Fonts CDN, no CDN libraries, no web images.
- Visuals: plain CSS, CSS variables, system font stacks, inline SVG, Canvas.
- Math: plain HTML (`<sup>`, `<sub>`, CSS fractions). **No KaTeX**.
- Must work **100% offline**.

---

## 3. Slide List (engine auto-numbers; refer by TITLE only)

| # | Title |
|---|-------|
| 1 | Couverture : Veille CNN & BrainScan (Mohamed El Hamdaoui & Yassine Nmila) |
| 2 | Plan de la présentation (6 axes interactifs) |
| 3 | Introduction : ML classique vs Deep Learning |
| 4 | Défi #1 — Poids d'une couche cachée |
| 5 | Explosion des paramètres |
| 6 | Perte de structure spatiale |
| 7 | Absence d'invariance par translation |
| 8 | Pourquoi la convolution ? |
| 9 | C comme Convolution |
| 10 | Les 3 étapes de la Convolution : Motif, Glissement, Sortie |
| 11 | Simulateur de convolution |
| 12 | Pas et Rembourrage |
| 13 | Défi #3 — ReLU et Max Pooling |
| 14 | ReLU : la non-linéarité |
| 15 | Pooling : réduire sans perdre l'essentiel |
| 16 | Pooling et robustesse aux petits décalages |
| 17 | Architecture d'un CNN |
| 18 | Le code Keras de l'architecture |
| 19 | Flatten et couches Dense |
| 20 | Softmax : transformer des scores en probabilités |
| 21 | Un filtre est un volume 3D |
| 22 | Champ récepteur : du pixel à la tumeur |
| 23 | Comment un CNN apprend ses filtres (Axe 7) |
| 24 | Limiter le sur-apprentissage (Axe 8) |
| 25 | Apprentissage par transfert & Synthèse BrainScan (Axe 9) |

---

## 4. Language Rules

- **Slide content:** French.
- **Technical terms:** first appearance on each slide -> French term followed by English in parentheses.
  - Examples: Noyau de convolution (Filter / Kernel), Pas (Stride), Rembourrage (Padding - Valid / Same),
    Carte de caracteristiques (Feature Map), Sur-apprentissage (Overfitting),
    Retropropagation (Backpropagation), Apprentissage par transfert (Transfer Learning),
    Partage de poids (Weight Sharing), Champ recepteur (Receptive Field),
    Aplatissement (Flatten), Couche entierement connectee (Fully Connected / Dense).
- **Notes & Explications drawer:**
  - Toggled with key `S` and top button "💡 Explications (S)".
  - `dir="ltr"`, font: system font stack (`var(--font-body)`).
  - Pedagogical French synthesis; technical terms kept in Latin script with English equivalents.
  - **Required sections per slide:**
    1. 💡 Intuition & Analogie (intuitive everyday comparison)
    2. 🎯 Point clé & BrainScan (technical synthesis & impact on MRI classification)
    3. ⚙️ Démonstration interactive (concise guidance for interactive slides)
  - Hidden from audience by default, toggled on demand.

---

## 5. Pedagogy Rules

- Order: **PROBLEM -> IDEA -> NAME** (never name first).
- Every concept slide ends with highlighted box **"A retenir"** with ONE sentence.
- Every hard concept has one everyday analogy.
- **"Defi Interactif" slides:**
  - Question + visual clues.
  - 3-4 clickable hypotheses (class votes, presenter clicks one).
  - Instant feedback explaining **WHY** (never just "wrong").
  - "Reveler la reponse" button navigates to next slide.
- **Every interactive widget:**
  - Has: title, one-line instruction, Reset button, live explanation text updated at each action.
  - Wrapped in `try/catch`; a JS error must never break navigation.
- **Scientific precision:**
  - Flattening: keeps pixel values but destroys **neighbourhood structure** ("loss of spatial structure").

---

## 6. ONE-IDEA RULES (Projector & Presentation Clarity)

> **MANDATORY for every slide from now on:**

1. **One slide = one idea = at most ONE interactive widget.** If a slide has two widgets or three ideas, split it into separate slides.
2. **On-slide text: max 40 words besides the widget.** Detailed explanations go **ONLY** in the Arabic notes drawer.
3. **Font sizes at 1920×1080:** title 56px, body 28px, widget labels 24px minimum, **nothing below 24px**.
4. **English equivalent formatting:**
   - Appears once, on the first mention of the term on that slide.
   - Displayed in a smaller, dimmer style (about 80% size, muted color: e.g. `<span class="term-en">(English)</span>`).
   - After the first mention, use the French term or acronym alone.
   - Slide titles contain the French term only; the English term goes in a subtitle line.
5. **"À retenir" box:** maximum 15 words, strictly one sentence.
6. **Generous spacing:** at least 32px between blocks, widgets centered, large touch-friendly buttons (min height 56px).
7. **Show over tell:** a big clear visual, then one punchy sentence.

---

## 7. UI / UX

- **Dark theme CSS variables:**
  - `--bg`: `#020617`
  - `--accent-sky`: `#38bdf8`
  - `--accent-indigo`: `#818cf8`
  - `--accent-emerald`: `#34d399`
  - `--accent-amber`: `#fbbf24` (warnings)
  - `--accent-rose`: `#fb7185` (errors)
  - WCAG AA contrast, body font >= 22px at 1920x1080.
- **Stage:** Fixed 16:9 (1920x1080), scaled with CSS `transform: scale()` to fit any screen, letterboxed.
- **Navigation:**
  - Keys: ArrowLeft / ArrowRight / Space
  - Clickable dots (progress bar)
  - Counter: 03 / 20
  - URL hash: #slide-5
  - F -> fullscreen, O -> overview grid, S -> Arabic drawer
- Light animations; respect `prefers-reduced-motion`.
- Print stylesheet: one slide per page.

---

## 7. Code Quality

- `app.js` in commented sections: state, slide engine, helpers, one `init` function per widget.
- Every number shown in widgets **computed by JS, never hardcoded**.
- Helper: `outSize(W, F, P, S) = Math.floor((W - F + 2*P) / S) + 1`
- Slides defined as data/templates -> later phases append slides without rewriting the engine.
- BrainScan class constant:
  ```js
  const CLASSES = ["Classe A","Classe B","Classe C","Classe D"]; // placeholder, easy to edit
  ```
  Everything depending on class count uses `CLASSES.length`.

---

## 8. BrainScan Context

**Mission:** Moroccan startup - AI-assisted brain MRI classification, detect tumors early, assist doctors
(never replace them), reduce diagnosis time and human error.

**Dataset pipeline:**
- Folders = classes. Extensions: jpeg, jpg, bmp, png.
- Resize with OpenCV to 224x224, 3 channels, pixels normalized to [0,1].
- Images and labels in two aligned lists, shuffled, converted to NumPy.
- Class counts plotted; imbalance checked and rebalanced if needed.
- Labels: LabelEncoder + to_categorical -> multi-class problem.
- Train/test split BEFORE any augmentation (avoid data leakage).

**Model:** Conv2D + MaxPooling2D + Dropout + Dense, ReLU hidden, Softmax output, Adam, categorical_crossentropy.

**Tools:** model.summary(), plot_model(), time, ModelCheckpoint.
**Evaluation:** accuracy/loss curves, confusion matrix, classification report, correct vs wrong predictions.
**Deployment:** predict_image(path), .h5, Streamlit.

**Key constraints:**
- Small medical dataset. Patient privacy.
- Tumors at different positions in the image.
- False negatives are the **most dangerous** error.

---

## 9. How to Add a Slide (for future phases)

1. Open `app.js`.
2. Find the `SLIDES` array in the `// -- SLIDES DATA --` section.
3. Append a new object at the correct position:
   ```js
   {
     title: "Your Slide Title",
     render(container) {
       container.innerHTML = `<div class="slide-content">...</div>`;
       // set up event listeners here — wrap in try/catch
     },
     notes: `<p>Arabic notes HTML here...</p>`  // dir="rtl" applied by engine
   }
   ```
4. Engine auto-assigns slide number from array index.
5. Wrap ALL widget logic inside `render()` in `try/catch`.
6. Add Arabic notes with 3 required parts (see Language Rules Section 4).
7. Run the DoD checklist (Section 10) and confirm all 7 items pass.
8. Update the Progress log (Section 13).

---

## 10. Definition of Done (DoD)

> Applied at the end of **EVERY phase** before stopping.
> List each item as PASS or FAIL with a brief justification.

| # | Criterion | How to check |
|---|-----------|-------------|
| 1 | **No external dependency** | `grep` for CDN links, `<script src="http`, Google Fonts @import |
| 2 | **Every French technical term has its English equivalent** | Read each new slide: first occurrence of every term has `(English)` in parentheses |
| 3 | **Every number in widgets is computed by JS** | Search for hardcoded pixel counts, weight counts, output sizes in innerHTML strings |
| 4 | **An Arabic note exists for each new slide** | Check `notes:` property is non-empty and contains all 3 required parts |
| 5 | **Every widget has a Reset button and a live explanation** | Verify `.btn-reset` and a feedback/explanation `<div>` that updates on each action |
| 6 | **Each concept slide has an "A retenir" box** | Look for `.a-retenir` div or equivalent at the end of every concept slide (not Defi slides) |
| 7 | **Every slide fits inside the 910px content area with no overflow** | Open browser console: zero `[DEV] Slide N overflows` warnings |

---

## 11. Layout Rules

### Fixed zones inside the 1920x1080 stage

| Zone         | y-start | y-end | Height | CSS rule |
|--------------|---------|-------|--------|----------|
| Top bar      | 0       | 70    | 70px   | `#top-bar { height: 70px }` |
| Content area | 70      | 980   | 910px  | `#slide-panel { top:70px; bottom:100px }` |
| Bottom bar   | 980     | 1080  | 100px  | `#bottom-bar { height: 100px }` |

- Horizontal padding inside content: 60px each side (`#slide-panel { left:60px; right:60px }`).
- `.slide-content` MUST use `height:100%` and `overflow:hidden`.
- Every new slide must fit inside the 910px content area with no overflow.

### Stage centering
- `#stage { position:absolute; left:50%; top:50%; transform-origin:center center; }`
- JS: `scale = Math.min(window.innerWidth/1920, window.innerHeight/1080)`
- Applied: `stage.style.transform = "translate(-50%,-50%) scale(s)"`
- Recomputed on `resize` and `fullscreenchange`.

### Overflow check
- Engine logs `console.warn("[DEV] Slide N '...' overflows by Xpx")` via `requestAnimationFrame` after each render.
- Any overflow must be fixed before merging a phase. Reduce padding/gap/font (minimum body font: 22px).

---

## 12. Phase-End Verification Template

At the end of every phase, paste this checklist filled in:

```
PHASE X — DoD VERIFICATION
============================
Slides added: [list]
Date: YYYY-MM-DD

DoD item 1 — No external dependency:       [ PASS / FAIL ] reason
DoD item 2 — French terms + English equiv: [ PASS / FAIL ] reason
DoD item 3 — All numbers JS-computed:      [ PASS / FAIL ] reason
DoD item 4 — Arabic notes present:         [ PASS / FAIL ] reason
DoD item 5 — Reset + live explanation:     [ PASS / FAIL ] reason
DoD item 6 — "A retenir" on concept slides:[ PASS / FAIL ] reason
DoD item 7 — No 910px overflow:            [ PASS / FAIL ] reason

Overall: PASS (all 7) / FAIL (list failing items)
```

---

## 13. Progress Log

| Phase | Date | Slides built | DoD | Status |
|-------|------|--------------|-----|--------|
| Phase 0 | 2026-10-15 | 1 (Title & Hook), 2 (Defi #1 weights) | Pre-DoD | Complete |
| Layout fix | 2026-10-15 | Stage centering, zone definitions, Slide 1 redesign | Pre-DoD | Complete |
| DoD added | 2026-10-15 | RULES.md Section 10, 12, 13 restructured | N/A | Complete |
| Phase 1 | 2026-10-15 | 3 (Limites MLP), 4 (Histoire), 5 (C comme Convolution), 6 (Défi #2), 7 (Simulateur), 8 (Stride/Padding) | PASS (all 7) | Complete |
| UX Refactor | 2026-10-15 | Slides 1-10 refactored to ONE-IDEA rules (MLP split into 3 slides, simulator & stride separated, >=24px fonts) | PASS (all 7) | Complete |
| Phase 2A | 2026-10-16 | 11 (Défi #3), 12 (ReLU non-linéarité), 13 (Pooling réduction), 14 (Pooling robustesse) | PASS (all 7) | Complete |
| Phase 2B | 2026-10-16 | 15 (Architecture CNN), 16 (Code Keras), 17 (Flatten/Dense), 18 (Softmax), 19 (Filtre 3D), 20 (Champ récepteur), 21 (Transfer Learning) | PASS (all 7) | Complete |
| Phase 5 | 2026-10-16 | Full QA pass across all 21 slides: ARIA progressbar, English term formatting, print break-after, hashchange bidirectional sync | PASS (all 7) | Complete |
| Phase 6 | 2026-10-18 | GitHub Pages release: all Arabic snippets replaced with French pedagogical notes (Intuition & Analogie, Point clé & BrainScan, Démonstration interactive), speaker scripts removed, LTR UI update, Git repo & GitHub Pages setup | PASS (all 7) | Complete |
| Phase 7 | 2026-10-18 | Final Complete Delivery: Couverture de livre (Mohamed El Hamdaoui & Yassine Nmila), Slide de Plan interactif, Axe 7 (Apprentissage des filtres par rétropropagation & gradient), Axe 8 (Overfitting : Data Aug, Dropout, BatchNorm), validation intégrale des 9 axes du sujet (25 slides au total) | PASS (all 7) | Complete |
| Phase 8 | 2026-10-18 | Mathematical & Pedagogical Upgrade: Two-tier formulas (algebraic theoretical formulas before numeric applications across key slides), replacement of Défi #2 with interactive 3-step convolution mechanism (Motif ➔ Glissement animé ➔ Sortie) | PASS (all 7) | Complete |


