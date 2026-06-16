import Link from 'next/link'
import Head from 'next/head'

export default function Mentions() {
  return (
    <>
      <Head>
        <title>Mentions légales — Aurore Michaud</title>
        <meta name="description" content="Mentions légales du site auroremichaud.com." />
        <link rel="canonical" href="https://auroremichaud.com/mentions-legales" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auroremichaud.com/mentions-legales" />
        <meta property="og:title" content="Mentions légales — Aurore Michaud" />
        <meta property="og:description" content="Mentions légales du site auroremichaud.com." />
        <meta property="og:image" content="https://auroremichaud.com/og-banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Aurore Michaud" />
      </Head>
      <nav className="nav"><Link href="/" className="nav-logo">Aurore Michaud</Link></nav>
      <div style={{maxWidth:'800px',margin:'3rem auto',padding:'0 2rem',fontFamily:'Georgia,serif',lineHeight:'1.8',color:'#1a1008'}}>
        <h1 style={{fontStyle:'italic',fontSize:'2rem',marginBottom:'2rem'}}>Mentions légales</h1>
        <h2 style={{fontSize:'1.2rem',marginTop:'1.5rem'}}>Éditeur</h2>
        <p>Aurore Michaud — Auteure indépendante — France</p>
        <h2 style={{fontSize:'1.2rem',marginTop:'1.5rem'}}>Hébergement</h2>
        <p>Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104</p>
        <h2 style={{fontSize:'1.2rem',marginTop:'1.5rem'}}>Données personnelles</h2>
        <p>Ce site ne propose pas de commande en ligne et ne collecte aucune donnée personnelle. Les achats des livres s'effectuent sur la plateforme Coollibri, qui dispose de sa propre politique de confidentialité.</p>
        <h2 style={{fontSize:'1.2rem',marginTop:'1.5rem'}}>Propriété intellectuelle</h2>
        <p>Tous les contenus de ce site (textes, images, livres) sont la propriété d'Aurore Michaud et sont protégés par le droit d'auteur.</p>
      </div>
      <footer className="footer"><p>© {new Date().getFullYear()} Aurore Michaud</p><div className="footer-links"><Link href="/">Accueil</Link><Link href="/cgv">CGV</Link></div></footer>
    </>
  )
}
