import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { AUTEUR, LIVRES, CREATEURS } from '../lib/config'

export default function Home() {
  const livresActifs = LIVRES
  const createursActifs = CREATEURS.filter(c => c.actif)
  const premierLivre = livresActifs[0]
  const [lightbox, setLightbox] = useState<{src: string, zoom: number} | null>(null)

  return (
    <>
    <Head>
        <title>Aurore Michaud — L'encre des Âmes Libres | Auteure</title>
        <meta name="description" content="Des mots qui brûlent. Des récits qui réparent. Des âmes qui se reconnaissent. Découvrez les livres d'Aurore Michaud : romans intenses et contes poétiques." />
        <link rel="canonical" href="https://auroremichaud.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auroremichaud.com/" />
        <meta property="og:title" content="Aurore Michaud — L'encre des Âmes Libres" />
        <meta property="og:description" content="Romans intenses, contes poétiques. Des mots qui brûlent, des récits qui réparent. Disponibles sur Coollibri." />
        <meta property="og:image" content="https://auroremichaud.com/og-banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Aurore Michaud" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aurore Michaud — L'encre des Âmes Libres" />
        <meta name="twitter:description" content="Romans intenses, contes poétiques. Des mots qui brûlent, des récits qui réparent." />
        <meta name="twitter:image" content="https://auroremichaud.com/og-banner.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Aurore Michaud",
            "url": "https://auroremichaud.com",
            "jobTitle": "Auteure",
            "sameAs": [AUTEUR.facebook]
          }) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Raleway:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </Head>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <img src={lightbox.src} style={{ maxHeight: '70vh', maxWidth: '80vw', transform: `scale(${lightbox.zoom})`, transformOrigin: 'center', transition: 'transform 0.2s', borderRadius: '4px', display: 'block' }} />
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', position: 'relative', zIndex: 10 }}>
              <button onClick={() => setLightbox({ ...lightbox, zoom: Math.max(0.5, lightbox.zoom - 0.25) })} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', width: '36px', height: '36px', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '50%' }}>−</button>
              <span style={{ color: '#fff', fontSize: '0.8rem', minWidth: '40px', textAlign: 'center' }}>{Math.round(lightbox.zoom * 100)}%</span>
              <button onClick={() => setLightbox({ ...lightbox, zoom: Math.min(6, lightbox.zoom + 0.25) })} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', border: 'none', width: '36px', height: '36px', fontSize: '1.2rem', cursor: 'pointer', borderRadius: '50%' }}>+</button>
            </div>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '-2.5rem', right: 0, background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>✕</button>
          </div>
        </div>
      )}

      <nav className="nav">
        <span className="nav-logo">Aurore Michaud</span>
        <ul className="nav-links">
          <li><a href="#livres">Livres</a></li>
          <li><a href="#apropos">À propos</a></li>
          <li><a href={AUTEUR.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
          <li><Link href="/boutique" className="nav-cta">Boutique</Link></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <span className="hero-badge">✦ Nouveauté — 2026</span>
          <div className="hero-script">Aurore Michaud</div>
          <h1 className="hero-title">La vie n'est<br />qu'illusion</h1>
          <div className="hero-quote">
            <p>Allez viens. Toi et moi on a besoin d'un endroit calme où on peut se poser, discuter, et se mettre d'accord.</p>
          </div>
          <p className="hero-sub">Un livre pour comprendre, se reconnecter<br />et choisir la paix intérieure · 294 pages</p>
          <div className="btn-row">
            <a href={premierLivre.lienCoollibri} target="_blank" rel="noopener noreferrer" className="btn-dark">Acheter — {premierLivre.prix.toFixed(2).replace('.', ',')} €</a>
            <a href="#livres" className="btn-outline">Tous les livres</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="cover-stack">
            {true ? (
              <img src="/affiche-ames-libres.jpg" alt="L'encre des Âmes Libres — les livres d'Aurore Michaud" style={{width:'100%',height:'auto',display:'block',borderRadius:'2px', cursor:'zoom-in'}} onClick={() => setLightbox({ src: '/affiche-ames-libres.jpg', zoom: 1 })} />
            ) : (
              <div className="cover-placeholder">
                <span>📖</span>
                <small>La vie n'est qu'illusion</small>
              </div>
            )}
          </div>
          <p className="cover-label">Dernière parution</p>
        </div>
      </section>

      <div className="divider" />

      {/* LIVRES */}
      <section className="books-section" id="livres">
        <div className="section-header">
          <h2 className="section-h-title">Tous les livres</h2>
          <span className="section-h-sub">{livresActifs.length} œuvres publiées</span>
        </div>
        <div className="books-grid">
          {livresActifs.map((livre, i) => (
            <div key={livre.id} className="book-item">
              <div className="book-cover-wrap">
                <span className="book-num">0{i + 1}</span>
                {livre.couverture ? (
                  <img src={livre.couverture} alt={livre.titre} style={{width:'100%',height:'100%',objectFit:'cover', cursor:'zoom-in'}} onClick={() => setLightbox({ src: livre.couverture || '', zoom: 1 })} />
                ) : (
                  <div className="book-cover-placeholder">
                    <span>📖</span>
                    <small>{livre.titre}</small>
                  </div>
                )}
                {livre.nouveaute && <span className="book-badge">Nouveauté</span>}
              </div>
              <p className="book-cat">{livre.sousTitre} · {livre.annee}</p>
              <h3 className="book-title">{livre.titre}</h3>
              <p className="book-desc">{livre.description}</p>
              <div className="book-footer">
                <div className="book-price">
                  {livre.prix.toFixed(2).replace('.', ',')} €
                  {livre.pages && <small>{livre.pages} pages</small>}
                </div>
                <a href={livre.lienCoollibri} target="_blank" rel="noopener noreferrer" className="book-order">
                  Acheter sur Coollibri →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* À PROPOS */}
      <section className="about-section" id="apropos">
        <div className="about-inner">
          {AUTEUR.photo ? (
            <img src={AUTEUR.photo} alt="Aurore Michaud" className="about-photo" style={{cursor:'zoom-in'}} onClick={() => setLightbox({ src: AUTEUR.photo, zoom: 1 })} />
          ) : (
            <div className="about-photo-placeholder">
              <span>📷</span>
              <small>Photo à venir</small>
            </div>
          )}
          <div>
            <p className="about-eyebrow">✦ l'auteure ✦</p>
            <h2 className="about-name">Aurore Michaud</h2>
            <p className="about-role">{AUTEUR.traits.join(' · ')}</p>
            <p className="about-text">{AUTEUR.description}</p>
            <p className="about-text">{AUTEUR.bio}</p>
            <div className="social-row">
              <a href={AUTEUR.facebook} target="_blank" rel="noreferrer" className="social-btn fb">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                L'encre des Âmes Libres
              </a>
            </div>
          </div>
        </div>
      </section>

      {createursActifs.length > 0 && (
        <section className="createurs-section">
          <div className="section-header" style={{maxWidth: '1100px', margin: '0 auto', padding: '0 2rem'}}>
            <h2 className="section-h-title">Créateurs à découvrir</h2>
            <span className="section-h-sub">Espace partenaires</span>
          </div>
          <div className="createurs-grid">
            {createursActifs.map(c => (
              <a key={c.id} href={c.lien} target="_blank" rel="noreferrer" className="createur-card">
                <div className="createur-img">{c.image ? <img src={c.image} alt={c.nom} /> : '🌟'}</div>
                <h3>{c.nom}</h3>
                <p>{c.description}</p>
                <span>Découvrir →</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="quote-section">
        <span className="q-mark">"</span>
        <p className="q-text">Chaque livre est un voyage… chaque page, une rencontre… chaque mot, une liberté.</p>
        <p className="q-by">— Aurore Michaud</p>
      </section>

      <section className="cta-section">
        <p className="cta-eyebrow">✦ commander ✦</p>
        <h2 className="cta-title">Laissez parler votre âme.</h2>
        <div className="btn-row" style={{justifyContent: 'center'}}>
          <Link href="/boutique" className="btn-dark">Accéder à la boutique</Link>
          <a href={AUTEUR.facebook} target="_blank" rel="noreferrer" className="btn-outline">Page Facebook</a>
        </div>
        <p className="cta-outro">Merci pour votre soutien et votre confiance.<br />Chaque commande m'aide à continuer d'écrire, à rêver et à transmettre. 🖤</p>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Aurore Michaud — Tous droits réservés</p>
        <div className="footer-links">
          <a href={`mailto:${AUTEUR.email}`}>✉️ {AUTEUR.email}</a>
          <a href={AUTEUR.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          {AUTEUR.instagram && <a href={AUTEUR.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/cgv">CGV</Link>
        </div>
      </footer>
    </>
  )
}