import Link from 'next/link'
import Head from 'next/head'
import { AUTEUR } from '../lib/config'

export default function CGV() {
  return (
    <>
      <Head>
        <title>CGV — Aurore Michaud</title>
        <meta name="description" content="Conditions générales de vente — les livres d'Aurore Michaud sont vendus via la plateforme Coollibri." />
        <link rel="canonical" href="https://auroremichaud.com/cgv" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://auroremichaud.com/cgv" />
        <meta property="og:title" content="CGV — Aurore Michaud" />
        <meta property="og:description" content="Conditions générales de vente — les livres d'Aurore Michaud sont vendus via la plateforme Coollibri." />
        <meta property="og:image" content="https://auroremichaud.com/og-banner.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Aurore Michaud" />
      </Head>
      <nav className="nav"><Link href="/" className="nav-logo">Aurore Michaud</Link></nav>
      <div style={{maxWidth:'800px',margin:'3rem auto',padding:'0 2rem',fontFamily:'Georgia,serif',lineHeight:'1.8',color:'#1a1008'}}>
        <h1 style={{fontStyle:'italic',fontSize:'2rem',marginBottom:'2rem'}}>Conditions Générales de Vente</h1>
        <p><strong>Auteure :</strong> Aurore Michaud — Auteure indépendante — France</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Vente des livres</h2>
        <p>Les livres d'Aurore Michaud ne sont pas vendus directement sur ce site. Ils sont disponibles à l'achat sur la plateforme <a href="https://www.coollibri.com/" target="_blank" rel="noopener noreferrer" style={{color:'#1a1008'}}>Coollibri</a>, qui assure la commande, le paiement, la livraison et le service après-vente.</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Prix</h2>
        <p>Les prix indiqués sur ce site sont donnés à titre indicatif. Les prix, frais de port et modalités de paiement applicables sont ceux affichés sur la plateforme Coollibri au moment de la commande.</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Commande, livraison et retours</h2>
        <p>Toute commande passée via Coollibri est soumise aux conditions générales de vente de Coollibri, disponibles sur leur site. Pour toute question relative à une commande, à la livraison ou à un retour, merci de contacter directement Coollibri.</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Contact</h2>
        <p>Pour toute question concernant les livres ou leur contenu : {AUTEUR.email}</p>
      </div>
      <footer className="footer"><p>© {new Date().getFullYear()} Aurore Michaud</p><div className="footer-links"><Link href="/">Accueil</Link><Link href="/mentions-legales">Mentions légales</Link></div></footer>
    </>
  )
}
