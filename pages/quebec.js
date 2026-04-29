import Head from 'next/head';
import Link from 'next/link';

const STRIPE_LINK = 'https://buy.stripe.com/cNifZa362eWm7xK1q8bwk00';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Quebec Tenant Rights — Security Deposits Are Illegal',
  description: 'In Quebec, security deposits are completely illegal under Article 1904 of the Civil Code. If your landlord took one, you can get it all back. Generate a demand letter for $6.99.',
  url: 'https://depositback.ca/quebec',
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Are security deposits legal in Quebec?', acceptedAnswer: { '@type': 'Answer', text: 'No. Under Article 1904 of the Civil Code of Québec, a landlord cannot require any amount of money from a tenant before or at the start of a tenancy, other than the first month\'s rent. Security deposits, damage deposits, and pet deposits are all illegal.' } },
      { '@type': 'Question', name: 'How do I get my illegal deposit back in Quebec?', acceptedAnswer: { '@type': 'Answer', text: 'Send a formal demand letter citing Article 1904 CCQ. If the landlord refuses, file an application with the Tribunal administratif du logement (TAL) — formerly the Régie du logement.' } },
      { '@type': 'Question', name: 'My Quebec lease says the deposit is non-refundable. Is that legal?', acceptedAnswer: { '@type': 'Answer', text: 'No. A lease clause cannot override the Civil Code of Québec. Any clause requiring a security deposit is null and void by law. The landlord must return the full amount.' } },
    ],
  },
};

const s = {
  page: { background: '#08121f', color: '#e8eaf0', minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif", lineHeight: '1.7' },
  nav: { borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '780px', margin: '0 auto' },
  navLogo: { color: '#fff', fontWeight: '700', fontSize: '17px', textDecoration: 'none' },
  navCta: { background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  wrap: { maxWidth: '780px', margin: '0 auto', padding: '0 24px 80px' },
  breadcrumb: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: '32px 0 20px' },
  breadcrumbLink: { color: 'rgba(255,255,255,0.35)', textDecoration: 'none' },
  tag: { display: 'inline-block', background: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '20px' },
  h1: { fontSize: 'clamp(26px,5vw,38px)', fontWeight: '800', color: '#fff', lineHeight: '1.15', marginBottom: '18px', letterSpacing: '-0.5px' },
  lead: { fontSize: '17px', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', marginBottom: '30px', lineHeight: '1.65' },
  ctaRow: { display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' },
  ctaPrimary: { background: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: '700', display: 'inline-block' },
  ctaNote: { fontSize: '13px', color: 'rgba(255,255,255,0.35)' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '12px', marginBottom: '48px' },
  statCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '18px 20px' },
  statNum: { fontSize: '24px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px', lineHeight: '1', marginBottom: '6px' },
  statLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.4' },
  alertBox: { background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '12px', padding: '20px 24px', marginBottom: '48px' },
  alertTitle: { fontSize: '14px', fontWeight: '700', color: '#fbbf24', marginBottom: '8px' },
  alertText: { fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', margin: 0 },
  divider: { border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 48px' },
  h2: { fontSize: '21px', fontWeight: '700', color: '#fff', marginBottom: '14px', letterSpacing: '-0.3px', marginTop: '0' },
  h3: { fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '10px', marginTop: '0' },
  p: { fontSize: '15px', color: 'rgba(255,255,255,0.6)', marginBottom: '16px', lineHeight: '1.75' },
  section: { marginBottom: '48px' },
  lawCard: { background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: '12px', padding: '22px', marginBottom: '16px' },
  lawLabel: { fontSize: '11px', fontWeight: '700', color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
  lawTitle: { fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '10px' },
  lawText: { fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.65', margin: 0 },
  illegalCard: { background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', padding: '22px', marginBottom: '16px' },
  illegalLabel: { fontSize: '11px', fontWeight: '700', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
  illegalTitle: { fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '10px' },
  illegalText: { fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.65', margin: 0 },
  ruleList: { listStyle: 'none', padding: 0, margin: '0 0 16px' },
  ruleItem: { display: 'flex', gap: '12px', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.5', alignItems: 'flex-start' },
  iconGreen: { width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0, marginTop: '1px' },
  iconRed: { width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(239,68,68,0.15)', color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0, marginTop: '1px' },
  stepList: { listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: '12px' },
  step: { display: 'flex', gap: '14px', alignItems: 'flex-start' },
  stepNum: { width: '26px', height: '26px', background: 'rgba(37,99,235,0.15)', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#60a5fa', flexShrink: 0, marginTop: '1px' },
  stepTitle: { fontSize: '14px', fontWeight: '600', color: '#fff', marginBottom: '3px' },
  stepText: { fontSize: '13px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6', margin: 0 },
  faqItem: { borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: '22px', marginBottom: '22px' },
  faqQ: { fontSize: '15px', fontWeight: '700', color: '#fff', marginBottom: '8px' },
  faqA: { fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.7', margin: 0 },
  bottomCta: { background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: '16px', padding: '36px', textAlign: 'center' },
  bottomCtaTitle: { fontSize: '22px', fontWeight: '800', color: '#fff', marginBottom: '10px', letterSpacing: '-0.3px' },
  bottomCtaText: { fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px', lineHeight: '1.6' },
  guarantee: { fontSize: '12px', color: 'rgba(255,255,255,0.25)', marginTop: '12px' },
};

export default function QuebecPage() {
  return (
    <div style={s.page}>
      <Head>
        <title>Security Deposits Are Illegal in Quebec — Get Yours Back | DepositBack.ca</title>
        <meta name="description" content="Quebec law (Article 1904 CCQ) makes all security deposits illegal. If your landlord took one, you're owed the full amount back. Generate a demand letter for $6.99." />
        <link rel="canonical" href="https://depositback.ca/quebec" />
        <meta property="og:title" content="Security Deposits Are Illegal in Quebec — Article 1904 CCQ" />
        <meta property="og:description" content="Did your Quebec landlord take a damage or security deposit? That's illegal. You can get every dollar back." />
        <meta name="geo.region" content="CA-QC" />
        <meta name="geo.placename" content="Quebec, Canada" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <nav><div style={s.nav}><Link href="/" style={s.navLogo}>DepositBack.ca</Link><a href={STRIPE_LINK} style={s.navCta}>Get My Letter — $6.99</a></div></nav>

      <div style={s.wrap}>
        <div style={s.breadcrumb}><Link href="/" style={s.breadcrumbLink}>Home</Link> / Quebec Tenant Rights</div>
        <div style={s.tag}>Quebec Guide · Unique Rules</div>
        <h1 style={s.h1}>Security Deposits Are Illegal in Quebec. Get Yours Back.</h1>
        <p style={s.lead}>Quebec has some of the most tenant-friendly laws in North America. Under Article 1904 of the Civil Code, your landlord had absolutely no right to take a security deposit — and you can get every cent back.</p>
        <div style={s.ctaRow}>
          <a href={STRIPE_LINK} style={s.ctaPrimary}>Generate My Demand Letter — $6.99</a>
          <span style={s.ctaNote}>Cites Article 1904 CCQ. Instant download.</span>
        </div>

        <div style={s.statGrid}>
          {[['Illegal','Security deposits — completely, always, no exceptions'],['100%','Amount you're owed back — the full deposit'],['TAL','Tribunal administratif du logement — free to file'],['Art. 1904','The Civil Code article that protects you']].map(([n,l]) => (
            <div key={l} style={s.statCard}><div style={s.statNum}>{n}</div><div style={s.statLabel}>{l}</div></div>
          ))}
        </div>

        <div style={s.alertBox}>
          <div style={s.alertTitle}>🚨 This is not a grey area — deposits are banned outright in Quebec</div>
          <p style={s.alertText}>Unlike other provinces where security deposits are legal but regulated, Quebec <strong style={{color:'#fbbf24'}}>completely bans</strong> them. It doesn't matter what your lease says. It doesn't matter if the landlord calls it a "damage fee," "cleaning deposit," or "pet deposit." Any money collected beyond the first month's rent is illegal — and recoverable.</p>
        </div>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>What Quebec Law Says</h2>
          <div style={s.lawCard}>
            <div style={s.lawLabel}>Civil Code of Québec — Article 1904</div>
            <div style={s.lawTitle}>Security Deposits Prohibited</div>
            <p style={s.lawText}>A lessor may not require any amount of money from the lessee, other than the rent provided for in the lease. A clause in a lease requiring such a payment is null. The lessor must reimburse to the lessee any amount paid contrary to this article, with interest from the date of payment.</p>
          </div>
          <div style={s.illegalCard}>
            <div style={s.illegalLabel}>What this means for you</div>
            <div style={s.illegalTitle}>Your landlord owes you the full amount — with interest</div>
            <p style={s.illegalText}>Article 1904 doesn't just say deposits are illegal — it says your landlord must return the money with interest from the date you paid it. The longer they've held your money, the more they owe you. A demand letter citing this article typically resolves the dispute quickly.</p>
          </div>
        </section>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>What is Legal vs. Illegal in Quebec</h2>
          <h3 style={s.h3}>What landlords CAN collect</h3>
          <ul style={s.ruleList}>
            <li style={s.ruleItem}><span style={s.iconGreen}>✓</span><span><strong style={{color:'#e8eaf0'}}>First month's rent</strong> — this is the only upfront payment permitted by law.</span></li>
            <li style={{...s.ruleItem, borderBottom:'none'}}><span style={s.iconGreen}>✓</span><span><strong style={{color:'#e8eaf0'}}>Rent</strong> — ongoing monthly payments as agreed in the lease.</span></li>
          </ul>
          <h3 style={s.h3}>What landlords CANNOT collect — ever</h3>
          <ul style={s.ruleList}>
            <li style={s.ruleItem}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Security deposit</strong> — illegal under Article 1904, regardless of amount.</span></li>
            <li style={s.ruleItem}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Damage deposit</strong> — no exceptions. The landlord must go to the TAL to claim damages after you leave.</span></li>
            <li style={s.ruleItem}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Pet deposit</strong> — illegal. Landlords in Quebec also cannot refuse to rent to pet owners in most cases.</span></li>
            <li style={s.ruleItem}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Cleaning deposit</strong> — illegal. Any cleaning claim must be filed through the TAL after move-out.</span></li>
            <li style={{...s.ruleItem, borderBottom:'none'}}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Non-refundable fees of any kind</strong> — application fees, administrative fees, key deposits beyond the actual cost of the key — all illegal.</span></li>
          </ul>
        </section>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>How to Get Your Deposit Back in Quebec</h2>
          <ol style={s.stepList}>
            {[
              ['Generate your demand letter', 'Cites Article 1904 of the Civil Code of Québec and demands return of the full amount — including interest from the date of payment.'],
              ['Send in writing', 'Email is best for a timestamp. Send a copy by registered mail if the amount is significant. Keep everything.'],
              ['Give 10 days to respond', 'Most landlords return the money quickly once they realize the law is unambiguous and you know it.'],
              ['File with the TAL if ignored', 'The Tribunal administratif du logement (TAL) handles Quebec tenant disputes. Filing is free for most cases. You can file online at tal.gouv.qc.ca.'],
            ].map(([t, d], i) => (
              <li key={t} style={s.step}>
                <div style={s.stepNum}>{i + 1}</div>
                <div><div style={s.stepTitle}>{t}</div><p style={s.stepText}>{d}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>Frequently Asked Questions</h2>
          {[
            ['My Quebec lease says my deposit is "non-refundable." Does that hold up?', "No. A lease clause cannot override the Civil Code of Québec. Article 1904 explicitly states that any clause requiring a payment beyond rent is null and void. The non-refundable language in your lease is unenforceable. Demand the full amount back."],
            ['I paid a deposit years ago and I\'m still living here. Can I still get it back?', "Yes. Article 1904 says the landlord must return the deposit with interest from the date you paid it. There is no time limit that extinguishes this right while you are still a tenant. You can demand it now."],
            ['My landlord called it an "administrative fee" rather than a deposit. Does that change anything?', "No. The Civil Code is clear that any amount collected beyond rent is illegal — regardless of what it's called. Administrative fees, key deposits beyond actual replacement cost, application fees — all prohibited."],
            ['Do I need a lawyer to file with the TAL?', "No. The TAL is designed for tenants to represent themselves. The process is straightforward, bilingual, and free to file for most applications. Your demand letter and any proof of payment are your key evidence."],
          ].map(([q, a], i, arr) => (
            <div key={q} style={{...s.faqItem, ...(i === arr.length - 1 ? {borderBottom:'none',paddingBottom:0,marginBottom:0} : {})}}>
              <div style={s.faqQ}>{q}</div>
              <p style={s.faqA}>{a}</p>
            </div>
          ))}
        </section>

        <div style={s.bottomCta}>
          <div style={s.bottomCtaTitle}>Ready to Get Your Quebec Deposit Back?</div>
          <p style={s.bottomCtaText}>Generate a demand letter citing Article 1904 of the Civil Code of Québec. 5 minutes. Instant download. The law is on your side.</p>
          <a href={STRIPE_LINK} style={{...s.ctaPrimary, padding:'15px 36px', fontSize:'15px'}}>Generate My Letter — $6.99</a>
          <div style={s.guarantee}>Money-back guarantee · No subscription · Download instantly</div>
        </div>
      </div>
    </div>
  );
}
