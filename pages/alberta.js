import Head from 'next/head';
import Link from 'next/link';

const STRIPE_LINK = 'https://buy.stripe.com/cNifZa362eWm7xK1q8bwk00';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Alberta Tenant Security Deposit Rights — Get Your Deposit Back',
  description: 'Alberta landlords have just 10 days to return your deposit. File through the RTDRS without a lawyer. Generate a demand letter for $6.99.',
  url: 'https://depositback.ca/alberta',
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How long does an Alberta landlord have to return my deposit?', acceptedAnswer: { '@type': 'Answer', text: 'Under the Residential Tenancies Act (Alberta), a landlord must return your security deposit within 10 days of the tenancy ending, along with an itemized statement of any deductions.' } },
      { '@type': 'Question', name: 'How do I dispute a deposit in Alberta?', acceptedAnswer: { '@type': 'Answer', text: 'You can file through the Residential Tenancy Dispute Resolution Service (RTDRS) — no lawyer needed. Filing fee is $75. You can also go to Civil Court for claims under $50,000.' } },
      { '@type': 'Question', name: 'Can my Alberta landlord charge me for cleaning?', acceptedAnswer: { '@type': 'Answer', text: 'Only if the unit was left in a dirtier condition than when you moved in, accounting for normal wear and tear. The landlord must provide itemized receipts and must have conducted a move-out inspection.' } },
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
  tag: { display: 'inline-block', background: 'rgba(37,99,235,0.15)', color: '#60a5fa', border: '1px solid rgba(37,99,235,0.3)', borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: '600', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '20px' },
  h1: { fontSize: 'clamp(26px,5vw,38px)', fontWeight: '800', color: '#fff', lineHeight: '1.15', marginBottom: '18px', letterSpacing: '-0.5px' },
  lead: { fontSize: '17px', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', marginBottom: '30px', lineHeight: '1.65' },
  ctaRow: { display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' },
  ctaPrimary: { background: '#2563eb', color: '#fff', textDecoration: 'none', borderRadius: '10px', padding: '14px 28px', fontSize: '15px', fontWeight: '700', display: 'inline-block' },
  ctaNote: { fontSize: '13px', color: 'rgba(255,255,255,0.35)' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '12px', marginBottom: '48px' },
  statCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '18px 20px' },
  statNum: { fontSize: '24px', fontWeight: '800', color: '#fff', letterSpacing: '-0.5px', lineHeight: '1', marginBottom: '6px' },
  statLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: '1.4' },
  alertBox: { background: 'rgba(234,179,8,0.08)', border: '1px solid rgba(234,179,8,0.25)', borderRadius: '12px', padding: '20px 24px', marginBottom: '48px' },
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

export default function AlbertaPage() {
  return (
    <div style={s.page}>
      <Head>
        <title>Get Your Security Deposit Back in Alberta — DepositBack.ca</title>
        <meta name="description" content="Alberta landlords have just 10 days to return your deposit with an itemized statement. File through the RTDRS without a lawyer. Demand letter for $6.99." />
        <link rel="canonical" href="https://depositback.ca/alberta" />
        <meta property="og:title" content="Alberta Tenant Deposit Rights — 10-Day Rule & RTDRS Filing" />
        <meta property="og:description" content="Your Alberta landlord had 10 days. If they missed it or made illegal deductions, file through the RTDRS. No lawyer needed." />
        <meta name="geo.region" content="CA-AB" />
        <meta name="geo.placename" content="Alberta, Canada" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <nav><div style={s.nav}><Link href="/" style={s.navLogo}>DepositBack.ca</Link><a href={STRIPE_LINK} style={s.navCta}>Get My Letter — $6.99</a></div></nav>

      <div style={s.wrap}>
        <div style={s.breadcrumb}><Link href="/" style={s.breadcrumbLink}>Home</Link> / Alberta Tenant Rights</div>
        <div style={s.tag}>Alberta Guide</div>
        <h1 style={s.h1}>Get Your Security Deposit Back in Alberta</h1>
        <p style={s.lead}>Alberta's Residential Tenancies Act gives landlords just 10 days to return your deposit — with a full itemized statement. Miss the deadline, lose the right. Here's how to enforce it.</p>
        <div style={s.ctaRow}>
          <a href={STRIPE_LINK} style={s.ctaPrimary}>Generate My Demand Letter — $6.99</a>
          <span style={s.ctaNote}>Cites the Alberta RTA. Instant download.</span>
        </div>

        <div style={s.statGrid}>
          {[['10 days','Landlord return deadline from move-out'],['$75','RTDRS filing fee — no lawyer needed'],['1 month','Maximum deposit allowed (one month\'s rent)'],['RTDRS','Fast-track dispute tribunal for AB tenants']].map(([n,l]) => (
            <div key={l} style={s.statCard}><div style={s.statNum}>{n}</div><div style={s.statLabel}>{l}</div></div>
          ))}
        </div>

        <div style={s.alertBox}>
          <div style={s.alertTitle}>⚠ The itemized statement rule — most landlords don't know this</div>
          <p style={s.alertText}>Alberta landlords must return your deposit <strong style={{color:'#fbbf24'}}>and</strong> provide a full itemized statement of any deductions within 10 days. If they return the deposit late, or return it without an itemized statement, or withhold it without one — they are in breach. A demand letter citing Section 19 of the RTA is your first move.</p>
        </div>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>What Alberta Law Says</h2>
          <div style={s.lawCard}>
            <div style={s.lawLabel}>Residential Tenancies Act (AB) — Section 19</div>
            <div style={s.lawTitle}>10-Day Return & Itemized Statement Rule</div>
            <p style={s.lawText}>A landlord must return the security deposit, together with a written statement itemizing any deductions, within 10 days after the tenancy ends. The maximum security deposit is one month's rent. Landlords cannot charge a damage deposit exceeding this amount.</p>
          </div>
          <div style={s.lawCard}>
            <div style={s.lawLabel}>Residential Tenancies Act (AB) — Section 20</div>
            <div style={s.lawTitle}>Move-Out Inspection Requirement</div>
            <p style={s.lawText}>The landlord must give the tenant at least 24 hours notice and conduct a move-out inspection. If the landlord fails to offer an inspection, they forfeit their right to make deductions from the deposit for damages. This is a hard rule — document whether an inspection was offered.</p>
          </div>
        </section>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>Legal vs. Illegal Deductions in Alberta</h2>
          <h3 style={s.h3}>What landlords CAN deduct</h3>
          <ul style={s.ruleList}>
            <li style={s.ruleItem}><span style={s.iconGreen}>✓</span><span><strong style={{color:'#e8eaf0'}}>Damage beyond normal wear and tear</strong> — with receipts, photos, and a completed inspection report.</span></li>
            <li style={{...s.ruleItem, borderBottom:'none'}}><span style={s.iconGreen}>✓</span><span><strong style={{color:'#e8eaf0'}}>Unpaid rent</strong> — with documentation.</span></li>
          </ul>
          <h3 style={s.h3}>What landlords CANNOT deduct</h3>
          <ul style={s.ruleList}>
            <li style={s.ruleItem}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Normal wear and tear</strong> — faded paint, minor scuffs, carpet wear from regular use.</span></li>
            <li style={s.ruleItem}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Deductions without an inspection</strong> — if no inspection was offered, no damages can be claimed.</span></li>
            <li style={s.ruleItem}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Undocumented charges</strong> — every deduction requires an itemized invoice. No invoice = no deduction.</span></li>
            <li style={{...s.ruleItem, borderBottom:'none'}}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>More than one month's rent as deposit</strong> — the statutory cap. Any excess is yours to reclaim immediately.</span></li>
          </ul>
        </section>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>How to Get Your Deposit Back in Alberta</h2>
          <ol style={s.stepList}>
            {[
              ['Generate your demand letter', 'Cites Section 19 of the Alberta RTA and the inspection requirement under Section 20. Gives your landlord 10 days to respond.'],
              ['Send by email and registered mail', 'Email for timestamp. Registered mail for proof of delivery. Keep Canada Post tracking.'],
              ['Wait 10 days', 'Most landlords who are in the wrong will return the deposit once they receive a formal letter that cites the exact legislation.'],
              ['File with the RTDRS if ignored', 'The Residential Tenancy Dispute Resolution Service handles AB deposit disputes fast — typically within weeks. $75 filing fee. No lawyer needed. File online at Alberta.ca.'],
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
            ['My landlord returned the deposit but kept $400 for "cleaning" with no receipts. What can I do?', "Demand it back. Alberta law requires an itemized statement with receipts for every deduction. No receipt means no legal basis for the deduction. Send a demand letter citing Section 19 and give them 10 days to return the amount."],
            ['My landlord never did a move-out inspection. Do they still get to claim damages?', "No. Under Section 20 of the Alberta RTA, if a landlord fails to offer a move-out inspection, they lose the right to claim for damages. This is one of the strongest protections in the Act — document that no inspection was conducted and include it in your letter."],
            ['It's been over 10 days and I have received nothing — not the deposit, not a statement. What now?', "Send a demand letter immediately. The landlord is already in breach of Section 19. If they don't respond within 10 days of receiving your letter, file with the RTDRS."],
            ['What is the RTDRS and how fast is it?', "The Residential Tenancy Dispute Resolution Service is Alberta's fast-track tribunal for landlord-tenant disputes. No lawyer required. Hearings typically happen within 1–3 weeks of filing. The $75 fee is often recoverable if you win."],
          ].map(([q, a], i, arr) => (
            <div key={q} style={{...s.faqItem, ...(i === arr.length - 1 ? {borderBottom:'none',paddingBottom:0,marginBottom:0} : {})}}>
              <div style={s.faqQ}>{q}</div>
              <p style={s.faqA}>{a}</p>
            </div>
          ))}
        </section>

        <div style={s.bottomCta}>
          <div style={s.bottomCtaTitle}>Ready to Get Your Alberta Deposit Back?</div>
          <p style={s.bottomCtaText}>Generate a demand letter citing the Alberta Residential Tenancies Act. 5 minutes. Instant download.</p>
          <a href={STRIPE_LINK} style={{...s.ctaPrimary, padding:'15px 36px', fontSize:'15px'}}>Generate My Letter — $6.99</a>
          <div style={s.guarantee}>Money-back guarantee · No subscription · Download instantly</div>
        </div>
      </div>
    </div>
  );
}
