# 🧠 Veille Technologique : Comprendre les CNN & Application à BrainScan

> Présentation interactive complète et immersive sur les réseaux de neurones convolutionnels (CNN) appliqués à la classification d'IRM cérébrales pour la détection précoce de tumeurs.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-brightgreen?logo=github)](#déploiement-sur-github-pages-instructions)
[![No Dependencies](https://img.shields.io/badge/Dependencies-0%20External-blue)](#conception--technologies)
[![Offline Ready](https://img.shields.io/badge/Offline-100%25%20Ready-emerald)](#conception--technologies)

---

## 🎯 Objectif & Contexte BrainScan

**BrainScan AI** est une initiative d'intelligence artificielle médicale visant à assister les médecins dans le diagnostic précoce des tumeurs cérébrales à partir d'images IRM (résonance magnétique), réduisant le temps d'analyse et les risques d'erreur humaine sans jamais remplacer l'expertise clinique.

**Réalisateurs :** Mohamed El Hamdaoui & Yassine Nmila  
**Projet :** Veille Technologique & Classification Médicale BrainScan

Cette présentation interactive de **25 diapositives** a été conçue pour couvrir exhaustivement les 9 axes fondamentaux des CNN :
1. **Limites des réseaux classiques (MLP)** sur les images (explosion des poids, perte de structure 2D, non-invariance).
2. **Principe de la convolution et des filtres** (noyaux 2D, filtres 3D, partage de poids).
3. **Notions de Feature Map, Stride et Padding** (contrôle dimensionnel et préservation des bordures).
4. **Rôle de ReLU et du Pooling** (non-linéarité essentielle, Max Pooling, compression et robustesse aux décalages).
5. **Architecture générale d'un CNN** (pipeline complet de bout en bout et code Keras).
6. **Rôle de Flatten et des couches Dense** (vectorisation 1D et classification multi-classes par Softmax).
7. **Comment un CNN apprend ses filtres** (descente de gradient, calcul de perte et rétropropagation).
8. **Techniques anti-overfitting** (Data Augmentation, Dropout et Batch Normalization).
9. **Lien direct avec le projet BrainScan** (détection assistée de tumeurs cérébrales et Transfer Learning).

---

## 🚀 Démonstration en direct & Déploiement GitHub Pages

### 🌐 Démo en ligne (GitHub Pages)
- **Présentation interactive :** [https://mohamed-elhamdaoui.github.io/cnn-veille/](https://mohamed-elhamdaoui.github.io/cnn-veille/)
- **Code source :** [https://github.com/mohamed-elhamdaoui/cnn-veille](https://github.com/mohamed-elhamdaoui/cnn-veille)

### 💻 Exécution directe en local
Aucun serveur ni installation requise (`npm`, `python` ou `node` ne sont pas nécessaires) :
- Double-cliquez simplement sur `index.html` pour ouvrir la présentation dans votre navigateur.

---

## ⌨️ Raccourcis Clavier & Navigation

| Raccourci | Action |
|-----------|--------|
| `→` ou `Espace` | Diapositive suivante |
| `←` | Diapositive précédente |
| `S` | Ouvrir / fermer le volet **Notes & Explications pédagogiques** |
| `O` | Afficher la grille du **Plan de la présentation** (Overview) |
| `F` | Basculer en **Plein écran** |
| `Échap` | Fermer les volets ou le plan |

---

## 🛠️ Conception & Technologies

- **100% Vanilla** : HTML5 sémantique, CSS3 moderne (variables, Flexbox, CSS Grid, animations fluides), JavaScript pur (ES6+).
- **Zéro dépendance externe** : Aucun CDN, aucune bibliothèque externe (pas de KaTeX, pas de Google Fonts, pas de Tailwind).
- **Responsive 16:9** : Système de cadrage automatique basé sur un stage virtuel `1920×1080` avec redimensionnement dynamique (`transform: scale()`) pour un rendu net sur n'importe quel écran ou vidéoprojecteur.
- **Accessibilité (a11y)** : Contrastes conformes WCAG AA, attributs ARIA complets, navigation intégrale au clavier et support tactile (swipe).

---

## 📂 Structure du Projet

```text
├── index.html                           # Structure HTML de la scène et des volets
├── styles.css                           # Design system sombre, mise en page et composants
├── app.js                               # Moteur de navigation, 25 diapositives & widgets interactifs
├── RULES.md                             # Règles de conception pédagogique et Definition of Done
├── README.md                            # Documentation du projet
└── .github/workflows/deploy-pages.yml   # Déploiement automatique GitHub Pages
```

---

## 📝 Déploiement sur GitHub Pages (Instructions)

Si vous configurez le dépôt sur votre propre compte GitHub :

1. Initialisez et poussez le code vers votre dépôt :
   ```bash
   git add .
   git commit -m "feat: initial commit for GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/votre-compte/votre-depot.git
   git push -u origin main
   ```
2. Sur GitHub, rendez-vous dans **Settings** > **Pages** :
   - Sous **Build and deployment** > **Source** :
     - Choisissez soit **GitHub Actions** (déploiement automatique via le workflow inclus)
     - Soit **Deploy from a branch** (choisissez la branche `main` et le dossier `/ (root)`).
3. Votre site est déployé en quelques instants !
