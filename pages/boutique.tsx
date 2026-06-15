import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { LIVRES, AUTEUR } from '../lib/config'

export default function Boutique() {
  const [lightbox, setLightbox] = useState<{src: string, zoom: number} | null>(null)

  return (
    <>
    <Head>
        <title>Boutique — Les livres d'Aurore Michaud | Disponibles sur Coollibri</title>
        <meta name="description" content="Découvrez les livres d'Aurore Michaud : romans intenses et contes poétiques, disponibles à l'achat sur Coollibri." />
        <link rel="canonical" href="https://auroremichaud.com/boutique" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auroremichaud.com/boutique" />
        <meta property="og:title" content="Boutique — Les livres d'Aurore Michaud" />
        <meta property="og:description" content="Romans intenses et contes poétiques, disponibles sur Coollibri." />
        <meta property="og:image" content="https://auroremichaud.com/og-banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Aurore Michaud" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Boutique — Les livres d'Aurore Michaud" />
        <meta name="twitter:description" content="Romans intenses et contes poétiques, disponibles sur Coollibri." />
        <meta name="twitter:image" content="https://auroremichaud.com/og-banner.png" />
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
                  "url": livre.lienCoollibri
                }
              }
            }))
          }) }}
        />
        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;1,400&family=Raleway:wght@200;300;400;500&display=swap" rel="stylesheet" />
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
        <Link href="/" className="nav-logo">Aurore Michaud</Link>
        <ul className="nav-links">
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/#livres">Livres</Link></li>
        </ul>
      </nav>

      <section className="books-section">
        <div className="section-header">
          <h2 className="section-h-title">Mes livres</h2>
          <span className="section-h-sub">Disponibles sur Coollibri</span>
        </div>
        <div className="books-grid">
          {LIVRES.map((livre, i) => (
            <div key={livre.id} className="book-item">
              <div className="book-cover-wrap">
                <span className="book-num">0{i + 1}</span>
                <img src={livre.couverture} alt={`Couverture de ${livre.titre}`} style={{width:'100%',height:'100%',objectFit:'cover', cursor:'zoom-in'}} onClick={() => setLightbox({ src: livre.couverture || '', zoom: 1 })} />
                {livre.nouveaute && <span className="book-badge">Nouveauté</span>}
              </div>
              <p className="book-cat">{livre.sousTitre} · {livre.annee}</p>
              <h3 className="book-title">{livre.titre}</h3>
              <p className="book-desc">{livre.descriptionLongue}</p>
              <div className="book-footer">
                <div className="book-price">
                  {livre.prix.toFixed(2).replace('.', ',')} €
                  {livre.pages && <small>{livre.pages} pages</small>}
                </div>
                <a href={livre.lienCoollibri} target="_blank" rel="noopener noreferrer" className="book-buy">
                  Acheter sur Coollibri →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Aurore Michaud</p>
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
