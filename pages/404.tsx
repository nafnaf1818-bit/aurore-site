import Link from 'next/link'
import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page introuvable — Aurore Michaud</title>
        <meta name="robots" content="noindex" />
      </Head>
      <nav className="nav"><Link href="/" className="nav-logo">Aurore Michaud</Link></nav>
      <div className="error-404">
        <p className="error-eyebrow">✦ 404 ✦</p>
        <h1 className="error-title">Cette page s'est égarée…</h1>
        <p className="error-text">
          Comme certains chapitres, celui-ci n'existe pas (encore). La page que vous cherchez a peut-être changé d'adresse ou n'a jamais existé.
        </p>
        <Link href="/" className="btn-dark">Retour à l'accueil</Link>
        <p className="error-sign">— Ton auteure, Aurore</p>
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
