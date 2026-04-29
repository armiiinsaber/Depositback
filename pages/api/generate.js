const LEGISLATION = {
  ON:'Residential Tenancies Act, 2006 (RTA)',BC:'Residential Tenancy Act (RSBC 2002, c. 78)',
  AB:'Residential Tenancies Act (SA 2004, c. R-17.1)',QC:'Civil Code of Quebec and Act respecting the Régie du logement',
  MB:'The Residential Tenancies Act (CCSM c. R119)',SK:'The Residential Tenancies Act, 2006 (SS 2006, c. R-22.0001)',
  NS:'Residential Tenancies Act (RSNS 1989, c. 401)',NB:'Residential Tenancies Act (SNB 1975, c. R-10.2)',
  NL:'Residential Tenancies Act, 2018 (SNL 2018, c. R-14.2)',PE:'Rental of Residential Property Act (RSPEI 1988, c. R-13.1)',
};
const TRIBUNALS = {
  ON:'the Landlord and Tenant Board (LTB)',BC:'the Residential Tenancy Branch (RTB)',
  AB:'the Residential Tenancy Dispute Resolution Service (RTDRS)',QC:'the Tribunal administratif du logement (TAL)',
  MB:'the Residential Tenancies Branch',SK:'the Office of Residential Tenancies',
  NS:'Residential Tenancies',NB:'the Rentalsman',
  NL:'the Residential Tenancies Section',PE:'the Island Regulatory and Appeals Commission (IRAC)',
};
const PROVINCE_NAMES = {
  ON:'Ontario',BC:'British Columbia',AB:'Alberta',QC:'Quebec',
  MB:'Manitoba',SK:'Saskatchewan',NS:'Nova Scotia',NB:'New Brunswick',NL:'Newfoundland',PE:'PEI',
};
const DAYS = {ON:30,BC:15,AB:10,QC:30,MB:14,SK:7,NS:10,NB:7,NL:15,PE:10};
const REASON_LABELS = {
  deadline:'Landlord missed the legal deposit return deadline',
  wearandtear:'Deductions for normal wear and tear (not permissible by law)',
  noproof:'Deductions made without receipts or documented proof',
  noitemized:'No itemized statement of deductions was provided',
  partial:'Deposit only partially returned without explanation',
  falsedamage:'Damage claimed was pre-existing at time of move-in',
  cleaning:'Excessive cleaning charges despite reasonable cleanliness',
  noinspection:'No move-out inspection was conducted by the landlord',
};

// Verify Stripe payment session before generating
async function verifyStripeSession(sessionId) {
  if (!sessionId) return false;
  try {
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    });
    const session = await res.json();
    // Must be a completed payment
    return session.payment_status === 'paid';
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { province, fullName, fullAddress, landlordName, landlordAddress,
    moveOutDate, depositAmount, returnedAmount, reasons, extraDetails,
    stripeSessionId } = req.body;

  // ── PAYMENT GATE ─────────────────────────────────────────────────────────
  // In production, verify Stripe payment. Skip only if DEMO_MODE is set.
  if (process.env.DEMO_MODE !== 'true') {
    const paid = await verifyStripeSession(stripeSessionId);
    if (!paid) {
      return res.status(402).json({ error: 'Payment required. Please complete checkout first.' });
    }
  }
  // ─────────────────────────────────────────────────────────────────────────

  const disputed = (parseFloat(depositAmount) - parseFloat(returnedAmount||0)).toFixed(2);
  const act = LEGISLATION[province] || 'the applicable Residential Tenancies Act';
  const tribunal = TRIBUNALS[province] || 'the relevant provincial tribunal';
  const days = DAYS[province] || 30;
  const provinceName = PROVINCE_NAMES[province] || province;
  const today = new Date().toLocaleDateString('en-CA',{year:'numeric',month:'long',day:'numeric'});
  const reasonsList = (Array.isArray(reasons)?reasons:[]).map(id => REASON_LABELS[id]||id);

  const prompt = `You are the tenant. Write this letter in first person AS the tenant. You ARE the tenant named in the details below. This letter is written BY you, not about you.

CRITICAL RULES — NEVER BREAK THESE:
- NEVER write "on behalf of" — you are the author, not a representative
- NEVER refer to the tenant in third person
- ALWAYS use first person: "I am writing", "I demand", "my deposit", "I moved out"
- The letter opens with "I am writing to formally demand..." NOT "I am writing on behalf of..."

TODAY'S DATE: ${today}
PROVINCE: ${provinceName}
LEGISLATION: ${act}
LEGAL DEADLINE: Landlord had ${days} days from move-out to return deposit
TRIBUNAL: ${tribunal}

TENANT: ${fullName}
TENANT ADDRESS: ${fullAddress}
LANDLORD: ${landlordName}${landlordAddress ? '\nLANDLORD ADDRESS: '+landlordAddress : ''}
MOVE-OUT DATE: ${moveOutDate}
DEPOSIT PAID: $${depositAmount} CAD
AMOUNT RETURNED: $${returnedAmount||'0'} CAD
AMOUNT IN DISPUTE: $${disputed} CAD

DISPUTE GROUNDS:
${reasonsList.map((r,i)=>`${i+1}. ${r}`).join('\n')}
${extraDetails?'\nADDITIONAL DETAILS:\n'+extraDetails:''}

LETTER FORMAT:
- Date: ${today}
- Tenant name and address block
- Landlord name${landlordAddress?' and address':''}
- RE: Formal Demand for Return of Security Deposit — ${fullAddress}
- Dear ${landlordName},
- First person throughout — "I", "my", "me"
- Opening: "I am writing to formally demand..."
- Cite ${act} by name
- State landlord missed the ${days}-day deadline from ${moveOutDate}
- List dispute grounds as clear sentences
${extraDetails?'- Incorporate additional details naturally':''}
- Demand $${disputed} CAD within 14 days or I will file with ${tribunal}
- Closing: "Yours truly," + ${fullName} signature block
- Professional paralegal tone — firm, factual, no emotional language`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json','x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},
      body:JSON.stringify({model:'claude-haiku-4-5',max_tokens:1200,messages:[{role:'user',content:prompt}]}),
    });
    const data = await response.json();
    if(!response.ok||data.error) return res.status(500).json({error:data.error?.message||'API error'});
    const letter = data.content?.[0]?.text?.trim();
    if(!letter) return res.status(500).json({error:'Empty response'});
    res.json({letter});
  } catch(err) {
    res.status(500).json({error:err.message});
  }
}
