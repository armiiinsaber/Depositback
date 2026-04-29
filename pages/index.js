import { useState, useEffect } from 'react';
import Head from 'next/head';

const GlobalStyle = () => (
  <style>{`
    html, body, #__next { margin: 0 !important; padding: 0 !important; background: #08121f !important; overflow-x: hidden; box-sizing: border-box; }
    * { box-sizing: border-box; }
  `}</style>
);

const PROVINCES = [
  { value: 'ON', label: 'Ontario', days: 30 },
  { value: 'BC', label: 'British Columbia', days: 15 },
  { value: 'AB', label: 'Alberta', days: 10 },
  { value: 'QC', label: 'Quebec', days: 30 },
  { value: 'MB', label: 'Manitoba', days: 14 },
  { value: 'SK', label: 'Saskatchewan', days: 7 },
  { value: 'NS', label: 'Nova Scotia', days: 10 },
  { value: 'NB', label: 'New Brunswick', days: 7 },
  { value: 'NL', label: 'Newfoundland', days: 15 },
  { value: 'PE', label: 'PEI', days: 10 },
];

// Legally grounded reasons — cross-referenced with LTB, RTB, RTDRS rulings

const STRIPE_LINK = 'https://buy.stripe.com/cNifZa362eWm7xK1q8bwk00';


const CITIES = {
  ON:['Toronto','Ottawa','Mississauga','Brampton','Hamilton','London','Markham','Vaughan','Kitchener','Windsor','Richmond Hill','Oakville','Burlington','Sudbury','Oshawa','Barrie','Guelph','Ajax','Thunder Bay','Waterloo','Other'],
  BC:['Vancouver','Surrey','Burnaby','Richmond','Abbotsford','Coquitlam','Kelowna','Langley','Saanich','Delta','Kamloops','Nanaimo','Chilliwack','Maple Ridge','Victoria','New Westminster','Prince George','Other'],
  AB:['Calgary','Edmonton','Red Deer','Lethbridge','St. Albert','Medicine Hat','Grande Prairie','Airdrie','Spruce Grove','Leduc','Fort McMurray','Camrose','Cochrane','Okotoks','Other'],
  QC:['Montreal','Quebec City','Laval','Gatineau','Longueuil','Sherbrooke','Saguenay','Lévis','Trois-Rivières','Terrebonne','Saint-Jean-sur-Richelieu','Repentigny','Brossard','Drummondville','Other'],
  MB:['Winnipeg','Brandon','Steinbach','Thompson','Portage la Prairie','Winkler','Selkirk','Morden','Dauphin','Other'],
  SK:['Saskatoon','Regina','Prince Albert','Moose Jaw','Swift Current','Yorkton','North Battleford','Lloydminster','Other'],
  NS:['Halifax','Dartmouth','Sydney','Truro','New Glasgow','Glace Bay','Kentville','Amherst','Other'],
  NB:['Moncton','Saint John','Fredericton','Dieppe','Riverview','Miramichi','Bathurst','Edmundston','Other'],
  NL:["St. John's",'Mount Pearl','Corner Brook','Conception Bay South','Grand Falls-Windsor','Paradise','Other'],
  PE:['Charlottetown','Summerside','Stratford','Cornwall','Other'],
};

const REASONS = [
  {
    id: 'deadline',
    label: 'Landlord missed the legal return deadline',
    sub: 'Most common winning ground — tribunals rule in tenant favour automatically',
  },
  {
    id: 'wearandtear',
    label: 'Deductions for normal wear and tear',
    sub: 'Illegal in all provinces — scuffs, fading, minor carpet wear are not chargeable',
  },
  {
    id: 'noproof',
    label: 'Deductions with no receipts or proof',
    sub: 'Landlord must provide invoices — LTB T1 rulings consistently reject undocumented claims',
  },
  {
    id: 'noitemized',
    label: 'No itemized list of deductions provided',
    sub: 'Required by law in all provinces — failure forfeits right to deduct',
  },
  {
    id: 'partial',
    label: 'Deposit partially returned without explanation',
    sub: 'Partial return with no statement is treated same as full withholding by tribunals',
  },
  {
    id: 'falsedamage',
    label: 'Landlord claims damage that was pre-existing',
    sub: 'Move-in inspection reports and photos are key — document everything',
  },
  {
    id: 'cleaning',
    label: 'Charged for professional cleaning despite normal cleanliness',
    sub: 'RTB and LTB rulings: landlord cannot charge cleaning fees unless unit was left in extreme condition',
  },
  {
    id: 'noinspection',
    label: 'No move-out inspection was conducted',
    sub: 'In BC, AB and others: failure to conduct inspection forfeits right to claim damages',
  },
];

const EMPTY = {
  province: '',
  firstName: '', middleName: '', lastName: '',
  unit: '', streetAddress: '', city: '', postalCode: '',
  landlordName: '', landlordAddress: '',
  moveOutDate: '', depositAmount: '', returnedAmount: '',
  reasons: [], extraDetails: '',
};

export default function DepositBack() {
  const [step, setStep] = useState('landing');
  const [form, setForm] = useState(EMPTY);
  const [letter, setLetter] = useState('');
  const [editedLetter, setEditedLetter] = useState('');
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [polishing, setPolishing] = useState(false);
  const [polished, setPolished] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'true') {
      const sessionId = params.get('session_id') || '';
      // Clear URL immediately so this NEVER fires twice
      window.history.replaceState({}, '', '/');
      const saved = localStorage.getItem('db_form');
      if (saved) {
        // Clear localStorage immediately so it can never fire again
        localStorage.removeItem('db_form');
        try {
          const parsed = JSON.parse(saved);
          setForm(parsed);
          setTimeout(() => generateLetter({...parsed, stripeSessionId: sessionId}), 100);
        } catch {}
      }
    }
  }, []);

  const pv = PROVINCES.find(p => p.value === form.province);
  const withheld = Math.max(0, parseFloat(form.depositAmount || 0) - parseFloat(form.returnedAmount || 0));
  const fullName = [form.firstName, form.middleName, form.lastName].filter(Boolean).join(' ');
  const fullAddress = [form.unit ? `Unit ${form.unit},` : '', form.streetAddress, form.city, form.province, form.postalCode].filter(Boolean).join(' ');
  const isValid = form.province && form.firstName && form.lastName &&
    form.streetAddress && form.city && form.postalCode &&
    form.landlordName && form.moveOutDate &&
    parseFloat(form.depositAmount) > 0 && form.reasons.length > 0;

  const f = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
  const toggleReason = id => setForm(prev => ({
    ...prev,
    reasons: prev.reasons.includes(id) ? prev.reasons.filter(x => x !== id) : [...prev.reasons, id],
  }));

  const polishDetails = async () => {
    const raw = form.extraDetails.trim();
    // Only fire if >30 chars, not already polished, and not already polishing
    if (!raw || raw.length < 30 || polished || polishing) return;
    setPolishing(true); setPolished(false);
    try {
      const res = await fetch('/api/polish', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: raw }),
      });
      const data = await res.json();
      if (data.polished && data.polished !== raw) {
        f('extraDetails', data.polished);
        setPolished(true);
        setTimeout(() => setPolished(false), 3000);
      }
    } catch {}
    finally { setPolishing(false); }
  };

  const generate = async () => {
    // Save form data before redirecting to Stripe
    localStorage.setItem('db_form', JSON.stringify({...form, fullName, fullAddress}));
    // Include Stripe session ID in success URL so we can verify payment server-side
    const successUrl = encodeURIComponent(window.location.origin + '/?paid=true&session_id={CHECKOUT_SESSION_ID}');
    window.location.href = STRIPE_LINK + '?success_url=' + successUrl;
  };

  const generateLetter = async () => {
    setError(''); setStep('generating');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, fullName, fullAddress }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setLetter(data.letter);
      setEditedLetter(data.letter);
      setStep('result');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setStep('form');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(editedLetter);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = () => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'pt', format: 'letter' });
      const margin = 72;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const maxWidth = pageWidth - margin * 2;

      // Header
      doc.setFont('times', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(26, 42, 94);
      doc.text('Deposit', margin, 52);
      const depositWidth = doc.getTextWidth('Deposit');
      doc.setTextColor(42, 106, 191);
      doc.text('Back', margin + depositWidth, 52);
      doc.setDrawColor(26, 42, 94);
      doc.setLineWidth(1.5);
      doc.line(margin, 62, pageWidth - margin, 62);

      // Letter body
      doc.setFont('times', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(26, 26, 26);
      const lines = doc.splitTextToSize(editedLetter, maxWidth);
      let y = 90;
      lines.forEach(line => {
        if (y > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += 18;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(170, 170, 170);
      doc.text('Generated by DepositBack · depositback.ca · For informational purposes only', margin, pageHeight - 24);

      doc.save('DepositBack-Demand-Letter.pdf');
    };
    document.head.appendChild(script);
  };

  const restart = () => { setStep('landing'); setForm(EMPTY); setLetter(''); setEditedLetter(''); setEditing(false); setError(''); localStorage.removeItem('db_form'); };

  const s = styles;

  // ── LANDING ───────────────────────────────────────────────────────────────
  if (step === 'landing') return (
    <div style={s.page}>
      <Head><title>DepositBack — Time to Get It Back</title></Head>
      <GlobalStyle />
      <nav style={s.nav}>
        <span style={s.logo}>Deposit<span style={s.blue}>Back</span></span>
        <span style={s.tag}>🇨🇦 Canada</span>
      </nav>
      <div style={s.hero}>
        <p style={s.eyebrow}>Tenant Rights · AI-Powered · Province-Specific</p>
        <h1 style={s.h1}><span style={{display:'block'}}>They kept your deposit.</span><span style={{...s.blue, display:'block'}}>Time to get it back.</span></h1>
        <p style={s.sub}>3 minutes. A professional demand letter citing your province's exact laws. Most landlords pay within 2 weeks.</p>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{background:'#ff4d4d',color:'#fff',fontSize:11,fontWeight:700,padding:'3px 8px',borderRadius:4,letterSpacing:'1px'}}>30% OFF</span>
            <span style={{color:'#3d6480',fontSize:14,textDecoration:'line-through'}}>$9.99 CAD</span>
          </div>
          <button style={{...s.cta,whiteSpace:'nowrap',fontSize:14}} onClick={() => setStep('form')}>Get My Letter — $6.99</button>
        </div>
        <p style={s.note}>One-time · No account · Letter in 60 seconds</p>
      </div>
      <div style={s.stats}>
        {[['$1,200','Avg. deposit disputed'],['14 days','Avg. landlord response'],['10 provinces','Full legal coverage']].map(([n,l]) => (
          <div key={l} style={{textAlign:'center'}}><span style={s.statNum}>{n}</span><div style={s.statLabel}>{l}</div></div>
        ))}
      </div>
      <div style={s.how}>
        <p style={s.sectionTitle}>How It Works</p>
        {[
          ['Fill in your details','Province, names, address, deposit amount, reasons. 3 minutes.'],
          ['AI writes your letter','Cites exact provincial legislation. Firm, professional, paralegal tone.'],
          ['Edit, download & send','Review, make changes, download as PDF. Email it today.'],
        ].map(([t,d],i) => (
          <div key={t} style={s.step}><div style={s.stepNum}>{i+1}</div><div><div style={s.stepTitle}>{t}</div><div style={s.stepDesc}>{d}</div></div></div>
        ))}
      </div>
      <div style={s.priceWrap}>
        <p style={s.sectionTitle}>Pricing</p>
        <div style={s.priceCard}>
          <div style={{display:'flex',alignItems:'baseline',gap:12,justifyContent:'center'}}>
            <div style={{...s.price,textDecoration:'line-through',color:'#3d6480',fontSize:36}}>$9.99</div>
            <div style={s.price}>$6.99</div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:8,marginTop:8,marginBottom:24}}>
            <span style={{background:'#ff4d4d',color:'#fff',fontSize:11,fontWeight:700,padding:'3px 10px',borderRadius:4,letterSpacing:'1px'}}>30% OFF</span>
            <span style={s.priceSub}>CAD · one-time · no subscription</span>
          </div>
          <ul style={s.features}>
            {['✓  AI-written, province-specific letter','✓  Legally grounded dispute reasons','✓  Editable before you send','✓  Download as PDF — ready to email','✓  All 10 provinces covered'].map(f => <li key={f} style={s.feat}>{f}</li>)}
          </ul>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{background:'#ff4d4d',color:'#fff',fontSize:11,fontWeight:700,padding:'3px 8px',borderRadius:4,letterSpacing:'1px'}}>30% OFF</span>
              <span style={{color:'#3d6480',fontSize:14,textDecoration:'line-through'}}>$9.99 CAD</span>
            </div>
            <button style={s.cta} onClick={() => setStep('form')}>Get My Letter — $6.99</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── FORM ──────────────────────────────────────────────────────────────────
  if (step === 'form') return (
    <div style={s.page}>
      <Head><title>DepositBack — Your Details</title></Head>
      <nav style={s.nav}>
        <span style={s.logo} onClick={restart}>Deposit<span style={s.blue}>Back</span></span>
        <span style={s.tag}>🇨🇦 Canada</span>
      </nav>
      <div style={s.formPage}>
        <div style={s.formWrap}>
          <button style={s.back} onClick={restart}>← Back</button>
          <h2 style={s.formTitle}>Your Dispute Details</h2>
          <p style={s.formSub}>Your information is used only to generate your letter.</p>

          {/* Province */}
          <div style={s.sectionHeader}>Province</div>
          <div style={s.field}>
            <label style={s.label}>Province</label>
            <select style={s.input} value={form.province} onChange={e => f('province', e.target.value)}>
              <option value=''>Select your province…</option>
              {PROVINCES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            {pv && <p style={s.hint}>✓ Landlord had {pv.days} days to return your deposit under {pv.label} law</p>}
          </div>

          {/* Tenant name */}
          <div style={s.sectionHeader}>Your Full Legal Name</div>
          <div style={{...s.row3, gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))'}}>
            <div style={s.field}><label style={s.label}>First Name</label><input style={s.input} placeholder='Jane' value={form.firstName} onChange={e=>f('firstName',e.target.value)} /></div>
            <div style={s.field}><label style={s.label}>Middle Name <span style={s.optional}>(optional)</span></label><input style={s.input} placeholder='Marie' value={form.middleName} onChange={e=>f('middleName',e.target.value)} /></div>
            <div style={s.field}><label style={s.label}>Last Name</label><input style={s.input} placeholder='Smith' value={form.lastName} onChange={e=>f('lastName',e.target.value)} /></div>
          </div>

          {/* Rental address */}
          <div style={s.sectionHeader}>Rental Property Address</div>
          <div style={{...s.row}} className='db-row-2col'>
            <div style={s.field}><label style={s.label}>Unit / Apt <span style={s.optional}>(optional)</span></label><input style={s.input} placeholder='4B' value={form.unit} onChange={e=>f('unit',e.target.value)} /></div>
            <div style={s.field}><label style={s.label}>Postal Code</label><input style={s.input} placeholder='M5V 1A1' value={form.postalCode}
  maxLength={7}
  onChange={e => {
    let v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,'');
    if (v.length > 3) v = v.slice(0,3) + ' ' + v.slice(3);
    f('postalCode', v);
  }} /></div>
          </div>
          <div style={s.field}><label style={s.label}>Street Address</label><input style={s.input} placeholder='123 Main Street' value={form.streetAddress} onChange={e=>f('streetAddress',e.target.value)} /></div>
          <div style={s.field}>
            <label style={s.label}>City</label>
            <select style={s.input} value={form.city} onChange={e=>f('city',e.target.value)} disabled={!form.province}>
              <option value=''>{form.province ? 'Select your city…' : 'Select province first'}</option>
              {(CITIES[form.province]||[]).map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Landlord */}
          <div style={s.sectionHeader}>Landlord Information</div>
          <div style={s.field}><label style={s.label}>Landlord / Property Management Company Name</label><input style={s.input} placeholder='John Doe or ABC Property Management Inc.' value={form.landlordName} onChange={e=>f('landlordName',e.target.value)} /></div>
          <div style={s.field}><label style={s.label}>Landlord Address <span style={s.optional}>(if known)</span></label><input style={s.input} placeholder='456 King St, Toronto, ON M5V 2B2' value={form.landlordAddress} onChange={e=>f('landlordAddress',e.target.value)} /></div>

          {/* Deposit */}
          <div style={s.sectionHeader}>Deposit Details</div>
          <div style={s.field}><label style={s.label}>Move-Out Date</label><input style={s.input} type='date' value={form.moveOutDate} onChange={e=>f('moveOutDate',e.target.value)} /></div>
          <div style={s.field}><label style={s.label}>Deposit Paid ($CAD)</label><input style={s.input} type='number' placeholder='1200' value={form.depositAmount} onChange={e=>f('depositAmount',e.target.value)} /></div>
          <div style={s.field}><label style={s.label}>Amount Returned <span style={s.optional}>(0 if none)</span></label><input style={s.input} type='number' placeholder='0' value={form.returnedAmount} onChange={e=>f('returnedAmount',e.target.value)} /></div>
          {form.depositAmount && <div style={s.amountBar}><span style={s.amountLabel}>Amount in dispute</span><span style={s.amountVal}>${withheld.toFixed(2)} CAD</span></div>}

          {/* Reasons */}
          <div style={s.sectionHeader}>Grounds for Dispute</div>
          <p style={s.reasonNote}>Select all that apply — each is legally grounded in Canadian tribunal decisions</p>
          <div>
            {REASONS.map(r => (
              <button key={r.id} style={{...s.reason,...(form.reasons.includes(r.id)?s.reasonActive:{})}} onClick={()=>toggleReason(r.id)}>
                <span style={{fontSize:16,flexShrink:0,marginTop:2}}>{form.reasons.includes(r.id)?'✓':'○'}</span>
                <div>
                  <div style={{fontWeight:600,marginBottom:3}}>{r.label}</div>
                  <div style={{fontSize:11,opacity:.7,lineHeight:1.4}}>{r.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Extra details */}
          <div style={{...s.sectionHeader,marginTop:24}}>Additional Context</div>
          <div style={s.field}>
            <label style={s.label}>
              Your situation in your own words <span style={s.optional}>(optional)</span>
              
            </label>
            <textarea style={s.textarea}
              placeholder="Write anything — what happened, what the landlord said, any important dates. Don't worry about grammar. AI will rewrite it professionally."
              value={form.extraDetails}
              onChange={e=>{f('extraDetails',e.target.value);setPolished(false);}}
              
            />
            <p style={s.fieldHint}>✦ Your words will be professionally rewritten after payment</p>
          </div>

          {/* Summary */}
          {isValid && (
            <div style={s.summary}>
              <div style={s.summaryTitle}>Order Summary</div>
              {[
                ['Tenant', fullName],
                ['Province', pv?.label],
                ['Property', fullAddress],
                ['Landlord', form.landlordName],
                ['Disputed', '$'+withheld.toFixed(2)+' CAD'],
                ['Price', '$6.99 CAD'],
              ].map(([k,v]) => (
                <div key={k} style={s.summaryRow}>
                  <span style={s.summaryKey}>{k}</span>
                  <span style={{...s.summaryVal,...(k==='Disputed'?{color:'#5aacff',fontSize:18}:{})}}>{v}</span>
                </div>
              ))}
            </div>
          )}

          {error && <div style={s.error}>{error}</div>}

          <button style={{...s.cta,width:'100%',padding:16,fontSize:16,opacity:isValid?1:0.4,boxSizing:'border-box'}} onClick={isValid?generate:undefined} disabled={!isValid}>
            🔒 {isValid ? 'Get My Letter — $6.99' : 'Complete required fields above'}
          </button>
          <p style={{...s.note,marginTop:10}}>Secure payment via Stripe · Apple Pay & Google Pay accepted</p>
        </div>
      </div>
    </div>
  );

  // ── GENERATING ────────────────────────────────────────────────────────────
  if (step === 'generating') return (
    <div style={{...s.page,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20,minHeight:'100vh'}}>
      <Head><title>DepositBack — Writing Your Letter</title></Head>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      <div style={s.spinner} />
      <div style={{fontSize:18,fontWeight:600,color:'#fff'}}>Writing your demand letter…</div>
      <div style={{fontSize:13,color:'#3d6480',animation:'pulse 2s infinite'}}>{pv?`Referencing ${pv.label} tenant legislation`:'Referencing provincial legislation'}</div>
    </div>
  );

  // ── RESULT ────────────────────────────────────────────────────────────────
  if (step === 'result') return (
    <div style={s.page}>
      <Head><title>DepositBack — Your Letter Is Ready</title></Head>
      <nav style={s.nav}><span style={s.logo} onClick={restart}>Deposit<span style={s.blue}>Back</span></span><span style={s.tag}>🇨🇦 Canada</span></nav>
      <div style={s.formPage}>
        <div style={{maxWidth:740,margin:'0 auto'}}>
          <div style={s.badge}>✓ Letter Generated</div>
          <h2 style={{...s.formTitle,marginBottom:4}}>Your Demand Letter Is Ready</h2>
          <p style={s.formSub}>Review it, make any edits, then download as PDF and send.</p>

          {/* Edit toggle */}
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
            <span style={{fontSize:12,color:'#3d6480'}}>
              {editing ? '✏️ Editing mode — changes are yours' : '📄 Read mode'}
            </span>
            <button onClick={()=>setEditing(e=>!e)} style={{background:'transparent',border:'1px solid #1b3454',color:'#5aacff',padding:'6px 14px',borderRadius:6,cursor:'pointer',fontSize:12,fontFamily:'inherit'}}>
              {editing ? 'Done Editing' : '✏️ Edit Letter'}
            </button>
          </div>

          {editing ? (
            <textarea
              style={{...s.letterBox, color:'#1a2a3a', resize:'vertical', minHeight:500, outline:'none', cursor:'text', border:'2px solid #5aacff', width:'100%', boxSizing:'border-box', fontFamily:"Georgia,serif", fontSize:13, lineHeight:1.9}}
              value={editedLetter}
              onChange={e=>setEditedLetter(e.target.value)}
            />
          ) : (
            <div style={s.letterBox}>{editedLetter}</div>
          )}

          <div style={{display:'flex',gap:10,marginBottom:20,flexWrap:'wrap'}}>
            <button style={{...s.cta,flex:1,minWidth:120}} onClick={copy}>{copied?'✓ Copied!':'📋 Copy'}</button>
            <button style={{...s.cta,flex:1,minWidth:120}} onClick={downloadPDF}>⬇ Download PDF</button>
            <button style={{...s.cta,flex:1,minWidth:120,background:'transparent',color:'#5aacff',border:'1px solid #1b3454',boxShadow:'none'}} onClick={restart}>New Letter</button>
          </div>

          <div style={s.nextBox}>
            <div style={s.nextTitle}>📌 What to do next</div>
            {[
              'Send by email — it creates a timestamped paper trail',
              'CC yourself so you have proof of delivery',
              'Follow up with a printed copy if no response in 7 days',
              'If ignored after 14 days, file with your provincial tribunal — free to do',
            ].map(t=>(
              <div key={t} style={s.nextItem}><span>→</span>{t}</div>
            ))}
          </div>
          <p style={s.disclaimer}>For informational purposes only — not legal advice. For disputes over $5,000 consider a free tenant rights clinic.</p>
        </div>
      </div>
    </div>
  );

  return null;
}

const styles = {
  page:{minHeight:'100vh',background:'#08121f',color:'#fff',fontFamily:"Georgia,'Times New Roman',serif",margin:0,padding:0,overflowX:'hidden'},
  nav:{padding:'18px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #1b3454'},
  logo:{fontSize:20,fontWeight:700,color:'#fff',cursor:'pointer'},
  blue:{color:'#5aacff'},
  tag:{background:'#0e1f36',color:'#5aacff',fontSize:11,padding:'4px 12px',borderRadius:20,letterSpacing:'1.5px',textTransform:'uppercase',border:'1px solid #1b3454',fontFamily:'monospace'},
  hero:{maxWidth:720,margin:'0 auto',padding:'72px 24px 56px',textAlign:'center'},
  eyebrow:{fontSize:11,letterSpacing:'3px',textTransform:'uppercase',color:'#5aacff',marginBottom:20,fontFamily:'monospace'},
  h1:{fontSize:'clamp(28px,4.2vw,52px)',fontWeight:700,lineHeight:1.15,marginBottom:20,letterSpacing:'-1px',color:'#fff',textAlign:'center'},
  sub:{fontSize:16,color:'#8ab4d4',lineHeight:1.65,maxWidth:480,margin:'0 auto 36px'},
  cta:{background:'#5aacff',color:'#08121f',border:'none',padding:'15px 44px',fontSize:15,fontWeight:700,borderRadius:6,cursor:'pointer',fontFamily:'inherit',boxShadow:'0 4px 24px rgba(90,172,255,.3)',whiteSpace:'nowrap'},
  note:{fontSize:11,color:'#3d6480',marginTop:10},
  stats:{display:'flex',justifyContent:'center',gap:40,flexWrap:'wrap',padding:'28px 24px',borderTop:'1px solid #1b3454',borderBottom:'1px solid #1b3454',maxWidth:560,margin:'0 auto'},
  statNum:{fontSize:30,fontWeight:700,color:'#5aacff',display:'block',letterSpacing:'-1px'},
  statLabel:{fontSize:11,color:'#3d6480',marginTop:3},
  how:{maxWidth:660,margin:'0 auto',padding:'56px 24px 48px'},
  sectionTitle:{fontSize:11,letterSpacing:'3px',textTransform:'uppercase',color:'#5aacff',marginBottom:28,textAlign:'center',fontFamily:'monospace'},
  step:{display:'flex',gap:16,alignItems:'flex-start',background:'#0e1f36',border:'1px solid #1b3454',borderRadius:10,padding:20,marginBottom:10},
  stepNum:{width:32,height:32,background:'#5aacff',color:'#08121f',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13,flexShrink:0},
  stepTitle:{fontSize:14,fontWeight:700,marginBottom:4,color:'#fff'},
  stepDesc:{fontSize:12,color:'#3d6480',lineHeight:1.5},
  priceWrap:{maxWidth:360,margin:'0 auto',padding:'0 24px 72px',textAlign:'center'},
  priceCard:{background:'#0e1f36',border:'1px solid #1b3454',borderRadius:14,padding:'40px 32px'},
  price:{fontSize:56,fontWeight:700,color:'#fff',lineHeight:1,letterSpacing:'-2px'},
  priceSub:{fontSize:12,color:'#3d6480',marginTop:6,marginBottom:24},
  features:{listStyle:'none',padding:0,marginBottom:28,textAlign:'left'},
  feat:{padding:'9px 0',borderBottom:'1px solid #1b3454',fontSize:12,color:'#8ab4d4'},
  formPage:{padding:'36px 24px 72px'},
  formWrap:{maxWidth:580,margin:'0 auto'},
  back:{background:'none',border:'none',color:'#3d6480',cursor:'pointer',fontSize:13,fontFamily:'inherit',marginBottom:28,padding:0},
  formTitle:{fontSize:26,fontWeight:700,marginBottom:4,letterSpacing:'-.5px'},
  formSub:{fontSize:13,color:'#3d6480',marginBottom:28},
  sectionHeader:{fontSize:11,letterSpacing:'2px',textTransform:'uppercase',color:'#5aacff',fontFamily:'monospace',padding:'16px 0 8px',borderBottom:'1px solid #1b3454',marginBottom:16},
  field:{marginBottom:16},
  label:{display:'block',fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',color:'#5aacff',marginBottom:7,fontFamily:'monospace'},
  optional:{color:'#3d6480',textTransform:'none',letterSpacing:0,fontSize:10},
  input:{width:'100%',background:'#0e1f36',border:'1px solid #1b3454',borderRadius:6,padding:'11px 13px',color:'#fff',fontSize:14,fontFamily:'inherit',outline:'none',boxSizing:'border-box'},
  hint:{fontSize:11,color:'#5aacff',marginTop:5,fontFamily:'monospace'},
  row:{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14},
  row3:{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14},
  amountBar:{background:'#0e1f36',border:'1px solid #1b3454',borderRadius:8,padding:'14px 18px',marginBottom:16,display:'flex',justifyContent:'space-between',alignItems:'center'},
  amountLabel:{fontSize:12,color:'#3d6480'},
  amountVal:{fontSize:22,fontWeight:700,color:'#5aacff'},
  reasonNote:{fontSize:12,color:'#3d6480',marginBottom:12,lineHeight:1.5},
  reason:{width:'100%',background:'#0e1f36',border:'1px solid #1b3454',borderRadius:8,padding:'13px 14px',color:'#8ab4d4',fontSize:13,cursor:'pointer',textAlign:'left',fontFamily:'inherit',marginBottom:8,display:'flex',alignItems:'flex-start',gap:12,lineHeight:1.4,boxSizing:'border-box'},
  reasonActive:{background:'#0f2444',borderColor:'#5aacff',color:'#5aacff'},
  textarea:{width:'100%',background:'#0e1f36',border:'1px solid #1b3454',borderRadius:6,padding:'11px 13px',color:'#fff',fontSize:14,fontFamily:'inherit',outline:'none',resize:'vertical',minHeight:100,boxSizing:'border-box'},
  fieldHint:{fontSize:10,color:'#3d6480',marginTop:5,fontFamily:'monospace'},
  aiStatus:{color:'#5aacff',fontSize:10,marginLeft:8,fontFamily:'monospace',textTransform:'none',letterSpacing:0},
  aiDone:{color:'#5aff9a',fontSize:10,marginLeft:8,fontFamily:'monospace',textTransform:'none',letterSpacing:0},
  summary:{background:'#0e1f36',border:'1px solid #1b3454',borderRadius:8,padding:18,marginBottom:18,marginTop:8},
  summaryTitle:{fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',color:'#5aacff',marginBottom:12,fontFamily:'monospace'},
  summaryRow:{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:'1px solid #1b3454',fontSize:12},
  summaryKey:{color:'#3d6480'},
  summaryVal:{fontWeight:600,color:'#fff',textAlign:'right',maxWidth:'65%'},
  error:{background:'rgba(255,107,107,.1)',border:'1px solid rgba(255,107,107,.25)',borderRadius:7,padding:'12px 14px',color:'#ff6b6b',fontSize:13,marginBottom:14},
  spinner:{width:44,height:44,border:'3px solid #1b3454',borderTop:'3px solid #5aacff',borderRadius:'50%',animation:'spin .7s linear infinite'},
  badge:{display:'inline-flex',alignItems:'center',gap:7,background:'#0e1f36',border:'1px solid #1b3454',borderRadius:20,padding:'5px 16px',fontSize:11,color:'#5aacff',marginBottom:14,fontFamily:'monospace'},
  letterBox:{background:'#fff',color:'#1a2a3a',borderRadius:10,padding:'36px 40px',fontFamily:"Georgia,serif",fontSize:13,lineHeight:1.9,whiteSpace:'pre-wrap',marginBottom:18,width:'100%',boxSizing:'border-box'},
  nextBox:{background:'#0e1f36',border:'1px solid #1b3454',borderRadius:8,padding:20,marginBottom:18},
  nextTitle:{fontSize:12,fontWeight:700,color:'#5aacff',marginBottom:10},
  nextItem:{fontSize:12,color:'#8ab4d4',padding:'5px 0',display:'flex',gap:8,lineHeight:1.5},
  disclaimer:{fontSize:11,color:'#3d6480',lineHeight:1.6,borderTop:'1px solid #1b3454',paddingTop:16},
};
