import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LIVRES, TRANSPORTEURS, BOUTIQUE } from '../lib/config'

type Panier = { livreId: string; quantite: number }[]

export default function Boutique() {
  const router = useRouter()
  const [panier, setPanier] = useState<Panier>([])
  const [etape, setEtape] = useState<'boutique' | 'panier' | 'livraison' | 'paiement' | 'confirmation'>('boutique')
  const [transporteur, setTransporteur] = useState('')
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', adresse: '', ville: '', cp: '', pays: 'France', message: '' })
  const [loading, setLoading] = useState(false)
  const [orderNum, setOrderNum] = useState('')

  useEffect(() => {
    if (router.query.livre) {
      const id = router.query.livre as string
      if (!panier.find(p => p.livreId === id)) {
        setPanier([{ livreId: id, quantite: 1 }])
        setEtape('panier')
      }
    }
  }, [router.query])

  const totalLivres = panier.reduce((acc, p) => {
    const livre = LIVRES.find(l => l.id === p.livreId)
    return acc + (livre ? livre.prix * p.quantite : 0)
  }, 0)

  const nbLivres = panier.reduce((acc, p) => acc + p.quantite, 0)

  const fraisPort = () => {
    if (!transporteur) return 0
    const t = TRANSPORTEURS.find(t => t.id === transporteur)
    if (!t) return 0
    if (nbLivres === 1) return t.prix.livres1
    if (nbLivres === 2) return t.prix.livres2
    return t.prix.livresPlus
  }

  const total = totalLivres + fraisPort()
  const portGratuit = totalLivres >= BOUTIQUE.fraisPortGratuit

  const ajouterAuPanier = (livreId: string) => {
    const existing = panier.find(p => p.livreId === livreId)
    if (existing) {
      setPanier(panier.map(p => p.livreId === livreId ? { ...p, quantite: p.quantite + 1 } : p))
    } else {
      setPanier([...panier, { livreId, quantite: 1 }])
    }
  }

  const retirerDuPanier = (livreId: string) => {
    setPanier(panier.filter(p => p.livreId !== livreId))
  }

  const modifierQte = (livreId: string, qte: number) => {
    if (qte <= 0) return retirerDuPanier(livreId)
    setPanier(panier.map(p => p.livreId === livreId ? { ...p, quantite: qte } : p))
  }

  const passerCommande = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/commande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ panier, transporteur, form, total, fraisPort: fraisPort() })
      })
      const data = await res.json()
      if (data.success) {
        setOrderNum(data.orderNumber)
        setEtape('confirmation')
        setPanier([])
      }
    } catch (e) {
      alert('Erreur lors de la commande. Veuillez réessayer.')
    }
    setLoading(false)
  }

  return (
    <>
    <Head>
        <title>Boutique — Les livres d'Aurore Michaud | Commande directe</title>
        <meta name="description" content="Commandez les livres d'Aurore Michaud en direct : romans intenses et contes poétiques. Livraison en France et à l'international, dédicace personnalisée possible." />
        <link rel="canonical" href="https://auroremichaud.com/boutique" />

        {/* Open Graph (Facebook) */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auroremichaud.com/boutique" />
        <meta property="og:title" content="Boutique — Les livres d'Aurore Michaud" />
        <meta property="og:description" content="Commandez en direct, avec dédicace personnalisée possible. Livraison en France et à l'international." />
        <meta property="og:image" content="https://auroremichaud.com/og-banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Aurore Michaud" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Boutique — Les livres d'Aurore Michaud" />
        <meta name="twitter:description" content="Commandez en direct, avec dédicace personnalisée possible." />
        <meta name="twitter:image" content="https://auroremichaud.com/og-banner.png" />

        {/* Données structurées Google : les livres avec leur prix */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": LIVRES.map((livre, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": ["Book", "Product"],
                "name": livre.titre,
                "description": livre.description,
                "author": { "@type": "Person", "name": "Aurore Michaud" },
                "image": livre.couverture ? `https://auroremichaud.com${livre.couverture}` : undefined,
                "numberOfPages": livre.pages || undefined,
                "inLanguage": "fr",
                "offers": {
                  "@type": "Offer",
                  "price": livre.prix.toFixed(2),
                  "priceCurrency": "EUR",
                  "availability": "https://schema.org/InStock",
                  "url": `https://auroremichaud.com/boutique?livre=${livre.id}`
                }
              }
            }))
          }) }}
        />

        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;1,400&family=Raleway:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </Head>

      <nav className="nav">
        <Link href="/" className="nav-logo">Aurore Michaud</Link>
        <ul className="nav-links">
          <li><Link href="/">Accueil</Link></li>
          <li><button onClick={() => setEtape('panier')} className="panier-btn">
            🛒 Panier {panier.length > 0 && <span className="panier-count">{nbLivres}</span>}
          </button></li>
        </ul>
      </nav>

      <div className="boutique-container">

        {/* ÉTAPE INDICATEUR */}
        {etape !== 'boutique' && etape !== 'confirmation' && (
          <div className="etapes">
            {['panier', 'livraison', 'paiement'].map((e, i) => (
              <div key={e} className={`etape ${etape === e ? 'active' : ''} ${['panier','livraison','paiement'].indexOf(etape) > i ? 'done' : ''}`}>
                <span className="etape-num">{i + 1}</span>
                <span className="etape-label">{e.charAt(0).toUpperCase() + e.slice(1)}</span>
              </div>
            ))}
          </div>
        )}

        {/* ========== BOUTIQUE ========== */}
        {etape === 'boutique' && (
          <div className="shop-grid">
            <div>
              <p className="section-eyebrow">✦ boutique ✦</p>
              <h1 className="shop-title">Mes livres</h1>
              <p className="shop-sub">Livraison en France et à l'international · {totalLivres >= BOUTIQUE.fraisPortGratuit ? '🎉 Port gratuit !' : `Port offert dès ${BOUTIQUE.fraisPortGratuit} €`}</p>
            </div>
            <div className="livres-list">
              {LIVRES.map(livre => (
                <div key={livre.id} className="livre-card">
                  <div className="livre-card-img">
                    <div className="livre-cover-sm">📖</div>
                    {livre.nouveaute && <span className="badge-new">Nouveauté</span>}
                  </div>
                  <div className="livre-card-body">
                    <p className="livre-cat">{livre.sousTitre}</p>
                    <h3 className="livre-title-sm">{livre.titre}</h3>
                    <p className="livre-desc-sm">{livre.description}</p>
                    {livre.pages && <p className="livre-pages">{livre.pages} pages</p>}
                    <div className="livre-tags-sm">
                      {livre.tags.slice(0, 3).map(t => <span key={t} className="tag-sm">{t}</span>)}
                    </div>
                  </div>
                  <div className="livre-card-right">
                    <p className="livre-prix">{livre.prix.toFixed(2).replace('.', ',')} €</p>
                    <button onClick={() => { ajouterAuPanier(livre.id); setEtape('panier') }} className="btn-ajouter">
                      Ajouter au panier
                    </button>
                    {panier.find(p => p.livreId === livre.id) && (
                      <p className="in-cart">✓ Dans le panier</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== PANIER ========== */}
        {etape === 'panier' && (
          <div className="checkout-layout">
            <div className="checkout-main">
              <h2 className="checkout-title">Mon panier</h2>
              {panier.length === 0 ? (
                <div className="empty-cart">
                  <p>Votre panier est vide.</p>
                  <button onClick={() => setEtape('boutique')} className="btn-dark">Voir les livres</button>
                </div>
              ) : (
                <>
                  {panier.map(item => {
                    const livre = LIVRES.find(l => l.id === item.livreId)
                    if (!livre) return null
                    return (
                      <div key={item.livreId} className="cart-item">
                        <div className="cart-item-cover">📖</div>
                        <div className="cart-item-body">
                          <p className="cart-item-cat">{livre.sousTitre}</p>
                          <p className="cart-item-title">{livre.titre}</p>
                          <p className="cart-item-price">{livre.prix.toFixed(2).replace('.', ',')} € / exemplaire</p>
                        </div>
                        <div className="cart-item-qty">
                          <button onClick={() => modifierQte(livre.id, item.quantite - 1)}>−</button>
                          <span>{item.quantite}</span>
                          <button onClick={() => modifierQte(livre.id, item.quantite + 1)}>+</button>
                        </div>
                        <div className="cart-item-total">
                          {(livre.prix * item.quantite).toFixed(2).replace('.', ',')} €
                        </div>
                        <button onClick={() => retirerDuPanier(livre.id)} className="cart-remove">✕</button>
                      </div>
                    )
                  })}
                  <button onClick={() => setEtape('boutique')} className="btn-outline-sm">+ Ajouter un livre</button>
                </>
              )}
            </div>
            {panier.length > 0 && (
              <div className="checkout-summary">
                <h3>Résumé</h3>
                <div className="summary-line"><span>Sous-total</span><span>{totalLivres.toFixed(2).replace('.', ',')} €</span></div>
                <div className="summary-line"><span>Livraison</span><span>À calculer</span></div>
                {portGratuit && <p className="port-gratuit">🎉 Port gratuit !</p>}
                <button onClick={() => setEtape('livraison')} className="btn-dark w-full" disabled={panier.length === 0}>
                  Choisir la livraison →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========== LIVRAISON ========== */}
        {etape === 'livraison' && (
          <div className="checkout-layout">
            <div className="checkout-main">
              <h2 className="checkout-title">Choisir la livraison</h2>
              <div className="transporteurs-list">
                {TRANSPORTEURS.map(t => {
                  const prix = portGratuit ? 0 : (nbLivres === 1 ? t.prix.livres1 : nbLivres === 2 ? t.prix.livres2 : t.prix.livresPlus)
                  return (
                    <label key={t.id} className={`transporteur-card ${transporteur === t.id ? 'selected' : ''}`}>
                      <input type="radio" name="transporteur" value={t.id} checked={transporteur === t.id} onChange={() => setTransporteur(t.id)} />
                      <span className="t-logo">{t.logo}</span>
                      <div className="t-body">
                        <div className="t-header">
                          <span className="t-nom">{t.nom}</span>
                          {t.recommande && <span className="t-badge">Recommandé</span>}
                        </div>
                        <p className="t-desc">{t.description}</p>
                        <p className="t-delai">⏱ {t.delai}</p>
                      </div>
                      <div className="t-prix">
                        {portGratuit && prix === 0 ? <span className="t-gratuit">Gratuit !</span> : <span>{prix === 0 ? 'Gratuit' : `${prix.toFixed(2).replace('.', ',')} €`}</span>}
                      </div>
                    </label>
                  )
                })}
              </div>
              <div className="nav-btns">
                <button onClick={() => setEtape('panier')} className="btn-outline">← Retour</button>
                <button onClick={() => setEtape('paiement')} className="btn-dark" disabled={!transporteur}>
                  Continuer →
                </button>
              </div>
            </div>
            <div className="checkout-summary">
              <h3>Résumé</h3>
              {panier.map(item => {
                const livre = LIVRES.find(l => l.id === item.livreId)
                if (!livre) return null
                return <div key={item.livreId} className="summary-line"><span>{livre.titre} ×{item.quantite}</span><span>{(livre.prix * item.quantite).toFixed(2).replace('.', ',')} €</span></div>
              })}
              <div className="summary-line"><span>Livraison</span><span>{transporteur ? `${fraisPort().toFixed(2).replace('.', ',')} €` : '—'}</span></div>
              <div className="summary-total"><span>Total</span><span>{(totalLivres + fraisPort()).toFixed(2).replace('.', ',')} €</span></div>
            </div>
          </div>
        )}

        {/* ========== PAIEMENT / COORDONNÉES ========== */}
        {etape === 'paiement' && (
          <div className="checkout-layout">
            <div className="checkout-main">
              <h2 className="checkout-title">Vos coordonnées</h2>
              <div className="form-grid">
                <div className="form-row">
                  <div className="form-field"><label>Prénom *</label><input value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} placeholder="Votre prénom" /></div>
                  <div className="form-field"><label>Nom *</label><input value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} placeholder="Votre nom" /></div>
                </div>
                <div className="form-row">
                  <div className="form-field"><label>Email *</label><input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="votre@email.fr" /></div>
                  <div className="form-field"><label>Téléphone</label><input value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} placeholder="06..." /></div>
                </div>
                <div className="form-field full"><label>Adresse *</label><input value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})} placeholder="Numéro et nom de rue" /></div>
                <div className="form-row">
                  <div className="form-field"><label>Code postal *</label><input value={form.cp} onChange={e => setForm({...form, cp: e.target.value})} placeholder="75000" /></div>
                  <div className="form-field"><label>Ville *</label><input value={form.ville} onChange={e => setForm({...form, ville: e.target.value})} placeholder="Paris" /></div>
                </div>
                <div className="form-field full"><label>Pays</label>
                  <select value={form.pays} onChange={e => setForm({...form, pays: e.target.value})}>
                    <option>France</option><option>Belgique</option><option>Suisse</option><option>Canada</option><option>Luxembourg</option><option>Autre</option>
                  </select>
                </div>
                <div className="form-field full"><label>Message / Dédicace (optionnel)</label><textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Souhaitez-vous une dédicace personnalisée ? Un message particulier ?" rows={3} /></div>
              </div>

              <div className="paiement-info">
                <h3>💳 Paiement</h3>
                <p>Le paiement s'effectue par virement bancaire ou PayPal après validation de la commande. Vous recevrez les instructions par email.</p>
                <div className="paiement-options">
                  <span className="paiement-badge">🏦 Virement</span>
                  <span className="paiement-badge">💛 PayPal</span>
                  <span className="paiement-badge">🤝 En main propre</span>
                </div>
              </div>

              <div className="cgv-check">
                <label><input type="checkbox" required /> J'accepte les <Link href="/cgv">conditions générales de vente</Link> et la <Link href="/mentions-legales">politique de confidentialité</Link></label>
              </div>

              <div className="nav-btns">
                <button onClick={() => setEtape('livraison')} className="btn-outline">← Retour</button>
                <button
                  onClick={passerCommande}
                  className="btn-dark"
                  disabled={loading || !form.nom || !form.prenom || !form.email || !form.adresse || !form.ville || !form.cp}
                >
                  {loading ? 'Envoi en cours...' : `Valider la commande — ${total.toFixed(2).replace('.', ',')} €`}
                </button>
              </div>
            </div>
            <div className="checkout-summary">
              <h3>Résumé final</h3>
              {panier.map(item => {
                const livre = LIVRES.find(l => l.id === item.livreId)
                if (!livre) return null
                return <div key={item.livreId} className="summary-line"><span>{livre.titre} ×{item.quantite}</span><span>{(livre.prix * item.quantite).toFixed(2).replace('.', ',')} €</span></div>
              })}
              <div className="summary-line">
                <span>{TRANSPORTEURS.find(t => t.id === transporteur)?.nom}</span>
                <span>{fraisPort().toFixed(2).replace('.', ',')} €</span>
              </div>
              <div className="summary-total"><span>Total à payer</span><span>{total.toFixed(2).replace('.', ',')} €</span></div>
            </div>
          </div>
        )}

        {/* ========== CONFIRMATION ========== */}
        {etape === 'confirmation' && (
          <div className="confirmation">
            <div className="confirmation-icon">✅</div>
            <h2>Commande confirmée !</h2>
            <p className="confirmation-num">Numéro de commande : <strong>{orderNum}</strong></p>
            <p>Un email de confirmation a été envoyé à <strong>{form.email}</strong>.</p>
            <p>Vous recevrez les instructions de paiement et le suivi de livraison par email.</p>
            <p className="confirmation-merci">Merci pour votre commande et votre soutien ! 🖤<br />Chaque commande m'aide à continuer d'écrire, à rêver et à transmettre.</p>
            <Link href="/" className="btn-dark">Retour à l'accueil</Link>
          </div>
        )}

      </div>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Aurore Michaud</p>
        <div className="footer-links">
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/cgv">CGV</Link>
        </div>
      </footer>
    </>
  )
}
