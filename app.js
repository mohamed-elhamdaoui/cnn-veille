/* ══════════════════════════════════════════════════════════════════
   app.js — CNN Presentation Engine + Slides 1-2 (Phase 0)
   No external deps. Works offline. Opens by double-click on index.html
   ══════════════════════════════════════════════════════════════════ */

/* ── BRAINSCAN CONSTANTS (easy to edit) ─────────────────────────
   Change CLASSES to match the actual notebook class names.
   ALL counts / labels are derived from CLASSES.length.           */
const CLASSES = ["Classe A", "Classe B", "Classe C", "Classe D"]; // placeholder

/* Image size used throughout BrainScan notebook */
const IMG_W = 224, IMG_H = 224, IMG_C = 3;

/* ══════════════════════════════════════════════════════════════════
   ── HELPERS ──────────────────────────────────────────────────────
   ══════════════════════════════════════════════════════════════════ */

/**
 * Compute output spatial size after Conv/Pool.
 * @param {number} W  Input size (width or height)
 * @param {number} F  Filter size
 * @param {number} P  Padding
 * @param {number} S  Stride
 * @returns {number}
 */
function outSize(W, F, P, S) {
  return Math.floor((W - F + 2 * P) / S) + 1;
}

/**
 * Format large numbers with thin-space thousands separator.
 * e.g. 150528000 → "150 528 000"
 */
function fmtN(n) {
  return n.toLocaleString("fr-FR"); // uses narrow-no-break space in modern engines
}

/**
 * Compute the number of weights in a fully-connected layer
 * connecting every pixel of inputW × inputH × inputC to hiddenN neurons.
 */
function fcWeights(inputW, inputH, inputC, hiddenN) {
  return inputW * inputH * inputC * hiddenN;
}

/**
 * Clamp a number between min and max.
 */
function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

/* ══════════════════════════════════════════════════════════════════
   ── SLIDES DATA ──────────────────────────────────────────────────
   Each slide: { title, render(container), notes (French HTML) }
   Engine auto-numbers by array index (0-based internally, 1-based displayed).

   HOW TO ADD A SLIDE (see RULES.md §9 for full instructions):
     1. Append a new { title, render, notes } object here.
     2. Engine picks it up automatically.
     3. Wrap widget logic in try/catch.
   ══════════════════════════════════════════════════════════════════ */
const SLIDES = [
  /* ───────────────────────────────────────────────────────────────
     SLIDE 1 — Couverture de Livre (Book Cover)
     Veille Technologique : Réseaux de Neurones Convolutifs (CNN)
     Réalisateurs : Mohamed El Hamdaoui & Yassine Nmila
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Couverture : Veille CNN & BrainScan",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:0; height:100%; justify-content:center; align-items:center; padding: 20px 40px;">
  
  <div style="display:grid; grid-template-columns: 1.15fr 0.85fr; gap:60px; width:100%; max-width:1720px; align-items:center;">
    
    <!-- LEFT: Editorial Title & Details -->
    <div style="display:flex; flex-direction:column; gap:24px; text-align:left;">
      
      <!-- Eyebrow Tag -->
      <div style="display:flex; align-items:center; gap:12px;">
        <span style="display:inline-flex; align-items:center; gap:8px; background:rgba(56, 189, 248, 0.15); border:1px solid rgba(56, 189, 248, 0.35); padding:6px 16px; border-radius:20px; font-size:18px; font-weight:800; color:var(--accent-sky); letter-spacing:1px; text-transform:uppercase;">
          <span style="width:8px; height:8px; border-radius:50%; background:var(--accent-sky); box-shadow:0 0 8px var(--accent-sky);"></span>
          Veille Technologique & Médicale
        </span>
        <span style="font-size:18px; color:var(--text-muted); font-weight:600;">Deep Learning 2026</span>
      </div>

      <!-- Main Headline Title -->
      <div>
        <h1 class="slide-h1" style="font-size:58px; font-weight:900; line-height:1.12; color:#fff; margin:0 0 16px 0; letter-spacing:-0.5px;">
          Réseaux de Neurones<br/>
          <span style="background:linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">
            Convolutifs (CNN)
          </span>
        </h1>
        <p style="font-size:26px; line-height:1.45; color:var(--text-secondary); margin:0; font-weight:400; max-width:850px;">
          Comprendre le fonctionnement intime de la classification d'images et son application clinique au projet <strong style="color:var(--accent-sky); font-weight:700;">BrainScan AI</strong> pour le diagnostic précoce des tumeurs cérébrales.
        </p>
      </div>

      <!-- Feature Highlights Chips -->
      <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:4px;">
        <span style="background:var(--bg-surface-2); border:1px solid var(--border-bright); padding:8px 18px; border-radius:10px; font-size:20px; color:var(--text-primary); font-weight:600;">
          🔬 IRM Cérébrales 224×224
        </span>
        <span style="background:var(--bg-surface-2); border:1px solid var(--border-bright); padding:8px 18px; border-radius:10px; font-size:20px; color:var(--text-primary); font-weight:600;">
          ⚙️ Filtres & Convolution 3D
        </span>
        <span style="background:var(--bg-surface-2); border:1px solid var(--border-bright); padding:8px 18px; border-radius:10px; font-size:20px; color:var(--text-primary); font-weight:600;">
          🛡️ Anti-Overfitting & Transfert
        </span>
      </div>

      <!-- Call to Action button -->
      <div style="display:flex; align-items:center; gap:20px; margin-top:8px;">
        <button class="top-btn" id="cover-start-btn" style="min-height:60px; font-size:24px; font-weight:800; padding:14px 36px; border-radius:12px; background:linear-gradient(90deg, var(--accent-sky), var(--accent-indigo)); color:#000; box-shadow:0 8px 30px rgba(56,189,248,0.35); border:none; cursor:pointer; display:inline-flex; align-items:center; gap:12px;">
          <span>Explorer la présentation</span>
          <span style="font-size:26px;">➔</span>
        </button>
        <span style="font-size:20px; color:var(--text-muted);">
          Navigation : <kbd style="background:var(--bg-surface-3); padding:4px 8px; border-radius:6px; color:var(--text-secondary);">Espace</kbd> ou <kbd style="background:var(--bg-surface-3); padding:4px 8px; border-radius:6px; color:var(--text-secondary);">→</kbd>
        </span>
      </div>

      <!-- Authors Credit: Small, discreet, elegant line at the bottom -->
      <div style="margin-top:16px; padding-top:18px; border-top:1px solid rgba(255,255,255,0.08); display:flex; align-items:center; gap:16px; font-size:20px; color:var(--text-secondary);">
        <span style="color:var(--accent-sky); font-weight:700; text-transform:uppercase; letter-spacing:1px; font-size:16px;">
          Réalisé par :
        </span>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="color:#fff; font-weight:700;">Mohamed El Hamdaoui</span>
          <span style="color:var(--text-muted);">&bull;</span>
          <span style="color:#fff; font-weight:700;">Yassine Nmila</span>
        </div>
      </div>

    </div>

    <!-- RIGHT: Cinematic Visual Artwork of CNN & BrainScan -->
    <div style="display:flex; justify-content:center; align-items:center;">
      <div style="position:relative; width:100%; max-width:680px; border-radius:20px; overflow:hidden; border:2px solid rgba(56,189,248,0.3); box-shadow:0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(56,189,248,0.25); background:#020617;">
        <img src="cover_cnn.jpg" alt="Visualisation Convolutional Neural Network et BrainScan" style="width:100%; height:auto; display:block; object-fit:cover; filter:contrast(1.05) brightness(1.02);"/>
        <div style="position:absolute; bottom:16px; right:16px; background:rgba(2, 6, 23, 0.75); backdrop-filter:blur(8px); padding:8px 16px; border-radius:10px; border:1px solid rgba(56,189,248,0.3); font-size:16px; font-weight:700; color:var(--accent-sky); display:flex; align-items:center; gap:8px;">
          <span style="width:6px; height:6px; border-radius:50%; background:var(--accent-emerald);"></span>
          Architecture CNN & Diagnostic IRM
        </div>
      </div>
    </div>

  </div>

</div>`;

        container.querySelector('#cover-start-btn')?.addEventListener('click', () => {
          STATE.goTo(1);
        });
      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">Erreur: ${err.message}</div></div>`;
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Cette présentation a été conçue comme un livre interactif pour guider le public à travers la vision par ordinateur moderne : comprendre pourquoi les méthodes traditionnelles échouent et comment les CNN transforment les pixels en diagnostics médicaux précis.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Présentation réalisée par Mohamed El Hamdaoui et Yassine Nmila dans le cadre du projet BrainScan AI. L'objectif est de maîtriser les mécanismes de convolution, pooling, régularisation et transfert de connaissances pour classifier des IRM cérébrales.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 2 — Plan de la présentation (Agenda)
     Les 6 grands axes de la veille technologique
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Plan de la présentation",

    render(container) {
      try {
        const chapters = [
          {
            num: "I",
            title: "Limites des réseaux classiques",
            desc: "Pourquoi les MLP échouent sur les images (explosion des poids, perte spatiale 2D, non-invariance).",
            slideIdx: 2,
            badge: "Problème"
          },
          {
            num: "II",
            title: "La Révolution de la Convolution",
            desc: "Noyaux, filtres 3D, partage de poids, stride, padding et cartes de caractéristiques.",
            slideIdx: 7,
            badge: "Fondations"
          },
          {
            num: "III",
            title: "Non-linéarité & Réduction spatiale",
            desc: "Activation ReLU, Max Pooling, compression d'information et robustesse aux décalages.",
            slideIdx: 12,
            badge: "Traitement"
          },
          {
            num: "IV",
            title: "Architecture & Prise de Décision",
            desc: "Pipeline Keras, Flatten, couches denses fully-connected et fonction Softmax multi-classes.",
            slideIdx: 16,
            badge: "Modélisation"
          },
          {
            num: "V",
            title: "L'Apprentissage des Filtres",
            desc: "Initialisation aléatoire, calcul de perte, rétropropagation du gradient et spécialisation.",
            slideIdx: 22,
            badge: "Entraînement"
          },
          {
            num: "VI",
            title: "Anti-Overfitting & Projet BrainScan",
            desc: "Data Augmentation, Dropout, BatchNorm, Transfer Learning et impact clinique.",
            slideIdx: 23,
            badge: "Application"
          }
        ];

        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">
  <!-- Header -->
  <div style="flex-shrink:0; text-align:center;">
    <div class="slide-eyebrow" style="margin-bottom:6px;">Structure de la Veille</div>
    <h1 class="slide-h2" style="margin-bottom:4px;">Plan de la présentation</h1>
    <div class="slide-sub" style="margin-bottom:0;">
      6 axes pédagogiques menant des fondements théoriques au projet médical BrainScan
    </div>
  </div>

  <!-- 6-Card Grid -->
  <div class="plan-grid">
    ${chapters.map(c => `
      <div class="plan-card" data-idx="${c.slideIdx}">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="plan-badge">Axe ${c.num}</span>
          <span style="font-size:18px; font-weight:700; padding:4px 12px; border-radius:20px; background:rgba(56,189,248,0.15); color:var(--accent-sky); border:1px solid rgba(56,189,248,0.3);">
            ${c.badge}
          </span>
        </div>
        <div style="font-size:24px; font-weight:800; color:var(--text-primary); line-height:1.2;">
          ${c.title}
        </div>
        <div style="font-size:19px; color:var(--text-secondary); line-height:1.4;">
          ${c.desc}
        </div>
        <div style="margin-top:auto; font-size:18px; font-weight:700; color:var(--accent-sky); display:flex; align-items:center; gap:6px;">
          Accéder à la section ➔
        </div>
      </div>
    `).join('')}
  </div>

  <!-- Bottom Bar -->
  <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface); padding:12px 28px; border-radius:12px; border:1px solid var(--border-bright);">
    <span style="font-size:22px; color:var(--text-secondary);">
      💡 Cliquez sur un axe pour y accéder directement, ou suivez le fil avec <strong>→</strong>.
    </span>
    <button class="top-btn" id="plan-next-btn" style="min-height:48px; font-size:22px; font-weight:700; padding:8px 24px; border-radius:10px; background:var(--accent-sky); color:#000;">
      Démarrer l'Axe I ➔
    </button>
  </div>
</div>`;

        container.querySelectorAll('.plan-card').forEach(card => {
          card.addEventListener('click', () => {
            const idx = parseInt(card.getAttribute('data-idx'), 10);
            if (!isNaN(idx)) STATE.goTo(idx);
          });
        });

        container.querySelector('#plan-next-btn')?.addEventListener('click', () => {
          STATE.goTo(2);
        });
      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">Erreur: ${err.message}</div></div>`;
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Le plan est conçu pour répondre rigoureusement aux 9 axes du travail demandé : partir de l'impasse des réseaux fully-connected sur les images, décortiquer la boîte noire des convolutions, comprendre comment les filtres apprennent leurs poids, et maîtriser le sur-apprentissage en milieu médical.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Chaque section s'articule directement avec le pipeline BrainScan : de l'image IRM 224×224 prétraitée par OpenCV jusqu'à la classification des 4 catégories de tumeurs par Softmax.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Cliquez sur l'un des 6 blocs pour accéder directement au chapitre correspondant ou avancez avec la touche Espace.
  </p>
</div>`
  },


  /* ───────────────────────────────────────────────────────────────
     SLIDE 1 — Title & Hook
     Compare: Classical ML (manual features) vs Deep Learning (auto).
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Introduction : ML classique vs Deep Learning",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:32px; height:100%; justify-content:space-between;">

  <!-- HEADER -->
  <div style="flex-shrink:0; text-align:center;">
    <div class="slide-eyebrow" style="margin-bottom:6px;">Veille Technologique — Deep Learning</div>
    <h1 class="slide-h2" style="margin-bottom:8px;">Comprendre la classification d'images</h1>
    <div class="slide-sub" style="margin-bottom:0;">
      Application au projet BrainScan <span class="term-en">(Image Classification & Deep Learning)</span>
    </div>
  </div>

  <!-- COMPARISON CARDS: TWO PUNCHY VISUALS -->
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:36px; width:100%; max-width:1500px; margin:0 auto; flex:1; align-items:center;">

    <!-- Left: ML Classique -->
    <div class="card card-indigo" style="display:flex; flex-direction:column; align-items:center; padding:32px; gap:24px; text-align:center;">
      <span style="font-size:32px; font-weight:800; color:var(--accent-indigo);">🛠️ Machine Learning classique</span>
      
      <div style="display:flex; align-items:center; gap:20px; justify-content:center; width:100%;">
        <div style="background:var(--bg-surface-2); padding:16px 24px; border-radius:12px; font-size:24px; font-weight:700;">
          👤 Expert humain
        </div>
        <span style="font-size:32px; color:var(--accent-indigo);">➔</span>
        <div style="background:var(--bg-surface-2); padding:16px 24px; border-radius:12px; font-size:24px; font-weight:700;">
          📋 Extraction manuelle <span class="term-en">(Features)</span>
        </div>
        <span style="font-size:32px; color:var(--accent-indigo);">➔</span>
        <div style="background:var(--bg-surface-2); padding:16px 24px; border-radius:12px; font-size:24px; font-weight:700;">
          🎯 Classifieur
        </div>
      </div>

      <div style="font-size:26px; color:var(--accent-amber); font-weight:600; background:#fbbf2415; padding:12px 24px; border-radius:12px; border:1px solid var(--accent-amber);">
        ⚠️ Si une caractéristique manque, le modèle échoue.
      </div>
    </div>

    <!-- Right: Deep Learning CNN -->
    <div class="card card-sky" style="display:flex; flex-direction:column; align-items:center; padding:32px; gap:24px; text-align:center;">
      <span style="font-size:32px; font-weight:800; color:var(--accent-sky);">🤖 Deep Learning (CNN)</span>

      <div style="display:flex; align-items:center; gap:20px; justify-content:center; width:100%;">
        <div style="background:var(--bg-surface-2); padding:16px 24px; border-radius:12px; font-size:24px; font-weight:700;">
          🖼️ Pixels bruts
        </div>
        <span style="font-size:32px; color:var(--accent-sky);">➔</span>
        <div style="background:var(--bg-surface-2); padding:16px 24px; border-radius:12px; font-size:24px; font-weight:700; border:2px solid var(--accent-sky);">
          🧠 CNN automatique
        </div>
        <span style="font-size:32px; color:var(--accent-sky);">➔</span>
        <div style="background:var(--bg-surface-2); padding:16px 24px; border-radius:12px; font-size:24px; font-weight:700;">
          🎯 Diagnostic
        </div>
      </div>

      <div style="font-size:26px; color:var(--accent-emerald); font-weight:600; background:#34d39915; padding:12px 24px; border-radius:12px; border:1px solid var(--accent-emerald);">
        ✅ Le réseau apprend seul les motifs directement des pixels.
      </div>
    </div>

  </div>

  <!-- MISSION BANNER SLIM -->
  <div class="mission-banner" style="flex-shrink:0; padding:16px 32px; gap:20px;">
    <span style="font-size:36px; flex-shrink:0;">🇲🇦</span>
    <div style="font-size:26px;">
      <strong class="accent-sky">BrainScan AI — Mission :</strong>
      Classer les IRM cérébrales pour assister le médecin et accélérer le diagnostic précoce.
    </div>
  </div>

</div>`; // end innerHTML
      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 1 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 1 render error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    En Machine Learning classique, un expert doit définir manuellement les caractéristiques discriminantes (mesurer la texture, les contrastes, la géométrie) : si un détail clé est omis, le modèle échoue. Avec le Deep Learning (CNN), le modèle ingère directement les pixels bruts et apprend par lui-même les représentations optimales.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Pour diagnostiquer des tumeurs cérébrales sur des IRM, la variabilité anatomique rend l'extraction manuelle subjective et risquée. Le réseau de neurones convolutionnel découvre automatiquement les motifs pathologiques directement à partir des pixels.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────

     SLIDE 2 — Défi Interactif #1 : Nombre de poids (Weights)
     Problem: MLP on 224×224×3 image with 1000 hidden neurons.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Défi #1 — Poids d'une couche cachée",

    render(container) {
      try {
        /* ── Computed values (never hardcoded) ── */
        const neurons = 1000;
        const totalW = fcWeights(IMG_W, IMG_H, IMG_C, neurons); // 150 528 000
        const totalBias = neurons;                                   // 1 000
        const totalParam = totalW + totalBias;

        /* The 4 choices and their explanations */
        const choices = [
          {
            id: "A",
            label: "~150 mille",
            value: "~150 000",
            hint: "10³ ordre",
            correct: false,
            explanation: `<strong>~150 000</strong> : ordre de grandeur d'une couche Dense dans un MLP sur données tabulaires (ex. 150 colonnes × 1000 neurones = 150 000). Ici on a une <em>image</em> : 224×224×3 = <strong>${fmtN(IMG_W * IMG_H * IMG_C)} entrées</strong>, pas 150.`
          },
          {
            id: "B",
            label: "~15 millions",
            value: "~15 000 000",
            hint: "10⁷ ordre",
            correct: false,
            explanation: `<strong>~15 millions</strong> correspond à 224×224 sans tenir compte des 3 canaux RGB : 224×224×1 000 = ${fmtN(224 * 224 * 1000)}. Il ne faut pas oublier de multiplier par <strong>${IMG_C} canaux</strong>.`
          },
          {
            id: "C",
            label: "~150 millions",
            value: "~150 000 000",
            hint: "✅ 10⁸ ordre",
            correct: true,
            explanation: `✅ <strong>Correct !</strong><br>
              Calcul exact : 224 × 224 × 3 × 1 000 = <strong>${fmtN(totalW)} poids</strong>
              + ${fmtN(totalBias)} biais = <strong>${fmtN(totalParam)} paramètres</strong> rien que pour <em>une seule</em> couche cachée.
              C'est pourquoi le MLP brut sur images est impraticable : la mémoire et le calcul explosent.`
          },
          {
            id: "D",
            label: "~15 milliards",
            value: "~15 000 000 000",
            hint: "10¹⁰ ordre",
            correct: false,
            explanation: `<strong>~15 milliards</strong> serait le résultat si on multipliait encore par ~100, par exemple en considérant une deuxième couche ou une résolution plus grande. Mais ici on ne traite qu'<em>une</em> couche de ${fmtN(neurons)} neurones.`
          }
        ];

        container.innerHTML = `
<div class="slide-content" style="height:100%; gap:16px;">

  <!-- Header row -->
  <div class="defi-header" style="flex-shrink:0;">
    <div class="defi-badge">⚡ Défi Interactif #1</div>
    <div class="slide-sub" style="margin-bottom:0; font-size:var(--fs-sm);">
      Estimation d'un perceptron multicouche <span class="term-en">(Multilayer Perceptron / MLP)</span>
    </div>
  </div>

  <!-- Question -->
  <div style="flex-shrink:0;">
    <div class="defi-question">
      Combien de <span class="accent-amber">poids</span> <span class="term-en">(Weights)</span> pour une couche cachée <span class="term-en">(Hidden Layer)</span>
      de <span class="accent-sky">${fmtN(neurons)} neurones</span>
      sur une image <span class="accent-indigo">${IMG_W}×${IMG_H}×${IMG_C}</span> ?
    </div>
  </div>

  <!-- Visual: image → layer sizes -->
  <div class="weights-visual" style="flex-shrink:0; justify-content:center; gap:24px;">
    <!-- Image block -->
    <div class="weights-box">
      <svg width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Image 224x224x3 représentée par 3 couches empilées">
        <rect x="0"  y="20" width="68" height="68" rx="4" fill="#818cf820" stroke="#818cf8" stroke-width="1.5"/>
        <rect x="8"  y="12" width="68" height="68" rx="4" fill="#818cf828" stroke="#818cf8" stroke-width="1.2"/>
        <rect x="16" y="4"  width="68" height="68" rx="4" fill="#818cf835" stroke="#818cf880" stroke-width="1"/>
        <text x="50" y="44" text-anchor="middle" fill="#818cf8" font-size="11" font-family="monospace" font-weight="bold">224</text>
        <text x="50" y="57" text-anchor="middle" fill="#818cf880" font-size="9" font-family="monospace">×224×3</text>
      </svg>
      <span style="font-size:var(--fs-xs); color:var(--text-secondary);">${fmtN(IMG_W * IMG_H * IMG_C)} entrées</span>
    </div>

    <!-- × -->
    <div class="weights-times" style="font-size:var(--fs-2xl);">×</div>

    <!-- Neurons block -->
    <div class="weights-box">
      <svg width="90" height="90" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Couche de 1000 neurones">
        <rect x="10" y="4" width="70" height="82" rx="6" fill="#38bdf820" stroke="#38bdf8" stroke-width="1.5"/>
        <!-- dots representing neurons -->
        ${[...Array(5)].map((_, i) =>
          `<circle cx="45" cy="${15 + i * 16}" r="5" fill="#38bdf860" stroke="#38bdf8" stroke-width="1"/>`
        ).join('')}
        <text x="45" y="85" text-anchor="middle" fill="#38bdf880" font-size="9" font-family="monospace">⋮</text>
      </svg>
      <span style="font-size:var(--fs-xs); color:var(--text-secondary);">${fmtN(neurons)} neurones</span>
    </div>

    <!-- = -->
    <div class="weights-times" style="font-size:var(--fs-2xl);">=</div>

    <!-- Result block (revealed after answer) -->
    <div class="weights-box">
      <div id="result-box" style="
        width:140px; height:100px; border-radius:12px;
        background:var(--bg-surface);
        border:2px dashed var(--border-bright);
        display:flex; align-items:center; justify-content:center;
        font-size:32px; color:var(--text-muted);
        transition:all var(--transition-slow);">
        ?
      </div>
      <span style="font-size:var(--fs-xs); color:var(--text-secondary);">poids</span>
    </div>
  </div>

  <!-- Instruction -->
  <div class="defi-instruction" style="flex-shrink:0; text-align:center;">
    📌 Cliquez sur la réponse que vous pensez correcte — une explication apparaîtra.
  </div>

  <!-- Choices grid -->
  <div class="choices-grid" style="flex:1; min-height:0;">
    ${choices.map(c => `
      <button
        class="choice-btn"
        id="choice-${c.id}"
        data-correct="${c.correct}"
        data-explanation="${encodeURIComponent(c.explanation)}"
        aria-label="Hypothèse ${c.id}: ${c.label}"
      >
        <div class="choice-letter">Hypothèse ${c.id}</div>
        <div class="choice-value">${c.value}</div>
        <div class="choice-hint">${c.hint}</div>
      </button>
    `).join('')}
  </div>

  <!-- Feedback area -->
  <div id="defi1-feedback" class="defi-feedback" style="flex-shrink:0;">
    <span style="color:var(--text-muted); font-style:italic;">
      ← Cliquez sur une hypothèse pour voir l'explication.
    </span>
  </div>

  <!-- Actions -->
  <div class="defi-actions" style="flex-shrink:0;">
    <button class="btn-reset" id="defi1-reset">↺ Réinitialiser</button>
    <button class="btn-reveal" id="defi1-reveal">Slide suivante ➜</button>
  </div>

</div>`;

        /* ── Widget logic ── */
        const feedbackEl = container.querySelector('#defi1-feedback');
        const revealBtn = container.querySelector('#defi1-reveal');
        const resetBtn = container.querySelector('#defi1-reset');
        const resultBox = container.querySelector('#result-box');
        const allBtns = container.querySelectorAll('.choice-btn');
        let answered = false;

        function lockChoices() {
          allBtns.forEach(b => { b.disabled = true; });
        }

        function showResult() {
          resultBox.style.background = '#fbbf2420';
          resultBox.style.borderColor = 'var(--accent-amber)';
          resultBox.style.borderStyle = 'solid';
          resultBox.style.fontSize = '24px';
          resultBox.style.fontFamily = 'var(--font-mono)';
          resultBox.style.color = 'var(--accent-amber)';
          resultBox.style.fontWeight = '700';
          resultBox.innerHTML = fmtN(totalW).replace(/\s/g, '<br>');
        }

        allBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            if (answered) return;
            answered = true;

            const isCorrect = btn.dataset.correct === 'true';
            const explanation = decodeURIComponent(btn.dataset.explanation);

            /* Mark all buttons */
            allBtns.forEach(b => {
              b.disabled = true;
              if (b.dataset.correct === 'true') {
                b.classList.add('correct');
              } else if (b === btn) {
                b.classList.add('wrong');
              }
            });

            /* Show feedback */
            feedbackEl.innerHTML = explanation;
            feedbackEl.classList.add('shown');
            feedbackEl.classList.add(isCorrect ? 'feedback-ok' : 'feedback-bad');

            /* Reveal result box */
            showResult();

            /* Show "next slide" button */
            revealBtn.classList.add('visible');
          });
        });

        /* Reset button */
        resetBtn.addEventListener('click', () => {
          answered = false;
          allBtns.forEach(b => {
            b.disabled = false;
            b.classList.remove('correct', 'wrong');
          });
          feedbackEl.innerHTML = '<span style="color:var(--text-muted); font-style:italic;">← Cliquez sur une hypothèse pour voir l\'explication.</span>';
          feedbackEl.className = 'defi-feedback';
          // Use removeAttribute instead of style = '' (style is readonly in strict mode)
          resultBox.removeAttribute('style');
          // Re-apply the initial inline styles defined in the template
          Object.assign(resultBox.style, {
            width: '140px',
            height: '100px',
            borderRadius: '12px',
            background: 'var(--bg-surface)',
            border: '2px dashed var(--border-bright)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            color: 'var(--text-muted)',
            transition: 'all var(--transition-slow)'
          });
          resultBox.innerHTML = '?';
          revealBtn.classList.remove('visible');
        });

        /* Reveal button → go to slide 3 (index 2) */
        revealBtn.addEventListener('click', () => {
          STATE.goTo(2); // slide index 2 = slide 3
        });

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur widget Défi #1 :</strong> ${err.message}
        </div></div>`;
        console.error('[Slide 2 widget error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Relier chaque pixel d'une image haute résolution à des centaines de neurones équivaut à tirer des millions de câbles entre chaque maison d'une mégapole : pour une seule image 224×224×3 reliée à 1 000 neurones, cela représente environ 150 millions de connexions (poids) dès la première couche cachée !
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Un tel volume de paramètres pour une seule couche provoque une saturation mémoire et un risque immédiat de sur-apprentissage sur des jeux de données médicaux de taille modeste.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Sélectionnez l'une des hypothèses pour estimer le nombre de poids avant de révéler le calcul exact.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 3 — Explosion des paramètres (ONE-IDEA: Widget A only)
     Resolution selector + 2 big numbers (MLP vs CNN).
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Explosion des paramètres",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:32px; height:100%; justify-content:space-between;">

  <!-- HEADER -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Explosion des paramètres</h1>
    <div class="slide-sub">
      Perceptron multicouche <span class="term-en">(Multilayer Perceptron / MLP)</span> vs Réseau convolutif <span class="term-en">(CNN)</span>
    </div>
  </div>

  <!-- MAIN WIDGET: CENTERED, BIG NUMBERS -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:28px; flex:1; justify-content:center;">

    <!-- Resolution Buttons (min-height 56px, font 24px) -->
    <div style="display:flex; gap:16px; flex-wrap:wrap; justify-content:center;" id="w3-res-group">
      <button class="res-pill" data-res="32">32×32</button>
      <button class="res-pill" data-res="64">64×64</button>
      <button class="res-pill" data-res="128">128×128</button>
      <button class="res-pill active" data-res="224">224×224 (BrainScan)</button>
      <button class="res-pill" data-res="512">512×512</button>
    </div>

    <!-- Two Big Number Cards (Split 2) -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:36px; width:100%; max-width:1400px;">

      <!-- MLP Card -->
      <div class="card card-rose" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:32px; gap:12px; text-align:center;">
        <span style="font-size:26px; font-weight:700; color:var(--accent-rose);">
          MLP <span class="term-en">(1 couche de 1 000 neurones)</span>
        </span>
        <div class="big-number" id="w3-mlp-val">150 529 000</div>
        <span style="font-size:24px; color:var(--text-secondary);">
          paramètres <span class="term-en">(poids + biais)</span>
        </span>
      </div>

      <!-- CNN Card -->
      <div class="card card-emerald" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:32px; gap:12px; text-align:center;">
        <span style="font-size:26px; font-weight:700; color:var(--accent-emerald);">
          CNN <span class="term-en">(10 filtres 3×3×3)</span>
        </span>
        <div class="big-number-green" id="w3-cnn-val">280</div>
        <span style="font-size:24px; color:var(--accent-emerald);">
          paramètres <span class="term-en">(constant quelle que soit la taille)</span>
        </span>
      </div>

    </div>

    <!-- Ratio Line + Reset Button -->
    <div style="display:flex; align-items:center; gap:24px;">
      <div id="w3-ratio-box" style="font-size:26px; font-weight:700; color:var(--accent-amber); background:#fbbf2415; padding:12px 28px; border-radius:12px; border:1px solid var(--accent-amber);">
        Le MLP requiert <strong>537 603×</strong> plus de paramètres !
      </div>
      <button class="btn-reset" id="w3-reset">↺ Réinitialiser</button>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Le MLP explose en paramètres, tandis que le CNN reste compact et invariant.
    </p>
  </div>

</div>`;

        /* Widget logic */
        const resGroup = container.querySelector('#w3-res-group');
        const mlpValEl = container.querySelector('#w3-mlp-val');
        const cnnValEl = container.querySelector('#w3-cnn-val');
        const ratioEl = container.querySelector('#w3-ratio-box');
        const resetBtn = container.querySelector('#w3-reset');

        const HIDDEN = 1000;
        const CNN_P = 280; // 10 * 27 + 10

        function updateRes(res) {
          const inputs = res * res * 3;
          const mlpTotal = inputs * HIDDEN + HIDDEN;
          const ratio = Math.round(mlpTotal / CNN_P);

          mlpValEl.textContent = fmtN(mlpTotal);
          cnnValEl.textContent = fmtN(CNN_P);
          ratioEl.innerHTML = `Le MLP requiert <strong>${fmtN(ratio)}×</strong> plus de paramètres !`;

          resGroup.querySelectorAll('.res-pill').forEach(btn => {
            btn.classList.toggle('active', parseInt(btn.dataset.res, 10) === res);
          });
        }

        resGroup.addEventListener('click', e => {
          const pill = e.target.closest('.res-pill');
          if (pill) updateRes(parseInt(pill.dataset.res, 10));
        });

        resetBtn.addEventListener('click', () => updateRes(224));

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 3 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 3 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Dans un réseau dense (MLP), le nombre de paramètres explose de façon quadratique avec la résolution de l'image (de 3 millions en 32×32 à 786 millions en 512×512). À l'inverse, une couche de convolution CNN conserve un nombre de poids minuscule et constant (ex. 280 poids pour 10 filtres 3×3×3), quelle que soit la résolution de l'image.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Cette indépendance entre la résolution d'entrée et le volume de paramètres est ce qui rend le traitement d'IRM médicales en 224×224 ou 512×512 réalisable et rapide sur GPU.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Cliquez sur les résolutions (32×32, 224×224, 512×512) pour observer l'écart colossal de paramètres entre MLP et CNN.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 4 — Perte de structure spatiale (ONE-IDEA: Flatten only)
     Flatten grid widget only.
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Perte de structure spatiale",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:32px; height:100%; justify-content:space-between;">

  <!-- HEADER -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Perte de structure spatiale</h1>
    <div class="slide-sub">
      L'aplatissement <span class="term-en">(Flattening)</span> détruit le voisinage des pixels
    </div>
  </div>

  <!-- MAIN WIDGET: CENTERED FLATTEN VISUAL -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:28px; flex:1; justify-content:center;">

    <div style="display:flex; align-items:center; justify-content:center; gap:36px; width:100%;">

      <!-- 2D View -->
      <div class="card" style="display:flex; flex-direction:column; align-items:center; gap:16px; padding:24px;">
        <span style="font-size:26px; font-weight:700; color:var(--accent-sky);">Image 2D (IRM 6×6)</span>
        <div class="mri-grid-2d" id="w4-grid-2d" style="gap:6px;"></div>
        <span style="font-size:24px; color:var(--text-muted);">🟡 Centre &nbsp; 🟢 Voisins locaux</span>
      </div>

      <!-- Arrow -->
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <span style="font-size:48px; font-weight:900; color:var(--accent-indigo);">➔</span>
        <span class="mono" style="font-size:24px; color:var(--accent-indigo);">Aplatir</span>
      </div>

      <!-- 1D Flattened Vector -->
      <div class="card" style="display:flex; flex-direction:column; align-items:center; gap:16px; padding:24px; max-width:760px;">
        <span style="font-size:26px; font-weight:700; color:var(--accent-indigo);">Vecteur 1D (36 entrées)</span>
        <div class="flatten-strip" id="w4-strip-1d" style="grid-template-columns:repeat(12, 54px); gap:6px;"></div>
        <span style="font-size:24px; color:var(--text-muted);">Indices 0 à 35 dans le MLP</span>
      </div>

    </div>

    <!-- Live indicator + Reset button -->
    <div style="display:flex; align-items:center; gap:24px;">
      <div id="w4-status" style="font-size:26px; color:var(--text-primary); background:var(--bg-surface); padding:12px 28px; border-radius:12px; border:1px solid var(--border-bright);">
        Voisin vertical projeté à <strong class="accent-amber">+6 cases</strong> (+224 sur BrainScan).
      </div>
      <button class="btn-reset" id="w4-reset">↺ Réinitialiser</button>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Aplatir une image détruit la proximité géographique nécessaire pour reconnaître une lésion cérébrale.
    </p>
  </div>

</div>`;

        /* Widget logic */
        const gridEl = container.querySelector('#w4-grid-2d');
        const stripEl = container.querySelector('#w4-strip-1d');
        const statusEl = container.querySelector('#w4-status');
        const resetBtn = container.querySelector('#w4-reset');

        const GRID_N = 6;
        const vals = [
          15, 18, 22, 20, 18, 15,
          20, 75, 82, 80, 78, 18,
          22, 80, 230, 245, 88, 20,
          18, 85, 235, 240, 92, 18,
          24, 78, 92, 105, 85, 20,
          10, 15, 18, 15, 12, 10
        ];

        // Build 2D
        gridEl.innerHTML = '';
        stripEl.innerHTML = '';
        for (let i = 0; i < 36; i++) {
          const v = vals[i];
          const c2 = document.createElement('div');
          c2.className = 'mri-cell';
          c2.dataset.idx = i;
          c2.style.width = '56px';
          c2.style.height = '56px';
          c2.style.fontSize = '24px';
          c2.style.backgroundColor = `rgb(${v},${v},${v})`;
          c2.style.color = v > 130 ? '#000' : '#fff';
          c2.textContent = v;
          gridEl.appendChild(c2);

          const c1 = document.createElement('div');
          c1.className = 'strip-cell';
          c1.dataset.idx = i;
          c1.style.width = '54px';
          c1.style.height = '48px';
          c1.style.fontSize = '24px';
          c1.textContent = i;
          stripEl.appendChild(c1);
        }

        function pickPixel(idx) {
          const r = Math.floor(idx / GRID_N);
          const c = idx % GRID_N;
          const nbrs = [];
          if (r > 0) nbrs.push((r - 1) * GRID_N + c);
          if (r < GRID_N - 1) nbrs.push((r + 1) * GRID_N + c);
          if (c > 0) nbrs.push(r * GRID_N + (c - 1));
          if (c < GRID_N - 1) nbrs.push(r * GRID_N + (c + 1));

          gridEl.querySelectorAll('.mri-cell').forEach(el => {
            const elIdx = parseInt(el.dataset.idx, 10);
            if (isNaN(elIdx)) return;
            el.classList.toggle('center-cell', elIdx === idx);
            el.classList.toggle('neighbour-cell', nbrs.includes(elIdx));
          });

          stripEl.querySelectorAll('.strip-cell').forEach(el => {
            const elIdx = parseInt(el.dataset.idx, 10);
            if (isNaN(elIdx)) return;
            el.classList.toggle('center-cell', elIdx === idx);
            el.classList.toggle('neighbour-cell', nbrs.includes(elIdx));
          });

          statusEl.innerHTML = `Case <strong>${idx}</strong> : voisin vertical séparé de <strong class="accent-amber">+${GRID_N} cases</strong> (+224 sur BrainScan).`;
        }

        gridEl.addEventListener('mouseover', e => {
          const c = e.target.closest('.mri-cell');
          if (c) pickPixel(parseInt(c.dataset.idx, 10));
        });

        resetBtn.addEventListener('click', () => pickPixel(14));

        pickPixel(14); // default tumor cell

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 4 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 4 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Aplatir une image (Flattening) revient à découper une toile de maître en bandelettes verticales de 1 pixel et à les aligner en un ruban d'un kilomètre : deux pixels voisins à la verticale dans l'image 2D se retrouvent séparés par 224 positions dans le vecteur 1D !
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Les tumeurs cérébrales sont définies par la contiguïté spatiale de leurs pixels et de leurs contours. L'aplatissement prématuré détruit cette notion de voisinage local indispensable au diagnostic.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Survolez les cellules de l'IRM 2D pour visualiser la dispersion des pixels voisins dans le ruban aplati 1D.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 5 — Absence d'invariance par translation (ONE-IDEA)
     Tiny visual: same tumor at 2 positions giving 2 different vectors.
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Absence d'invariance par translation",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:32px; height:100%; justify-content:space-between;">

  <!-- HEADER -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Absence d'invariance par translation</h1>
    <div class="slide-sub">
      Une tumeur déplacée devient un motif inconnu pour le perceptron <span class="term-en">(Translation Invariance)</span>
    </div>
  </div>

  <!-- MAIN VISUAL: TWO POSITIONS COMPARED -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:28px; flex:1; justify-content:center;">

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:36px; width:100%; max-width:1400px;">

      <!-- Position 1 -->
      <div class="card" id="w5-card-a" style="display:flex; flex-direction:column; align-items:center; padding:24px; gap:16px; border:2px solid var(--accent-sky);">
        <span style="font-size:26px; font-weight:700; color:var(--accent-sky);">Position 1 : Lobe frontal</span>
        <svg width="180" height="180" viewBox="0 0 5 5" style="border:2px solid var(--border-bright); border-radius:12px; background:#0f172a;">
          <rect x="0" y="0" width="5" height="5" fill="#0f172a"/>
          <!-- Brain contour -->
          <circle cx="2.5" cy="2.5" r="2.2" fill="#1e293b"/>
          <!-- Tumor at (1,1) -->
          <rect x="1" y="1" width="1" height="1" fill="#fb7185"/>
        </svg>
        <div class="mono" style="font-size:24px; color:var(--accent-sky);">Vecteur : [..., <strong style="color:var(--accent-rose);">pos 6</strong>, ...]</div>
        <span style="font-size:24px; color:var(--text-muted);">Active les neurones A</span>
      </div>

      <!-- Position 2 -->
      <div class="card" id="w5-card-b" style="display:flex; flex-direction:column; align-items:center; padding:24px; gap:16px; border:2px solid var(--border-bright);">
        <span style="font-size:26px; font-weight:700; color:var(--accent-amber);">Position 2 : Lobe temporal</span>
        <svg width="180" height="180" viewBox="0 0 5 5" style="border:2px solid var(--border-bright); border-radius:12px; background:#0f172a;">
          <rect x="0" y="0" width="5" height="5" fill="#0f172a"/>
          <!-- Brain contour -->
          <circle cx="2.5" cy="2.5" r="2.2" fill="#1e293b"/>
          <!-- Tumor shifted to (3,3) -->
          <rect x="3" y="3" width="1" height="1" fill="#fbbf24"/>
        </svg>
        <div class="mono" style="font-size:24px; color:var(--accent-amber);">Vecteur : [..., <strong style="color:var(--accent-amber);">pos 18</strong>, ...]</div>
        <span style="font-size:24px; color:var(--text-muted);">Active les neurones B (aucun lien !)</span>
      </div>

    </div>

    <!-- Toggle & Reset -->
    <div style="display:flex; align-items:center; gap:24px;">
      <button class="top-btn" id="w5-shift-btn" style="min-height:56px; font-size:24px; font-weight:700; background:var(--accent-sky); color:#000; border:none; padding:12px 28px; border-radius:12px;">
        🔄 Déplacer la tumeur
      </button>
      <button class="btn-reset" id="w5-reset">↺ Réinitialiser</button>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Le MLP ne reconnaît pas un objet s'il change de position dans l'image.
    </p>
  </div>

</div>`;

        const shiftBtn = container.querySelector('#w5-shift-btn');
        const resetBtn = container.querySelector('#w5-reset');
        const cardA = container.querySelector('#w5-card-a');
        const cardB = container.querySelector('#w5-card-b');
        let toggle = false;

        function updateShift() {
          toggle = !toggle;
          cardA.style.borderColor = toggle ? 'var(--border-bright)' : 'var(--accent-sky)';
          cardB.style.borderColor = toggle ? 'var(--accent-amber)' : 'var(--border-bright)';
        }

        shiftBtn.addEventListener('click', updateShift);
        resetBtn.addEventListener('click', () => {
          toggle = true;
          updateShift();
        });

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 5 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 5 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Un réseau dense (MLP) est semblable à une personne qui reconnaîtrait un chat s'il est assis à gauche de la pièce, mais le prendrait pour un objet inconnu s'il se déplace à droite. Il doit réapprendre chaque objet à chaque position possible.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Dans une IRM cérébrale, une tumeur conserve la même signature biologique qu'elle soit logée dans le lobe frontal ou temporal. Le modèle doit reconnaître le motif indépendamment de sa localisation exacte.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Cliquez sur "Déplacer la tumeur" pour constater que dans un MLP, un simple déplacement active des neurones entièrement différents.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 6 — Naissance de la convolution (Histoire)
     ONE-IDEA: Clickable timeline only.
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Pourquoi la convolution ?",

    render(container) {
      try {
        const milestones = [
          {
            year: "1959",
            author: "Hubel & Wiesel",
            title: "Cortex visuel",
            breakthrough: "Découverte de neurones répondant à des contours orientés dans des zones locales.",
            link: "Base directe des filtres convolutifs 3×3."
          },
          {
            year: "1980",
            author: "Fukushima",
            title: "Néocognitron",
            breakthrough: "Alternance de cellules simples (S) et complexes (C) tolérantes aux translations.",
            link: "Ancêtre direct de l'alternance Convolution et Pooling."
          },
          {
            year: "1989",
            author: "Yann LeCun",
            title: "LeNet-5",
            breakthrough: "Rétropropagation et partage de poids sur la lecture de chèques et codes postaux.",
            link: "Premier CNN moderne robuste et déployé."
          },
          {
            year: "2012",
            author: "AlexNet",
            title: "Triomphe ImageNet",
            breakthrough: "Victoire écrasante sur 1,2 million d'images grâce aux GPU et à la fonction ReLU.",
            link: "Début de l'ère moderne du Deep Learning médical."
          }
        ];

        container.innerHTML = `
<div class="slide-content" style="gap:32px; height:100%; justify-content:space-between;">

  <!-- HEADER -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Pourquoi la convolution ?</h1>
    <div class="slide-sub">
      S'inspirer de la vision biologique animale <span class="term-en">(Local Receptive Fields & Weight Sharing)</span>
    </div>
  </div>

  <!-- MAIN WIDGET: TIMELINE -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:28px; flex:1; justify-content:center;">

    <!-- 4 Milestone Buttons (min-height 56px, font 24px) -->
    <div style="display:flex; gap:16px; width:100%; justify-content:center;" id="w6-track">
      ${milestones.map((m, i) => `
        <button class="res-pill ${i === 0 ? 'active' : ''}" data-idx="${i}" style="min-height:56px; padding:12px 28px;">
          ${m.year} — ${m.author}
        </button>
      `).join('')}
    </div>

    <!-- Spotlight Card (clean, >= 24px) -->
    <div class="card card-sky" id="w6-card" style="width:100%; max-width:1200px; padding:32px; display:flex; flex-direction:column; gap:16px; text-align:center;">
      <!-- Populated dynamically -->
    </div>

    <!-- Reset -->
    <button class="btn-reset" id="w6-reset">↺ Réinitialiser</button>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      La convolution analyse l'image par petits champs récepteurs locaux partagés sur toute la surface.
    </p>
  </div>

</div>`;

        const track = container.querySelector('#w6-track');
        const card = container.querySelector('#w6-card');
        const resetBtn = container.querySelector('#w6-reset');

        function showM(idx) {
          const m = milestones[idx];
          track.querySelectorAll('.res-pill').forEach((btn, i) => {
            btn.classList.toggle('active', i === idx);
          });
          card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="mono accent-sky" style="font-size:32px; font-weight:800;">${m.year}</span>
              <strong style="font-size:32px; color:var(--text-primary);">${m.title} — ${m.author}</strong>
            </div>
            <div style="font-size:26px; color:var(--text-secondary); line-height:1.4;">${m.breakthrough}</div>
            <div style="font-size:24px; color:var(--accent-emerald); font-weight:600;">🧠 ${m.link}</div>
          `;
        }

        track.addEventListener('click', e => {
          const btn = e.target.closest('.res-pill');
          if (btn) showM(parseInt(btn.dataset.idx, 10));
        });

        resetBtn.addEventListener('click', () => showM(0));
        showM(0);

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 6 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 6 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    La convolution s'inspire directement du cortex visuel biologique (découverte de Hubel & Wiesel en 1959) : chaque neurone visuel ne scrute qu'un minuscule champ récepteur local, et la combinaison hiérarchique de ces regards élémentaires reconstitue la vision globale.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Des travaux pionniers de Fukushima (1980) et LeCun (1989) jusqu'au triomphe d'AlexNet (2012), l'architecture CNN repose sur la réutilisation locale d'un même détecteur sur toute l'étendue de l'image.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Explorez les 4 étapes chronologiques (1959, 1980, 1989, 2012) pour suivre l'évolution des CNNs.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 7 — C comme Convolution
     ONE-IDEA: "une convolution = UN seul calcul sur UNE petite zone"
     Left-to-right equation: 3x3 patch on 8x8 image × 3x3 filter = 9 products -> 1 cell in feature map
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "C comme Convolution",

    render(container) {
      try {
        const IMG_8X8 = [
          [10, 10, 10, 10, 10, 10, 10, 10],
          [10, 10, 10, 10, 10, 200, 200, 10],
          [10, 10, 10, 10, 10, 200, 200, 10],
          [10, 10, 10, 10, 10, 200, 200, 10],
          [10, 10, 10, 10, 10, 200, 200, 10],
          [10, 10, 10, 10, 10, 10, 10, 10],
          [10, 10, 10, 10, 10, 10, 10, 10],
          [10, 10, 10, 10, 10, 10, 10, 10]
        ];

        const FILTER = [
          [-1, 0, 1],
          [-1, 0, 1],
          [-1, 0, 1]
        ];

        container.innerHTML = `
<div class="slide-content" style="gap:16px; height:100%; justify-content:space-between;">

  <!-- HEADER -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">C comme Convolution</h1>
    <div class="slide-sub">
      Une convolution = un calcul élémentaire sur une petite zone <span class="term-en">(Convolution Operation)</span>
    </div>
  </div>

  <!-- INTERACTION CONTROLS (min height 56px, >=24px) -->
  <div style="display:flex; align-items:center; justify-content:center; gap:20px; flex-shrink:0;">
    <button class="top-btn" id="w7-btn-edge" style="min-height:56px; font-size:24px; font-weight:700; background:var(--accent-sky); color:#000; border:2px solid var(--accent-sky); padding:12px 28px; border-radius:12px; cursor:pointer;">
      📍 Zone A
    </button>
    <button class="top-btn" id="w7-btn-flat" style="min-height:56px; font-size:24px; font-weight:700; background:var(--bg-surface-2); color:var(--text-primary); border:2px solid var(--border-bright); padding:12px 28px; border-radius:12px; cursor:pointer;">
      ⬜ Zone B
    </button>
    <button class="btn-reset" id="w7-reset" style="min-height:56px; font-size:24px; padding:12px 24px;">↺ Réinitialiser</button>
  </div>

  <!-- THEORETICAL FORMULA BANNER -->
  <div style="flex-shrink:0; display:flex; justify-content:center;">
    <div style="background:var(--bg-surface); padding:6px 24px; border-radius:10px; border:1px solid var(--border-bright); display:flex; align-items:center; gap:16px; font-size:22px;">
      <span style="color:var(--accent-sky); font-weight:700;">📐 Formule générale :</span>
      <span class="mono" style="color:#fff; font-size:23px; font-weight:700;">
        S(i, j) = (I ∗ K)(i, j) = ∑<sub>m</sub> ∑<sub>n</sub> I(i+m, j+n) · K(m, n) + b
      </span>
      <span style="font-size:18px; color:var(--text-muted);">(Produit terme à terme du patch 3×3 et du filtre)</span>
    </div>
  </div>

  <!-- MAIN COMPUTATION EQUATION (LEFT TO RIGHT) -->
  <div class="card" style="display:flex; align-items:center; justify-content:center; gap:18px; padding:12px 20px; flex:1; min-height:0; background:var(--bg-surface);">

    <!-- 1. HERO: Input Image 8x8 (~420x420px) + Zoomed 3x3 Patch -->
    <div style="display:flex; align-items:center; gap:16px;">
      
      <!-- 8x8 Hero Panel -->
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <div id="w7-img-8x8" style="display:grid; grid-template-columns:repeat(8, 46px); gap:4px; padding:10px; background:#020617; border-radius:12px; border:2px solid var(--border-bright); width:420px; height:420px; box-sizing:border-box;"></div>
        <span style="font-size:24px; color:var(--text-secondary); font-weight:600;">Image IRM 8×8 (simplifiée)</span>
      </div>

      <span style="font-size:32px; color:var(--accent-sky); font-weight:900;">➔</span>

      <!-- Zoomed 3x3 Patch with Values -->
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <div id="w7-patch-3x3" class="matrix-3x3" style="grid-template-columns:repeat(3, 48px); gap:4px;"></div>
        <span style="font-size:24px; color:var(--text-secondary);" id="w7-patch-label">Zone A (3×3)</span>
      </div>

    </div>

    <!-- OPERATOR × -->
    <div style="font-size:38px; font-weight:900; color:var(--text-secondary); padding:0 2px;">×</div>

    <!-- 2. Filter 3x3 -->
    <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
      <span style="font-size:24px; font-weight:700; color:var(--accent-indigo);">Filtre (Kernel) 3×3</span>
      <div class="matrix-3x3" style="grid-template-columns:repeat(3, 48px); gap:4px;">
        <div class="matrix-cell accent-rose" style="width:48px; height:48px; font-size:24px; font-weight:700;">-1</div>
        <div class="matrix-cell" style="width:48px; height:48px; font-size:24px; font-weight:700;">0</div>
        <div class="matrix-cell accent-emerald" style="width:48px; height:48px; font-size:24px; font-weight:700;">+1</div>
        <div class="matrix-cell accent-rose" style="width:48px; height:48px; font-size:24px; font-weight:700;">-1</div>
        <div class="matrix-cell" style="width:48px; height:48px; font-size:24px; font-weight:700;">0</div>
        <div class="matrix-cell accent-emerald" style="width:48px; height:48px; font-size:24px; font-weight:700;">+1</div>
        <div class="matrix-cell accent-rose" style="width:48px; height:48px; font-size:24px; font-weight:700;">-1</div>
        <div class="matrix-cell" style="width:48px; height:48px; font-size:24px; font-weight:700;">0</div>
        <div class="matrix-cell accent-emerald" style="width:48px; height:48px; font-size:24px; font-weight:700;">+1</div>
      </div>
      <span style="font-size:24px; color:var(--accent-indigo);">Notre filtre (Kernel)</span>
    </div>

    <!-- OPERATOR = -->
    <div style="font-size:38px; font-weight:900; color:var(--text-secondary); padding:0 2px;">=</div>

    <!-- 3. 9 Products + Sum -->
    <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
      <span style="font-size:24px; font-weight:700; color:var(--accent-amber);">9 Produits</span>
      <div id="w7-prods-3x3" class="matrix-3x3" style="grid-template-columns:repeat(3, 48px); gap:4px;"></div>
      <div id="w7-sum-badge" style="font-size:26px; font-weight:900; color:var(--accent-emerald); background:rgba(52,211,153,0.15); border:1px solid var(--accent-emerald); padding:4px 14px; border-radius:8px;">
        Somme = 570
      </div>
    </div>

    <!-- ARROW ➔ -->
    <div style="font-size:38px; font-weight:900; color:var(--accent-sky); padding:0 2px;">➔</div>

    <!-- 4. Feature Map 6x6 -->
    <div style="display:flex; flex-direction:column; align-items:center; gap:8px; max-width:280px; text-align:center;">
      <span style="font-size:24px; font-weight:700; color:var(--accent-emerald);">Carte finale (6×6)</span>
      <div id="w7-fmap-6x6" style="display:grid; grid-template-columns:repeat(6, 36px); gap:3px; padding:6px; background:#020617; border-radius:8px; border:1px solid var(--border-bright);"></div>
      <span style="font-size:24px; color:var(--text-muted); line-height:1.25;">
        Une seule valeur calculée. Et le reste de l'image ? ➔ slide suivante.
      </span>
    </div>

  </div>

  <!-- LIVE EXPLANATION SENTENCE -->
  <div id="w7-live-msg" style="flex-shrink:0; text-align:center; font-size:26px; font-weight:600; padding:10px 24px; border-radius:12px; background:rgba(56,189,248,0.12); border:1px solid var(--accent-sky); color:var(--text-primary);">
    Grand nombre (570) = le motif cherché est présent ici.
  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:12px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      La convolution calcule la ressemblance entre un filtre et chaque zone locale.
    </p>
  </div>

</div>`;

        const btnEdge = container.querySelector('#w7-btn-edge');
        const btnFlat = container.querySelector('#w7-btn-flat');
        const btnReset = container.querySelector('#w7-reset');
        const imgEl = container.querySelector('#w7-img-8x8');
        const patchEl = container.querySelector('#w7-patch-3x3');
        const patchLabel = container.querySelector('#w7-patch-label');
        const prodsEl = container.querySelector('#w7-prods-3x3');
        const sumBadge = container.querySelector('#w7-sum-badge');
        const fmapEl = container.querySelector('#w7-fmap-6x6');
        const liveMsg = container.querySelector('#w7-live-msg');

        function updateState(mode) {
          const isEdge = mode === 'edge';
          const rStart = isEdge ? 2 : 1;
          const cStart = isEdge ? 3 : 1;

          // Buttons UI
          if (btnEdge && btnFlat) {
            if (isEdge) {
              btnEdge.style.background = 'var(--accent-sky)';
              btnEdge.style.color = '#000';
              btnEdge.style.border = '2px solid var(--accent-sky)';
              btnFlat.style.background = 'var(--bg-surface-2)';
              btnFlat.style.color = 'var(--text-primary)';
              btnFlat.style.border = '2px solid var(--border-bright)';
            } else {
              btnFlat.style.background = 'var(--accent-sky)';
              btnFlat.style.color = '#000';
              btnFlat.style.border = '2px solid var(--accent-sky)';
              btnEdge.style.background = 'var(--bg-surface-2)';
              btnEdge.style.color = 'var(--text-primary)';
              btnEdge.style.border = '2px solid var(--border-bright)';
            }
          }

          // 1. Render Hero 8x8 image with visible borders and clear glowing frame
          if (imgEl) {
            imgEl.innerHTML = '';
            for (let r = 0; r < 8; r++) {
              for (let c = 0; c < 8; c++) {
                const v = IMG_8X8[r][c];
                const cell = document.createElement('div');
                cell.style.width = '46px';
                cell.style.height = '46px';
                cell.style.backgroundColor = `rgb(${v}, ${v}, ${v})`;
                cell.style.border = '1px solid rgba(255, 255, 255, 0.15)';
                cell.style.borderRadius = '4px';
                cell.style.transition = 'all 0.2s ease';
                cell.style.boxSizing = 'border-box';
                const inPatch = (r >= rStart && r < rStart + 3 && c >= cStart && c < cStart + 3);
                if (inPatch) {
                  cell.style.outline = '3px solid var(--accent-sky)';
                  cell.style.boxShadow = '0 0 16px var(--accent-sky)';
                  cell.style.zIndex = '2';
                  cell.style.opacity = '1';
                } else {
                  cell.style.opacity = '0.35';
                }
                imgEl.appendChild(cell);
              }
            }
          }

          // 2. Render 3x3 patch
          if (patchEl) {
            patchEl.innerHTML = '';
            for (let r = 0; r < 3; r++) {
              for (let c = 0; c < 3; c++) {
                const v = IMG_8X8[rStart + r][cStart + c];
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                cell.style.width = '48px';
                cell.style.height = '48px';
                cell.style.fontSize = '24px';
                cell.style.fontWeight = '700';
                cell.style.backgroundColor = `rgb(${v}, ${v}, ${v})`;
                cell.style.color = v > 120 ? '#000' : '#fff';
                cell.textContent = v;
                patchEl.appendChild(cell);
              }
            }
          }
          if (patchLabel) {
            patchLabel.textContent = isEdge ? "Zone A (3×3)" : "Zone B (3×3)";
          }

          // 3. Compute products & sum
          let sum = 0;
          if (prodsEl) {
            prodsEl.innerHTML = '';
            for (let r = 0; r < 3; r++) {
              for (let c = 0; c < 3; c++) {
                const pVal = IMG_8X8[rStart + r][cStart + c];
                const fVal = FILTER[r][c];
                const prod = pVal * fVal;
                sum += prod;

                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                cell.style.width = '48px';
                cell.style.height = '48px';
                cell.style.fontSize = '24px';
                cell.style.fontWeight = '700';
                if (prod < 0) {
                  cell.style.color = 'var(--accent-rose)';
                  cell.style.background = 'rgba(251, 113, 133, 0.15)';
                } else if (prod > 0) {
                  cell.style.color = 'var(--accent-emerald)';
                  cell.style.background = 'rgba(52, 211, 153, 0.2)';
                } else {
                  cell.style.color = 'var(--text-muted)';
                  cell.style.background = 'var(--bg-surface-2)';
                }
                cell.textContent = prod > 0 ? `+${prod}` : String(prod);
                prodsEl.appendChild(cell);
              }
            }
          }

          // Sum badge
          if (sumBadge) {
            sumBadge.textContent = `Somme = ${sum}`;
            if (sum > 0) {
              sumBadge.style.color = 'var(--accent-emerald)';
              sumBadge.style.background = 'rgba(52,211,153,0.15)';
              sumBadge.style.borderColor = 'var(--accent-emerald)';
            } else {
              sumBadge.style.color = 'var(--accent-amber)';
              sumBadge.style.background = 'rgba(251,191,36,0.15)';
              sumBadge.style.borderColor = 'var(--accent-amber)';
            }
          }

          // 4. Render 6x6 feature map
          if (fmapEl) {
            fmapEl.innerHTML = '';
            for (let r = 0; r < 6; r++) {
              for (let c = 0; c < 6; c++) {
                const cell = document.createElement('div');
                cell.style.width = '36px';
                cell.style.height = '36px';
                cell.style.fontSize = '24px';
                cell.style.display = 'flex';
                cell.style.alignItems = 'center';
                cell.style.justifyContent = 'center';
                cell.style.borderRadius = '6px';

                if (r === rStart && c === cStart) {
                  cell.style.background = sum > 0 ? 'var(--accent-emerald)' : 'var(--accent-amber)';
                  cell.style.color = '#000';
                  cell.style.fontWeight = '900';
                  cell.style.boxShadow = sum > 0 ? '0 0 16px var(--accent-emerald)' : '0 0 16px var(--accent-amber)';
                  cell.textContent = String(sum);
                } else {
                  cell.style.background = 'var(--bg-surface-2)';
                  cell.style.color = 'var(--text-muted)';
                  cell.style.fontWeight = '600';
                  cell.textContent = '?';
                }
                fmapEl.appendChild(cell);
              }
            }
          }

          // Live message
          if (liveMsg) {
            if (isEdge) {
              liveMsg.innerHTML = 'Grand nombre (<strong class="accent-emerald">570</strong>) = le motif cherché est <strong class="accent-sky">présent ici</strong>.';
              liveMsg.style.borderColor = 'var(--accent-emerald)';
              liveMsg.style.background = 'rgba(52,211,153,0.1)';
            } else {
              liveMsg.innerHTML = '<strong class="accent-amber">0</strong> = le motif cherché est <strong class="accent-rose">absent</strong> de cette zone.';
              liveMsg.style.borderColor = 'var(--accent-amber)';
              liveMsg.style.background = 'rgba(251,191,36,0.1)';
            }
          }
        }

        // Initialize with edge zone
        updateState('edge');

        // Wire events
        btnEdge?.addEventListener('click', () => updateState('edge'));
        btnFlat?.addEventListener('click', () => updateState('flat'));
        btnReset?.addEventListener('click', () => updateState('edge'));

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 7 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 7 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    La convolution agit comme un gabarit ou un tampon comparateur : on glisse un petit filtre (ex. 3×3) sur une zone locale, on effectue le produit élément par élément puis la somme. Si le motif correspond au filtre, le signal obtenu est très élevé ; si la zone est uniforme, le signal est nul.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Ce mécanisme mathématique simple transforme la matrice de pixels bruts en une « carte de caractéristiques » (Feature Map) révélant les contours et les contrastes pathologiques.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Comparez le calcul sur la Zone A (motif présent -> score élevé 570) et la Zone B (zone homogène -> score 0).
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 8 — Les 3 étapes de la Convolution
     ONE-IDEA: Le mécanisme complet : 1. Motif ➔ 2. Glissement ➔ 3. Sortie
     Interactive animated sliding 3x3 window over 6x6 MRI to build 4x4 Feature Map
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Les 3 étapes de la Convolution",

    render(container) {
      try {
        // 6x6 MRI section with a distinct vertical tissue edge between col 2 and 3
        const img6x6 = [
          [25, 30, 45, 190, 210, 220],
          [25, 30, 45, 190, 210, 220],
          [25, 30, 50, 195, 210, 220],
          [25, 30, 50, 195, 210, 220],
          [25, 30, 45, 190, 210, 220],
          [25, 30, 45, 190, 210, 220]
        ];

        // 3x3 Vertical Sobel Kernel (Edge Detector)
        const kernel3x3 = [
          [-1, 0, 1],
          [-2, 0, 2],
          [-1, 0, 1]
        ];

        container.innerHTML = `
<div class="slide-content" style="gap:16px; height:100%; justify-content:space-between;">

  <!-- 1. Header -->
  <div style="flex-shrink:0;">
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:4px;">
      <span class="defi-badge" style="font-size:20px; font-weight:800; padding:4px 16px; border-radius:999px; background:rgba(56,189,248,0.15); border:1px solid rgba(56,189,248,0.4); color:var(--accent-sky);">
        ⚙️ Mécanisme Fondamental
      </span>
      <span style="font-size:20px; color:var(--text-muted); font-weight:600;">Axe II : La Révolution de la Convolution</span>
    </div>
    <h1 class="slide-h2" style="font-size:40px; margin:0 0 4px 0;">Les 3 étapes de la Convolution</h1>
    <div class="slide-sub" style="font-size:22px; margin:0;">
      <span style="color:var(--accent-indigo); font-weight:700;">1. Le Motif</span> (Filtre 3×3) ➔ 
      <span style="color:var(--accent-sky); font-weight:700;">2. Le Glissement</span> (Balayage animé) ➔ 
      <span style="color:var(--accent-emerald); font-weight:700;">3. La Sortie</span> (Feature Map)
    </div>
  </div>

  <!-- 2. Controls Bar -->
  <div style="display:flex; justify-content:center; align-items:center; gap:16px; flex-shrink:0;">
    <button class="top-btn" id="s3-play-btn" style="min-height:54px; font-size:22px; font-weight:800; padding:10px 26px; border-radius:12px; background:linear-gradient(135deg, var(--accent-sky), var(--accent-indigo)); color:#000; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:8px; box-shadow:0 4px 18px rgba(56,189,248,0.35);">
      <span id="s3-play-label">▶ Lancer le glissement</span>
    </button>
    <button class="top-btn" id="s3-step-btn" style="min-height:54px; font-size:22px; font-weight:700; padding:10px 24px; border-radius:12px; background:var(--bg-surface-2); color:var(--text-primary); cursor:pointer;">
      ⏭ Pas suivant
    </button>
    <button class="top-btn" id="s3-all-btn" style="min-height:54px; font-size:22px; font-weight:700; padding:10px 24px; border-radius:12px; background:var(--bg-surface-2); color:var(--text-primary); cursor:pointer;">
      ⚡ Remplir la carte
    </button>
    <button class="btn-reset" id="s3-reset-btn" style="min-height:54px; font-size:22px; padding:10px 22px; border-radius:12px; cursor:pointer;">
      ↺ Réinitialiser
    </button>
  </div>

  <!-- 3. Main 3-Stage Row with Arrow Connectors -->
  <div style="display:grid; grid-template-columns: 1fr auto 1.35fr auto 1.15fr; gap:20px; align-items:center; flex:1; max-width:1680px; width:100%; margin:0 auto;">

    <!-- STAGE 1: LE MOTIF -->
    <div class="card card-indigo" style="padding:18px 22px; height:100%; display:flex; flex-direction:column; justify-content:space-between; align-items:center; text-align:center;">
      <div>
        <div style="display:inline-block; font-size:17px; font-weight:800; color:var(--accent-indigo); text-transform:uppercase; letter-spacing:1px; background:rgba(129,140,248,0.15); border:1px solid rgba(129,140,248,0.35); padding:3px 12px; border-radius:20px; margin-bottom:6px;">
          Étape 1 : Le Motif
        </div>
        <h3 style="font-size:24px; font-weight:800; color:#fff; margin:0 0 4px 0;">Noyau / Filtre 3×3</h3>
        <p style="font-size:17px; color:var(--text-secondary); margin:0;">Détecteur géométrique fixe</p>
      </div>

      <!-- 3x3 Kernel Matrix -->
      <div style="display:grid; grid-template-columns:repeat(3, 56px); gap:6px; padding:8px; background:rgba(15,23,42,0.85); border:2px solid var(--border-bright); border-radius:12px;">
        <div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:var(--accent-rose); background:rgba(251,113,133,0.15); border-radius:6px; font-family:var(--font-mono);">-1</div>
        <div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:var(--text-muted); background:var(--bg-surface-2); border-radius:6px; font-family:var(--font-mono);">0</div>
        <div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:var(--accent-emerald); background:rgba(52,211,153,0.15); border-radius:6px; font-family:var(--font-mono);">+1</div>
        <div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:var(--accent-rose); background:rgba(251,113,133,0.15); border-radius:6px; font-family:var(--font-mono);">-2</div>
        <div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:var(--text-muted); background:var(--bg-surface-2); border-radius:6px; font-family:var(--font-mono);">0</div>
        <div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:var(--accent-emerald); background:rgba(52,211,153,0.15); border-radius:6px; font-family:var(--font-mono);">+2</div>
        <div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:var(--accent-rose); background:rgba(251,113,133,0.15); border-radius:6px; font-family:var(--font-mono);">-1</div>
        <div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:var(--text-muted); background:var(--bg-surface-2); border-radius:6px; font-family:var(--font-mono);">0</div>
        <div style="width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:22px; font-weight:800; color:var(--accent-emerald); background:rgba(52,211,153,0.15); border-radius:6px; font-family:var(--font-mono);">+1</div>
      </div>

      <div style="background:var(--bg-surface-2); border:1px solid var(--border-bright); border-radius:10px; padding:8px 12px; font-size:16px; line-height:1.35; color:var(--text-primary);">
        <strong style="color:var(--accent-sky);">Contour vertical :</strong> Poids négatifs à gauche et positifs à droite pour traquer les transitions.
      </div>
    </div>

    <!-- Arrow Connector 1 -->
    <div style="font-size:36px; font-weight:900; color:var(--accent-sky); opacity:0.8; user-select:none;">➔</div>

    <!-- STAGE 2: LE GLISSEMENT -->
    <div class="card" style="padding:18px 22px; height:100%; display:flex; flex-direction:column; justify-content:space-between; align-items:center; text-align:center;">
      <div>
        <div style="display:inline-block; font-size:17px; font-weight:800; color:var(--accent-sky); text-transform:uppercase; letter-spacing:1px; background:rgba(56,189,248,0.15); border:1px solid rgba(56,189,248,0.35); padding:3px 12px; border-radius:20px; margin-bottom:6px;">
          Étape 2 : Le Glissement
        </div>
        <h3 style="font-size:24px; font-weight:800; color:#fff; margin:0 0 4px 0;">Balayage animé (Pas S = 1)</h3>
        <p style="font-size:17px; color:var(--text-secondary); margin:0;">Section d'IRM cérébrale (6×6)</p>
      </div>

      <!-- 6x6 MRI Image with Sliding 3x3 Window Box -->
      <div style="position:relative; width:284px; height:284px; padding:4px; background:rgba(15,23,42,0.95); border:2px solid var(--border-bright); border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.35);">
        <!-- 6x6 Grid Cells -->
        <div id="s3-img-grid" style="display:grid; grid-template-columns:repeat(6, 44px); grid-template-rows:repeat(6, 44px); gap:2px;">
          <!-- 36 cells injected by JS -->
        </div>
        <!-- Animated 3x3 Sliding Window -->
        <div id="s3-sliding-box" style="position:absolute; top:4px; left:4px; width:136px; height:136px; border:3px solid var(--accent-sky); background:rgba(56,189,248,0.25); border-radius:8px; box-shadow:0 0 22px rgba(56,189,248,0.7); transition:top 0.24s cubic-bezier(0.4,0,0.2,1), left 0.24s cubic-bezier(0.4,0,0.2,1); pointer-events:none; z-index:10; display:flex; align-items:center; justify-content:center;">
          <span style="font-size:13px; font-weight:800; color:#fff; background:rgba(2,6,23,0.85); padding:2px 8px; border-radius:6px; border:1px solid var(--accent-sky); letter-spacing:0.5px;">FENÊTRE 3×3</span>
        </div>
      </div>

      <!-- Live Calculation Text -->
      <div id="s3-calc-label" style="background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.3); border-radius:10px; padding:8px 14px; font-size:16px; color:var(--text-primary); font-family:var(--font-mono); width:100%;">
        Position (L0, C0) : Produit = <strong class="accent-sky">+85</strong>
      </div>
    </div>

    <!-- Arrow Connector 2 -->
    <div style="font-size:36px; font-weight:900; color:var(--accent-emerald); opacity:0.8; user-select:none;">➔</div>

    <!-- STAGE 3: LA SORTIE -->
    <div class="card card-emerald" style="padding:18px 22px; height:100%; display:flex; flex-direction:column; justify-content:space-between; align-items:center; text-align:center;">
      <div>
        <div style="display:inline-block; font-size:17px; font-weight:800; color:var(--accent-emerald); text-transform:uppercase; letter-spacing:1px; background:rgba(52,211,153,0.15); border:1px solid rgba(52,211,153,0.35); padding:3px 12px; border-radius:20px; margin-bottom:6px;">
          Étape 3 : La Sortie
        </div>
        <h3 style="font-size:24px; font-weight:800; color:#fff; margin:0 0 4px 0;">Feature Map (4×4)</h3>
        <p style="font-size:17px; color:var(--text-secondary); margin:0;">Carte de réponse du motif</p>
      </div>

      <!-- 4x4 Output Feature Map -->
      <div id="s3-out-grid" style="display:grid; grid-template-columns:repeat(4, 56px); grid-template-rows:repeat(4, 56px); gap:6px; padding:6px; background:rgba(15,23,42,0.95); border:2px solid var(--border-bright); border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.35);">
        <!-- 16 cells injected by JS -->
      </div>

      <!-- Dimension Formula & Detection Legend -->
      <div style="background:var(--bg-surface-2); border:1px solid var(--border-bright); border-radius:10px; padding:8px 12px; font-size:16px; line-height:1.35; color:var(--text-primary); width:100%;">
        <div style="font-weight:700; color:var(--accent-emerald); font-size:17px;">
          Taille : (6 − 3)/1 + 1 = <strong>4 × 4</strong>
        </div>
        <div id="s3-out-status" style="font-size:15px; color:var(--text-secondary); margin-top:2px;">
          Vert éclatant = motif détecté (+650)
        </div>
      </div>
    </div>

  </div>

  <!-- 4. À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:10px 28px; flex-shrink:0;">
    <p style="font-size:24px; margin:0; line-height:1.25;">
      Le filtre glisse sur l'image pour cartographier où et avec quelle force le motif apparaît.
    </p>
  </div>

</div>`;

        // 1. Render 6x6 Image Grid
        const imgGridEl = container.querySelector('#s3-img-grid');
        for (let r = 0; r < 6; r++) {
          for (let c = 0; c < 6; c++) {
            const val = img6x6[r][c];
            const cell = document.createElement('div');
            cell.style.cssText = `width:44px; height:44px; background:rgb(${val},${val},${val}); border:1px solid rgba(255,255,255,0.08); border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:12px; font-family:var(--font-mono); color:${val > 120 ? '#000' : '#fff'}; font-weight:600;`;
            cell.textContent = String(val);
            imgGridEl.appendChild(cell);
          }
        }

        // 2. Precompute the 4x4 Output values
        const outValues = [];
        for (let r = 0; r < 4; r++) {
          for (let c = 0; c < 4; c++) {
            let sum = 0;
            for (let dr = 0; dr < 3; dr++) {
              for (let dc = 0; dc < 3; dc++) {
                sum += img6x6[r + dr][c + dc] * kernel3x3[dr][dc];
              }
            }
            outValues.push(sum);
          }
        }

        // 3. Render 4x4 Feature Map Grid
        const outGridEl = container.querySelector('#s3-out-grid');
        const outCells = [];
        for (let i = 0; i < 16; i++) {
          const cell = document.createElement('div');
          cell.style.cssText = `width:56px; height:56px; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:800; background:rgba(15,23,42,0.9); color:var(--text-muted); border-radius:6px; font-family:var(--font-mono); border:1px solid var(--border-bright); transition:all 0.2s ease;`;
          cell.textContent = '·';
          outGridEl.appendChild(cell);
          outCells.push(cell);
        }

        const slidingBox = container.querySelector('#s3-sliding-box');
        const calcLabel = container.querySelector('#s3-calc-label');
        const outStatus = container.querySelector('#s3-out-status');
        const playBtn = container.querySelector('#s3-play-btn');
        const playLabel = container.querySelector('#s3-play-label');
        const stepBtn = container.querySelector('#s3-step-btn');
        const allBtn = container.querySelector('#s3-all-btn');
        const resetBtn = container.querySelector('#s3-reset-btn');

        let curStep = 0;
        let isPlaying = false;
        let playInterval = null;

        function updateStep(stepIdx) {
          curStep = stepIdx;
          const r = Math.floor(curStep / 4);
          const c = curStep % 4;

          // Animate sliding window position (44px cell + 2px gap = 46px per step)
          slidingBox.style.top = `${4 + r * 46}px`;
          slidingBox.style.left = `${4 + c * 46}px`;

          const val = outValues[curStep];

          // Update active cell in 4x4 output grid
          outCells.forEach((cell, idx) => {
            if (idx === curStep) {
              cell.style.border = '2px solid var(--accent-sky)';
              cell.style.boxShadow = '0 0 16px var(--accent-sky)';
            } else {
              cell.style.border = '1px solid var(--border-bright)';
              cell.style.boxShadow = 'none';
            }
          });

          // Fill current and all past cells up to curStep
          for (let i = 0; i <= curStep; i++) {
            const v = outValues[i];
            const cell = outCells[i];
            cell.textContent = v > 0 ? `+${v}` : `${v}`;
            if (v >= 500) {
              // High response (edge detected!)
              cell.style.background = 'rgba(52, 211, 153, 0.85)';
              cell.style.color = '#000';
              cell.style.fontWeight = '900';
            } else if (v > 0) {
              cell.style.background = 'rgba(52, 211, 153, 0.35)';
              cell.style.color = '#fff';
            } else {
              cell.style.background = 'rgba(15, 23, 42, 0.9)';
              cell.style.color = 'var(--text-muted)';
            }
          }

          // Label update
          calcLabel.innerHTML = `Position (L${r}, C${c}) ➔ Somme = <strong class="${val >= 500 ? 'accent-emerald' : 'accent-sky'}">${val > 0 ? '+' : ''}${val}</strong> ${val >= 500 ? '🎯 (Contour trouvé !)' : ''}`;

          if (curStep >= 15) {
            outStatus.innerHTML = `<strong class="accent-emerald">✅ Feature Map 4×4 complète !</strong>`;
            if (isPlaying) {
              stopPlay();
            }
          } else {
            outStatus.textContent = `Calcul en cours : cellule ${curStep + 1} / 16`;
          }
        }

        function startPlay() {
          if (curStep >= 15) {
            resetAll();
          }
          isPlaying = true;
          playLabel.textContent = '⏸ Mettre en pause';
          playInterval = setInterval(() => {
            if (curStep < 15) {
              updateStep(curStep + 1);
            } else {
              stopPlay();
            }
          }, 450);
        }

        function stopPlay() {
          isPlaying = false;
          playLabel.textContent = '▶ Lancer le glissement';
          if (playInterval) {
            clearInterval(playInterval);
            playInterval = null;
          }
        }

        function resetAll() {
          stopPlay();
          curStep = 0;
          outCells.forEach(cell => {
            cell.textContent = '·';
            cell.style.background = 'rgba(15, 23, 42, 0.9)';
            cell.style.color = 'var(--text-muted)';
            cell.style.border = '1px solid var(--border-bright)';
            cell.style.boxShadow = 'none';
          });
          slidingBox.style.top = '4px';
          slidingBox.style.left = '4px';
          updateStep(0);
        }

        playBtn.addEventListener('click', () => {
          if (isPlaying) {
            stopPlay();
          } else {
            startPlay();
          }
        });

        stepBtn.addEventListener('click', () => {
          stopPlay();
          if (curStep < 15) {
            updateStep(curStep + 1);
          } else {
            updateStep(0);
          }
        });

        allBtn.addEventListener('click', () => {
          stopPlay();
          for (let i = 0; i <= 15; i++) {
            updateStep(i);
          }
        });

        resetBtn.addEventListener('click', resetAll);

        // Initial render at step 0
        updateStep(0);

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur Les 3 étapes :</strong> ${err.message}</div></div>`;
        console.error('[Slide 8 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    La convolution repose sur une chorégraphie en 3 temps fondamentaux :
    1. <strong>Le Motif (Filtre)</strong> : Une petite grille d'exploration qui définit ce que l'on recherche (ici, une transition verticale de contraste).
    2. <strong>Le Glissement (Stride)</strong> : Ce motif parcourt l'image pixel par pixel, comme une loupe méthodique qui inspecte chaque recoin sans rien manquer.
    3. <strong>La Sortie (Feature Map)</strong> : Chaque arrêt de la loupe génère une note d'intensité résumant si le motif a été trouvé à cet endroit exact.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Dans le projet BrainScan, ce ne sont pas des filtres statiques codés à la main mais des dizaines de filtres appris automatiquement qui glissent sur l'IRM pour révéler la forme des hémisphères, les plissements corticaux et la délimitation précise des masses cancéreuses.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Cliquez sur « Lancer le glissement » pour observer l'animation fluide de la fenêtre glissante 3×3 sur l'IRM cérébrale et la construction en direct de la Feature Map 4×4.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 9 — Simulateur de convolution (ONE-IDEA: Simulator only)
     Input 8x8 + live math + output 6x6.
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Simulateur de convolution",

    render(container) {
      try {
        const brain8x8 = [
          [15, 18, 22, 20, 18, 15, 12, 10],
          [20, 75, 82, 80, 85, 78, 65, 18],
          [22, 80, 95, 110, 105, 88, 72, 20],
          [18, 85, 115, 230, 245, 95, 80, 18],
          [20, 82, 110, 235, 240, 92, 76, 22],
          [24, 78, 92, 105, 100, 85, 70, 20],
          [18, 65, 72, 75, 70, 68, 55, 15],
          [10, 12, 15, 18, 15, 12, 10, 8]
        ];

        const filters = {
          vertical: [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]],
          horizontal: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
          blob: [[0, 1, 0], [1, -4, 1], [0, 1, 0]]
        };

        let curFlt = 'vertical';
        let r = 0, c = 0;
        let timer = null;
        const outGrid = Array(6).fill(0).map(() => Array(6).fill(null));

        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">

  <!-- HEADER -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Simulateur de convolution</h1>
    <div class="slide-sub">
      Calcul en direct et partage de poids <span class="term-en">(Weight Sharing)</span>
    </div>
  </div>

  <!-- CONTROLS ROW (min-height 56px, font 24px) -->
  <div style="display:flex; justify-content:space-between; align-items:center; flex-shrink:0;">
    <div style="display:flex; gap:12px;">
      <button class="res-pill active" id="w9-f-vert">| Vertical</button>
      <button class="res-pill" id="w9-f-horz">— Horizontal</button>
      <button class="res-pill" id="w9-f-blob">⦿ Blob</button>
    </div>
    <div style="display:flex; gap:12px;">
      <button class="top-btn" id="w9-step" style="min-height:56px; font-size:24px; font-weight:700; background:var(--bg-surface-2); border-color:var(--accent-sky); color:var(--accent-sky); padding:10px 24px; border-radius:12px;">
        ⏭ Pas à pas
      </button>
      <button class="top-btn" id="w9-play" style="min-height:56px; font-size:24px; font-weight:800; background:var(--accent-sky); color:#000; border:none; padding:10px 24px; border-radius:12px;">
        ▶ Lecture
      </button>
      <button class="btn-reset" id="w9-reset">↺ Réinitialiser</button>
    </div>
  </div>

  <!-- MAIN SIMULATOR VISUAL (Input 8x8, Math, Output 6x6) -->
  <div style="display:grid; grid-template-columns:auto 1fr auto; gap:24px; align-items:center; flex:1; min-height:0;">

    <!-- Input 8x8 -->
    <div class="card" style="display:flex; flex-direction:column; align-items:center; padding:16px; gap:8px;">
      <span style="font-size:24px; font-weight:700; color:var(--accent-sky);">Entrée IRM (8×8)</span>
      <div class="sim-grid-8x8" id="w9-grid-in" style="grid-template-columns:repeat(8, 48px); gap:4px;"></div>
    </div>

    <!-- Math sum in center -->
    <div class="card card-sky" style="display:flex; flex-direction:column; justify-content:center; align-items:center; padding:24px; gap:16px; text-align:center;">
      <span style="font-size:24px; color:var(--text-secondary);">9 multiplications ➔ Somme locale :</span>
      <div class="mono" id="w9-math-total" style="font-size:56px; font-weight:900; color:var(--accent-amber);">0</div>
      <div style="font-size:24px; color:var(--accent-amber); font-weight:700;">
        ⭐ Partage de poids : 9 nombres réutilisés sur les 36 positions.
      </div>
    </div>

    <!-- Output 6x6 -->
    <div class="card card-emerald" style="display:flex; flex-direction:column; align-items:center; padding:16px; gap:8px;">
      <span style="font-size:24px; font-weight:700; color:var(--accent-emerald);">Feature Map (6×6)</span>
      <div class="sim-output-6x6" id="w9-grid-out" style="grid-template-columns:repeat(6, 52px); gap:4px;"></div>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Le partage de poids réutilise les mêmes paramètres partout, économisant mémoire et calcul.
    </p>
  </div>

</div>`;

        const gridInEl = container.querySelector('#w9-grid-in');
        const gridOutEl = container.querySelector('#w9-grid-out');
        const totalEl = container.querySelector('#w9-math-total');
        const stepBtn = container.querySelector('#w9-step');
        const playBtn = container.querySelector('#w9-play');
        const resetBtn = container.querySelector('#w9-reset');
        const btnV = container.querySelector('#w9-f-vert');
        const btnH = container.querySelector('#w9-f-horz');
        const btnB = container.querySelector('#w9-f-blob');

        // Build 8x8 input
        gridInEl.innerHTML = '';
        for (let ir = 0; ir < 8; ir++) {
          for (let ic = 0; ic < 8; ic++) {
            const v = brain8x8[ir][ic];
            const d = document.createElement('div');
            d.className = 'sim-cell-in';
            d.dataset.r = ir;
            d.dataset.c = ic;
            d.style.width = '48px';
            d.style.height = '48px';
            d.style.fontSize = '24px';
            d.style.backgroundColor = `rgb(${v},${v},${v})`;
            d.style.color = v > 130 ? '#000' : '#fff';
            d.textContent = v;
            gridInEl.appendChild(d);
          }
        }

        // Build 6x6 output
        gridOutEl.innerHTML = '';
        for (let or = 0; or < 6; or++) {
          for (let oc = 0; oc < 6; oc++) {
            const d = document.createElement('div');
            d.className = 'sim-cell-out';
            d.dataset.r = or;
            d.dataset.c = oc;
            d.style.width = '52px';
            d.style.height = '52px';
            d.style.fontSize = '24px';
            d.textContent = '-';
            gridOutEl.appendChild(d);
          }
        }

        function stepSim(targetR, targetC) {
          r = targetR;
          c = targetC;
          const k = filters[curFlt];
          let sum = 0;
          for (let kr = 0; kr < 3; kr++) {
            for (let kc = 0; kc < 3; kc++) {
              sum += brain8x8[r + kr][c + kc] * k[kr][kc];
            }
          }
          outGrid[r][c] = sum;
          totalEl.textContent = sum;

          // Highlight input 3x3 window
          gridInEl.querySelectorAll('.sim-cell-in').forEach(cell => {
            const cr = parseInt(cell.dataset.r, 10);
            const cc = parseInt(cell.dataset.c, 10);
            if (isNaN(cr) || isNaN(cc)) return;
            cell.classList.toggle('window-active', cr >= r && cr < r + 3 && cc >= c && cc < c + 3);
          });

          // Update output
          gridOutEl.querySelectorAll('.sim-cell-out').forEach(cell => {
            const cr = parseInt(cell.dataset.r, 10);
            const cc = parseInt(cell.dataset.c, 10);
            if (isNaN(cr) || isNaN(cc) || !outGrid[cr]) return;
            const val = outGrid[cr][cc];
            cell.textContent = val !== null ? val : '-';
            cell.classList.toggle('filled', val !== null);
            cell.classList.toggle('current', cr === r && cc === c);
          });
        }

        function advance() {
          let nc = c + 1;
          let nr = r;
          if (nc >= 6) { nc = 0; nr++; }
          if (nr >= 6) {
            clearInterval(timer);
            timer = null;
            playBtn.textContent = '▶ Lecture';
            return;
          }
          stepSim(nr, nc);
        }

        stepBtn.addEventListener('click', () => {
          if (timer) { clearInterval(timer); timer = null; playBtn.textContent = '▶ Lecture'; }
          advance();
        });

        playBtn.addEventListener('click', () => {
          if (timer) {
            clearInterval(timer);
            timer = null;
            playBtn.textContent = '▶ Lecture';
          } else {
            playBtn.textContent = '⏸ Pause';
            timer = setInterval(advance, 300);
          }
        });

        resetBtn.addEventListener('click', () => {
          if (timer) { clearInterval(timer); timer = null; playBtn.textContent = '▶ Lecture'; }
          for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) outGrid[i][j] = null;
          stepSim(0, 0);
        });

        function setFlt(name) {
          curFlt = name;
          btnV.classList.toggle('active', name === 'vertical');
          btnH.classList.toggle('active', name === 'horizontal');
          btnB.classList.toggle('active', name === 'blob');
          if (timer) { clearInterval(timer); timer = null; playBtn.textContent = '▶ Lecture'; }
          for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) outGrid[i][j] = null;
          stepSim(0, 0);
        }

        btnV.addEventListener('click', () => setFlt('vertical'));
        btnH.addEventListener('click', () => setFlt('horizontal'));
        btnB.addEventListener('click', () => setFlt('blob'));

        stepSim(0, 0);

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur simulateur :</strong> ${err.message}</div></div>`;
        console.error('[Slide 9 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Le principe fondamental est le « partage de poids » (Weight Sharing) : le même jeu de 9 poids glisse sur l'ensemble de l'image, sans nécessiter de nouveaux paramètres pour chaque pixel exploré.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Une image 8×8 scannée avec un filtre 3×3 génère une carte de caractéristiques 6×6, localisant précisément les anomalies grâce au filtre adapté.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Utilisez les boutons de lecture pas-à-pas ou testez différents filtres (Blob, Contours) pour observer la construction en direct de la carte.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 10 — Feature Map, Stride et Padding (ONE-IDEA)
     Widget toggles P=0/1 and S=1/2 + formula line under widget.
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Pas et Rembourrage",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:32px; height:100%; justify-content:space-between;">

  <!-- HEADER -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Pas et Rembourrage</h1>
    <div class="slide-sub">
      Contrôler la dimension spatiale <span class="term-en">(Stride & Padding)</span>
    </div>
  </div>

  <!-- MAIN WIDGET: CONTROLS + GRIDS + FORMULA LINE -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:28px; flex:1; justify-content:center;">

    <!-- Controls Row (min-height 56px, font 24px) -->
    <div style="display:flex; gap:20px; flex-wrap:wrap; justify-content:center;">
      <button class="res-pill active" id="w10-p0">P = 0 (Valid)</button>
      <button class="res-pill" id="w10-p1">P = 1 (Same — bordure zéro)</button>
      <button class="res-pill active" id="w10-s1">S = 1 (Pas 1)</button>
      <button class="res-pill" id="w10-s2">S = 2 (Pas 2)</button>
      <button class="btn-reset" id="w10-reset">↺ Réinitialiser</button>
    </div>

    <!-- Live Grids Comparison -->
    <div style="display:flex; align-items:center; justify-content:center; gap:48px; width:100%;">

      <!-- Input Grid -->
      <div class="card" style="display:flex; flex-direction:column; align-items:center; padding:20px; gap:12px;">
        <span style="font-size:24px; font-weight:700; color:var(--accent-sky);" id="w10-in-label">Entrée brute (8×8)</span>
        <div class="pad-grid-wrapper" id="w10-pad-grid"></div>
      </div>

      <span style="font-size:48px; font-weight:900; color:var(--accent-sky);">➔</span>

      <!-- Output Grid -->
      <div class="card card-emerald" style="display:flex; flex-direction:column; align-items:center; padding:20px; gap:12px;">
        <span style="font-size:24px; font-weight:700; color:var(--accent-emerald);" id="w10-out-label">Sortie : 6 × 6</span>
        <div class="out-grid-display" id="w10-out-grid"></div>
      </div>

    </div>

    <!-- Two-Tier Formula Container: General Formula + Dynamic Numerical Application -->
    <div style="display:flex; flex-direction:column; align-items:center; gap:8px; width:100%; max-width:1100px;">
      
      <!-- Tier 1: Formule Théorique Générale -->
      <div style="display:flex; align-items:center; justify-content:space-between; width:100%; background:var(--bg-surface); padding:8px 24px; border-radius:10px; border:1px solid var(--border-bright); font-size:22px;">
        <span style="color:var(--accent-sky); font-weight:700;">📐 Formule générale :</span>
        <span class="mono" style="font-size:24px; font-weight:700; color:#fff;">
          Sortie = ⌊(W − F + 2P) / S⌋ + 1
        </span>
        <span style="font-size:18px; color:var(--text-muted);">
          (W: entrée, F: filtre, P: padding, S: stride)
        </span>
      </div>

      <!-- Tier 2: Application Numérique Dynamique -->
      <div class="mono" style="width:100%; display:flex; align-items:center; justify-content:center; gap:16px; font-size:24px; background:rgba(15,23,42,0.9); padding:10px 24px; border-radius:10px; border:1px solid var(--accent-emerald);">
        <span style="color:var(--accent-emerald); font-weight:700; font-family:var(--font-body); font-size:20px;">🔢 Application numérique :</span>
        <span>⌊(8 − 3 + 2×<span class="accent-emerald" id="w10-p-val">0</span>) / <span class="accent-indigo" id="w10-s-val">1</span>⌋ + 1 = </span>
        <strong class="accent-emerald" id="w10-res-val" style="font-size:28px;">6 × 6</strong>
      </div>

    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Le Padding protège les bordures de l'image, tandis que le Stride réduit la résolution.
    </p>
  </div>

</div>`;

        let P = 0, S = 1;
        const W = 8, F = 3;

        const p0Btn = container.querySelector('#w10-p0');
        const p1Btn = container.querySelector('#w10-p1');
        const s1Btn = container.querySelector('#w10-s1');
        const s2Btn = container.querySelector('#w10-s2');
        const resetBtn = container.querySelector('#w10-reset');

        const inLabel = container.querySelector('#w10-in-label');
        const outLabel = container.querySelector('#w10-out-label');
        const pGrid = container.querySelector('#w10-pad-grid');
        const oGrid = container.querySelector('#w10-out-grid');
        const pValEl = container.querySelector('#w10-p-val');
        const sValEl = container.querySelector('#w10-s-val');
        const resValEl = container.querySelector('#w10-res-val');

        function update() {
          p0Btn.classList.toggle('active', P === 0);
          p1Btn.classList.toggle('active', P === 1);
          s1Btn.classList.toggle('active', S === 1);
          s2Btn.classList.toggle('active', S === 2);

          const out = outSize(W, F, P, S);
          pValEl.textContent = P;
          sValEl.textContent = S;
          resValEl.textContent = `${out} × ${out}`;
          outLabel.textContent = `Sortie : ${out} × ${out}`;

          // Input grid
          const dim = P === 1 ? 10 : 8;
          pGrid.style.gridTemplateColumns = `repeat(${dim}, 36px)`;
          pGrid.innerHTML = '';
          for (let r = 0; r < dim; r++) {
            for (let c = 0; c < dim; c++) {
              const isPad = (P === 1) && (r === 0 || r === dim - 1 || c === 0 || c === dim - 1);
              const cell = document.createElement('div');
              cell.className = `pad-cell ${isPad ? 'pad-zero' : ''}`;
              cell.style.width = '36px';
              cell.style.height = '36px';
              cell.style.fontSize = '24px';
              cell.textContent = isPad ? '0' : '•';
              pGrid.appendChild(cell);
            }
          }
          inLabel.innerHTML = P === 1 ? `Entrée <span class="accent-emerald">avec Padding (10×10)</span>` : `Entrée brute (8×8)`;

          // Output grid
          oGrid.style.gridTemplateColumns = `repeat(${out}, ${out > 6 ? 42 : 52}px)`;
          oGrid.innerHTML = '';
          for (let i = 0; i < out * out; i++) {
            const cell = document.createElement('div');
            cell.className = 'out-grid-cell';
            cell.style.width = `${out > 6 ? 42 : 52}px`;
            cell.style.height = `${out > 6 ? 42 : 52}px`;
            cell.style.fontSize = '24px';
            cell.textContent = i + 1;
            oGrid.appendChild(cell);
          }
        }

        p0Btn.addEventListener('click', () => { P = 0; update(); });
        p1Btn.addEventListener('click', () => { P = 1; update(); });
        s1Btn.addEventListener('click', () => { S = 1; update(); });
        s2Btn.addEventListener('click', () => { S = 2; update(); });
        resetBtn.addEventListener('click', () => { P = 0; S = 1; update(); });

        update();

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 10 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 10 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Le Rembourrage (Padding) est comme un cadre protecteur de zéros ajouté autour de l'image pour éviter que les bords ne s'érodent. Le Pas (Stride) représente la foulée du filtre : faire des pas de 2 pixels réduit immédiatement la résolution de sortie de moitié.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Le contrôle combiné du Stride et du Padding permet de préserver la résolution spatiale dans les premières couches ou d'accélérer la réduction dimensionnelle selon les besoins.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Modifiez les paramètres P (0 ou 1) et S (1 ou 2) pour vérifier en temps réel la formule de dimension de sortie.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 11 — Défi #3 — ReLU et Max Pooling
     4x4 matrix with negative & positive numbers.
     Two-step voting:
       Step 1: What happens to negative values after ReLU?
       Step 2: Which 4 numbers survive a 2x2 Max Pooling?
     ONE-IDEA: Max 40 words, fonts >= 24px, buttons >= 56px.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Défi #3 — ReLU et Max Pooling",

    render(container) {
      try {
        const raw4x4 = [
          [12, -8, 25, -3],
          [-15, 4, -2, 18],
          [-5, 30, 14, -9],
          [7, -1, -11, 42]
        ];

        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div class="defi-header" style="flex-shrink:0;">
    <div class="defi-badge">⚡ Défi Interactif #3</div>
    <div style="font-size:var(--fs-sm); color:var(--text-secondary);">
      Activation & Sous-échantillonnage <span class="term-en">(ReLU & Max Pooling)</span>
    </div>
  </div>

  <!-- Main interactive content -->
  <div style="display:flex; align-items:center; justify-content:center; gap:40px; flex:1; min-height:0;">

    <!-- Left: 4x4 Matrix Display -->
    <div class="card" style="display:flex; flex-direction:column; align-items:center; gap:12px; padding:20px;">
      <span style="font-size:24px; font-weight:700; color:var(--accent-sky);" id="d3-matrix-title">
        Matrice après convolution (4×4)
      </span>
      <div class="matrix-4x4" id="d3-grid-4x4"></div>
      <div style="display:flex; gap:16px; font-size:24px;">
        <span style="color:var(--accent-emerald);">🟢 Positifs</span>
        <span style="color:var(--accent-rose);">🔴 Négatifs</span>
      </div>
    </div>

    <!-- Right: Voting Questions Container -->
    <div style="display:flex; flex-direction:column; gap:16px; width:100%; max-width:850px;">

      <!-- Question 1 -->
      <div id="d3-step1-box" style="display:flex; flex-direction:column; gap:12px;">
        <div class="defi-question" style="font-size:30px;">
          1. Que deviennent les <span class="accent-rose">valeurs négatives</span> après la fonction ReLU ?
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <button class="choice-btn" id="d3-q1-a" data-ans="zero" style="min-height:56px; padding:12px; font-size:24px;">
            A. Elles deviennent 0
          </button>
          <button class="choice-btn" id="d3-q1-b" data-ans="pos" style="min-height:56px; padding:12px; font-size:24px;">
            B. Elles deviennent positives (+8, +15)
          </button>
          <button class="choice-btn" id="d3-q1-c" data-ans="same" style="min-height:56px; padding:12px; font-size:24px;">
            C. Elles restent inchangées
          </button>
          <button class="choice-btn" id="d3-q1-d" data-ans="double" style="min-height:56px; padding:12px; font-size:24px;">
            D. Elles sont doublées
          </button>
        </div>
      </div>

      <!-- Question 2 (Hidden until Step 1 answered) -->
      <div id="d3-step2-box" style="display:none; flex-direction:column; gap:12px; animation:fadeIn 0.3s ease;">
        <div class="defi-question" style="font-size:30px;">
          2. Quelles <span class="accent-emerald">4 valeurs</span> survivent à un Max Pooling 2×2 ?
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
          <button class="choice-btn" id="d3-q2-a" data-ans="correct" style="min-height:56px; padding:12px; font-size:24px;">
            Set 1 : [12, 25, 30, 42]
          </button>
          <button class="choice-btn" id="d3-q2-b" data-ans="min" style="min-height:56px; padding:12px; font-size:24px;">
            Set 2 : [0, 0, 0, 0]
          </button>
          <button class="choice-btn" id="d3-q2-c" data-ans="avg" style="min-height:56px; padding:12px; font-size:24px;">
            Set 3 : [4, 8, 9, 14]
          </button>
        </div>
      </div>

      <!-- Live Feedback -->
      <div id="d3-feedback" class="defi-feedback" style="min-height:60px; font-size:24px; padding:12px 24px;">
        ← Cliquez sur une réponse pour tester l'effet du ReLU.
      </div>

    </div>

  </div>

  <!-- Actions -->
  <div class="defi-actions" style="flex-shrink:0;">
    <button class="btn-reset" id="d3-reset">↺ Réinitialiser</button>
    <button class="btn-reveal" id="d3-reveal">Slide suivante ➜</button>
  </div>

</div>`;

        const grid4x4 = container.querySelector('#d3-grid-4x4');
        const matrixTitle = container.querySelector('#d3-matrix-title');
        const step1Box = container.querySelector('#d3-step1-box');
        const step2Box = container.querySelector('#d3-step2-box');
        const feedbackEl = container.querySelector('#d3-feedback');
        const resetBtn = container.querySelector('#d3-reset');
        const revealBtn = container.querySelector('#d3-reveal');

        function renderGrid(applyRelu = false, highlightMax = false) {
          grid4x4.innerHTML = '';
          for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
              let val = raw4x4[r][c];
              if (applyRelu) val = Math.max(0, val);

              const cell = document.createElement('div');
              cell.className = 'cell-val';
              if (r < 2 && c < 2) cell.classList.add('quad-tl');
              else if (r < 2 && c >= 2) cell.classList.add('quad-tr');
              else if (r >= 2 && c < 2) cell.classList.add('quad-bl');
              else cell.classList.add('quad-br');

              if (!applyRelu && val < 0) cell.classList.add('cell-neg');
              if (applyRelu && val === 0) cell.classList.add('cell-zero');

              if (highlightMax && ((r === 0 && c === 0) || (r === 0 && c === 2) || (r === 2 && c === 1) || (r === 3 && c === 3))) {
                cell.classList.add('cell-max');
              }

              cell.textContent = val;
              grid4x4.appendChild(cell);
            }
          }
        }

        renderGrid(false);

        step1Box.querySelectorAll('.choice-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const ans = btn.dataset.ans;
            const ok = ans === 'zero';

            step1Box.querySelectorAll('.choice-btn').forEach(b => {
              b.disabled = true;
              if (b.dataset.ans === 'zero') b.classList.add('correct');
              else if (b === btn) b.classList.add('wrong');
            });

            if (ok) {
              feedbackEl.className = 'defi-feedback shown feedback-ok';
              feedbackEl.innerHTML = '✅ Exact ! ReLU(x) = max(0, x). Les négatifs s\'éteignent à 0, les positifs restent intacts.';
            } else {
              feedbackEl.className = 'defi-feedback shown feedback-bad';
              feedbackEl.innerHTML = '💡 Non : ReLU met tous les négatifs à 0 et conserve les positifs intacts.';
            }

            renderGrid(true);
            matrixTitle.innerHTML = 'Matrice après <span class="accent-sky">ReLU</span> (4×4)';
            step2Box.style.display = 'flex';
          });
        });

        step2Box.querySelectorAll('.choice-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const ans = btn.dataset.ans;
            const ok = ans === 'correct';

            step2Box.querySelectorAll('.choice-btn').forEach(b => {
              b.disabled = true;
              if (b.dataset.ans === 'correct') b.classList.add('correct');
              else if (b === btn) b.classList.add('wrong');
            });

            if (ok) {
              feedbackEl.className = 'defi-feedback shown feedback-ok';
              feedbackEl.innerHTML = '✅ Parfait ! Chaque quadrant 2×2 conserve sa valeur maximale : 12, 25, 30 et 42.';
            } else {
              feedbackEl.className = 'defi-feedback shown feedback-bad';
              feedbackEl.innerHTML = '💡 Max Pooling retient le maximum de chaque fenêtre 2×2 : [12, 25, 30, 42].';
            }

            renderGrid(true, true);
            revealBtn.classList.add('visible');
          });
        });

        resetBtn.addEventListener('click', () => {
          renderGrid(false);
          matrixTitle.textContent = 'Matrice après convolution (4×4)';
          step1Box.querySelectorAll('.choice-btn').forEach(b => {
            b.disabled = false;
            b.classList.remove('correct', 'wrong');
          });
          step2Box.querySelectorAll('.choice-btn').forEach(b => {
            b.disabled = false;
            b.classList.remove('correct', 'wrong');
          });
          step2Box.style.display = 'none';
          feedbackEl.className = 'defi-feedback';
          feedbackEl.textContent = '← Cliquez sur une réponse pour tester l\'effet du ReLU.';
          revealBtn.classList.remove('visible');
        });

        revealBtn.addEventListener('click', () => {
          STATE.goTo(11);
        });

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur Défi #3 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 11 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    ReLU agit comme un filtre sélectif qui élimine tous les signaux négatifs (le bruit de fond) pour ne conserver que les activations positives. Le Max Pooling agit ensuite comme un condensateur qui ne retient que le point culminant de chaque région.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    L'enchaînement Conv -> ReLU -> Pooling est le bloc élémentaire des CNN : il nettoie les activations et condense l'information spatiale.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Répondez aux deux étapes du vote pour observer d'abord la mise à zéro des valeurs négatives, puis la sélection des maxima par bloc 2×2.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 12 — ReLU : la non-linéarité
     ONE-IDEA: ReLU keeps positives, zeroes negatives.
     Interactive SVG plot of f(x) = max(0, x) with draggable slider.
     One sentence: without non-linearity, layers collapse into 1 linear layer.
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "ReLU : la non-linéarité",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:28px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">ReLU : la non-linéarité</h1>
    <div class="slide-sub">
      Unité linéaire rectifiée <span class="term-en">(Rectified Linear Unit / Activation Function)</span>
    </div>
  </div>

  <!-- THEORETICAL FORMULA BOX -->
  <div style="background:var(--bg-surface); border:1px solid var(--border-bright); padding:8px 24px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; width:100%; max-width:1400px; margin:0 auto; flex-shrink:0;">
    <div style="display:flex; align-items:center; gap:16px;">
      <span style="color:var(--accent-sky); font-weight:700; font-size:22px;">📐 Définition formelle :</span>
      <span class="mono" style="color:#fff; font-size:24px; font-weight:700;">f(x) = max(0, x)</span>
      <span style="color:var(--text-secondary); font-size:20px;">= { x si x &gt; 0, 0 si x ≤ 0 }</span>
    </div>
    <div style="font-size:20px; color:var(--accent-emerald); font-weight:600;">
      Dérivée : f'(x) = 1 si x &gt; 0 (Évite l'évanouissement du gradient)
    </div>
  </div>

  <!-- Interactive SVG Plot & Controls -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:16px; flex:1; justify-content:center;">

    <div style="display:flex; align-items:center; justify-content:center; gap:48px; width:100%; max-width:1400px;">

      <!-- SVG Curve Plot -->
      <div class="card" style="padding:20px; display:flex; flex-direction:column; align-items:center; background:#0f172a;">
        <svg width="560" height="300" viewBox="0 0 560 300" id="relu-svg" style="overflow:visible;">
          <line x1="60" y1="220" x2="520" y2="220" stroke="#334155" stroke-width="2"/>
          <line x1="280" y1="40" x2="280" y2="260" stroke="#334155" stroke-width="2"/>
          <text x="525" y="226" fill="#94a3b8" font-size="24" font-family="sans-serif">x</text>
          <text x="285" y="32" fill="#94a3b8" font-size="24" font-family="sans-serif">f(x)</text>
          <line x1="80" y1="220" x2="280" y2="220" stroke="#fb7185" stroke-width="5" stroke-linecap="round"/>
          <line x1="280" y1="220" x2="480" y2="60" stroke="#34d399" stroke-width="5" stroke-linecap="round"/>
          <text x="268" y="246" fill="#64748b" font-size="24" font-family="monospace">0</text>
          <circle id="relu-pt" cx="360" cy="156" r="10" fill="#38bdf8" stroke="#fff" stroke-width="3" style="filter:drop-shadow(0 0 8px #38bdf8);"/>
        </svg>
      </div>

      <!-- Controls & Live Badges -->
      <div style="display:flex; flex-direction:column; gap:20px; width:100%; max-width:540px;">

        <div class="card card-sky" style="padding:24px; display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:26px; font-weight:700;">Valeur d'entrée x :</span>
            <span class="mono" id="relu-x-disp" style="font-size:36px; font-weight:900; color:var(--accent-sky);">+4</span>
          </div>
          <input type="range" class="custom-slider" id="relu-slider" min="-10" max="10" step="1" value="4">
          <div style="display:flex; justify-content:space-between; font-size:24px; color:var(--text-muted);">
            <span>-10 (Négatif)</span>
            <span>0</span>
            <span>+10 (Positif)</span>
          </div>
        </div>

        <div class="card" id="relu-out-card" style="padding:24px; display:flex; align-items:center; justify-content:space-between; border-color:var(--accent-emerald);">
          <span style="font-size:26px; font-weight:700;">Sortie ReLU(x) :</span>
          <span class="mono" id="relu-y-disp" style="font-size:40px; font-weight:900; color:var(--accent-emerald);">4</span>
        </div>

      </div>

    </div>

    <!-- Sentence & Reset -->
    <div style="display:flex; align-items:center; gap:24px;">
      <div style="font-size:26px; color:var(--accent-amber); background:#fbbf2415; padding:12px 28px; border-radius:12px; border:1px solid var(--accent-amber);">
        Sans non-linéarité, empiler des couches équivaut à une seule transformation linéaire.
      </div>
      <button class="btn-reset" id="relu-reset">↺ Réinitialiser</button>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      La fonction ReLU élimine les signaux négatifs et permet au réseau d'apprendre des formes complexes.
    </p>
  </div>

</div>`;

        const slider = container.querySelector('#relu-slider');
        const xDisp = container.querySelector('#relu-x-disp');
        const yDisp = container.querySelector('#relu-y-disp');
        const pt = container.querySelector('#relu-pt');
        const outCard = container.querySelector('#relu-out-card');
        const resetBtn = container.querySelector('#relu-reset');

        function update(x) {
          const y = Math.max(0, x);
          xDisp.textContent = x > 0 ? `+${x}` : `${x}`;
          xDisp.style.color = x < 0 ? 'var(--accent-rose)' : 'var(--accent-sky)';

          yDisp.textContent = y;
          if (x < 0) {
            yDisp.style.color = 'var(--accent-rose)';
            outCard.style.borderColor = 'var(--accent-rose)';
          } else {
            yDisp.style.color = 'var(--accent-emerald)';
            outCard.style.borderColor = 'var(--accent-emerald)';
          }

          const cx = 280 + x * 20;
          const cy = 220 - y * 16;
          pt.setAttribute('cx', cx);
          pt.setAttribute('cy', cy);
          pt.setAttribute('fill', x < 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)');
        }

        slider.addEventListener('input', e => update(parseInt(e.target.value, 10)));
        resetBtn.addEventListener('click', () => {
          slider.value = 0;
          update(0);
        });

        update(4);

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 12 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 12 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Sans fonction d'activation non-linéaire comme ReLU (max(0, x)), empiler 50 couches de convolution équivaudrait mathématiquement à une seule couche linéaire (car une composition de fonctions affines reste affine).
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    La non-linéarité permet au réseau d'apprendre des frontières de décision complexes et sinueuses, indispensables pour séparer les sous-types de tumeurs cérébrales.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Déplacez le curseur d'entrée pour constater que toute valeur négative est ramenée à 0, tandis que les valeurs positives croissent linéairement.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 13 — Pooling : réduire sans perdre l'essentiel
     ONE-IDEA: Downsampling reduces spatial resolution while keeping salient features.
     Widget: 4x4 matrix with 4 step buttons:
       "Brut", "Après ReLU", "Max Pooling 2x2", "Average Pooling 2x2".
     Color-coded quadrants and live sentence.
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Pooling : réduire sans perdre l'essentiel",

    render(container) {
      try {
        const mat = [
          [12, -8, 25, -3],
          [-15, 4, -2, 18],
          [-5, 30, 14, -9],
          [7, -1, -11, 42]
        ];

        container.innerHTML = `
<div class="slide-content" style="gap:28px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Pooling : réduire sans perdre l'essentiel</h1>
    <div class="slide-sub">
      Le sous-échantillonnage spatial <span class="term-en">(Downsampling & Pooling Layer)</span>
    </div>
  </div>

  <!-- THEORETICAL FORMULA BOX -->
  <div style="background:var(--bg-surface); border:1px solid var(--border-bright); padding:8px 24px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; width:100%; max-width:1300px; margin:0 auto; flex-shrink:0;">
    <div style="display:flex; align-items:center; gap:16px;">
      <span style="color:var(--accent-sky); font-weight:700; font-size:22px;">📐 Opérateur & Dimension :</span>
      <span class="mono" style="color:#fff; font-size:22px; font-weight:700;">y = max<sub>(i,j)∈R</sub>(x<sub>i,j</sub>)</span>
      <span style="color:var(--text-secondary); font-size:20px;">| Sortie = ⌊(W − F)/S⌋ + 1</span>
    </div>
    <div style="font-size:20px; color:var(--accent-emerald); font-weight:600;">
      Max Pooling 2×2 (stride 2) : divise résolution par 2 (surface ÷ 4)
    </div>
  </div>

  <!-- Interactive Controls + Matrix -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:16px; flex:1; justify-content:center;">

    <!-- 4 Step Buttons (min-height 56px, font 24px) -->
    <div style="display:flex; gap:16px; flex-wrap:wrap; justify-content:center;" id="p13-btns">
      <button class="res-pill active" data-mode="brut">1. Brut (4×4)</button>
      <button class="res-pill" data-mode="relu">2. Après ReLU</button>
      <button class="res-pill" data-mode="max">3. Max Pooling (2×2)</button>
      <button class="res-pill" data-mode="avg">4. Average Pooling (2×2)</button>
    </div>

    <!-- Centered Visual Area -->
    <div style="display:flex; align-items:center; justify-content:center; gap:40px; width:100%; max-width:1100px;">

      <div class="card" style="padding:24px; display:flex; flex-direction:column; align-items:center; gap:16px;">
        <span style="font-size:24px; font-weight:700; color:var(--accent-sky);" id="p13-grid-title">
          Carte 4×4 originale (16 activations)
        </span>
        <div id="p13-grid-container" style="display:flex; justify-content:center;"></div>
        <div style="display:flex; gap:24px; font-size:24px;">
          <span style="color:var(--accent-sky);">■ Q1 Haut-Gauche</span>
          <span style="color:var(--accent-amber);">■ Q2 Haut-Droit</span>
          <span style="color:var(--accent-emerald);">■ Q3 Bas-Gauche</span>
          <span style="color:var(--accent-violet);">■ Q4 Bas-Droit</span>
        </div>
      </div>

    </div>

    <!-- Live explanation sentence & Reset -->
    <div style="display:flex; align-items:center; gap:24px;">
      <div id="p13-status" style="font-size:26px; color:var(--text-primary); background:var(--bg-surface); padding:12px 28px; border-radius:12px; border:1px solid var(--border-bright);">
        Carte brute contenant des activations positives et négatives.
      </div>
      <button class="btn-reset" id="p13-reset">↺ Réinitialiser</button>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Le Max Pooling réduit la taille spatiale par quatre tout en conservant les caractéristiques dominantes.
    </p>
  </div>

</div>`;

        const gridContainer = container.querySelector('#p13-grid-container');
        const gridTitle = container.querySelector('#p13-grid-title');
        const statusEl = container.querySelector('#p13-status');
        const btnsGroup = container.querySelector('#p13-btns');
        const resetBtn = container.querySelector('#p13-reset');

        function setMode(mode) {
          btnsGroup.querySelectorAll('.res-pill').forEach(b => {
            b.classList.toggle('active', b.dataset.mode === mode);
          });

          if (mode === 'brut') {
            gridTitle.textContent = 'Carte 4×4 originale (16 activations)';
            statusEl.innerHTML = 'Carte brute contenant des activations positives et négatives.';
            const grid = document.createElement('div');
            grid.className = 'matrix-4x4';
            for (let r = 0; r < 4; r++) {
              for (let c = 0; c < 4; c++) {
                const v = mat[r][c];
                const cell = document.createElement('div');
                cell.className = 'cell-val';
                if (r < 2 && c < 2) cell.classList.add('quad-tl');
                else if (r < 2 && c >= 2) cell.classList.add('quad-tr');
                else if (r >= 2 && c < 2) cell.classList.add('quad-bl');
                else cell.classList.add('quad-br');
                if (v < 0) cell.classList.add('cell-neg');
                cell.textContent = v;
                grid.appendChild(cell);
              }
            }
            gridContainer.innerHTML = '';
            gridContainer.appendChild(grid);
          } else if (mode === 'relu') {
            gridTitle.innerHTML = 'Carte 4×4 après <span class="accent-sky">ReLU</span> (négatifs à 0)';
            statusEl.innerHTML = 'Toutes les activations négatives sont mises à zéro, les motifs positifs subsistent.';
            const grid = document.createElement('div');
            grid.className = 'matrix-4x4';
            for (let r = 0; r < 4; r++) {
              for (let c = 0; c < 4; c++) {
                const v = Math.max(0, mat[r][c]);
                const cell = document.createElement('div');
                cell.className = 'cell-val';
                if (r < 2 && c < 2) cell.classList.add('quad-tl');
                else if (r < 2 && c >= 2) cell.classList.add('quad-tr');
                else if (r >= 2 && c < 2) cell.classList.add('quad-bl');
                else cell.classList.add('quad-br');
                if (v === 0) cell.classList.add('cell-zero');
                cell.textContent = v;
                grid.appendChild(cell);
              }
            }
            gridContainer.innerHTML = '';
            gridContainer.appendChild(grid);
          } else if (mode === 'max') {
            gridTitle.innerHTML = 'Sortie <span class="accent-emerald">Max Pooling 2×2</span> (4 activations)';
            statusEl.innerHTML = 'Chaque quadrant 2×2 ne retient que sa valeur maximale : <strong>12, 25, 30 et 42</strong>.';
            const grid = document.createElement('div');
            grid.className = 'matrix-2x2';

            const maxVals = [
              { val: 12, quad: 'quad-tl' },
              { val: 25, quad: 'quad-tr' },
              { val: 30, quad: 'quad-bl' },
              { val: 42, quad: 'quad-br' }
            ];

            maxVals.forEach(m => {
              const cell = document.createElement('div');
              cell.className = `cell-val-2x2 ${m.quad}`;
              cell.textContent = m.val;
              grid.appendChild(cell);
            });

            gridContainer.innerHTML = '';
            gridContainer.appendChild(grid);
          } else if (mode === 'avg') {
            gridTitle.innerHTML = 'Sortie <span class="accent-sky">Average Pooling 2×2</span> (moyennes)';
            statusEl.innerHTML = 'Chaque quadrant calcule la moyenne de ses 4 valeurs : <strong>4, 11, 9 et 14</strong>.';
            const grid = document.createElement('div');
            grid.className = 'matrix-2x2';

            const avgVals = [
              { val: 4, quad: 'quad-tl' },
              { val: 11, quad: 'quad-tr' },
              { val: 9, quad: 'quad-bl' },
              { val: 14, quad: 'quad-br' }
            ];

            avgVals.forEach(m => {
              const cell = document.createElement('div');
              cell.className = `cell-val-2x2 ${m.quad}`;
              cell.style.borderColor = 'var(--accent-sky)';
              cell.style.color = 'var(--accent-sky)';
              cell.textContent = m.val;
              grid.appendChild(cell);
            });

            gridContainer.innerHTML = '';
            gridContainer.appendChild(grid);
          }
        }

        btnsGroup.addEventListener('click', e => {
          const btn = e.target.closest('.res-pill');
          if (btn) setMode(btn.dataset.mode);
        });

        resetBtn.addEventListener('click', () => setMode('brut'));

        setMode('brut');

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 13 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 13 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Le Pooling s'apparente au résumé d'un article : on ne garde que l'idée maîtresse de chaque paragraphe. Un Max Pooling 2×2 réduit le nombre de valeurs de 75% en ne conservant que le pixel le plus intense de chaque quadrant.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    En réduisant la taille des représentations, le pooling divise le coût en calcul et en mémoire tout en conférant une première tolérance aux petites variations d'apparence.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Comparez pas à pas l'état brut, après ReLU, avec Max Pooling 2×2 et avec Average Pooling 2×2.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 14 — Pooling et robustesse aux petits décalages
     ONE-IDEA: Max Pooling tolerates a 1-pixel shift (local translation invariance).
     Widget: 4x4 MRI patch with bright tumor pixel + button "Décaler d'un pixel".
     Shows that output 2x2 barely changes.
     Max 40 words, fonts >= 24px, buttons >= 56px, A retenir <= 15 words.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Pooling et robustesse aux petits décalages",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:28px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Pooling et robustesse aux petits décalages</h1>
    <div class="slide-sub">
      L'invariance locale par translation <span class="term-en">(Local Translation Invariance)</span>
    </div>
  </div>

  <!-- Main interactive visual: Input 4x4 vs Pooled 2x2 -->
  <div style="display:flex; flex-direction:column; align-items:center; gap:20px; flex:1; justify-content:center;">

    <div style="display:flex; align-items:center; justify-content:center; gap:48px; width:100%; max-width:1300px;">

      <!-- Left: Input 4x4 Grid -->
      <div class="card" style="padding:24px; display:flex; flex-direction:column; align-items:center; gap:16px;">
        <span style="font-size:26px; font-weight:700; color:var(--accent-sky);">
          Quadrant supérieur-gauche (4×4)
        </span>
        <div class="matrix-4x4" id="p14-grid-in"></div>
        <span style="font-size:24px; color:var(--text-muted);" id="p14-pos-label">
          Lésion en position (0, 0)
        </span>
      </div>

      <!-- Arrow -->
      <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
        <span style="font-size:48px; font-weight:900; color:var(--accent-indigo);">➔</span>
        <span style="font-size:24px; color:var(--accent-indigo); font-weight:700;">Max Pooling 2×2</span>
      </div>

      <!-- Right: Pooled Output 2x2 Grid -->
      <div class="card card-emerald" style="padding:24px; display:flex; flex-direction:column; align-items:center; gap:16px;">
        <span style="font-size:26px; font-weight:700; color:var(--accent-emerald);">
          Sortie condensée (2×2)
        </span>
        <div class="matrix-2x2" id="p14-grid-out"></div>
        <span style="font-size:24px; color:var(--accent-emerald); font-weight:700;">
          Valeur maximale conservée : 240
        </span>
      </div>

    </div>

    <!-- Toggle button + Live indicator -->
    <div style="display:flex; align-items:center; gap:24px;">
      <button class="top-btn" id="p14-shift-btn" style="min-height:56px; font-size:24px; font-weight:700; background:var(--accent-sky); color:#000; border:none; padding:12px 28px; border-radius:12px;">
        🔀 Décaler la lésion d'un pixel
      </button>
      <div id="p14-status" style="font-size:26px; color:var(--text-primary); background:var(--bg-surface); padding:12px 28px; border-radius:12px; border:1px solid var(--border-bright);">
        Le pixel a bougé dans la fenêtre, mais la sortie reste inchangée : <strong class="accent-emerald">240</strong>.
      </div>
      <button class="btn-reset" id="p14-reset">↺ Réinitialiser</button>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Le Max Pooling confère une tolérance aux petits déplacements des motifs visuels dans l'image.
    </p>
  </div>

</div>`;

        const gridIn = container.querySelector('#p14-grid-in');
        const gridOut = container.querySelector('#p14-grid-out');
        const posLabel = container.querySelector('#p14-pos-label');
        const shiftBtn = container.querySelector('#p14-shift-btn');
        const resetBtn = container.querySelector('#p14-reset');
        const statusEl = container.querySelector('#p14-status');

        const tumorPositions = [
          { r: 0, c: 0, name: '(0, 0) Coin supérieur-gauche' },
          { r: 0, c: 1, name: '(0, 1) Décalé à droite' },
          { r: 1, c: 1, name: '(1, 1) Décalé en diagonale' },
          { r: 1, c: 0, name: '(1, 0) Décalé en bas' }
        ];

        let curPosIdx = 0;

        function render() {
          const tumor = tumorPositions[curPosIdx];
          posLabel.textContent = `Lésion en position ${tumor.name}`;

          gridIn.innerHTML = '';
          for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
              let val = 15;
              if (r < 2 && c < 2) {
                val = (r === tumor.r && c === tumor.c) ? 240 : 20;
              } else if (r < 2 && c >= 2) {
                val = 45;
              } else if (r >= 2 && c < 2) {
                val = 30;
              } else {
                val = 18;
              }

              const cell = document.createElement('div');
              cell.className = 'cell-val';
              if (r < 2 && c < 2) cell.classList.add('quad-tl');
              else if (r < 2 && c >= 2) cell.classList.add('quad-tr');
              else if (r >= 2 && c < 2) cell.classList.add('quad-bl');
              else cell.classList.add('quad-br');

              if (r === tumor.r && c === tumor.c) {
                cell.style.background = 'var(--accent-rose)';
                cell.style.color = '#000';
                cell.style.fontWeight = '900';
                cell.style.boxShadow = '0 0 16px var(--accent-rose)';
              }

              cell.textContent = val;
              gridIn.appendChild(cell);
            }
          }

          gridOut.innerHTML = '';
          const outData = [
            { val: 240, quad: 'quad-tl' },
            { val: 45, quad: 'quad-tr' },
            { val: 30, quad: 'quad-bl' },
            { val: 18, quad: 'quad-br' }
          ];

          outData.forEach(d => {
            const cell = document.createElement('div');
            cell.className = `cell-val-2x2 ${d.quad}`;
            cell.textContent = d.val;
            gridOut.appendChild(cell);
          });

          statusEl.innerHTML = `Le pixel bouge à <strong>${tumor.name}</strong>, mais le Max Pooling sort toujours <strong class="accent-emerald">240</strong>.`;
        }

        shiftBtn.addEventListener('click', () => {
          curPosIdx = (curPosIdx + 1) % tumorPositions.length;
          render();
        });

        resetBtn.addEventListener('click', () => {
          curPosIdx = 0;
          render();
        });

        render();

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 14 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 14 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Si le patient bouge très légèrement de quelques millimètres lors de l'acquisition IRM, la signature de la lésion glisse d'un ou deux pixels. Grâce au Max Pooling, tant que l'activation maximale reste dans la même fenêtre 2×2, la sortie est strictement identique.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    C'est cette invariance locale par translation qui assure la reproductibilité et la robustesse clinique des prédictions médicales.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Cliquez sur "Décaler la lésion d'un pixel" et observez que la valeur retenue par le Max Pooling demeure parfaitement stable.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 15 (E) — Architecture d'un CNN
     ONE-IDEA: Two macro-blocks (Feature Extraction vs Classification).
     Matching BrainScan pipeline: 224x224x3 -> Conv(32) -> Pool -> Conv(64) -> Pool ->
     Conv(128) -> Pool -> Flatten -> Dense(128) -> Dropout(0.5) -> Dense(N, Softmax).
     Clicking a layer shows tensor shape and parameter count computed by JS.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Architecture d'un CNN",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Architecture d'un CNN</h1>
    <div class="slide-sub">
      Deux blocs fondamentaux : extraction visuelle puis décision <span class="term-en">(Convolutional Neural Network)</span>
    </div>
  </div>

  <!-- Main Pipeline Display -->
  <div style="display:flex; flex-direction:column; gap:20px; flex:1; justify-content:center; align-items:center;">

    <!-- Macro-blocks labels -->
    <div style="display:grid; grid-template-columns:7fr 4fr; gap:24px; width:100%; max-width:1560px;">
      <div style="background:rgba(56, 189, 248, 0.12); border:2px solid var(--accent-sky); border-radius:14px; padding:10px 20px; text-align:center;">
        <span style="font-size:26px; font-weight:800; color:var(--accent-sky);">
          1. Extraction des caractéristiques <span class="term-en">(Feature Extraction)</span>
        </span>
      </div>
      <div style="background:rgba(192, 132, 252, 0.12); border:2px solid var(--accent-violet); border-radius:14px; padding:10px 20px; text-align:center;">
        <span style="font-size:26px; font-weight:800; color:var(--accent-violet);">
          2. Classification <span class="term-en">(Decision Head)</span>
        </span>
      </div>
    </div>

    <!-- Pipeline steps (horizontal scroll/wrap) -->
    <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:12px; width:100%; max-width:1560px;" id="p15-pipe-container">
      <!-- Generated by JS -->
    </div>

    <!-- Inspector card for selected layer -->
    <div class="card" id="p15-inspector" style="width:100%; max-width:1560px; padding:20px 28px; display:flex; align-items:center; justify-content:space-between; gap:24px; min-height:100px;">
      <!-- Updated live by JS -->
    </div>

    <!-- Controls -->
    <div style="display:flex; align-items:center; gap:24px;">
      <span style="font-size:24px; color:var(--text-muted);">
        Cliquez sur une couche pour analyser sa dimension et ses paramètres.
      </span>
      <button class="btn-reset" id="p15-reset">↺ Réinitialiser</button>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Le CNN extrait d'abord les motifs visuels puis classe le vecteur final.
    </p>
  </div>

</div>`;

        const pipeContainer = container.querySelector('#p15-pipe-container');
        const inspector = container.querySelector('#p15-inspector');
        const resetBtn = container.querySelector('#p15-reset');

        const layers = [
          { name: "Entrée IRM", type: "input", shape: "(224, 224, 3)", pCount: 0, formula: "Données brutes sans poids", block: "extract" },
          { name: "Conv2D (32)", type: "conv", shape: "(224, 224, 32)", pCount: 3 * 3 * 3 * 32 + 32, formula: "3×3×3 × 32 filtres + 32 biais", block: "extract" },
          { name: "MaxPool2D", type: "pool", shape: "(112, 112, 32)", pCount: 0, formula: "Fenêtre 2×2 sans poids", block: "extract" },
          { name: "Conv2D (64)", type: "conv", shape: "(112, 112, 64)", pCount: 3 * 3 * 32 * 64 + 64, formula: "3×3×32 × 64 filtres + 64 biais", block: "extract" },
          { name: "MaxPool2D", type: "pool", shape: "(56, 56, 64)", pCount: 0, formula: "Fenêtre 2×2 sans poids", block: "extract" },
          { name: "Conv2D (128)", type: "conv", shape: "(56, 56, 128)", pCount: 3 * 3 * 64 * 128 + 128, formula: "3×3×64 × 128 filtres + 128 biais", block: "extract" },
          { name: "MaxPool2D", type: "pool", shape: "(28, 28, 128)", pCount: 0, formula: "Fenêtre 2×2 sans poids", block: "extract" },
          { name: "Flatten", type: "flatten", shape: "(100 352,)", pCount: 0, formula: "28 × 28 × 128 valeurs vectorisées", block: "classif" },
          { name: "Dense (128)", type: "dense", shape: "(128,)", pCount: 100352 * 128 + 128, formula: "100 352 entrées × 128 + 128 biais", block: "classif" },
          { name: "Dropout (0.5)", type: "dropout", shape: "(128,)", pCount: 0, formula: "Désactivation aléatoire (entraînement)", block: "classif" },
          { name: `Dense (${CLASSES.length})`, type: "dense", shape: `(${CLASSES.length},)`, pCount: 128 * CLASSES.length + CLASSES.length, formula: `128 × ${CLASSES.length} classes + ${CLASSES.length} biais`, block: "classif" }
        ];

        let selectedIdx = 1;

        function updateInspector() {
          const l = layers[selectedIdx];
          const isExtract = l.block === "extract";
          const colorVar = isExtract ? "var(--accent-sky)" : "var(--accent-violet)";

          inspector.innerHTML = `
            <div style="display:flex; align-items:center; gap:20px;">
              <span style="font-size:28px; font-weight:800; color:${colorVar};">${l.name}</span>
              <span style="font-size:24px; padding:6px 14px; border-radius:8px; background:var(--bg-surface-2); border:1px solid var(--border-bright);">
                Tenseur de sortie : <strong style="color:var(--text-primary);">${l.shape}</strong>
              </span>
            </div>
            <div style="display:flex; align-items:center; gap:24px;">
              <span style="font-size:24px; color:var(--text-muted);">${l.formula}</span>
              <span style="font-size:28px; font-weight:900; color:${l.pCount > 0 ? 'var(--accent-amber)' : 'var(--text-muted)'};">
                ${fmtN(l.pCount)} paramètres
              </span>
            </div>`;

          pipeContainer.querySelectorAll('.pipe-step').forEach((btn, i) => {
            btn.classList.toggle('active', i === selectedIdx);
          });
        }

        pipeContainer.innerHTML = '';
        layers.forEach((l, i) => {
          const btn = document.createElement('button');
          btn.className = `pipe-step ${l.block === 'classif' ? 'pipe-dense' : ''}`;
          btn.innerHTML = `${l.name}`;
          btn.addEventListener('click', () => {
            selectedIdx = i;
            updateInspector();
          });
          pipeContainer.appendChild(btn);
        });

        resetBtn.addEventListener('click', () => {
          selectedIdx = 1;
          updateInspector();
        });

        updateInspector();

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 15 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 15 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Un CNN complet se découpe en deux grands pôles : une usine d'extraction de caractéristiques (couches Conv + Pool qui apprennent la géométrie visuelle) suivie d'un comité d'experts décideurs (couches denses Fully Connected qui formulent le diagnostic).
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Dans l'architecture BrainScan, 3 blocs convolutionnels successifs (32, 64, 128 filtres) distillent les caractéristiques de l'IRM 224×224 avant la classification finale en classes pathologiques.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Cliquez sur chaque bloc pour inspecter la taille du tenseur produit et le nombre de paramètres entraînés.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 16 (F) — Le code Keras de l'architecture
     ONE-IDEA: The exact same pipeline in Python/Keras code alongside
     a styled model.summary() table with JS-computed totals.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Le code Keras de l'architecture",

    render(container) {
      try {
        const conv1 = 3 * 3 * 3 * 32 + 32;
        const conv2 = 3 * 3 * 32 * 64 + 64;
        const conv3 = 3 * 3 * 64 * 128 + 128;
        const dense1 = 100352 * 128 + 128;
        const dense2 = 128 * CLASSES.length + CLASSES.length;
        const totalParams = conv1 + conv2 + conv3 + dense1 + dense2;

        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Le code Keras de l'architecture</h1>
    <div class="slide-sub">
      Traduction directe du modèle séquentiel <span class="term-en">(Sequential Model & Summary)</span>
    </div>
  </div>

  <!-- Two Columns: Code + Summary Table -->
  <div style="display:grid; grid-template-columns:1.05fr 0.95fr; gap:28px; flex:1; align-items:center; width:100%; max-width:1560px;">

    <!-- Left: Keras Python Code Block (min 24px) -->
    <div class="code-box-24" style="height:100%; max-height:560px; display:flex; flex-direction:column; justify-content:center;">
      <span style="color:#64748b; margin-bottom:8px;"># Modèle séquentiel BrainScan (Keras / TensorFlow)</span>
      <span style="color:#c084fc;">model</span> = <span style="color:#38bdf8;">Sequential</span>([<br>
      &nbsp;&nbsp;<span style="color:#34d399;">Conv2D</span>(<span style="color:#fbbf24;">32</span>, (<span style="color:#fbbf24;">3</span>,<span style="color:#fbbf24;">3</span>), activation=<span style="color:#a5f3fc;">'relu'</span>, padding=<span style="color:#a5f3fc;">'same'</span>, input_shape=(<span style="color:#fbbf24;">224</span>,<span style="color:#fbbf24;">224</span>,<span style="color:#fbbf24;">3</span>)),<br>
      &nbsp;&nbsp;<span style="color:#38bdf8;">MaxPooling2D</span>((<span style="color:#fbbf24;">2</span>,<span style="color:#fbbf24;">2</span>)),<br>
      &nbsp;&nbsp;<span style="color:#34d399;">Conv2D</span>(<span style="color:#fbbf24;">64</span>, (<span style="color:#fbbf24;">3</span>,<span style="color:#fbbf24;">3</span>), activation=<span style="color:#a5f3fc;">'relu'</span>, padding=<span style="color:#a5f3fc;">'same'</span>),<br>
      &nbsp;&nbsp;<span style="color:#38bdf8;">MaxPooling2D</span>((<span style="color:#fbbf24;">2</span>,<span style="color:#fbbf24;">2</span>)),<br>
      &nbsp;&nbsp;<span style="color:#34d399;">Conv2D</span>(<span style="color:#fbbf24;">128</span>, (<span style="color:#fbbf24;">3</span>,<span style="color:#fbbf24;">3</span>), activation=<span style="color:#a5f3fc;">'relu'</span>, padding=<span style="color:#a5f3fc;">'same'</span>),<br>
      &nbsp;&nbsp;<span style="color:#38bdf8;">MaxPooling2D</span>((<span style="color:#fbbf24;">2</span>,<span style="color:#fbbf24;">2</span>)),<br>
      &nbsp;&nbsp;<span style="color:#fb7185;">Flatten</span>(),<br>
      &nbsp;&nbsp;<span style="color:#c084fc;">Dense</span>(<span style="color:#fbbf24;">128</span>, activation=<span style="color:#a5f3fc;">'relu'</span>),<br>
      &nbsp;&nbsp;<span style="color:#fb7185;">Dropout</span>(<span style="color:#fbbf24;">0.5</span>),<br>
      &nbsp;&nbsp;<span style="color:#c084fc;">Dense</span>(<span style="color:#fbbf24;">${CLASSES.length}</span>, activation=<span style="color:#a5f3fc;">'softmax'</span>)<br>
      ])
    </div>

    <!-- Right: Styled model.summary() -->
    <div class="card" style="padding:20px; height:100%; max-height:560px; display:flex; flex-direction:column; justify-content:space-between;">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid var(--border-bright); padding-bottom:8px;">
        <span style="font-size:26px; font-weight:800; color:var(--accent-sky);">model.summary()</span>
        <button class="btn-reset" id="p16-reset">↺ Réinitialiser</button>
      </div>

      <div style="overflow-y:auto; flex:1; margin:8px 0;">
        <table class="summary-table">
          <thead>
            <tr>
              <th>Couche</th>
              <th>Forme sortie</th>
              <th>Paramètres</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>conv2d_1</td><td>(224, 224, 32)</td><td>${fmtN(conv1)}</td></tr>
            <tr><td>max_pool_1</td><td>(112, 112, 32)</td><td>0</td></tr>
            <tr><td>conv2d_2</td><td>(112, 112, 64)</td><td>${fmtN(conv2)}</td></tr>
            <tr><td>max_pool_2</td><td>(56, 56, 64)</td><td>0</td></tr>
            <tr><td>conv2d_3</td><td>(56, 56, 128)</td><td>${fmtN(conv3)}</td></tr>
            <tr><td>max_pool_3</td><td>(28, 28, 128)</td><td>0</td></tr>
            <tr><td>flatten</td><td>(100 352)</td><td>0</td></tr>
            <tr><td>dense_1</td><td>(128)</td><td>${fmtN(dense1)}</td></tr>
            <tr><td>dropout</td><td>(128)</td><td>0</td></tr>
            <tr><td>dense_output</td><td>(${CLASSES.length})</td><td>${fmtN(dense2)}</td></tr>
          </tbody>
        </table>
      </div>

      <div style="background:var(--bg-surface-2); padding:12px 16px; border-radius:10px; font-family:var(--font-mono); font-size:24px; border:1px solid var(--border-bright);">
        <div style="display:flex; justify-content:space-between;">
          <span>Total paramètres :</span>
          <strong style="color:var(--accent-amber);">${fmtN(totalParams)}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; color:var(--text-secondary); margin-top:4px;">
          <span>Entraînables : ${fmtN(totalParams)}</span>
          <span>Non-entraînables : 0</span>
        </div>
      </div>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      La structure Keras reflète fidèlement le pipeline théorique de l'IRM.
    </p>
  </div>

</div>`;

        const resetBtn = container.querySelector('#p16-reset');
        resetBtn.addEventListener('click', () => {
          const rows = container.querySelectorAll('.summary-table tbody tr');
          rows.forEach(r => r.style.background = 'transparent');
        });

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 16 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 16 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    L'API Keras Sequential traduit l'architecture visuelle en une succession claire d'instructions Python : chaque couche Conv2D, MaxPooling2D et Dense s'empile pour totaliser environ 13 millions de paramètres.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Le tableau model.summary() montre que la majorité des poids se concentre dans la première couche Dense consécutive au Flatten, tandis que les convolutions restent légères.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Comparez chaque ligne de code avec la ligne correspondante dans le tableau récapitulatif des paramètres.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 17 (G) — Flatten et couches Dense
     ONE-IDEA: From feature maps to a decision vector.
     One sentence on why Flatten needs fixed input size (OpenCV 224x224).
     Visual: feature map stack unrolling into 1D vector then Dense neurons.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Flatten et couches Dense",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Flatten et couches Dense</h1>
    <div class="slide-sub">
      Des cartes 2D au vecteur de décision <span class="term-en">(Vectorization & Dense Layer)</span>
    </div>
  </div>

  <!-- Main Visual Area -->
  <div style="display:flex; flex-direction:column; gap:20px; flex:1; justify-content:center; align-items:center;">

    <!-- Explanation Sentence -->
    <div class="card card-sky" style="padding:14px 28px; width:100%; max-width:1400px; text-align:center;">
      <span style="font-size:26px; font-weight:700; color:var(--accent-sky);">
        Flatten impose une dimension fixe d'image : d'où le redimensionnement OpenCV à 224×224.
      </span>
    </div>

    <!-- Interactive Visual: 3D Stack -> 1D Column -> Dense Neurons -->
    <div style="display:flex; align-items:center; justify-content:center; gap:40px; width:100%; max-width:1400px;">

      <!-- Step 1: Feature Maps (3x3 stack) -->
      <div class="card" style="padding:20px; display:flex; flex-direction:column; align-items:center; gap:12px; min-width:320px;">
        <span style="font-size:24px; font-weight:800; color:var(--accent-sky);">3 Cartes 3×3 (27 px)</span>
        <div style="display:flex; gap:10px; align-items:center;" id="p17-maps-view">
          <div style="display:grid; grid-template-columns:repeat(3, 28px); gap:3px; background:rgba(56,189,248,0.2); padding:6px; border-radius:6px; border:1px solid var(--accent-sky);">
            ${Array.from({ length: 9 }).map((_, i) => `<div style="width:28px; height:28px; background:var(--accent-sky); border-radius:3px; opacity:0.8;"></div>`).join('')}
          </div>
          <div style="display:grid; grid-template-columns:repeat(3, 28px); gap:3px; background:rgba(52,211,153,0.2); padding:6px; border-radius:6px; border:1px solid var(--accent-emerald);">
            ${Array.from({ length: 9 }).map((_, i) => `<div style="width:28px; height:28px; background:var(--accent-emerald); border-radius:3px; opacity:0.8;"></div>`).join('')}
          </div>
          <div style="display:grid; grid-template-columns:repeat(3, 28px); gap:3px; background:rgba(251,191,36,0.2); padding:6px; border-radius:6px; border:1px solid var(--accent-amber);">
            ${Array.from({ length: 9 }).map((_, i) => `<div style="width:28px; height:28px; background:var(--accent-amber); border-radius:3px; opacity:0.8;"></div>`).join('')}
          </div>
        </div>
      </div>

      <!-- Arrow -->
      <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
        <span style="font-size:40px; font-weight:900; color:var(--accent-indigo);">➔</span>
        <span style="font-size:24px; font-weight:700; color:var(--accent-indigo);">Flatten</span>
      </div>

      <!-- Step 2: 1D Vector strip -->
      <div class="card" style="padding:20px; display:flex; flex-direction:column; align-items:center; gap:12px;">
        <span style="font-size:24px; font-weight:800; color:var(--accent-violet);">Vecteur 1D (27 valeurs)</span>
        <div style="display:flex; gap:3px; max-width:440px; overflow-x:auto; padding:8px; background:var(--bg); border-radius:8px; border:1px solid var(--border-bright);" id="p17-vector-view">
          ${Array.from({ length: 9 }).map(() => `<div style="min-width:14px; height:44px; background:var(--accent-sky); border-radius:3px;"></div>`).join('')}
          ${Array.from({ length: 9 }).map(() => `<div style="min-width:14px; height:44px; background:var(--accent-emerald); border-radius:3px;"></div>`).join('')}
          ${Array.from({ length: 9 }).map(() => `<div style="min-width:14px; height:44px; background:var(--accent-amber); border-radius:3px;"></div>`).join('')}
        </div>
      </div>

      <!-- Arrow -->
      <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
        <span style="font-size:40px; font-weight:900; color:var(--accent-violet);">➔</span>
        <span style="font-size:24px; font-weight:700; color:var(--accent-violet);">Dense (${CLASSES.length})</span>
      </div>

      <!-- Step 3: Output Neurons -->
      <div class="card card-violet" style="padding:20px; display:flex; flex-direction:column; align-items:center; gap:12px; min-width:280px;">
        <span style="font-size:24px; font-weight:800; color:var(--accent-violet);">Classes BrainScan</span>
        <div style="display:flex; flex-direction:column; gap:6px; width:100%;">
          ${CLASSES.map((c, i) => `
            <div style="background:var(--bg-surface-2); padding:6px 14px; border-radius:8px; font-size:24px; font-weight:700; display:flex; justify-content:space-between;">
              <span>${c}</span>
              <span style="color:var(--accent-emerald);">P${i + 1}</span>
            </div>`).join('')}
        </div>
      </div>

    </div>

    <!-- Theoretical Formula Box -->
    <div style="background:var(--bg-surface); border:1px solid var(--border-bright); padding:8px 24px; border-radius:12px; display:flex; align-items:center; justify-content:space-between; width:100%; max-width:1400px; font-size:22px;">
      <span style="color:var(--accent-sky); font-weight:700;">📐 Formules théoriques :</span>
      <span class="mono" style="color:#fff; font-size:22px; font-weight:700;">
        Dimension aplatie : N<sub>flatten</sub> = W × H × C
      </span>
      <span class="mono" style="color:var(--accent-amber); font-size:22px; font-weight:700;">
        Paramètres Dense : (N<sub>flatten</sub> + 1) × N<sub>classes</sub>
      </span>
    </div>

    <!-- Live calculation & controls -->
    <div style="display:flex; align-items:center; gap:24px;">
      <div id="p17-feedback" style="font-size:26px; color:var(--text-primary); background:var(--bg-surface); padding:10px 24px; border-radius:12px; border:1px solid var(--border-bright);">
        Application : (<strong>27</strong> entrées + 1 biais) × <strong>${CLASSES.length}</strong> classes = <strong class="accent-amber">${fmtN((27 + 1) * CLASSES.length)}</strong> paramètres.
      </div>
      <button class="btn-reset" id="p17-reset">↺ Réinitialiser</button>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      L'aplatissement vectorise les caractéristiques pour permettre la classification dense finale.
    </p>
  </div>

</div>`;

        const resetBtn = container.querySelector('#p17-reset');
        resetBtn.addEventListener('click', () => {
          const feedback = container.querySelector('#p17-feedback');
          feedback.innerHTML = `Connexions denses : <strong>27</strong> entrées × <strong>${CLASSES.length}</strong> neurones + <strong>${CLASSES.length}</strong> biais = <strong class="accent-amber">${fmtN(27 * CLASSES.length + CLASSES.length)}</strong> paramètres.`;
        });

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 17 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 17 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Après avoir extrait des cartes 2D riches en signaux, la couche Flatten déroule l'ensemble des activations en un unique vecteur 1D pour alimenter les neurones de décision.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Parce que la couche Dense attend un nombre d'entrées fixe et prédéterminé, la dimension d'entrée doit être rigoureusement identique pour chaque patient : d'où le redimensionnement systématique des IRM à 224×224 avec OpenCV.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Observez le passage de la pile de cartes de caractéristiques tridimensionnelles au vecteur de décision unidimensionnel.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 18 (H) — Softmax : transformer des scores en probabilités
     ONE-IDEA: 4 sliders for raw scores (logits), live Softmax probabilities
     summing to 1 (100%).
     Short line: Softmax for N classes (BrainScan), Sigmoid for binary.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Softmax : transformer des scores en probabilités",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:20px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Softmax : transformer des scores en probabilités</h1>
    <div class="slide-sub">
      Des scores bruts à une distribution clinique <span class="term-en">(Logits to Probabilities)</span>
    </div>
  </div>

  <!-- Main interactive Softmax widget -->
  <div style="display:flex; flex-direction:column; gap:16px; flex:1; justify-content:center; align-items:center;">

    <!-- Tier 1: Two-Tier Formula Container -->
    <div style="display:flex; flex-direction:column; gap:8px; width:100%; max-width:1440px;">
      <div style="display:flex; align-items:center; justify-content:space-between; background:var(--bg-surface); padding:8px 24px; border-radius:10px; border:1px solid var(--border-bright);">
        <span style="color:var(--accent-sky); font-weight:800; font-size:22px; display:inline-flex; align-items:center; gap:8px;">
          📐 Formule théorique :
        </span>
        <span class="mono" style="font-size:24px; font-weight:700; color:#fff;">
          P(y = i | z) = σ(z)<sub>i</sub> = e<sup>z<sub>i</sub></sup> / ∑<sub>j=1</sub><sup>K</sup> e<sup>z<sub>j</sub></sup>
        </span>
        <span style="font-size:18px; color:var(--text-muted); font-weight:500;">
          e<sup>z<sub>i</sub></sup> &gt; 0 (positivité) • ∑ P<sub>i</sub> = 1 (normalisation 100%)
        </span>
      </div>

      <div style="display:flex; align-items:center; justify-content:center; gap:16px; background:rgba(99, 102, 241, 0.12); border:1px solid rgba(99, 102, 241, 0.35); padding:6px 20px; border-radius:8px; font-size:19px;">
        <span style="color:var(--accent-indigo); font-weight:700;">Cas d'usage :</span>
        <span style="color:var(--text-secondary);"><strong>Softmax</strong> pour K classes mutuellement exclusives (diagnostic BrainScan) • <strong>Sigmoïde</strong> pour classification binaire isolée.</span>
      </div>
    </div>

    <!-- Tier 2: Sliders and dynamic probabilities container -->
    <div class="card" style="padding:18px 28px; width:100%; max-width:1440px; display:flex; flex-direction:column; gap:14px;">
      ${CLASSES.map((c, i) => `
        <div style="display:grid; grid-template-columns:180px 240px 90px 140px 1fr 100px; gap:20px; align-items:center;">
          <span style="font-size:24px; font-weight:800; color:var(--text-primary);">${c}</span>
          <input type="range" class="custom-slider" id="p18-logit-${i}" min="-4" max="4" step="0.2" value="${(2 - i).toFixed(1)}">
          <span style="font-family:var(--font-mono); font-size:24px; color:var(--accent-sky);" id="p18-z-${i}">z = ${(2 - i).toFixed(1)}</span>
          <span style="font-family:var(--font-mono); font-size:22px; color:var(--accent-amber);" id="p18-exp-${i}">e<sup>z</sup> = --</span>
          <div class="prob-track">
            <div class="prob-fill" id="p18-fill-${i}" style="width:25%;"></div>
          </div>
          <span style="font-family:var(--font-mono); font-size:26px; font-weight:900; text-align:right;" class="accent-emerald" id="p18-prob-${i}">--%</span>
        </div>`).join('')}
    </div>

    <!-- Live status and Reset -->
    <div style="display:flex; align-items:center; gap:28px;">
      <div id="p18-sum-label" style="font-size:24px; font-weight:700; color:var(--text-primary); background:var(--bg-surface); padding:8px 24px; border-radius:12px; border:1px solid var(--border-bright);">
        Somme totale : <strong class="accent-emerald">100.0%</strong>
      </div>
      <button class="btn-reset" id="p18-reset">↺ Réinitialiser</button>
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:12px 28px; flex-shrink:0;">
    <p style="font-size:26px; margin:0;">
      Softmax convertit tout vecteur de scores en probabilités sommant exactement à un.
    </p>
  </div>

</div>`;

        const sliders = CLASSES.map((_, i) => container.querySelector(`#p18-logit-${i}`));
        const zLabels = CLASSES.map((_, i) => container.querySelector(`#p18-z-${i}`));
        const expLabels = CLASSES.map((_, i) => container.querySelector(`#p18-exp-${i}`));
        const fills = CLASSES.map((_, i) => container.querySelector(`#p18-fill-${i}`));
        const probLabels = CLASSES.map((_, i) => container.querySelector(`#p18-prob-${i}`));
        const sumLabel = container.querySelector('#p18-sum-label');
        const resetBtn = container.querySelector('#p18-reset');

        const defaultVals = [2.0, 1.0, 0.0, -1.0];

        function updateSoftmax() {
          const logits = sliders.map(s => parseFloat(s.value));
          // Numerically stable softmax: subtract max
          const maxLogit = Math.max(...logits);
          const exps = logits.map(z => Math.exp(z - maxLogit));
          const sumExp = exps.reduce((a, b) => a + b, 0);
          const probs = exps.map(e => e / sumExp);

          logits.forEach((z, i) => {
            zLabels[i].textContent = `z = ${z.toFixed(1)}`;
            expLabels[i].innerHTML = `e<sup>${z.toFixed(1)}</sup> = ${Math.exp(z).toFixed(2)}`;
            const pPct = (probs[i] * 100).toFixed(1);
            fills[i].style.width = `${pPct}%`;
            probLabels[i].textContent = `${pPct}%`;
          });

          const totalSum = probs.reduce((a, b) => a + b, 0) * 100;
          sumLabel.innerHTML = `Distribution clinique valide : Somme des probabilités = <strong class="accent-emerald">${totalSum.toFixed(1)}%</strong>`;
        }

        sliders.forEach(s => s.addEventListener('input', updateSoftmax));

        resetBtn.addEventListener('click', () => {
          sliders.forEach((s, i) => {
            s.value = defaultVals[i] !== undefined ? defaultVals[i] : 0;
          });
          updateSoftmax();
        });

        updateSoftmax();

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 18 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 18 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Softmax transforme des scores arbitraires (logits) en une distribution de pourcentages dont la somme vaut exactement 100%, comme le partage équitable d'un gâteau entre toutes les hypothèses de diagnostic.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Alors qu'un problème binaire emploie une fonction Sigmoid, la classification multi-classes de tumeurs BrainScan repose sur Softmax pour exprimer l'indice de confiance clinique accordé à chaque classe.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Ajustez les scores bruts des différentes classes pour visualiser la redistribution instantanée des probabilités calculées par Softmax.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 19 (I) — Un filtre est un volume 3D
     ONE-IDEA: A filter on a multi-channel input is 3x3xChannels.
     SVG volume with channel selector (1, 3, 32) and parameter count by JS.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Un filtre est un volume 3D",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Un filtre est un volume 3D</h1>
    <div class="slide-sub">
      La profondeur du filtre épouse les canaux de l'entrée <span class="term-en">(Filter Depth & Channels)</span>
    </div>
  </div>

  <!-- Main Area -->
  <div style="display:flex; flex-direction:column; gap:20px; flex:1; justify-content:center; align-items:center;">

    <!-- Selector Buttons -->
    <div style="display:flex; gap:20px; align-items:center;">
      <button class="top-btn" id="p19-c1" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 24px; border-radius:12px;">
        1 canal (Gris)
      </button>
      <button class="top-btn" id="p19-c3" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 24px; border-radius:12px; background:var(--accent-sky); color:#000;">
        3 canaux (IRM RGB)
      </button>
      <button class="top-btn" id="p19-c32" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 24px; border-radius:12px;">
        32 canaux (Conv1)
      </button>
      <button class="btn-reset" id="p19-reset">↺ Réinitialiser</button>
    </div>

    <!-- Isometric SVG representation of the 3D volume -->
    <div style="display:flex; align-items:center; justify-content:center; gap:48px; width:100%; max-width:1440px;">

      <div class="card" style="padding:20px; display:flex; flex-direction:column; align-items:center; gap:12px; width:540px;">
        <span style="font-size:24px; font-weight:800; color:var(--accent-sky);" id="p19-vol-title">Volume 3×3×3</span>
        <svg id="p19-svg" width="480" height="280" viewBox="0 0 480 280" style="overflow:visible;">
          <!-- Rendered live by JS -->
        </svg>
      </div>

      <!-- Live JS computed details with Two-Tier Formula -->
      <div class="card card-emerald" style="padding:22px 28px; display:flex; flex-direction:column; gap:14px; flex:1; max-width:640px;">
        <!-- Tier 1: Formule Générale -->
        <div style="background:var(--bg-surface-2); padding:10px 18px; border-radius:10px; border:1px solid var(--border-bright);">
          <div style="font-size:18px; color:var(--accent-sky); font-weight:800; margin-bottom:4px;">
            📐 Formule théorique des paramètres :
          </div>
          <div class="mono" style="font-size:21px; font-weight:700; color:#fff;">
            Paramètres = ((F<sub>w</sub> × F<sub>h</sub> × C<sub>in</sub>) + 1) × K<sub>out</sub>
          </div>
          <div style="font-size:15px; color:var(--text-muted); margin-top:3px;">
            (F<sub>w</sub>×F<sub>h</sub> : dimensions spatiales, C<sub>in</sub> : canaux d'entrée, +1 : terme de biais, K<sub>out</sub> : nombre de filtres)
          </div>
        </div>

        <!-- Tier 2: Application Numérique Dynamique -->
        <div>
          <span style="font-size:22px; font-weight:800; color:var(--accent-emerald);">🔢 Calcul numérique en direct</span>
          <div style="font-size:22px; color:var(--text-primary); line-height:1.55; margin-top:6px;" id="p19-stats">
            <!-- Live text -->
          </div>
        </div>
      </div>

    </div>

    <!-- One punchy line -->
    <span style="font-size:24px; color:var(--text-muted);">
      Chaque filtre convolue simultanément tous les canaux d'entrée pour produire une seule carte 2D.
    </span>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Un filtre 2D possède toujours la même profondeur que le tenseur analysé.
    </p>
  </div>

</div>`;

        const btnC1 = container.querySelector('#p19-c1');
        const btnC3 = container.querySelector('#p19-c3');
        const btnC32 = container.querySelector('#p19-c32');
        const resetBtn = container.querySelector('#p19-reset');
        const volTitle = container.querySelector('#p19-vol-title');
        const svgEl = container.querySelector('#p19-svg');
        const statsEl = container.querySelector('#p19-stats');

        let curChannels = 3;

        function render3D() {
          [btnC1, btnC3, btnC32].forEach(b => {
            b.style.background = 'var(--bg-surface-2)';
            b.style.color = 'var(--text-primary)';
          });
          if (curChannels === 1) { btnC1.style.background = 'var(--accent-sky)'; btnC1.style.color = '#000'; }
          if (curChannels === 3) { btnC3.style.background = 'var(--accent-sky)'; btnC3.style.color = '#000'; }
          if (curChannels === 32) { btnC32.style.background = 'var(--accent-sky)'; btnC32.style.color = '#000'; }

          volTitle.textContent = `Filtre tenseur : 3 × 3 × ${curChannels}`;

          // SVG slices
          const sliceCount = curChannels === 1 ? 1 : (curChannels === 3 ? 3 : 8);
          let svgContent = '';
          const colors = ['#38bdf8', '#34d399', '#fbbf24', '#c084fc', '#fb7185'];

          for (let s = sliceCount - 1; s >= 0; s--) {
            const ox = 80 + s * 24;
            const oy = 60 + s * 14;
            const c = colors[s % colors.length];

            svgContent += `
              <g transform="translate(${ox}, ${oy})">
                <rect x="0" y="0" width="160" height="160" fill="${c}" fill-opacity="0.25" stroke="${c}" stroke-width="2" rx="8"/>
                <line x1="53" y1="0" x2="53" y2="160" stroke="${c}" stroke-dasharray="3,3" opacity="0.6"/>
                <line x1="106" y1="0" x2="106" y2="160" stroke="${c}" stroke-dasharray="3,3" opacity="0.6"/>
                <line x1="0" y1="53" x2="160" y2="53" stroke="${c}" stroke-dasharray="3,3" opacity="0.6"/>
                <line x1="0" y1="106" x2="160" y2="106" stroke="${c}" stroke-dasharray="3,3" opacity="0.6"/>
                <text x="80" y="85" text-anchor="middle" font-size="24" font-weight="bold" fill="#fff">${s === 0 ? 'Face 3×3' : ''}</text>
              </g>`;
          }

          svgEl.innerHTML = svgContent;

          const weightsPerFilter = 3 * 3 * curChannels;
          const paramsPerFilter = weightsPerFilter + 1; // + 1 bias
          const bank32Params = paramsPerFilter * 32;

          statsEl.innerHTML = `
            <div>Poids par filtre : 3×3 × <strong>${curChannels}</strong> = <strong class="accent-sky">${weightsPerFilter}</strong></div>
            <div>Biais par filtre : <strong>+1</strong></div>
            <div>Total pour 1 filtre : (3×3×${curChannels} + 1) = <strong class="accent-emerald">${paramsPerFilter}</strong> paramètres</div>
            <div style="margin-top:10px; padding-top:10px; border-top:1px solid var(--border-bright);">
              Pour une couche de <strong>32 filtres</strong> (K<sub>out</sub> = 32) :<br>
              ((3×3×${curChannels}) + 1) × 32 = <strong class="accent-amber" style="font-size:26px;">${fmtN(bank32Params)}</strong> paramètres.
            </div>`;
        }

        btnC1.addEventListener('click', () => { curChannels = 1; render3D(); });
        btnC3.addEventListener('click', () => { curChannels = 3; render3D(); });
        btnC32.addEventListener('click', () => { curChannels = 32; render3D(); });
        resetBtn.addEventListener('click', () => { curChannels = 3; render3D(); });

        render3D();

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 19 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 19 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Un filtre convolutionnel n'est pas une simple grille 2D plate : il possède une profondeur qui traverse simultanément tous les canaux d'entrée. Sur une image RGB ou une IRM à 3 canaux, un filtre 3×3 compte en réalité 3×3×3 = 27 poids (+1 biais).
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Dès la deuxième couche de convolution (recevant 32 cartes en entrée), un seul filtre 3×3 contient 3×3×32 = 288 poids, capturant les corrélations inter-canaux.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Sélectionnez 1 canal, 3 canaux (RGB/IRM) ou 32 canaux pour voir le filtre s'épaissir et recalculer instantanément son volume de poids.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 20 (J) — Champ récepteur : du pixel à la tumeur
     ONE-IDEA: Deeper layers see larger areas of the raw MRI.
     Visual: 3 stages (Bords -> Textures -> Régions/Tumeurs), clickable selector.
     Visual only, minimal text.
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Champ récepteur : du pixel à la tumeur",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Champ récepteur : du pixel à la tumeur</h1>
    <div class="slide-sub">
      Des détails locaux aux structures sémantiques globales <span class="term-en">(Receptive Field Hierarchy)</span>
    </div>
  </div>

  <!-- Main Visual Area -->
  <div style="display:flex; flex-direction:column; gap:20px; flex:1; justify-content:center; align-items:center;">

    <!-- Clickable Stage Selector -->
    <div style="display:flex; gap:20px; align-items:center;">
      <button class="top-btn" id="p20-s1" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 24px; border-radius:12px; background:var(--accent-sky); color:#000;">
        Étage 1 : Bords & Contours
      </button>
      <button class="top-btn" id="p20-s2" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 24px; border-radius:12px;">
        Étage 2 : Textures & Formes
      </button>
      <button class="top-btn" id="p20-s3" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 24px; border-radius:12px;">
        Étage 3 : Lésion & Tumeur
      </button>
      <button class="btn-reset" id="p20-reset">↺ Réinitialiser</button>
    </div>

    <!-- Receptive field visual on brain MRI -->
    <div style="display:flex; align-items:center; justify-content:center; gap:48px; width:100%; max-width:1440px;">

      <!-- Brain MRI Box with expanding RF overlay -->
      <div class="card" style="padding:16px; display:flex; flex-direction:column; align-items:center; gap:12px; width:480px; position:relative;">
        <span style="font-size:24px; font-weight:800; color:var(--accent-sky);">Vue sur l'image IRM (224×224)</span>
        <svg id="p20-mri-svg" width="400" height="320" viewBox="0 0 400 320" style="background:#020617; border-radius:12px; border:1px solid var(--border-bright);">
          <!-- Brain silhouette -->
          <ellipse cx="200" cy="160" rx="140" ry="120" fill="#1e293b" stroke="#334155" stroke-width="3"/>
          <ellipse cx="200" cy="160" rx="110" ry="90" fill="#0f172a"/>
          <!-- Simulated tumor region -->
          <circle cx="230" cy="140" r="38" fill="rgba(251,113,133,0.3)" stroke="var(--accent-rose)" stroke-width="2" stroke-dasharray="4,4"/>
          <text x="230" y="146" text-anchor="middle" font-size="24" fill="var(--accent-rose)" font-weight="bold">Tumeur</text>
          <!-- Receptive field highlight box -->
          <rect id="p20-rf-box" x="220" y="130" width="20" height="20" fill="none" stroke="var(--accent-amber)" stroke-width="4" rx="3"/>
        </svg>
      </div>

      <!-- Detail Card -->
      <div class="card card-indigo" id="p20-detail-card" style="padding:28px 36px; display:flex; flex-direction:column; gap:16px; flex:1; max-width:600px;">
        <!-- Live details -->
      </div>

    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Plus une couche est profonde, plus sa zone de vision sur l'IRM s'élargit.
    </p>
  </div>

</div>`;

        const btnS1 = container.querySelector('#p20-s1');
        const btnS2 = container.querySelector('#p20-s2');
        const btnS3 = container.querySelector('#p20-s3');
        const resetBtn = container.querySelector('#p20-reset');
        const rfBox = container.querySelector('#p20-rf-box');
        const detailCard = container.querySelector('#p20-detail-card');

        let curStage = 1;

        const stageData = {
          1: {
            title: "Couche 1 : Bords élémentaires",
            rfSize: "3 × 3 pixels",
            desc: "Détecte des transitions locales de contraste : arêtes des méninges et micro-contours.",
            box: { x: 236, y: 110, w: 16, h: 16, color: "var(--accent-sky)" }
          },
          2: {
            title: "Couche 2 : Textures tissulaires",
            rfSize: "7 × 7 pixels",
            desc: "Agrège les contours pour identifier la densité anormale du tissu cérébral.",
            box: { x: 220, y: 115, w: 48, h: 48, color: "var(--accent-emerald)" }
          },
          3: {
            title: "Couche 3 + Pooling : Lésion complète",
            rfSize: "28 × 28+ pixels",
            desc: "Englobe la masse tumorale entière et son contexte anatomique pour la décision.",
            box: { x: 190, y: 100, w: 90, h: 90, color: "var(--accent-amber)" }
          }
        };

        function renderStage() {
          [btnS1, btnS2, btnS3].forEach(b => {
            b.style.background = 'var(--bg-surface-2)';
            b.style.color = 'var(--text-primary)';
          });
          if (curStage === 1) { btnS1.style.background = 'var(--accent-sky)'; btnS1.style.color = '#000'; }
          if (curStage === 2) { btnS2.style.background = 'var(--accent-sky)'; btnS2.style.color = '#000'; }
          if (curStage === 3) { btnS3.style.background = 'var(--accent-sky)'; btnS3.style.color = '#000'; }

          const data = stageData[curStage];

          rfBox.setAttribute('x', data.box.x);
          rfBox.setAttribute('y', data.box.y);
          rfBox.setAttribute('width', data.box.w);
          rfBox.setAttribute('height', data.box.h);
          rfBox.setAttribute('stroke', data.box.color);

          detailCard.innerHTML = `
            <span style="font-size:30px; font-weight:800; color:${data.box.color};">${data.title}</span>
            <div style="font-size:26px; font-weight:700; color:var(--text-primary);">
              Champ récepteur : <strong class="accent-sky">${data.rfSize}</strong>
            </div>
            <p style="font-size:26px; color:var(--text-secondary); margin:0; line-height:1.5;">
              ${data.desc}
            </p>`;
        }

        btnS1.addEventListener('click', () => { curStage = 1; renderStage(); });
        btnS2.addEventListener('click', () => { curStage = 2; renderStage(); });
        btnS3.addEventListener('click', () => { curStage = 3; renderStage(); });
        resetBtn.addEventListener('click', () => { curStage = 1; renderStage(); });

        renderStage();

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 20 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 20 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Le champ récepteur (Receptive Field) fonctionne comme le zoom d'un microscope qui s'éloignerait progressivement : les premières couches voient des détails microscopiques (3×3 pixels), tandis que les couches profondes embrassent une vue d'ensemble macroscopique capable d'englober la tumeur entière.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    L'accumulation de convolutions et de poolings successifs permet à un neurone profond de synthétiser un large contexte anatomique sans nécessiter de filtres géants.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Basculez entre les Étages 1, 2 et 3 pour visualiser l'expansion spectaculaire de la zone couverte sur l'IRM.
  </p>
</div>`
  },

    /* ───────────────────────────────────────────────────────────────
     SLIDE 23 (AXE 7) — Comment un CNN apprend ses filtres
     ONE-IDEA: De l'initialisation aléatoire à la spécialisation par rétropropagation
     Interactive: Époques 1, 15, 50 montrant l'évolution du noyau 3x3 et la détection
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Comment un CNN apprend ses filtres",

    render(container) {
      try {
        const epochs = [
          {
            epoch: 1,
            name: "Initialisation aléatoire",
            loss: "2.45",
            accuracy: "24 %",
            desc: "Poids initialisés aléatoirement (He/Glorot). Prédictions au hasard, aucun motif capté.",
            filter: [
              [-0.15, 0.42, -0.08],
              [0.31, -0.22, 0.17],
              [-0.05, 0.19, -0.34]
            ],
            type: "Bruit aléatoire 🎲"
          },
          {
            epoch: 15,
            name: "Détection des contours primaires",
            loss: "0.82",
            accuracy: "73 %",
            desc: "La rétropropagation a orienté les poids : le filtre s'est spécialisé dans les contrastes verticaux.",
            filter: [
              [-0.85, 0.05, 0.88],
              [-0.92, -0.02, 0.95],
              [-0.81, 0.08, 0.84]
            ],
            type: "Filtre de contour (Sobel) 📐"
          },
          {
            epoch: 50,
            name: "Spécialisation anatomique",
            loss: "0.19",
            accuracy: "96 %",
            desc: "Convergence atteinte : le filtre isole parfaitement les contours circulaires de la masse tumorale.",
            filter: [
              [-0.95, -0.90, -0.92],
              [-0.88, 1.85, -0.85],
              [-0.94, -0.89, -0.91]
            ],
            type: "Détecteur de lésion (Blob) 🎯"
          }
        ];

        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">
  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Comment un CNN apprend ses filtres</h1>
    <div class="slide-sub">
      De l'initialisation aléatoire à la détection de tumeurs par rétropropagation <span class="term-en">(Gradient Descent & Backpropagation)</span>
    </div>
  </div>

  <!-- Stepper controls -->
  <div style="display:flex; justify-content:center; gap:20px; align-items:center;">
    ${epochs.map((ep, i) => `
      <button class="top-btn epoch-step-btn" data-step="${i}" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 28px; border-radius:12px; ${i === 0 ? 'background:var(--accent-sky); color:#000;' : ''}">
        Étape ${i + 1} : Époque ${ep.epoch}
      </button>
    `).join('')}
    <button class="btn-reset" id="filter-learn-reset">↺ Réinitialiser</button>
  </div>

  <!-- Visual: Matrix + Detection MRI + Metrics -->
  <div style="display:grid; grid-template-columns:1fr 1.2fr 1fr; gap:28px; align-items:center; flex:1; max-width:1600px; margin:0 auto; width:100%;">
    
    <!-- Left: 3x3 Filter Weights with Gradient Descent Formula -->
    <div class="card card-indigo" style="padding:20px 24px; display:flex; flex-direction:column; align-items:center; gap:14px; text-align:center;">
      <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
        <span style="font-size:22px; font-weight:800; color:var(--accent-indigo);">Noyau 3×3 appris</span>
        <span id="fl-filter-type" style="font-size:19px; color:var(--accent-amber); font-weight:700;">${epochs[0].type}</span>
      </div>
      <div id="fl-matrix-view" style="display:grid; grid-template-columns:repeat(3, 70px); gap:8px;">
        <!-- Filled by JS -->
      </div>
      <div style="background:var(--bg-surface-2); padding:10px 14px; border-radius:10px; border:1px solid var(--border-bright); width:100%; text-align:center;">
        <div style="font-size:16px; color:var(--accent-sky); font-weight:800;">📐 Descente de Gradient (Rétropropagation) :</div>
        <div class="mono" style="font-size:19px; font-weight:700; color:#fff; margin-top:2px;">
          W<sub>t+1</sub> = W<sub>t</sub> − η · (∂ℒ / ∂W<sub>t</sub>)
        </div>
        <div style="font-size:14px; color:var(--text-muted); margin-top:2px;">
          (η = taux d'apprentissage, ∂ℒ/∂W = gradient de l'erreur)
        </div>
      </div>
    </div>

    <!-- Center: Feature Map on Brain MRI -->
    <div class="card" style="padding:20px 24px; display:flex; flex-direction:column; align-items:center; gap:14px; text-align:center;">
      <span style="font-size:22px; font-weight:800; color:var(--accent-sky);">Réponse sur l'IRM cérébrale</span>
      <div style="position:relative; width:220px; height:220px; border-radius:16px; overflow:hidden; border:2px solid var(--border-bright);">
        <svg id="fl-mri-svg" width="220" height="220" viewBox="0 0 220 220">
          <!-- Filled by JS -->
        </svg>
      </div>
      <div id="fl-step-desc" style="font-size:20px; color:var(--text-primary); font-weight:600; min-height:52px;">
        ${epochs[0].desc}
      </div>
    </div>

    <!-- Right: Metrics Card with Theoretical Loss Formula -->
    <div class="card card-emerald" style="padding:20px 24px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
      <!-- Theoretical Loss Formula -->
      <div style="background:var(--bg-surface-2); padding:10px 14px; border-radius:10px; border:1px solid var(--border-bright); text-align:center;">
        <div style="font-size:16px; color:var(--accent-emerald); font-weight:800;">📐 Fonction de Perte (Cross-Entropy) :</div>
        <div class="mono" style="font-size:19px; font-weight:700; color:#fff; margin-top:2px;">
          ℒ = − ∑<sub>c=1</sub><sup>C</sup> y<sub>c</sub> · log(ŷ<sub>c</sub>)
        </div>
        <div style="font-size:14px; color:var(--text-muted); margin-top:2px;">
          (y<sub>c</sub> = vérité terrain binaire, ŷ<sub>c</sub> = probabilité Softmax)
        </div>
      </div>

      <div style="background:var(--bg-surface-2); padding:12px 18px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
        <div style="font-size:18px; color:var(--text-secondary);">Erreur globale (ℒ) :</div>
        <div id="fl-loss-val" style="font-size:34px; font-weight:900; color:var(--accent-rose);">${epochs[0].loss}</div>
      </div>
      <div style="background:var(--bg-surface-2); padding:12px 18px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
        <div style="font-size:18px; color:var(--text-secondary);">Précision diagnostique :</div>
        <div id="fl-acc-val" style="font-size:34px; font-weight:900; color:var(--accent-emerald);">${epochs[0].accuracy}</div>
      </div>
    </div>

  </div>

  <!-- À RETENIR BOX -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Les filtres s'auto-ajustent par rétropropagation de l'erreur pour capturer les motifs discriminants.
    </p>
  </div>
</div>`;

        let currentStep = 0;
        const matrixView = container.querySelector('#fl-matrix-view');
        const mriSvg = container.querySelector('#fl-mri-svg');
        const typeEl = container.querySelector('#fl-filter-type');
        const descEl = container.querySelector('#fl-step-desc');
        const lossEl = container.querySelector('#fl-loss-val');
        const accEl = container.querySelector('#fl-acc-val');
        const stepBtns = container.querySelectorAll('.epoch-step-btn');
        const resetBtn = container.querySelector('#filter-learn-reset');

        function renderStep(idx) {
          currentStep = idx;
          const ep = epochs[idx];

          stepBtns.forEach((b, i) => {
            if (i === idx) {
              b.style.background = 'var(--accent-sky)';
              b.style.color = '#000';
            } else {
              b.style.background = 'var(--bg-surface-2)';
              b.style.color = 'var(--text-primary)';
            }
          });

          // Matrix
          matrixView.innerHTML = ep.filter.flat().map(v => {
            const bg = v > 0 ? `rgba(52, 211, 153, ${Math.min(Math.abs(v), 1) * 0.4})` : `rgba(251, 113, 133, ${Math.min(Math.abs(v), 1) * 0.4})`;
            return `<div style="width:70px; height:50px; display:flex; align-items:center; justify-content:center; background:${bg}; border:1px solid var(--border-bright); border-radius:6px; font-size:20px; font-weight:700;">${v > 0 ? '+' : ''}${v.toFixed(2)}</div>`;
          }).join('');

          // MRI Feature Map Visualization
          if (idx === 0) {
            mriSvg.innerHTML = `
              <rect width="220" height="220" fill="#0f172a"/>
              <ellipse cx="110" cy="110" rx="75" ry="85" fill="#1e293b" stroke="#475569" stroke-width="2"/>
              <circle cx="80" cy="70" r="3" fill="#38bdf8" opacity="0.5"/>
              <circle cx="140" cy="120" r="3" fill="#38bdf8" opacity="0.5"/>
              <circle cx="100" cy="150" r="3" fill="#38bdf8" opacity="0.5"/>
              <circle cx="120" cy="80" r="3" fill="#38bdf8" opacity="0.5"/>
            `;
          } else if (idx === 1) {
            mriSvg.innerHTML = `
              <rect width="220" height="220" fill="#0f172a"/>
              <ellipse cx="110" cy="110" rx="75" ry="85" fill="#1e293b" stroke="#38bdf8" stroke-width="4"/>
              <line x1="80" y1="50" x2="80" y2="170" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 2"/>
              <line x1="140" y1="50" x2="140" y2="170" stroke="#38bdf8" stroke-width="3" stroke-dasharray="4 2"/>
            `;
          } else {
            mriSvg.innerHTML = `
              <rect width="220" height="220" fill="#0f172a"/>
              <ellipse cx="110" cy="110" rx="75" ry="85" fill="#1e293b" stroke="#475569" stroke-width="2"/>
              <circle cx="130" cy="95" r="28" fill="rgba(52, 211, 153, 0.4)" stroke="#34d399" stroke-width="3"/>
              <circle cx="130" cy="95" r="14" fill="#34d399"/>
              <text x="130" y="145" text-anchor="middle" fill="#34d399" font-size="16" font-weight="bold">Lésion isolée</text>
            `;
          }

          typeEl.textContent = ep.type;
          descEl.textContent = ep.desc;
          lossEl.textContent = ep.loss;
          accEl.textContent = ep.accuracy;
        }

        stepBtns.forEach((btn, i) => {
          btn.addEventListener('click', () => renderStep(i));
        });

        resetBtn.addEventListener('click', () => renderStep(0));

        renderStep(0);

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">Erreur: ${err.message}</div></div>`;
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    Un filtre ne naît pas intelligent : au départ, ses 9 chiffres sont attribués au hasard. À chaque image d'entraînement, le modèle compare sa prédiction à la vérité médicale. L'erreur (Loss) est renvoyée en sens inverse (rétropropagation) pour ajuster les poids d'une infime fraction grâce à la descente de gradient.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Dans le projet BrainScan, l'optimiseur Adam ajuste des milliers de filtres simultanément : les premières couches se spécialisent dans les délimitations des hémisphères et des os crâniens, tandis que les couches profondes apprennent à isoler précisément les masses tumorales.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Basculez entre l'Étape 1 (Aléatoire), l'Étape 2 (Contours) et l'Étape 3 (Lésion) pour visualiser la métamorphose des poids de la matrice 3×3 et la chute de la perte.
  </p>
</div>`
  },

  /* ───────────────────────────────────────────────────────────────
     SLIDE 24 (AXE 8) — Maîtriser le sur-apprentissage
     ONE-IDEA: Les 3 boucliers : Data Augmentation, Dropout et BatchNorm
     Interactive: Toggle individual regularizers and see impact on curves & MRI
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Limiter le sur-apprentissage",

    render(container) {
      try {
        let state = {
          aug: false,
          dropout: false,
          batchnorm: false
        };

        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">
  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Maîtriser le sur-apprentissage</h1>
    <div class="slide-sub">
      Les 3 techniques clés face aux petits jeux de données <span class="term-en">(Data Augmentation, Dropout & Batch Normalization)</span>
    </div>
  </div>

  <!-- Regularizer Toggles -->
  <div style="display:flex; justify-content:center; gap:20px; align-items:center;">
    <button class="top-btn reg-btn" id="reg-aug" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 28px; border-radius:12px;">
      1. Data Augmentation 🔄
    </button>
    <button class="top-btn reg-btn" id="reg-drop" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 28px; border-radius:12px;">
      2. Dropout (0.5) ✂️
    </button>
    <button class="top-btn reg-btn" id="reg-bn" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 28px; border-radius:12px;">
      3. Batch Normalization ⚖️
    </button>
    <button class="btn-reset" id="reg-reset">↺ Réinitialiser</button>
  </div>

  <!-- Main interactive comparison display -->
  <div style="display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:center; flex:1; max-width:1600px; margin:0 auto; width:100%;">
    
    <!-- Left: Visual effect on Image / Neurons -->
    <div class="card card-sky" style="padding:28px; display:flex; flex-direction:column; gap:20px; text-align:center; height:100%; justify-content:center;">
      <span style="font-size:26px; font-weight:800; color:var(--accent-sky);">Action concrète sur le modèle</span>
      
      <div id="reg-visual-box" style="background:var(--bg-surface-2); padding:24px; border-radius:16px; border:2px dashed var(--border-bright); min-height:220px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px;">
        <!-- Updated by JS -->
      </div>

      <div id="reg-status-text" style="font-size:22px; color:var(--text-primary); font-weight:600;">
        Sélectionnez une ou plusieurs techniques ci-dessus.
      </div>
    </div>

    <!-- Right: Loss Curves (Train vs Validation) -->
    <div class="card" style="padding:28px; display:flex; flex-direction:column; gap:16px; text-align:center; height:100%; justify-content:space-between;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span style="font-size:26px; font-weight:800; color:var(--accent-emerald);">Courbes de Perte (Train vs Val)</span>
        <div style="display:flex; gap:16px; font-size:18px;">
          <span style="color:var(--accent-sky); font-weight:700;">● Entraînement</span>
          <span style="color:var(--accent-rose); font-weight:700;" id="reg-val-legend">● Validation (Écart)</span>
        </div>
      </div>

      <!-- SVG Chart for curves -->
      <svg id="reg-curve-svg" width="100%" height="220" viewBox="0 0 500 200" style="background:var(--bg-surface); border-radius:12px; border:1px solid var(--border-bright);">
        <!-- Rendered by JS -->
      </svg>

      <div id="reg-metric-box" style="display:flex; justify-content:space-around; background:var(--bg-surface-2); padding:12px; border-radius:12px; font-size:20px;">
        <!-- Rendered by JS -->
      </div>
    </div>

  </div>

  <!-- À RETENIR BOX -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Augmentation, Dropout et BatchNorm empêchent le réseau de mémoriser par cœur les données.
    </p>
  </div>
</div>`;

        const btnAug = container.querySelector('#reg-aug');
        const btnDrop = container.querySelector('#reg-drop');
        const btnBn = container.querySelector('#reg-bn');
        const resetBtn = container.querySelector('#reg-reset');
        const visualBox = container.querySelector('#reg-visual-box');
        const statusText = container.querySelector('#reg-status-text');
        const curveSvg = container.querySelector('#reg-curve-svg');
        const metricBox = container.querySelector('#reg-metric-box');

        function updateRegularization() {
          btnAug.style.background = state.aug ? 'var(--accent-sky)' : 'var(--bg-surface-2)';
          btnAug.style.color = state.aug ? '#000' : 'var(--text-primary)';
          btnDrop.style.background = state.dropout ? 'var(--accent-sky)' : 'var(--bg-surface-2)';
          btnDrop.style.color = state.dropout ? '#000' : 'var(--text-primary)';
          btnBn.style.background = state.batchnorm ? 'var(--accent-sky)' : 'var(--bg-surface-2)';
          btnBn.style.color = state.batchnorm ? '#000' : 'var(--text-primary)';

          let actions = [];
          if (state.aug) actions.push("🔄 <strong>Data Augmentation :</strong> Rotations (±15°), flips horizontaux et zooms simulent une infinité d'orientations patient.");
          if (state.dropout) actions.push("✂️ <strong>Dropout (50%) :</strong> 50% des neurones denses sont désactivés aléatoirement à chaque lot, évitant la co-dépendance.");
          if (state.batchnorm) actions.push("⚖️ <strong>Batch Normalization :</strong> Re-centre la distribution (moyenne 0, variance 1) pour stabiliser et accélérer les gradients.");

          if (actions.length === 0) {
            visualBox.innerHTML = `
              <span style="font-size:44px;">⚠️</span>
              <div style="font-size:24px; color:var(--accent-amber); font-weight:700;">Aucune régularisation active</div>
              <div style="font-size:18px; color:var(--text-secondary);">Le réseau mémorise le bruit du jeu de données : sur-apprentissage sévère garanti !</div>
            `;
            statusText.textContent = "Risque critique sur BrainScan : échec sur de nouveaux patients.";
          } else {
            visualBox.innerHTML = actions.map(a => `<div style="font-size:20px; line-height:1.4; text-align:left; width:100%;">${a}</div>`).join('');
            statusText.innerHTML = `Techniques actives : <strong class="accent-emerald">${actions.length} / 3 boucliers</strong>`;
          }

          const activeCount = (state.aug ? 1 : 0) + (state.dropout ? 1 : 0) + (state.batchnorm ? 1 : 0);
          
          let valPath = "";
          let gapText = "";
          let valColor = "var(--accent-rose)";

          if (activeCount === 0) {
            valPath = "M 30,160 Q 150,110 250,130 T 470,180";
            gapText = "Écart Généralisation : +48% (Overfitting critique)";
            valColor = "var(--accent-rose)";
          } else if (activeCount === 1) {
            valPath = "M 30,160 Q 150,110 250,95 T 470,110";
            gapText = "Écart Généralisation : ~18% (Amélioration partielle)";
            valColor = "var(--accent-amber)";
          } else if (activeCount === 2) {
            valPath = "M 30,160 Q 150,105 250,75 T 470,68";
            gapText = "Écart Généralisation : ~6% (Très bonne stabilité)";
            valColor = "var(--accent-sky)";
          } else {
            valPath = "M 30,160 Q 150,100 250,65 T 470,48";
            gapText = "Écart Généralisation : < 2% (Généralisation optimale)";
            valColor = "var(--accent-emerald)";
          }

          curveSvg.innerHTML = `
            <line x1="30" y1="180" x2="480" y2="180" stroke="#334155" stroke-width="1"/>
            <line x1="30" y1="20" x2="30" y2="180" stroke="#334155" stroke-width="1"/>
            <path d="M 30,160 Q 150,90 250,55 T 470,40" fill="none" stroke="var(--accent-sky)" stroke-width="4"/>
            <path d="${valPath}" fill="none" stroke="${valColor}" stroke-width="4" stroke-dasharray="${activeCount === 3 ? 'none' : '6 4'}"/>
            <text x="40" y="30" fill="var(--text-secondary)" font-size="14">Perte (Loss)</text>
            <text x="420" y="195" fill="var(--text-secondary)" font-size="14">Époques ➔</text>
          `;

          metricBox.innerHTML = `
            <span>Train Loss : <strong style="color:var(--accent-sky);">0.14</strong></span>
            <span>Val Loss : <strong style="color:${valColor};">${activeCount === 0 ? '1.85' : activeCount === 1 ? '0.62' : activeCount === 2 ? '0.28' : '0.16'}</strong></span>
            <span>${gapText}</span>
          `;
        }

        btnAug.addEventListener('click', () => { state.aug = !state.aug; updateRegularization(); });
        btnDrop.addEventListener('click', () => { state.dropout = !state.dropout; updateRegularization(); });
        btnBn.addEventListener('click', () => { state.batchnorm = !state.batchnorm; updateRegularization(); });
        resetBtn.addEventListener('click', () => { state = { aug: false, dropout: false, batchnorm: false }; updateRegularization(); });

        updateRegularization();

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">Erreur: ${err.message}</div></div>`;
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    L'overfitting est comme un étudiant qui révise toujours la même copie d'examen : il l'apprend par cœur mais échoue face à un nouvel énoncé. La Data Augmentation crée des variantes infinies de l'exercice, le Dropout lui masque la moitié de ses notes pour le forcer à raisonner, et la Batch Normalization équilibre la cadence d'apprentissage.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Dans le pipeline BrainScan, les IRM cérébrales subissent un ImageDataGenerator (rotations, zooms) avant le modèle. Dans le réseau Keras, une couche Dropout(0.5) est placée juste après la couche Dense(128), et les BatchNormalization stabilisent les convolutions.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Activez les 3 boutons (Data Augmentation, Dropout, BatchNorm) un par un pour observer le resserrement immédiat des courbes Train/Val Loss et l'élimination de l'overfitting.
  </p>
</div>`
  },

/* ───────────────────────────────────────────────────────────────
     SLIDE 21 (K) — Apprentissage par transfert
     ONE-IDEA: Reuse network trained on ImageNet (VGG16/ResNet), freeze early layers,
     retrain classifier head.
     Visual: layers colored frozen (blue) vs retrained (green) with toggle.
     One line on why it helps with small medical datasets.
     Mention U-Net ONLY in Arabic notes!
     ─────────────────────────────────────────────────────────────── */
  {
    title: "Apprentissage par transfert",

    render(container) {
      try {
        container.innerHTML = `
<div class="slide-content" style="gap:24px; height:100%; justify-content:space-between;">

  <!-- Header -->
  <div style="flex-shrink:0;">
    <h1 class="slide-h2">Apprentissage par transfert</h1>
    <div class="slide-sub">
      Capitaliser sur des millions d'images pré-entraînées <span class="term-en">(Transfer Learning & Fine-Tuning)</span>
    </div>
  </div>

  <!-- Main Visual Area -->
  <div style="display:flex; flex-direction:column; gap:20px; flex:1; justify-content:center; align-items:center;">

    <!-- Context line on small medical datasets -->
    <div class="card card-emerald" style="padding:12px 24px; width:100%; max-width:1440px; text-align:center;">
      <span style="font-size:26px; font-weight:700; color:var(--accent-emerald);">
        Indispensable face à un jeu de données médical restreint : évite le sur-apprentissage.
      </span>
    </div>

    <!-- Toggle buttons -->
    <div style="display:flex; gap:20px; align-items:center;">
      <button class="top-btn" id="p21-mode-freeze" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 24px; border-radius:12px; background:var(--accent-sky); color:#000;">
        Mode 1 : Base gelée (Feature Extraction)
      </button>
      <button class="top-btn" id="p21-mode-fine" style="min-height:56px; font-size:24px; font-weight:700; padding:12px 24px; border-radius:12px;">
        Mode 2 : Ajustement fin (Fine-Tuning partiel)
      </button>
      <button class="btn-reset" id="p21-reset">↺ Réinitialiser</button>
    </div>

    <!-- Backbone vs Head Visual Diagram -->
    <div style="display:flex; align-items:center; justify-content:center; gap:24px; width:100%; max-width:1440px;">

      <!-- Backbone VGG16/ResNet -->
      <div class="card" style="padding:20px; display:flex; flex-direction:column; gap:12px; flex:2;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:26px; font-weight:800; color:var(--accent-sky);">Base ImageNet (VGG16 / ResNet)</span>
          <span class="tl-badge-frozen" id="p21-backbone-badge">Poids gelés 🔒</span>
        </div>
        <div style="display:flex; gap:8px;" id="p21-blocks-view">
          <!-- Rendered live -->
        </div>
      </div>

      <!-- Arrow -->
      <span style="font-size:36px; font-weight:900; color:var(--accent-indigo);">➔</span>

      <!-- BrainScan Head -->
      <div class="card card-violet" style="padding:20px; display:flex; flex-direction:column; gap:12px; flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span style="font-size:26px; font-weight:800; color:var(--accent-violet);">Tête BrainScan</span>
          <span class="tl-badge-trainable">Ré-entraînée ✏️</span>
        </div>
        <div style="display:flex; gap:8px;">
          <div style="background:rgba(52, 211, 153, 0.25); border:2px solid var(--accent-emerald); padding:12px; border-radius:10px; font-size:24px; font-weight:700; text-align:center; flex:1;">
            Dense (128)
          </div>
          <div style="background:rgba(52, 211, 153, 0.25); border:2px solid var(--accent-emerald); padding:12px; border-radius:10px; font-size:24px; font-weight:700; text-align:center; flex:1;">
            Dense (${CLASSES.length})
          </div>
        </div>
      </div>

    </div>

    <!-- Live Parameters Indicator -->
    <div id="p21-stats-bar" style="font-size:26px; color:var(--text-primary); background:var(--bg-surface); padding:12px 28px; border-radius:12px; border:1px solid var(--border-bright);">
      <!-- Updated live -->
    </div>

  </div>

  <!-- À RETENIR BOX (max 15 words) -->
  <div class="a-retenir" style="margin-top:0; padding:14px 28px; flex-shrink:0;">
    <p style="font-size:28px; margin:0;">
      Le transfert de connaissances compense efficacement la rareté des données médicales.
    </p>
  </div>

</div>`;

        const btnFreeze = container.querySelector('#p21-mode-freeze');
        const btnFine = container.querySelector('#p21-mode-fine');
        const resetBtn = container.querySelector('#p21-reset');
        const blocksView = container.querySelector('#p21-blocks-view');
        const backboneBadge = container.querySelector('#p21-backbone-badge');
        const statsBar = container.querySelector('#p21-stats-bar');

        let mode = 'freeze'; // 'freeze' | 'fine'

        function renderTL() {
          [btnFreeze, btnFine].forEach(b => {
            b.style.background = 'var(--bg-surface-2)';
            b.style.color = 'var(--text-primary)';
          });

          if (mode === 'freeze') {
            btnFreeze.style.background = 'var(--accent-sky)';
            btnFreeze.style.color = '#000';
            backboneBadge.className = 'tl-badge-frozen';
            backboneBadge.textContent = 'Poids gelés 🔒';

            blocksView.innerHTML = `
              <div style="flex:1; background:rgba(56,189,248,0.15); border:2px solid var(--accent-sky); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc Conv 1</div>
              <div style="flex:1; background:rgba(56,189,248,0.15); border:2px solid var(--accent-sky); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc Conv 2</div>
              <div style="flex:1; background:rgba(56,189,248,0.15); border:2px solid var(--accent-sky); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc Conv 3</div>
              <div style="flex:1; background:rgba(56,189,248,0.15); border:2px solid var(--accent-sky); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc Conv 4</div>
              <div style="flex:1; background:rgba(56,189,248,0.15); border:2px solid var(--accent-sky); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc Conv 5</div>`;

            statsBar.innerHTML = `Poids entraînables : <strong class="accent-emerald">${fmtN(128 * CLASSES.length + CLASSES.length)}</strong> | Poids gelés : <strong class="accent-sky">14 714 688</strong>`;
          } else {
            btnFine.style.background = 'var(--accent-sky)';
            btnFine.style.color = '#000';
            backboneBadge.className = 'tl-badge-trainable';
            backboneBadge.textContent = 'Dégel partiel 🔓';

            blocksView.innerHTML = `
              <div style="flex:1; background:rgba(56,189,248,0.15); border:2px solid var(--accent-sky); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc 1 🔒</div>
              <div style="flex:1; background:rgba(56,189,248,0.15); border:2px solid var(--accent-sky); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc 2 🔒</div>
              <div style="flex:1; background:rgba(56,189,248,0.15); border:2px solid var(--accent-sky); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc 3 🔒</div>
              <div style="flex:1; background:rgba(52,211,153,0.25); border:2px solid var(--accent-emerald); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc 4 ✏️</div>
              <div style="flex:1; background:rgba(52,211,153,0.25); border:2px solid var(--accent-emerald); padding:10px; border-radius:8px; text-align:center; font-size:24px; font-weight:700;">Bloc 5 ✏️</div>`;

            statsBar.innerHTML = `Poids entraînables : <strong class="accent-emerald">7 079 424</strong> | Poids gelés : <strong class="accent-sky">7 635 264</strong>`;
          }
        }

        btnFreeze.addEventListener('click', () => { mode = 'freeze'; renderTL(); });
        btnFine.addEventListener('click', () => { mode = 'fine'; renderTL(); });
        resetBtn.addEventListener('click', () => { mode = 'freeze'; renderTL(); });

        renderTL();

      } catch (err) {
        container.innerHTML = `<div class="slide-content"><div class="card card-rose">
          <strong>Erreur slide 21 :</strong> ${err.message}</div></div>`;
        console.error('[Slide 21 error]', err);
      }
    },

    notes: `
<div class="notes-section">
  <div class="notes-section-title">💡 Intuition & Analogie</div>
  <p>
    L'apprentissage par transfert (Transfer Learning) équivaut à recruter un radiologue expérimenté plutôt que de former un novice depuis l'enfance : il sait déjà reconnaître les formes, les textures et les contrastes généraux, il lui suffit d'apprendre les spécificités des tumeurs de notre projet.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">🎯 Point clé & BrainScan</div>
  <p>
    Face à un jeu de données médical restreint (quelques centaines d'IRM), réutiliser une base pré-entraînée (ex. VGG16 ou ResNet sur ImageNet) en gelant ses couches de base évite le sur-apprentissage et accélère la convergence.
  </p>
</div>
<div class="notes-section">
  <div class="notes-section-title">⚙️ Démonstration interactive</div>
  <p>
    Testez le Mode 1 (Base gelée) et le Mode 2 (Ajustement fin / Fine-Tuning) pour visualiser la proportion de poids ré-entraînés versus gelés.
  </p>
</div>`
  }

  /* ── PLACEHOLDER slots (phases 3-5 will append here) ───────────
     Do NOT remove this comment. Future phases look for it.        */

]; // end SLIDES array


/* ══════════════════════════════════════════════════════════════════
   ── STATE ─────────────────────────────────────────────────────────
   Central application state. Mutate only through STATE.goTo().
   ══════════════════════════════════════════════════════════════════ */
const STATE = {
  current: 0,       // 0-based slide index
  total: SLIDES.length,
  notesOpen: false,
  overviewOpen: false,

  /** Navigate to slide by 0-based index */
  goTo(idx) {
    const next = clamp(idx, 0, SLIDES.length - 1);
    // Allow re-render only on first load (panel is empty) or when navigating to a different slide
    const panelHasContent = Engine.panel && Engine.panel.children.length > 0;
    if (next === STATE.current && panelHasContent) return;
    STATE.current = next;
    Engine.renderSlide(next);
    Engine.updateNav(next);
    Engine.updateHash(next);
  },

  next() { STATE.goTo(STATE.current + 1); },
  prev() { STATE.goTo(STATE.current - 1); }
};


/* ══════════════════════════════════════════════════════════════════
   ── SLIDE ENGINE ──────────────────────────────────────────────────
   ══════════════════════════════════════════════════════════════════ */
const Engine = {

  /* ── DOM refs ── */
  panel: null,
  counter: null,
  titleBar: null,
  dotsContainer: null,
  progressFill: null,
  notesDrawer: null,
  notesBody: null,
  overviewOverlay: null,
  overviewGrid: null,

  /** Render a slide by index into #slide-panel */
  renderSlide(idx) {
    const slide = SLIDES[idx];
    if (!slide) return;

    // Clear panel
    Engine.panel.innerHTML = '';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'width:100%; height:100%; display:flex; flex-direction:column;';

    try {
      slide.render(wrapper);
    } catch (err) {
      wrapper.innerHTML = `<div class="slide-content"><div class="card card-rose">
        <strong>Erreur de rendu (diapositive ${idx + 1}) :</strong><br>${err.message}
      </div></div>`;
      console.error(`[Slide ${idx + 1} render error]`, err);
    }

    Engine.panel.appendChild(wrapper);

    // Update notes & explanations
    if (Engine.notesBody) {
      Engine.notesBody.innerHTML = slide.notes || '<p style="color:var(--text-muted)">Pas de notes pour cette diapositive.</p>';
    }

    // ── DEV overflow check (console only, never affects layout) ──
    // Uses rAF so layout is fully computed before measuring.
    requestAnimationFrame(() => {
      if (Engine.panel.scrollHeight > Engine.panel.clientHeight + 2) {
        const by = Engine.panel.scrollHeight - Engine.panel.clientHeight;
        console.warn(
          `[DEV] Slide ${idx + 1} "${SLIDES[idx]?.title}" overflows by ${by}px` +
          ` (panel clientH=${Engine.panel.clientHeight}, scrollH=${Engine.panel.scrollHeight})`
        );
      }
    });
  },

  /** Update counter, dots, progress bar, title bar */
  updateNav(idx) {
    const n = idx + 1;
    const total = SLIDES.length;

    // Counter: "03 / 20"
    if (Engine.counter) {
      Engine.counter.textContent = `${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
    }

    // Title bar
    if (Engine.titleBar) {
      Engine.titleBar.textContent = SLIDES[idx]?.title || '';
    }

    // Progress bar
    const progressTrack = document.getElementById('progress-track');
    if (progressTrack) {
      progressTrack.setAttribute('aria-valuemax', String(total));
      progressTrack.setAttribute('aria-valuenow', String(n));
    }
    if (Engine.progressFill) {
      Engine.progressFill.style.width = `${(n / total) * 100}%`;
    }

    // Dots
    if (Engine.dotsContainer) {
      Engine.dotsContainer.querySelectorAll('.nav-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
        dot.setAttribute('aria-current', i === idx ? 'true' : 'false');
      });
    }
  },

  /** Push #slide-N to URL hash without reloading */
  updateHash(idx) {
    history.replaceState(null, '', `#slide-${idx + 1}`);
  },

  /** Read hash on load and navigate to that slide */
  readHash() {
    const m = location.hash.match(/#slide-(\d+)/);
    if (m) {
      const idx = parseInt(m[1], 10) - 1;
      if (idx >= 0 && idx < SLIDES.length) return idx;
    }
    return 0;
  },

  /** Build dot navigation */
  buildDots() {
    Engine.dotsContainer.innerHTML = '';
    SLIDES.forEach((slide, i) => {
      const dot = document.createElement('div');
      dot.className = 'nav-dot';
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `Diapositive ${i + 1} : ${slide.title}`);
      dot.setAttribute('data-title', `${i + 1}. ${slide.title}`);
      dot.addEventListener('click', () => STATE.goTo(i));
      dot.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') STATE.goTo(i); });
      Engine.dotsContainer.appendChild(dot);
    });
  },

  /** Build overview grid */
  buildOverview() {
    Engine.overviewGrid.innerHTML = '';
    SLIDES.forEach((slide, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'overview-thumb';
      thumb.setAttribute('role', 'button');
      thumb.setAttribute('tabindex', '0');
      thumb.setAttribute('aria-label', `Aller à la diapositive ${i + 1}`);
      thumb.innerHTML = `
        <div class="overview-num">${String(i + 1).padStart(2, '0')}</div>
        <div class="overview-slide-title">${slide.title}</div>`;
      thumb.addEventListener('click', () => {
        Engine.toggleOverview(false);
        STATE.goTo(i);
      });
      thumb.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          Engine.toggleOverview(false);
          STATE.goTo(i);
        }
      });
      Engine.overviewGrid.appendChild(thumb);
    });
  },

  /** Toggle notes & explanations drawer */
  toggleNotes(force) {
    STATE.notesOpen = (force !== undefined) ? force : !STATE.notesOpen;
    Engine.notesDrawer.classList.toggle('open', STATE.notesOpen);
    Engine.notesDrawer.setAttribute('aria-hidden', String(!STATE.notesOpen));
    const btn = document.getElementById('btn-notes');
    if (btn) btn.classList.toggle('active', STATE.notesOpen);
  },

  /** Toggle overview grid overlay */
  toggleOverview(force) {
    STATE.overviewOpen = (force !== undefined) ? force : !STATE.overviewOpen;
    Engine.overviewOverlay.classList.toggle('open', STATE.overviewOpen);
    // Mark active slide in overview
    Engine.overviewOverlay.querySelectorAll('.overview-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === STATE.current);
    });
    const btn = document.getElementById('btn-overview');
    if (btn) btn.classList.toggle('active', STATE.overviewOpen);
  },

  /** Toggle fullscreen */
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => { });
    } else {
      document.exitFullscreen?.().catch(() => { });
    }
  },

  /** Scale stage to fit viewport (16:9 letterboxed, centered). */
  scaleStage() {
    const stage = document.getElementById('stage');
    if (!stage) return;
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    // translate(-50%, -50%) centers the stage (since left:50% top:50% = top-left at center).
    // scale() then scales from the center (transform-origin: center center).
    stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
  },

  /** Keyboard handler */
  handleKey(e) {
    // Don't hijack if user is typing in an input
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        if (STATE.overviewOpen) { Engine.toggleOverview(false); return; }
        STATE.next();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (STATE.overviewOpen) { Engine.toggleOverview(false); return; }
        STATE.prev();
        break;
      case 's':
      case 'S':
        Engine.toggleNotes();
        break;
      case 'f':
      case 'F':
        Engine.toggleFullscreen();
        break;
      case 'o':
      case 'O':
        Engine.toggleOverview();
        break;
      case 'Escape':
        if (STATE.overviewOpen) Engine.toggleOverview(false);
        if (STATE.notesOpen) Engine.toggleNotes(false);
        break;
    }
  }
};


/* ══════════════════════════════════════════════════════════════════
   ── INIT ──────────────────────────────────────────────────────────
   ══════════════════════════════════════════════════════════════════ */
function init() {
  /* ── Cache DOM refs ── */
  Engine.panel = document.getElementById('slide-panel');
  Engine.counter = document.getElementById('slide-counter');
  Engine.titleBar = document.getElementById('slide-title-bar');
  Engine.dotsContainer = document.getElementById('dots-container');
  Engine.progressFill = document.getElementById('progress-fill');
  Engine.notesDrawer = document.getElementById('notes-drawer');
  Engine.notesBody = document.getElementById('notes-body');
  Engine.overviewOverlay = document.getElementById('overview-overlay');
  Engine.overviewGrid = document.getElementById('overview-grid');

  /* ── Build navigation dots and overview ── */
  Engine.buildDots();
  Engine.buildOverview();

  /* ── Wire top-bar buttons ── */
  document.getElementById('btn-notes')?.addEventListener('click', () => Engine.toggleNotes());
  document.getElementById('btn-overview')?.addEventListener('click', () => Engine.toggleOverview());
  document.getElementById('btn-fullscreen')?.addEventListener('click', () => Engine.toggleFullscreen());
  document.getElementById('btn-prev')?.addEventListener('click', () => STATE.prev());
  document.getElementById('btn-next')?.addEventListener('click', () => STATE.next());

  /* ── Notes drawer close button ── */
  document.getElementById('notes-close')?.addEventListener('click', () => Engine.toggleNotes(false));

  /* ── Keyboard ── */
  document.addEventListener('keydown', Engine.handleKey);

  /* ── Scale stage on resize and fullscreen change ── */
  Engine.scaleStage();
  window.addEventListener('resize', Engine.scaleStage);
  document.addEventListener('fullscreenchange', Engine.scaleStage);

  /* ── Navigate to initial slide (from hash or 0) ── */
  const startIdx = Engine.readHash();
  STATE.goTo(startIdx);

  /* ── Hash change listener for bidirectional navigation ── */
  window.addEventListener('hashchange', () => {
    const idx = Engine.readHash();
    if (idx !== STATE.current) STATE.goTo(idx);
  });

  /* ── Swipe support (touch) ── */
  let touchStartX = 0;
  const stage = document.getElementById('stage');
  stage.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 60) {
      if (dx < 0) STATE.next();
      else STATE.prev();
    }
  }, { passive: true });
}

/* Run when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
