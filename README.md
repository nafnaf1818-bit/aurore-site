# Site Aurore Michaud — Guide de déploiement et d'utilisation

## 🚀 Mise en ligne en 15 minutes

### Étape 1 — Installer les outils (une seule fois)

1. Télécharge et installe **Node.js** : https://nodejs.org (version LTS)
2. Télécharge et installe **Git** : https://git-scm.com
3. Crée un compte gratuit sur **Vercel** : https://vercel.com (connexion avec GitHub)
4. Crée un compte gratuit sur **GitHub** : https://github.com

### Étape 2 — Préparer le site sur ton PC

1. Ouvre le **Terminal** (ou PowerShell sur Windows)
2. Va dans le dossier du site :
   ```
   cd D:\projets\aurore-site
   ```
3. Installe les dépendances :
   ```
   npm install
   ```
4. Copie le fichier d'environnement :
   ```
   copy .env.example .env.local
   ```
5. Ouvre `.env.local` et remplis tes informations (email, mot de passe admin)

### Étape 3 — Tester en local

```
npm run dev
```
Ouvre ton navigateur sur : http://localhost:3000

### Étape 4 — Mettre en ligne sur Vercel

1. Crée un repository GitHub (bouton "New" sur github.com)
2. Dans le terminal :
   ```
   git init
   git add .
   git commit -m "premier déploiement"
   git remote add origin https://github.com/TON_NOM/aurore-site.git
   git push -u origin main
   ```
3. Sur Vercel.com → "New Project" → importer ton repository GitHub
4. Dans "Environment Variables", ajoute tes variables depuis `.env.local`
5. Clique "Deploy" → ton site est en ligne ! ✅

**URL automatique** : quelque chose comme `aurore-site.vercel.app`

---

## ✏️ Comment modifier le site

### Changer les textes, prix, livres
Ouvre `lib/config.ts` — tout est commenté et facile à modifier :
- Modifier ta bio, tes réseaux sociaux
- Changer les prix des livres
- Mettre à jour les frais de port
- Ajouter un nouveau livre
- Activer un créateur partenaire

### Ajouter ta photo
1. Mets ton fichier photo dans `public/images/aurore.jpg`
2. Dans `lib/config.ts`, décommente la ligne `photo: "/images/aurore.jpg"`

### Ajouter les vraies couvertures
Mets tes images dans `public/images/` :
- `couverture-vie-illusion.jpg`
- `couverture-greynawelle.jpg`
- `couverture-priam.jpg`

Les noms correspondent à ceux dans `lib/config.ts`

### Après chaque modification
```
git add .
git commit -m "description de la modification"
git push
```
Vercel redéploie automatiquement en 1-2 minutes ! ✅

---

## 🛍️ Gestion des commandes

### Accéder à l'administration
Ouvre : **ton-site.vercel.app/admin**
Mot de passe : celui que tu as mis dans `.env.local`

### Dans l'admin tu peux
- Voir toutes les commandes en temps réel
- Changer le statut (Nouvelle → Paiement reçu → En préparation → Expédiée → Livrée)
- Ajouter le numéro de suivi colis
- Contacter le client par email directement
- Voir le chiffre d'affaires

### Tu reçois automatiquement
- Un email pour chaque nouvelle commande
- Le client reçoit un email de confirmation avec les infos de paiement

---

## 📦 Transporteurs

Les tarifs sont dans `lib/config.ts` → section `TRANSPORTEURS`
Tu peux modifier les prix à tout moment. Après modification → `git push` → mis à jour en ligne.

---

## 👥 Espace créateurs partenaires

Dans `lib/config.ts` → section `CREATEURS` :
- Ajoute les infos du créateur
- Mets `actif: true` pour l'afficher sur le site
- Mets `actif: false` pour le masquer

---

## 🆘 Besoin d'aide ?

Demande à Claude ! Il connaît toute la structure du site.
Commence par : "J'ai besoin d'aide pour modifier mon site aurore-michaud, voici ce que je veux faire..."
