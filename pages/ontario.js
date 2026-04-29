import Head from 'next/head';
import Link from 'next/link';

const STRIPE_LINK = 'https://buy.stripe.com/cNifZa362eWm7xK1q8bwk00';

const styles = {
  page: {
    background: '#08121f',
    color: '#e8eaf0',
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    lineHeight: '1.7',
  },
  nav: {
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    padding: '18px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '780px',
    margin: '0 auto',
  },
  navLogo: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: '17px',
    textDecoration: 'none',
    letterSpacing: '-0.3px',
  },
  navCta: {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '9px 18px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
  container: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '0 24px 80px',
  },
  // Hero
  hero: {
    padding: '56px 0 40px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    marginBottom: '48px',
  },
  breadcrumb: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.35)',
    marginBottom: '20px',
  },
  breadcrumbLink: {
    color: 'rgba(255,255,255,0.35)',
    textDecoration: 'none',
  },
  tag: {
    display: 'inline-block',
    background: 'rgba(37,99,235,0.15)',
    color: '#60a5fa',
    border: '1px solid rgba(37,99,235,0.3)',
    borderRadius: '20px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: '20px',
  },
  h1: {
    fontSize: 'clamp(28px, 5vw, 40px)',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.15',
    marginBottom: '20px',
    letterSpacing: '-0.5px',
  },
  heroLead: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.6)',
    maxWidth: '580px',
    marginBottom: '32px',
    lineHeight: '1.65',
  },
  ctaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    background: '#2563eb',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '10px',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: '700',
    display: 'inline-block',
    letterSpacing: '-0.1px',
  },
  ctaNote: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.35)',
  },
  // Stat cards
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '12px',
    marginBottom: '52px',
  },
  statCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '18px 20px',
  },
  statNum: {
    fontSize: '26px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '-0.5px',
    lineHeight: '1',
    marginBottom: '6px',
  },
  statLabel: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.45)',
    lineHeight: '1.4',
  },
  // Alert box
  alertBox: {
    background: 'rgba(234,179,8,0.08)',
    border: '1px solid rgba(234,179,8,0.25)',
    borderRadius: '12px',
    padding: '20px 24px',
    marginBottom: '48px',
  },
  alertTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#fbbf24',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  alertText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: '1.6',
    margin: 0,
  },
  // Content sections
  h2: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '16px',
    letterSpacing: '-0.3px',
    marginTop: '0',
  },
  h3: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '10px',
    marginTop: '0',
  },
  p: {
    fontSize: '16px',
    color: 'rgba(255,255,255,0.65)',
    marginBottom: '16px',
    lineHeight: '1.75',
  },
  section: {
    marginBottom: '52px',
  },
  // Law card
  lawCard: {
    background: 'rgba(37,99,235,0.07)',
    border: '1px solid rgba(37,99,235,0.2)',
    borderRadius: '12px',
    padding: '24px',
    marginBottom: '24px',
  },
  lawLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#60a5fa',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '8px',
  },
  lawTitle: {
    fontSize: '17px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '10px',
  },
  lawText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.55)',
    lineHeight: '1.65',
    margin: 0,
  },
  // Rules list
  ruleList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 24px',
  },
  ruleItem: {
    display: 'flex',
    gap: '12px',
    padding: '13px 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    fontSize: '15px',
    color: 'rgba(255,255,255,0.65)',
    lineHeight: '1.5',
    alignItems: 'flex-start',
  },
  ruleIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '700',
    flexShrink: 0,
    marginTop: '1px',
  },
  ruleIconGreen: {
    background: 'rgba(16,185,129,0.15)',
    color: '#34d399',
  },
  ruleIconRed: {
    background: 'rgba(239,68,68,0.15)',
    color: '#f87171',
  },
  // FAQ
  faqItem: {
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    paddingBottom: '24px',
    marginBottom: '24px',
  },
  faqQ: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '10px',
  },
  faqA: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.6)',
    lineHeight: '1.7',
    margin: 0,
  },
  // Steps
  stepList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  step: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  stepNum: {
    width: '28px',
    height: '28px',
    background: 'rgba(37,99,235,0.15)',
    border: '1px solid rgba(37,99,235,0.3)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '700',
    color: '#60a5fa',
    flexShrink: 0,
    marginTop: '1px',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: '4px',
  },
  stepText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: '1.6',
    margin: 0,
  },
  // Bottom CTA
  bottomCta: {
    background: 'rgba(37,99,235,0.1)',
    border: '1px solid rgba(37,99,235,0.25)',
    borderRadius: '16px',
    padding: '40px',
    textAlign: 'center',
    marginTop: '24px',
  },
  bottomCtaTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '12px',
    letterSpacing: '-0.3px',
  },
  bottomCtaText: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: '28px',
    lineHeight: '1.6',
  },
  guarantee: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.3)',
    marginTop: '14px',
  },
  // Divider
  divider: {
    border: 'none',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    margin: '0 0 52px',
  },
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ontario Tenant Deposit Rights — Get Your Last Month\'s Rent Back',
  description: 'Ontario tenants: learn your rights under the Residential Tenancies Act. Generate a professional demand letter for $6.99 to get your last month\'s rent deposit back.',
  url: 'https://depositback.ca/ontario',
  mainEntity: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can my landlord keep my deposit for damages in Ontario?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Damage deposits are illegal in Ontario under the Residential Tenancies Act. Landlords can only collect a last month\'s rent deposit, which can only be used for rent — not damages.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I get my last month\'s rent back in Ontario?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Send a formal demand letter citing the Residential Tenancies Act, Section 106. If your landlord refuses, file Form T1 with the Landlord and Tenant Board (LTB).',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a landlord have to return a deposit in Ontario?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your last month\'s rent deposit should be applied to your final month of rent. If your landlord refuses to apply it correctly or return any overpayment, you can apply to the LTB.',
        },
      },
    ],
  },
};

export default function OntarioPage() {
  return (
    <div style={styles.page}>
      <Head>
        <title>Get Your Last Month's Rent Back in Ontario — DepositBack.ca</title>
        <meta
          name="description"
          content="Landlord keeping your deposit in Ontario? Damage deposits are illegal under the Residential Tenancies Act. Generate a professional demand letter for $6.99 — instant download."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://depositback.ca/ontario" />

        {/* Open Graph */}
        <meta property="og:title" content="Ontario Tenant Deposit Rights — Get Your Last Month's Rent Back" />
        <meta property="og:description" content="Damage deposits are illegal in Ontario. If your landlord kept your deposit, you have rights under the RTA. Generate a demand letter in 5 minutes." />
        <meta property="og:url" content="https://depositback.ca/ontario" />
        <meta property="og:type" content="website" />

        {/* Geo */}
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Ontario, Canada" />

        {/* Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </Head>

      {/* Nav */}
      <nav>
        <div style={styles.nav}>
          <Link href="/" style={styles.navLogo}>DepositBack.ca</Link>
          <a href={STRIPE_LINK} style={styles.navCta}>Get My Letter — $6.99</a>
        </div>
      </nav>

      <div style={styles.container}>

        {/* Hero */}
        <section style={styles.hero}>
          <div style={styles.breadcrumb}>
            <Link href="/" style={styles.breadcrumbLink}>Home</Link>
            {' '}/{' '}Ontario Tenant Rights
          </div>
          <div style={styles.tag}>Ontario Guide</div>
          <h1 style={styles.h1}>
            Get Your Last Month's<br />Rent Back in Ontario
          </h1>
          <p style={styles.heroLead}>
            Your landlord is holding your money — but Ontario law is firmly on your side.
            The Residential Tenancies Act gives you clear rights. Here's exactly how to use them.
          </p>
          <div style={styles.ctaRow}>
            <a href={STRIPE_LINK} style={styles.ctaPrimary}>
              Generate My Demand Letter — $6.99
            </a>
            <span style={styles.ctaNote}>Cites the RTA. Instant download. 5 minutes.</span>
          </div>
        </section>

        {/* Stats */}
        <div style={styles.statGrid}>
          <div style={styles.statCard}>
            <div style={styles.statNum}>$1,800+</div>
            <div style={styles.statLabel}>Average last month's rent deposit in Ontario</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>257×</div>
            <div style={styles.statLabel}>Your return on a $6.99 letter vs a $1,800 deposit</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>Illegal</div>
            <div style={styles.statLabel}>Damage deposits in Ontario — full stop</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNum}>Form T1</div>
            <div style={styles.statLabel}>LTB form to file if your landlord ignores you</div>
          </div>
        </div>

        {/* Alert */}
        <div style={styles.alertBox}>
          <div style={styles.alertTitle}>
            <span>⚠</span> Most Ontario tenants don't know this
          </div>
          <p style={styles.alertText}>
            Unlike the UK, US, or most other countries, Ontario does <strong style={{ color: '#fbbf24' }}>not</strong> allow
            damage deposits. If your landlord charged you a "damage deposit," "cleaning deposit," or "pet deposit,"
            that money is yours and they had no legal right to take it. A demand letter is often all it takes to get it back.
          </p>
        </div>

        <hr style={styles.divider} />

        {/* The law */}
        <section style={styles.section}>
          <h2 style={styles.h2}>What Ontario Law Actually Says</h2>
          <p style={styles.p}>
            The <strong style={{ color: '#e8eaf0' }}>Residential Tenancies Act, 2006 (RTA)</strong> is the law governing
            landlord-tenant relationships in Ontario. It's clear, specific, and heavily in your favour when it comes to deposits.
          </p>

          <div style={styles.lawCard}>
            <div style={styles.lawLabel}>Residential Tenancies Act, 2006 — Section 106</div>
            <div style={styles.lawTitle}>Last Month's Rent Deposit</div>
            <p style={styles.lawText}>
              A landlord may require a tenant to pay a rent deposit before or upon entering a tenancy.
              The amount cannot exceed one month's rent. The deposit <strong style={{ color: 'rgba(255,255,255,0.75)' }}>must</strong> be
              applied to the tenant's last month of rent — it cannot be used for damages, cleaning,
              or any other purpose.
            </p>
          </div>

          <div style={styles.lawCard}>
            <div style={styles.lawLabel}>Residential Tenancies Act, 2006 — Section 106(10)</div>
            <div style={styles.lawTitle}>Mandatory Interest on Your Deposit</div>
            <p style={styles.lawText}>
              Your landlord is legally required to pay you <strong style={{ color: 'rgba(255,255,255,0.75)' }}>annual interest</strong> on
              your last month's rent deposit. The interest rate matches the Ontario rent increase guideline each year
              (2.5% for 2024). If they haven't paid you interest in over a year, you can deduct it from your next
              rent payment — or claim it through the LTB.
            </p>
          </div>
        </section>

        <hr style={styles.divider} />

        {/* What's legal / what's not */}
        <section style={styles.section}>
          <h2 style={styles.h2}>Legal vs. Illegal Deposits in Ontario</h2>
          <p style={styles.p}>
            Many Ontario landlords — especially smaller landlords — don't know the rules. Some deliberately
            ignore them. Here's what they can and cannot legally ask for:
          </p>

          <h3 style={styles.h3}>What landlords CAN collect</h3>
          <ul style={styles.ruleList}>
            <li style={styles.ruleItem}>
              <span style={{ ...styles.ruleIcon, ...styles.ruleIconGreen }}>✓</span>
              <span><strong style={{ color: '#e8eaf0' }}>Last month's rent deposit</strong> — up to one month's rent, applied to your final month only.</span>
            </li>
            <li style={styles.ruleItem}>
              <span style={{ ...styles.ruleIcon, ...styles.ruleIconGreen }}>✓</span>
              <span><strong style={{ color: '#e8eaf0' }}>Key deposit</strong> — only if it equals the actual cost of replacing the key (not a flat fee). Must be returned when you hand back your keys.</span>
            </li>
          </ul>

          <h3 style={styles.h3}>What landlords CANNOT collect</h3>
          <ul style={styles.ruleList}>
            <li style={styles.ruleItem}>
              <span style={{ ...styles.ruleIcon, ...styles.ruleIconRed }}>✗</span>
              <span><strong style={{ color: '#e8eaf0' }}>Damage deposit</strong> — completely illegal. If damage occurs, the landlord must apply to the LTB for compensation. They cannot take it from your deposit upfront.</span>
            </li>
            <li style={styles.ruleItem}>
              <span style={{ ...styles.ruleIcon, ...styles.ruleIconRed }}>✗</span>
              <span><strong style={{ color: '#e8eaf0' }}>Pet deposit</strong> — illegal in Ontario, even if you have a pet. Full stop.</span>
            </li>
            <li style={styles.ruleItem}>
              <span style={{ ...styles.ruleIcon, ...styles.ruleIconRed }}>✗</span>
              <span><strong style={{ color: '#e8eaf0' }}>Cleaning deposit</strong> — illegal. A landlord cannot require you to pay a flat cleaning fee upfront.</span>
            </li>
            <li style={{ ...styles.ruleItem, borderBottom: 'none' }}>
              <span style={{ ...styles.ruleIcon, ...styles.ruleIconRed }}>✗</span>
              <span><strong style={{ color: '#e8eaf0' }}>More than one month's rent</strong> — even for "first and last and security." They can collect first and last, but last is applied as rent — not held as security.</span>
            </li>
          </ul>
        </section>

        <hr style={styles.divider} />

        {/* How to get it back */}
        <section style={styles.section}>
          <h2 style={styles.h2}>How to Get Your Deposit Back</h2>
          <p style={styles.p}>
            Most landlords back down the moment they receive a formal demand letter — especially one that
            cites the specific section of the RTA. Here's the process, step by step.
          </p>
          <ol style={styles.stepList}>
            <li style={styles.step}>
              <div style={styles.stepNum}>1</div>
              <div style={styles.stepContent}>
                <div style={styles.stepTitle}>Generate your demand letter</div>
                <p style={styles.stepText}>
                  Enter your details — landlord's name, address, deposit amount, and the reason it's being withheld.
                  The letter cites Section 106 of the RTA and demands return within 10 days.
                </p>
              </div>
            </li>
            <li style={styles.step}>
              <div style={styles.stepNum}>2</div>
              <div style={styles.stepContent}>
                <div style={styles.stepTitle}>Send it in writing</div>
                <p style={styles.stepText}>
                  Email it and send a printed copy by registered mail. Having both creates a paper trail.
                  Keep your email receipts and Canada Post tracking number.
                </p>
              </div>
            </li>
            <li style={styles.step}>
              <div style={styles.stepNum}>3</div>
              <div style={styles.stepContent}>
                <div style={styles.stepTitle}>Wait 10 days</div>
                <p style={styles.stepText}>
                  Most landlords respond within the deadline. The formal letter signals you know your rights
                  and are prepared to escalate — which most landlords want to avoid.
                </p>
              </div>
            </li>
            <li style={styles.step}>
              <div style={styles.stepNum}>4</div>
              <div style={styles.stepContent}>
                <div style={styles.stepTitle}>If ignored — file with the LTB</div>
                <p style={styles.stepText}>
                  File <strong style={{ color: '#e8eaf0' }}>Form T1: Tenant Application for a Rebate of Money the Landlord Owes</strong> with
                  the Landlord and Tenant Board. No lawyer required. You can file online at
                  the LTB portal. The filing fee is $53. You have up to one year from the date of the issue.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <hr style={styles.divider} />

        {/* FAQ */}
        <section style={styles.section}>
          <h2 style={styles.h2}>Frequently Asked Questions</h2>

          <div style={styles.faqItem}>
            <div style={styles.faqQ}>My landlord says they're keeping my deposit for "cleaning." Is that legal?</div>
            <p style={styles.faqA}>
              No — not in Ontario. Cleaning deposits and deductions are not permitted under the RTA. If your landlord
              says the apartment was dirty, they must take that claim to the Landlord and Tenant Board and prove it.
              They cannot simply deduct it from your deposit. Your last month's rent deposit must be applied to rent only.
            </p>
          </div>

          <div style={styles.faqItem}>
            <div style={styles.faqQ}>I paid a damage deposit. My landlord says it's non-refundable. What do I do?</div>
            <p style={styles.faqA}>
              Demand it back immediately. Damage deposits are illegal in Ontario regardless of what your lease says.
              A clause in a lease cannot override the RTA — the Act takes precedence. Send a demand letter citing
              Section 106 of the Residential Tenancies Act and give your landlord 10 days to return the money.
            </p>
          </div>

          <div style={styles.faqItem}>
            <div style={styles.faqQ}>My landlord hasn't paid me interest on my deposit in years. What am I owed?</div>
            <p style={styles.faqA}>
              You're owed interest at the Ontario rent increase guideline rate for each year since you paid the deposit.
              The rate has typically been between 0% and 2.5% per year. You can deduct unpaid interest from your next
              rent payment (with written notice to your landlord), or claim it through the LTB using Form T1.
            </p>
          </div>

          <div style={styles.faqItem}>
            <div style={styles.faqQ}>I moved out and my landlord won't return the "extra" money from my deposit. What now?</div>
            <p style={styles.faqA}>
              Your last month's rent deposit should be applied to your final month. Any remaining amount — including
              accrued interest — must be returned to you. If your landlord refuses, send a demand letter. If they
              still refuse, file Form T1 with the LTB within one year of the issue.
            </p>
          </div>

          <div style={{ ...styles.faqItem, borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
            <div style={styles.faqQ}>Does my letter actually work? Will my landlord pay attention?</div>
            <p style={styles.faqA}>
              Most do. A formal letter citing the specific law — not just a text message — signals to landlords
              that you're serious and informed. Many landlords, especially small-scale ones, back down immediately
              when they see a proper legal demand. Those who don't are typically bluffing — and the LTB process is
              straightforward enough that you rarely need a lawyer.
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <div style={styles.bottomCta}>
          <div style={styles.bottomCtaTitle}>Ready to Get Your Money Back?</div>
          <p style={styles.bottomCtaText}>
            Generate a professional demand letter that cites the Residential Tenancies Act.
            Takes 5 minutes. Instant download. Built specifically for Ontario tenants.
          </p>
          <a href={STRIPE_LINK} style={{ ...styles.ctaPrimary, padding: '16px 36px', fontSize: '16px' }}>
            Generate My Letter — $6.99
          </a>
          <div style={styles.guarantee}>
            Money-back guarantee · No subscription · Download instantly
          </div>
        </div>

      </div>
    </div>
  );
}
