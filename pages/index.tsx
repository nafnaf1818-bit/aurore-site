import Head from 'next/head'
import Link from 'next/link'
import { AUTEUR, LIVRES, CREATEURS } from '../lib/config'

export default function Home() {
  const livresActifs = LIVRES
  const createursActifs = CREATEURS.filter(c => c.actif)
  const premierLivre = livresActifs[0]

  return (
    <>
      <Head>
        <title>Aurore Michaud — L'encre des Âmes Libres</title>
        <meta name="description" content="Des mots qui brûlent. Des récits qui réparent. Des âmes qui se reconnaissent. Découvrez les livres d'Aurore Michaud." />
        <meta property="og:title" content="Aurore Michaud — L'encre des Âmes Libres" />
        <meta property="og:description" content="Romans intenses, contes poétiques. Commander sur ce site ou sur coollibri.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Raleway:wght@200;300;400;500&display=swap" rel="stylesheet" />
      </Head>

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
            <Link href="/boutique" className="btn-dark">Commander — 29,90 €</Link>
            <a href="#livres" className="btn-outline">Tous les livres</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="cover-stack">
            <div className="cover-shadow2" />
            <div className="cover-shadow1" />
            {premierLivre?.couverture ? (
              <img src={premierLivre.couverture} alt={premierLivre.titre} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'2px'}} />
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
                  <img src={livre.couverture} alt={livre.titre} style={{width:'100%',height:'100%',objectFit:'cover'}} />
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
                <Link href={`/boutique?livre=${livre.id}`} className="book-order">
                  Commander →
                </Link>
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
            <img src={AUTEUR.photo} alt="Aurore Michaud" className="about-photo" />
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

      {/* ESPACE CRÉATEURS */}
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

      {/* QUOTE */}
      <section className="quote-section">
        <span className="q-mark">"</span>
        <p className="q-text">Chaque livre est un voyage… chaque page, une rencontre… chaque mot, une liberté.</p>
        <p className="q-by">— Aurore Michaud</p>
      </section>

      {/* CTA FINAL */}
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
          <Link href="/mentions-legales">Mentions légales</Link>
          <Link href="/cgv">CGV</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </footer>
    </>
  )
}
