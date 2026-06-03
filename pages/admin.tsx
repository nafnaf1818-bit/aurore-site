import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'

type Commande = {
  id: string
  orderNumber: string
  date: string
  client: { nom: string; prenom: string; email: string; telephone: string; adresse: string; ville: string; cp: string; pays: string; message: string }
  panier: { livreId: string; titre: string; quantite: number; prix: number }[]
  transporteur: { nom: string; logo: string; urlSuivi: string | null }
  total: number
  fraisPort: number
  statut: 'nouvelle' | 'paiement_recu' | 'en_preparation' | 'expediee' | 'livree' | 'annulee'
  numeroSuivi: string
  notes: string
}

const STATUTS = {
  nouvelle: { label: 'Nouvelle', color: '#1877F2', bg: '#e8f0fe' },
  paiement_recu: { label: 'Paiement reçu', color: '#1a7f37', bg: '#e6f4ea' },
  en_preparation: { label: 'En préparation', color: '#a66800', bg: '#fef7e0' },
  expediee: { label: 'Expédiée', color: '#6f42c1', bg: '#f3eeff' },
  livree: { label: 'Livrée', color: '#1a1008', bg: '#f0ebe2' },
  annulee: { label: 'Annulée', color: '#c0392b', bg: '#fdecea' },
}

export default function Admin() {
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [filtre, setFiltre] = useState('toutes')
  const [selected, setSelected] = useState<Commande | null>(null)
  const [auth, setAuth] = useState(false)
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const a = localStorage.getItem('admin_auth')
    if (a === 'true') { setAuth(true); chargerCommandes() }
    else setLoading(false)
  }, [])

  const login = () => {
    // Mot de passe défini dans .env : ADMIN_PASSWORD
    if (pwd === process.env.NEXT_PUBLIC_ADMIN_PWD || pwd === 'aurore2026') {
      setAuth(true)
      localStorage.setItem('admin_auth', 'true')
      chargerCommandes()
    } else {
      alert('Mot de passe incorrect')
    }
  }

  const chargerCommandes = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/commandes')
      const data = await res.json()
      setCommandes(data.commandes || [])
    } catch (e) {
      setCommandes([])
    }
    setLoading(false)
  }

  const mettreAJourStatut = async (id: string, statut: string, numeroSuivi = '', notes = '') => {
    await fetch('/api/commandes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, statut, numeroSuivi, notes })
    })
    chargerCommandes()
    setSelected(null)
  }

  const commandesFiltrees = filtre === 'toutes' ? commandes : commandes.filter(c => c.statut === filtre)
  const stats = {
    total: commandes.length,
    nouvelles: commandes.filter(c => c.statut === 'nouvelle').length,
    enCours: commandes.filter(c => ['paiement_recu', 'en_preparation'].includes(c.statut)).length,
    ca: commandes.filter(c => c.statut !== 'annulee').reduce((acc, c) => acc + c.total, 0),
  }

  if (!auth) {
    return (
      <div className="admin-login">
        <h1>Administration</h1>
        <div className="login-box">
          <p>Espace réservé à Aurore Michaud</p>
          <input type="password" placeholder="Mot de passe" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} />
          <button onClick={login} className="btn-dark">Connexion</button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head><title>Admin — Commandes</title></Head>
      <div className="admin-wrap">
        <div className="admin-header">
          <div>
            <h1>Gestion des commandes</h1>
            <p>Aurore Michaud — Administration</p>
          </div>
          <div className="admin-header-actions">
            <button onClick={chargerCommandes} className="btn-outline-sm">↻ Actualiser</button>
            <button onClick={() => { localStorage.removeItem('admin_auth'); setAuth(false) }} className="btn-outline-sm">Déconnexion</button>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card"><p className="stat-num">{stats.total}</p><p className="stat-lbl">Total commandes</p></div>
          <div className="stat-card alert"><p className="stat-num">{stats.nouvelles}</p><p className="stat-lbl">Nouvelles ⚡</p></div>
          <div className="stat-card"><p className="stat-num">{stats.enCours}</p><p className="stat-lbl">En cours</p></div>
          <div className="stat-card success"><p className="stat-num">{stats.ca.toFixed(2)} €</p><p className="stat-lbl">Chiffre d'affaires</p></div>
        </div>

        {/* FILTRES */}
        <div className="filtres">
          {['toutes', ...Object.keys(STATUTS)].map(f => (
            <button key={f} onClick={() => setFiltre(f)} className={`filtre-btn ${filtre === f ? 'active' : ''}`}>
              {f === 'toutes' ? 'Toutes' : STATUTS[f as keyof typeof STATUTS]?.label}
              {f !== 'toutes' && <span className="filtre-count">{commandes.filter(c => c.statut === f).length}</span>}
            </button>
          ))}
        </div>

        {/* LISTE COMMANDES */}
        {loading ? <p className="loading-msg">Chargement...</p> : (
          <div className="commandes-list">
            {commandesFiltrees.length === 0 ? (
              <div className="empty-state">Aucune commande {filtre !== 'toutes' ? `avec le statut "${STATUTS[filtre as keyof typeof STATUTS]?.label}"` : ''}</div>
            ) : commandesFiltrees.map(c => (
              <div key={c.id} className="commande-row" onClick={() => setSelected(c)}>
                <div className="commande-num">
                  <strong>{c.orderNumber}</strong>
                  <span className="commande-date">{new Date(c.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className="commande-client">
                  <strong>{c.client.prenom} {c.client.nom}</strong>
                  <span>{c.client.email}</span>
                </div>
                <div className="commande-livres">
                  {c.panier.map(item => <span key={item.livreId}>{item.titre} ×{item.quantite}</span>)}
                </div>
                <div className="commande-transport">
                  <span>{c.transporteur?.logo} {c.transporteur?.nom}</span>
                  {c.numeroSuivi && <span className="suivi-num">📦 {c.numeroSuivi}</span>}
                </div>
                <div className="commande-total">{c.total.toFixed(2)} €</div>
                <div>
                  <span className="statut-badge" style={{ color: STATUTS[c.statut]?.color, background: STATUTS[c.statut]?.bg }}>
                    {STATUTS[c.statut]?.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL DÉTAIL */}
        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
              <h2>Commande {selected.orderNumber}</h2>
              <p className="modal-date">{new Date(selected.date).toLocaleString('fr-FR')}</p>

              <div className="modal-section">
                <h3>Client</h3>
                <p><strong>{selected.client.prenom} {selected.client.nom}</strong></p>
                <p>📧 {selected.client.email}</p>
                {selected.client.telephone && <p>📞 {selected.client.telephone}</p>}
                <p>📍 {selected.client.adresse}, {selected.client.cp} {selected.client.ville}, {selected.client.pays}</p>
                {selected.client.message && <p className="client-message">💬 « {selected.client.message} »</p>}
              </div>

              <div className="modal-section">
                <h3>Livres commandés</h3>
                {selected.panier.map(item => (
                  <div key={item.livreId} className="modal-livre">
                    <span>{item.titre} × {item.quantite}</span>
                    <span>{(item.prix * item.quantite).toFixed(2)} €</span>
                  </div>
                ))}
                <div className="modal-livre"><span>Livraison ({selected.transporteur?.nom})</span><span>{selected.fraisPort.toFixed(2)} €</span></div>
                <div className="modal-livre total"><span>Total</span><span>{selected.total.toFixed(2)} €</span></div>
              </div>

              <div className="modal-section">
                <h3>Suivi livraison</h3>
                <input placeholder="Numéro de suivi" defaultValue={selected.numeroSuivi}
                  onChange={e => setSelected({...selected, numeroSuivi: e.target.value})} />
                {selected.transporteur?.urlSuivi && (
                  <a href={selected.transporteur.urlSuivi} target="_blank" rel="noreferrer" className="suivi-link">
                    Suivre sur le site du transporteur →
                  </a>
                )}
              </div>

              <div className="modal-section">
                <h3>Notes internes</h3>
                <textarea rows={3} placeholder="Notes..." defaultValue={selected.notes}
                  onChange={e => setSelected({...selected, notes: e.target.value})} />
              </div>

              <div className="modal-section">
                <h3>Changer le statut</h3>
                <div className="statuts-grid">
                  {Object.entries(STATUTS).map(([key, val]) => (
                    <button key={key} onClick={() => mettreAJourStatut(selected.id, key, selected.numeroSuivi, selected.notes)}
                      className={`statut-btn ${selected.statut === key ? 'active' : ''}`}
                      style={selected.statut === key ? { color: val.color, background: val.bg, borderColor: val.color } : {}}>
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button onClick={() => mettreAJourStatut(selected.id, selected.statut, selected.numeroSuivi, selected.notes)} className="btn-dark">
                  Sauvegarder
                </button>
                <button onClick={() => window.open(`mailto:${selected.client.email}?subject=Votre commande ${selected.orderNumber}`)} className="btn-outline">
                  📧 Contacter le client
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
