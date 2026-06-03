import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'
import { LIVRES, TRANSPORTEURS } from '../../lib/config'

const DB_PATH = path.join(process.cwd(), 'data', 'commandes.json')

function lireCommandes() {
  try {
    if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
      fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true })
    }
    if (!fs.existsSync(DB_PATH)) {
      fs.writeFileSync(DB_PATH, JSON.stringify([]))
    }
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'))
  } catch { return [] }
}

function sauvegarderCommandes(commandes: any[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(commandes, null, 2))
}

function genererNumero() {
  const date = new Date()
  const yy = date.getFullYear().toString().slice(-2)
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const rand = Math.floor(Math.random() * 9000) + 1000
  return `AM-${yy}${mm}${dd}-${rand}`
}

async function envoyerEmailConfirmation(commande: any) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  })

  const lignesLivres = commande.panier.map((item: any) =>
    `• ${item.titre} × ${item.quantite} — ${(item.prix * item.quantite).toFixed(2)} €`
  ).join('\n')

  // Email au client
  await transporter.sendMail({
    from: `"Aurore Michaud" <${process.env.EMAIL_USER}>`,
    to: commande.client.email,
    subject: `✅ Confirmation de commande ${commande.orderNumber}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1008;">
        <div style="text-align:center; padding: 2rem 0; border-bottom: 1px solid #e8e0d0;">
          <h1 style="font-style:italic; font-size: 2rem; margin:0;">Aurore Michaud</h1>
          <p style="color: #888; font-size: 0.8rem; letter-spacing: 0.3em; text-transform: uppercase;">L'encre des Âmes Libres</p>
        </div>
        <div style="padding: 2rem 0;">
          <p>Bonjour ${commande.client.prenom},</p>
          <p>Merci pour votre commande ! Je suis ravie de vous compter parmi mes lecteurs. 🖤</p>
          <div style="background:#f8f5f0; padding:1.5rem; margin:1.5rem 0; border-left:3px solid #1a1008;">
            <p style="margin:0 0 0.5rem;"><strong>Commande n° ${commande.orderNumber}</strong></p>
            <p style="margin:0 0 1rem; color:#666; font-size:0.9rem;">${new Date(commande.date).toLocaleDateString('fr-FR')}</p>
            <pre style="font-family:Georgia,serif; white-space:pre-wrap; margin:0;">${lignesLivres}</pre>
            <p style="margin:1rem 0 0; padding-top:1rem; border-top:1px solid #e0d8cc;">
              Livraison : ${commande.transporteur.nom} — ${commande.fraisPort.toFixed(2)} €<br/>
              <strong>Total : ${commande.total.toFixed(2)} €</strong>
            </p>
          </div>
          <p><strong>Adresse de livraison :</strong><br/>
          ${commande.client.prenom} ${commande.client.nom}<br/>
          ${commande.client.adresse}<br/>
          ${commande.client.cp} ${commande.client.ville}, ${commande.client.pays}</p>
          ${commande.client.message ? `<p><strong>Votre message :</strong> ${commande.client.message}</p>` : ''}
          <div style="background:#1a1008; color:#faf8f5; padding:1.5rem; margin:1.5rem 0;">
            <p style="margin:0 0 0.5rem;"><strong>Comment procéder au paiement ?</strong></p>
            <p style="margin:0; font-size:0.9rem;">Je vous contacterai sous peu pour vous communiquer les coordonnées de paiement (virement ou PayPal). Dès réception, je préparerai votre commande avec soin.</p>
          </div>
          <p>Merci pour votre confiance et votre soutien. Chaque commande m'aide à continuer d'écrire, à rêver et à transmettre.</p>
          <p style="font-style:italic;">Aurore Michaud</p>
        </div>
        <div style="text-align:center; padding:1.5rem 0; border-top:1px solid #e8e0d0; color:#888; font-size:0.8rem;">
          <p>Questions ? Contactez-moi : ${process.env.EMAIL_USER}</p>
        </div>
      </div>
    `
  })

  // Email à Aurore (notification)
  await transporter.sendMail({
    from: `"Boutique" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `🛍️ Nouvelle commande ${commande.orderNumber} — ${commande.client.prenom} ${commande.client.nom}`,
    html: `
      <h2>Nouvelle commande reçue !</h2>
      <p><strong>N° ${commande.orderNumber}</strong> — ${new Date(commande.date).toLocaleString('fr-FR')}</p>
      <h3>Client</h3>
      <p>${commande.client.prenom} ${commande.client.nom}<br/>
      ${commande.client.email}<br/>
      ${commande.client.telephone || ''}<br/>
      ${commande.client.adresse}, ${commande.client.cp} ${commande.client.ville}, ${commande.client.pays}</p>
      ${commande.client.message ? `<p><em>Message : ${commande.client.message}</em></p>` : ''}
      <h3>Commande</h3>
      <pre>${lignesLivres}</pre>
      <p>Livraison : ${commande.transporteur.nom} — ${commande.fraisPort.toFixed(2)} €</p>
      <p><strong>Total : ${commande.total.toFixed(2)} €</strong></p>
      <p><a href="${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/admin">Gérer dans l'admin →</a></p>
    `
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Nouvelle commande
    const { panier, transporteur: transporteurId, form, total, fraisPort } = req.body
    const transporteurObj = TRANSPORTEURS.find(t => t.id === transporteurId)
    const panierEnrichi = panier.map((item: any) => {
      const livre = LIVRES.find(l => l.id === item.livreId)
      return { ...item, titre: livre?.titre || item.livreId, prix: livre?.prix || 0 }
    })

    const commande = {
      id: `cmd_${Date.now()}`,
      orderNumber: genererNumero(),
      date: new Date().toISOString(),
      client: form,
      panier: panierEnrichi,
      transporteur: {
        id: transporteurId,
        nom: transporteurObj?.nom || '',
        logo: transporteurObj?.logo || '',
        urlSuivi: transporteurObj?.url_suivi || null,
      },
      total,
      fraisPort,
      statut: 'nouvelle',
      numeroSuivi: '',
      notes: '',
    }

    const commandes = lireCommandes()
    commandes.unshift(commande)
    sauvegarderCommandes(commandes)

    try { await envoyerEmailConfirmation(commande) } catch (e) { console.error('Email error:', e) }

    return res.json({ success: true, orderNumber: commande.orderNumber })
  }

  if (req.method === 'GET') {
    return res.json({ commandes: lireCommandes() })
  }

  if (req.method === 'PATCH') {
    const { id, statut, numeroSuivi, notes } = req.body
    const commandes = lireCommandes()
    const idx = commandes.findIndex((c: any) => c.id === id)
    if (idx !== -1) {
      commandes[idx] = { ...commandes[idx], statut, numeroSuivi, notes }
      sauvegarderCommandes(commandes)
    }
    return res.json({ success: true })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
