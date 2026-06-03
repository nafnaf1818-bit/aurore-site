import Link from 'next/link'
import Head from 'next/head'

export default function Mentions() {
  return (
    <>
      <Head><title>Mentions légales — Aurore Michaud</title></Head>
      <nav className="nav"><Link href="/" className="nav-logo">Aurore Michaud</Link></nav>
      <div style={{maxWidth:'800px',margin:'3rem auto',padding:'0 2rem',fontFamily:'Georgia,serif',lineHeight:'1.8',color:'#1a1008'}}>
        <h1 style={{fontStyle:'italic',fontSize:'2rem',marginBottom:'2rem'}}>Mentions légales</h1>
        <h2 style={{fontSize:'1.2rem',marginTop:'1.5rem'}}>Éditeur</h2>
        <p>Aurore Michaud — Éditeur indépendant — France</p>
        <h2 style={{fontSize:'1.2rem',marginTop:'1.5rem'}}>Hébergement</h2>
        <p>Vercel Inc. — 340 Pine Street, Suite 701, San Francisco, CA 94104</p>
        <h2 style={{fontSize:'1.2rem',marginTop:'1.5rem'}}>Données personnelles</h2>
        <p>Les données collectées lors des commandes (nom, adresse, email) sont utilisées uniquement pour le traitement des commandes. Elles ne sont pas transmises à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de modification et de suppression de vos données.</p>
        <h2 style={{fontSize:'1.2rem',marginTop:'1.5rem'}}>Propriété intellectuelle</h2>
        <p>Tous les contenus de ce site (textes, images, livres) sont la propriété d'Aurore Michaud et sont protégés par le droit d'auteur.</p>
      </div>
      <footer className="footer"><p>© {new Date().getFullYear()} Aurore Michaud</p><div className="footer-links"><Link href="/">Accueil</Link><Link href="/cgv">CGV</Link></div></footer>
    </>
  )
}
