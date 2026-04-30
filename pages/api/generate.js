// pages/api/generate.js
// Drop-in replacement for your existing generate.js
// Changes: claude-opus-4-5 model + date-aware prompting

const LEGISLATION = {
  ON: 'Residential Tenancies Act, 2006, S.O. 2006, c. 17',
  BC: 'Residential Tenancy Act, SBC 2002, c. 78',
  AB: "Residential Tenancies Act, RSA 2000, c. R-17.1",
  QC: 'Civil Code of Québec and Act respecting the Tribunal administratif du logement',
  MB: 'The Residential Tenancies Act, CCSM c. R119',
  SK: 'The Residential Tenancies Act, 2006, SS 2006, c. R-22.0001',
  NS: 'Residential Tenancies Act, RSNS 1989, c. 401',
  NB: 'Residential Tenancies Act, SNB 1975, c. R-10.2',
  NL: 'Residential Tenancies Act, 2018, SNL 2018, c. R-14.1',
  PE: 'Rental of Residential Property Act, RSPEI 1988, c. R-13.1',
};

const TRIBUNALS = {
  ON: 'the Landlord and Tenant Board (LTB)',
  BC: 'the Residential Tenancy Branch (RTB)',
  AB: 'the Residential Tenancy Dispute Resolution Service (RTDRS)',
  QC: 'the Tribunal administratif du logement (TAL)',
  MB: 'the Residential Tenancies Branch',
  SK: 'the Office of Residential Tenancies (ORT)',
  NS: 'Access Nova Scotia – Residential Tenancies',
  NB: "the Rentalsman's Office",
  NL: 'the Digital Government and Service NL – Residential Tenancies Section',
  PE: 'the Island Regulatory and Appeals Commission (IRAC)',
};

const PROVINCE_NAMES = {
  ON: 'Ontario', BC: 'British Columbia', AB: 'Alberta', QC: 'Quebec',
  MB: 'Manitoba', SK: 'Saskatchewan', NS: 'Nova Scotia', NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador', PE: 'Prince Edward Island',
};

const RETURN_DAYS = {
  ON: 30, BC: 15, AB: 10, QC: 30, MB: 14, SK: 7, NS: 10, NB: 7, NL: 15, PE: 10,
};

// ─── Date logic ──────────────────────────────────────────────────────────────

function getMoveOutContext(moveOutDateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const moveOut = new Date(moveOutDateStr);
  moveOut.setHours(0, 0, 0, 0);

  const diffDays = Math.round((today - moveOut) / (1000 * 60 * 60 * 24));

  const formatted = moveOut.toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  if (diffDays === 0) return { status: 'today', formatted };
  if (diffDays > 0 && diffDays <= 45) return { status: 'past_recent', diffDays, formatted };
  if (diffDays > 45) return { status: 'past_old', diffDays, formatted };
  return { status: 'future', diffDays: Math.abs(diffDays), formatted };
}

function getDateInstruction(ctx, returnDays) {
  switch (ctx.status) {
    case 'today':
      return `The tenant moved out TODAY. Write as if the tenant has just vacated and is immediately asserting their rights. Use "I have vacated the unit as of today, ${ctx.formatted}."`;
    case 'past_recent':
      return `The tenant moved out ${ctx.diffDays} days ago on ${ctx.formatted}. The landlord has had ${ctx.diffDays} days — ${ctx.diffDays >= returnDays ? `already past the ${returnDays}-day legal deadline` : `approaching the ${returnDays}-day legal deadline`}. Write in past tense for the move-out.`;
    case 'past_old':
      return `The tenant moved out ${ctx.diffDays} days ago on ${ctx.formatted}. The landlord has been in clear violation for ${ctx.diffDays - returnDays} days past the ${returnDays}-day deadline. The tone must reflect this extended non-compliance — this is a seriously overdue demand.`;
    case 'future':
      return `The tenant's move-out date is ${ctx.diffDays} days in the future (${ctx.formatted}). This is a pre-emptive letter putting the landlord on formal notice of their obligations BEFORE the move-out. Write in future tense where appropriate: "I will be vacating on ${ctx.formatted}." Frame as advance notice to ensure compliance.`;
  }
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    province,
    firstName, middleName, lastName,
    fullName: passedFullName, fullAddress: passedFullAddress,
    unit, streetAddress, city, postalCode,
    landlordName, landlordAddress,
    moveOutDate, moveInDate,
    depositAmount, returnedAmount,
    reasons, extraDetails,
  } = req.body;

  // Compute server-side (same as existing pattern)
  const fullName = passedFullName || [firstName, middleName, lastName].filter(Boolean).join(' ') || 'Tenant';
  const fullAddress = passedFullAddress || [unit ? 'Unit ' + unit + ',' : '', streetAddress, city, province, postalCode].filter(Boolean).join(' ') || 'Rental Address';

  const disputed = (parseFloat(depositAmount || 0) - parseFloat(returnedAmount || 0)).toFixed(2);
  const act = LEGISLATION[province] || 'the applicable Residential Tenancies Act';
  const tribunal = TRIBUNALS[province] || 'the relevant provincial tribunal';
  const returnDays = RETURN_DAYS[province] || 14;
  const provinceName = PROVINCE_NAMES[province] || province;

  const today = new Date().toLocaleDateString('en-CA', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Date-aware context
  const moveOutCtx = getMoveOutContext(moveOutDate);
  const dateInstruction = getDateInstruction(moveOutCtx, returnDays);

  // Province-specific notes
  const provinceNotes = province === 'QC'
    ? 'Quebec does not permit security/damage deposits under art. 1904 CCQ — any deposit held is illegal and must be returned in full.'
    : province === 'ON' && reasons && reasons.some(r => r.toLowerCase().includes('last month'))
    ? 'In Ontario, last month\'s rent is legal to collect but CANNOT be used for damages — if the landlord applied it to repairs, that is a violation of the RTA.'
    : '';

  const prompt = `You are a tenant rights paralegal in Canada. Write a formal demand letter for a security deposit dispute. Write entirely in first person as the tenant — never refer to the tenant in third person.

TODAY'S DATE: ${today}
MOVE-OUT DATE CONTEXT: ${dateInstruction}
${provinceNotes ? `PROVINCE NOTE: ${provinceNotes}` : ''}

TENANT: ${fullName}
TENANT ADDRESS: ${fullAddress}
LANDLORD: ${landlordName}
LANDLORD ADDRESS: ${landlordAddress || 'Address on file'}
RENTAL PROPERTY: ${fullAddress}
PROVINCE: ${provinceName}
${moveInDate ? `MOVE-IN DATE: ${moveInDate}` : ''}
MOVE-OUT DATE: ${moveOutCtx.formatted}
DEPOSIT PAID: $${depositAmount} CAD
AMOUNT RETURNED: $${returnedAmount || '0'} CAD
AMOUNT IN DISPUTE: $${disputed} CAD
GROUNDS FOR DISPUTE: ${Array.isArray(reasons) ? reasons.join('; ') : reasons}
${extraDetails ? `ADDITIONAL DETAILS: ${extraDetails}` : ''}

Write a complete, professional demand letter. Include:
1. Tenant contact block (name, address) and letter date (${today})
2. Landlord address block
3. RE: line
4. Opening paragraph stating the tenancy and deposit paid
5. Statement of move-out and landlord's legal obligation under the ${act}
6. Clear statement of non-compliance / dispute grounds
7. Formal demand for $${disputed} within 7 business days
8. Consequence: filing with ${tribunal} if not resolved
9. Signature block

Write only the letter. No preamble or commentary.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',   // ← upgraded from sonnet
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    const data = await response.json();
    const letter = data.content?.[0]?.text?.trim();

    if (!letter) throw new Error('Empty response from Claude');

    res.json({ letter });
  } catch (err) {
    console.error('Generate error:', err);
    res.status(500).json({ error: 'Failed to generate letter. Please try again.' });
  }
}
