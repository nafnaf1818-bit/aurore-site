import Link from 'next/link'
import Head from 'next/head'
import { AUTEUR, BOUTIQUE } from '../lib/config'

export default function CGV() {
  return (
    <>
      <Head><title>CGV — Aurore Michaud</title></Head>
      <nav className="nav"><Link href="/" className="nav-logo">Aurore Michaud</Link></nav>
      <div style={{maxWidth:'800px',margin:'3rem auto',padding:'0 2rem',fontFamily:'Georgia,serif',lineHeight:'1.8',color:'#1a1008'}}>
        <h1 style={{fontStyle:'italic',fontSize:'2rem',marginBottom:'2rem'}}>Conditions Générales de Vente</h1>
        <p><strong>Vendeur :</strong> Aurore Michaud — Éditeur indépendant — France</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Commandes</h2>
        <p>Toute commande passée sur ce site vaut acceptation des présentes CGV. Les commandes sont traitées sous {BOUTIQUE.delaiTraitement}</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Prix</h2>
        <p>Les prix sont indiqués en euros TTC. Les frais de port sont calculés selon le transporteur choisi.</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Paiement</h2>
        <p>Le paiement s'effectue par virement bancaire ou PayPal. Les instructions vous sont envoyées par email après validation de votre commande.</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Livraison</h2>
        <p>Les délais de livraison sont indicatifs et dépendent du transporteur choisi. Un numéro de suivi vous sera communiqué dès l'expédition.</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Retours</h2>
        <p>{BOUTIQUE.conditionsRetour}</p>
        <h2 style={{marginTop:'2rem',fontSize:'1.2rem'}}>Contact</h2>
        <p>Pour toute question : {AUTEUR.email}</p>
      </div>
      <footer className="footer"><p>© {new Date().getFullYear()} Aurore Michaud</p><div className="footer-links"><Link href="/">Accueil</Link><Link href="/mentions-legales">Mentions légales</Link></div></footer>
    </>
  )
}
