export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { text } = req.body;
  if (!text || text.trim().length < 5) return res.json({ polished: text });

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `You are helping a tenant write a deposit dispute letter. This person may have limited English. Rewrite their note into clear, professional English suitable for a legal demand letter. Keep ALL the facts exactly as stated. Only fix grammar, clarity, and professionalism. Do not add or invent any details. Return only the rewritten text, nothing else.\n\nTheir note: "${text.trim()}"`,
        }],
      }),
    });

    const data = await response.json();
    const polished = data.content?.[0]?.text?.trim() || text;
    res.json({ polished });
  } catch (err) {
    res.json({ polished: text }); // fallback to original if anything fails
  }
}
