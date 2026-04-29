import Head from 'next/head';
import Link from 'next/link';

const STRIPE_LINK = 'https://buy.stripe.com/cNifZa362eWm7xK1q8bwk00';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'BC Tenant Security Deposit Rights — Get Your Deposit Back',
  description: 'BC tenants: landlords have 15 days to return your deposit. Miss the deadline and they may owe double. Generate a demand letter for $6.99.',
  url: 'https://depositback.ca/bc',
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'How long does a BC landlord have to return my deposit?', acceptedAnswer: { '@type': 'Answer', text: 'Under the Residential Tenancy Act (BC), a landlord must return your deposit within 15 days of the later of: the date you give your forwarding address, or the date you move out.' } },
      { '@type': 'Question', name: 'What happens if my BC landlord misses the 15-day deadline?', acceptedAnswer: { '@type': 'Answer', text: 'If a landlord fails to return the deposit within 15 days without a valid reason, the Residential Tenancy Branch can order them to pay DOUBLE the deposit amount as a penalty.' } },
      { '@type': 'Question', name: 'Can a BC landlord deduct for cleaning?', acceptedAnswer: { '@type': 'Answer', text: 'Only if the unit was left in a significantly worse state than when you moved in. Normal wear and tear cannot be deducted. The landlord must conduct a move-out inspection — failure to do so forfeits their right to claim damages.' } },
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
  alertBox: { background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', padding: '20px 24px', marginBottom: '48px' },
  alertTitle: { fontSize: '14px', fontWeight: '700', color: '#34d399', marginBottom: '8px' },
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
  penaltyCard: { background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', padding: '22px', marginBottom: '16px' },
  penaltyLabel: { fontSize: '11px', fontWeight: '700', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
  penaltyTitle: { fontSize: '16px', fontWeight: '700', color: '#fff', marginBottom: '10px' },
  penaltyText: { fontSize: '14px', color: 'rgba(255,255,255,0.55)', lineHeight: '1.65', margin: 0 },
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

export default function BCPage() {
  return (
    <div style={s.page}>
      <Head>
        <title>Get Your Security Deposit Back in BC — DepositBack.ca</title>
        <meta name="description" content="BC landlords have 15 days to return your deposit. Miss it and they may owe you double. Generate a professional demand letter citing the Residential Tenancy Act for $6.99." />
        <link rel="canonical" href="https://depositback.ca/bc" />
        <meta property="og:title" content="BC Tenant Deposit Rights — Get Your Security Deposit Back" />
        <meta property="og:description" content="Landlords in BC have just 15 days. After that, the RTB can order double repayment. Know your rights and act fast." />
        <meta name="geo.region" content="CA-BC" />
        <meta name="geo.placename" content="British Columbia, Canada" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Head>

      <nav><div style={s.nav}><Link href="/" style={s.navLogo}>DepositBack.ca</Link><a href={STRIPE_LINK} style={s.navCta}>Get My Letter — $6.99</a></div></nav>

      <div style={s.wrap}>
        <div style={s.breadcrumb}><Link href="/" style={s.breadcrumbLink}>Home</Link> / BC Tenant Rights</div>
        <div style={s.tag}>British Columbia Guide</div>
        <h1 style={s.h1}>Get Your Security Deposit Back in BC</h1>
        <p style={s.lead}>BC's Residential Tenancy Act has some of the strongest tenant protections in Canada — including double-penalty rules for landlords who miss the deadline. Here's how to use them.</p>
        <div style={s.ctaRow}>
          <a href={STRIPE_LINK} style={s.ctaPrimary}>Generate My Demand Letter — $6.99</a>
          <span style={s.ctaNote}>Cites the BC RTA. Instant download.</span>
        </div>

        <div style={s.statGrid}>
          {[['15 days','Landlord return deadline from move-out or forwarding address'],['2×','Deposit amount owed if landlord misses the deadline'],['$6.99','Cost of your demand letter vs avg $1,800 deposit'],['RTB','Residential Tenancy Branch — free dispute filing']].map(([n,l]) => (
            <div key={l} style={s.statCard}><div style={s.statNum}>{n}</div><div style={s.statLabel}>{l}</div></div>
          ))}
        </div>

        <div style={s.alertBox}>
          <div style={s.alertTitle}>⚡ The double-penalty rule — BC's biggest weapon for tenants</div>
          <p style={s.alertText}>If your landlord fails to return your deposit within 15 days <strong style={{color:'#34d399'}}>without applying to the RTB first</strong>, the Branch can order them to pay you double the deposit amount. This is not a "maybe" — it's the default penalty in the legislation. A demand letter citing this rule often resolves the dispute immediately.</p>
        </div>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>What BC Law Says</h2>
          <div style={s.lawCard}>
            <div style={s.lawLabel}>Residential Tenancy Act (BC) — Section 38</div>
            <div style={s.lawTitle}>15-Day Return Rule</div>
            <p style={s.lawText}>A landlord must return a security deposit within 15 days of the later of: (a) the date the tenancy ends, or (b) the date the tenant gives a forwarding address in writing. The landlord may only deduct amounts the tenant agrees to in writing, or that are ordered by the RTB.</p>
          </div>
          <div style={s.penaltyCard}>
            <div style={s.penaltyLabel}>Residential Tenancy Act (BC) — Section 38(6)</div>
            <div style={s.penaltyTitle}>Double Penalty for Late Return</div>
            <p style={s.penaltyText}>If a landlord fails to comply with Section 38, the RTB may order the landlord to pay the tenant double the amount of the security deposit. This is the default remedy — not an exceptional one.</p>
          </div>
        </section>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>What BC Landlords Can and Cannot Do</h2>
          <h3 style={s.h3}>Legal deductions</h3>
          <ul style={s.ruleList}>
            <li style={{...s.ruleItem}}><span style={s.iconGreen}>✓</span><span><strong style={{color:'#e8eaf0'}}>Damage beyond normal wear and tear</strong> — must be proven with a completed move-out inspection report and itemized receipts.</span></li>
            <li style={{...s.ruleItem, borderBottom:'none'}}><span style={s.iconGreen}>✓</span><span><strong style={{color:'#e8eaf0'}}>Unpaid rent or utilities</strong> — if confirmed by the RTB.</span></li>
          </ul>
          <h3 style={s.h3}>Illegal deductions</h3>
          <ul style={s.ruleList}>
            <li style={s.ruleItem}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Normal wear and tear</strong> — scuffs, faded paint, minor carpet wear are not chargeable in BC.</span></li>
            <li style={s.ruleItem}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Deductions without a move-out inspection</strong> — if the landlord didn't conduct a condition inspection at move-out, they forfeit their right to claim damages. Full stop.</span></li>
            <li style={{...s.ruleItem, borderBottom:'none'}}><span style={s.iconRed}>✗</span><span><strong style={{color:'#e8eaf0'}}>Undocumented cleaning or repair charges</strong> — itemized invoices are required for every deduction.</span></li>
          </ul>
        </section>

        <hr style={s.divider} />

        <section style={s.section}>
          <h2 style={s.h2}>Step-by-Step: How to Get Your Deposit Back</h2>
          <ol style={s.stepList}>
            {[
              ['Generate your demand letter', 'Cites Section 38 of the BC RTA and the double-penalty clause. Gives your landlord 10 days to respond before you escalate to the RTB.'],
              ['Send by email + registered mail', 'Email creates a timestamp. Registered mail creates proof of delivery. Keep both.'],
              ['Wait 10 days', 'Most landlords comply once they see a letter citing the double-penalty clause. The risk of owing 2× is a strong incentive.'],
              ['File with the RTB if ignored', 'File a dispute through the Residential Tenancy Branch online portal. Filing fee is $100 for monetary disputes. No lawyer needed. You have 2 years to file.'],
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
            ['My landlord says I owe for damages but never did a move-out inspection. Do I still owe?', "No. Under the BC RTA, a landlord who fails to complete a condition inspection at the end of the tenancy loses the right to claim for damage. This is one of the strongest protections in BC — document that no inspection was done and include it in your demand letter."],
            ["It's been more than 15 days and my landlord hasn't returned my deposit. What now?", "Send a demand letter immediately citing Section 38 and the double-penalty clause under Section 38(6). If they still don't respond within 10 days, file a dispute with the Residential Tenancy Branch. The double-penalty order is available to you."],
            ['My landlord sent me an itemized list of deductions but I disagree with them. What are my options?', "You can accept, negotiate, or dispute. If you dispute, file with the RTB. The Branch will review each deduction — and if the landlord can't provide receipts or a completed inspection report, those deductions are typically rejected."],
            ['Do I need a lawyer to file with the RTB?', "No. The RTB is designed to be accessible without legal representation. Most tenants file and argue their own case successfully. Your demand letter and any documentation (emails, photos, move-in checklist) are your main evidence."],
          ].map(([q, a], i, arr) => (
            <div key={q} style={{...s.faqItem, ...(i === arr.length - 1 ? {borderBottom:'none',paddingBottom:0,marginBottom:0} : {})}}>
              <div style={s.faqQ}>{q}</div>
              <p style={s.faqA}>{a}</p>
            </div>
          ))}
        </section>

        <div style={s.bottomCta}>
          <div style={s.bottomCtaTitle}>Ready to Get Your BC Deposit Back?</div>
          <p style={s.bottomCtaText}>Generate a demand letter citing the BC Residential Tenancy Act and the double-penalty clause. 5 minutes. Instant download.</p>
          <a href={STRIPE_LINK} style={{...s.ctaPrimary, padding: '15px 36px', fontSize: '15px'}}>Generate My Letter — $6.99</a>
          <div style={s.guarantee}>Money-back guarantee · No subscription · Download instantly</div>
        </div>
      </div>
    </div>
  );
}
