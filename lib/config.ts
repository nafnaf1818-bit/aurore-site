// ============================================================
// FICHIER DE CONFIGURATION — MODIFIABLE FACILEMENT
// Modifie ce fichier pour mettre à jour le site sans toucher au code
// ============================================================

export const AUTEUR = {
  nom: "Aurore Michaud",
  tagline: "L'encre des Âmes Libres",
  description: "Des mots qui brûlent. Des récits qui réparent. Des âmes qui se reconnaissent.",
  bio: "Auteure indépendante depuis 1988, Aurore Michaud publie sous la marque L'encre des Âmes Libres. Elle a signé trois romans : La vie n'est qu'illusion, Le Voyage Secret de Greynawelle et Le Voyage Secret de Priam, disponibles sur Coollibri.",
  traits: ["Écrivaine", "Motarde", "Authentique", "Bienveillante", "Intense", "Passionnée d'histoire"],
  photo: "/aurore.jpg",
  email: "aurore.michaud@ikmail.com",
facebook: "https://www.facebook.com/profile.php?id=61590141702563",
  instagram: "https://www.instagram.com/nafnaf181733",
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
    couverture: "/couverture1.png",
    stock: 50,
    nouveaute: true,
    // [À COMPLÉTER] : lien direct vers la fiche du livre sur Coollibri
    lienCoollibri: "https://www.coollibri.com/",
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
    couverture: "/couverture2.png",
    stock: 50,
    nouveaute: false,
    // [À COMPLÉTER] : lien direct vers la fiche du livre sur Coollibri
    lienCoollibri: "https://www.coollibri.com/",
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
    couverture: "/couverture3.png",
    stock: 50,
    nouveaute: false,
    // [À COMPLÉTER] : lien direct vers la fiche du livre sur Coollibri
    lienCoollibri: "https://www.coollibri.com/",
  },
]

export const CREATEURS = [
  {
    id: "createur-1",
    nom: "Nom du créateur",
    description: "Description courte de leur activité ou projet",
    lien: "https://...",
    image: null,
    actif: false,
  },
]


