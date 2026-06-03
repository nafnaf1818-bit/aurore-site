// ============================================================
// FICHIER DE CONFIGURATION — MODIFIABLE FACILEMENT
// Modifie ce fichier pour mettre à jour le site sans toucher au code
// ============================================================

export const AUTEUR = {
  nom: "Aurore Michaud",
  tagline: "L'encre des Âmes Libres",
  description: "Des mots qui brûlent. Des récits qui réparent. Des âmes qui se reconnaissent.",
  bio: "Romans intenses, authentiques et remplis d'émotions. Histoire, généalogie, destins de femmes, passions et liberté — chaque livre porte une vérité qui touche au plus profond.",
  traits: ["Écrivaine", "Motarde", "Authentique", "Bienveillante", "Intense", "Passionnée d'histoire"],
  // Photo : mettre le fichier dans /public/images/ et décommenter la ligne ci-dessous
  // photo: "/images/aurore.jpg",
  photo: "/MOI NIMES.JPG",
  email: "contact@auroremichaud.fr", // À mettre à jour
  facebook: "https://www.facebook.com/lencredesameslibre",
  instagram: "",
  tiktok: "",
}

export const LIVRES = [
  {
    id: "vie-illusion",
    titre: "La vie n'est qu'illusion",
    sousTitre: "Roman intime",
    description: "Des mots qui brûlent. Des récits qui réparent. Des âmes qui se reconnaissent.",
    descriptionLongue: "Allez viens. Toi et moi on a besoin d'un endroit calme où on peut se poser, discuter, et se mettre d'accord. Un livre pour comprendre, se reconnecter et choisir la paix intérieure.",
    prix: 29.90,
    pages: 294,
    annee: 2026,
    tags: ["Roman intime", "Émotions", "Paix intérieure", "Nouveauté 2026"],
    couverture: "/couverture-vie-illusion.png",
    stock: 50, // Mettre à jour selon ton stock
    nouveaute: true,
  },
  {
    id: "greynawelle",
    titre: "Le Voyage Secret de Greynawelle",
    sousTitre: "Conte poétique",
    description: "Une histoire pour découvrir la magie de son prénom. Chaque page, une aventure qui éclaire le cœur.",
    descriptionLongue: "Un conte initiatique pour petits et grands, rempli de poésie et d'émotions. Chaque page, une aventure qui éclaire le cœur.",
    prix: 18.50,
    pages: null,
    annee: 2024,
    tags: ["Conte poétique", "Découverte de soi", "Magie & aventure", "Tous âges"],
    couverture: "/images/couverture-greynawelle.jpg",
    stock: 50,
    nouveaute: false,
  },
  {
    id: "priam",
    titre: "Le Voyage Secret de Priam",
    sousTitre: "Conte poétique",
    description: "Un prénom. Un destin. Un voyage inoubliable à la découverte de soi-même.",
    descriptionLongue: "Un prénom. Un destin. Un voyage inoubliable à la découverte de soi-même. La magie est partout, pour qui sait regarder.",
    prix: 18.50,
    pages: null,
    annee: 2025,
    tags: ["Conte poétique", "Amitié & courage", "Aventure", "Tous âges"],
    couverture: "/images/couverture-priam.jpg",
    stock: 50,
    nouveaute: false,
  },
]

// ============================================================
// TRANSPORTEURS & FRAIS DE PORT — MODIFIABLES
// Mettre à jour les prix selon les tarifs réels
// ============================================================
export const TRANSPORTEURS = [
  {
    id: "la-poste-lettre",
    nom: "La Poste — Lettre Suivie",
    logo: "📮",
    delai: "3-5 jours ouvrés",
    prix: {
      livres1: 3.99,   // 1 livre
      livres2: 4.99,   // 2 livres
      livresPlus: 5.99 // 3+ livres
    },
    suivi: true,
    description: "Livraison standard avec numéro de suivi",
    url_suivi: "https://www.laposte.fr/outils/suivre-vos-envois",
  },
  {
    id: "la-poste-colissimo",
    nom: "Colissimo",
    logo: "📦",
    delai: "2-3 jours ouvrés",
    prix: {
      livres1: 6.99,
      livres2: 7.99,
      livresPlus: 8.99
    },
    suivi: true,
    description: "Livraison rapide à domicile ou en point relais",
    url_suivi: "https://www.laposte.fr/outils/suivre-vos-envois",
    recommande: true,
  },
  {
    id: "chronopost",
    nom: "Chronopost",
    logo: "⚡",
    delai: "24h",
    prix: {
      livres1: 12.99,
      livres2: 13.99,
      livresPlus: 14.99
    },
    suivi: true,
    description: "Livraison express le lendemain avant 13h",
    url_suivi: "https://www.chronopost.fr/fr/suivi-envoi",
  },
  {
    id: "mondial-relay",
    nom: "Mondial Relay",
    logo: "🏪",
    delai: "4-6 jours ouvrés",
    prix: {
      livres1: 3.49,
      livres2: 4.49,
      livresPlus: 5.49
    },
    suivi: true,
    description: "Retrait en point relais près de chez vous",
    url_suivi: "https://www.mondialrelay.fr/suivi-de-colis",
  },
  {
    id: "ups",
    nom: "UPS Standard",
    logo: "🟫",
    delai: "3-5 jours ouvrés",
    prix: {
      livres1: 8.99,
      livres2: 9.99,
      livresPlus: 10.99
    },
    suivi: true,
    description: "Livraison internationale disponible",
    url_suivi: "https://www.ups.com/track",
  },
  {
    id: "retrait",
    nom: "Retrait direct / Dédicace",
    logo: "🤝",
    delai: "Sur rendez-vous",
    prix: {
      livres1: 0,
      livres2: 0,
      livresPlus: 0
    },
    suivi: false,
    description: "Récupérer votre livre en main propre avec une dédicace personnalisée",
    url_suivi: null,
  },
]

// ============================================================
// ESPACE PUBLICITAIRE — Créateurs à promouvoir
// Modifier ce tableau pour ajouter/retirer des créateurs
// ============================================================
export const CREATEURS = [
  // Exemple — remplacer par les vrais créateurs
  {
    id: "createur-1",
    nom: "Nom du créateur",
    description: "Description courte de leur activité ou projet",
    lien: "https://...",
    image: null, // Mettre "/images/createur1.jpg" si tu as une image
    actif: false, // Mettre à true pour afficher
  },
  // Ajouter d'autres créateurs ici
]

// ============================================================
// PARAMÈTRES BOUTIQUE
// ============================================================
export const BOUTIQUE = {
  fraisPortGratuit: 50, // Livraison gratuite au-dessus de X euros
  mentionsLegales: "Aurore Michaud — Éditeur indépendant — France",
  conditionsRetour: "Retour accepté sous 14 jours après réception. Livre en état neuf.",
  delaiTraitement: "1-2 jours ouvrés pour la préparation de votre commande.",
}
