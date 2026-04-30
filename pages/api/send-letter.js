// pages/api/send-letter.js
// NEW file — call this after letter generation to email .docx + .pdf
// Install: npm install resend docx pdf-lib

import { Resend } from 'resend';
import { Document, Packer, Paragraph, TextRun, AlignmentType, convertInchesToTwip } from 'docx';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, tenantName, province, letter } = req.body;

  if (!email || !letter) {
    return res.status(400).json({ error: 'Missing email or letter' });
  }

  try {
    const [docxBuffer, pdfBuffer] = await Promise.all([
      generateDocx(letter),
      generatePdf(letter),
    ]);

    const firstName = tenantName ? tenantName.split(' ')[0] : 'there';
    const safeName = (tenantName || 'Letter').replace(/[^a-zA-Z0-9 _-]/g, '').replace(/\s+/g, '_');

    await resend.emails.send({
      from: 'DepositBack <letters@depositback.ca>',
      to: email,
      subject: `Your DepositBack Demand Letter — ${province || 'Canada'}`,
      html: buildEmailHtml(firstName),
      attachments: [
        {
          filename: `DepositBack_${safeName}.docx`,
          content: docxBuffer.toString('base64'),
        },
        {
          filename: `DepositBack_${safeName}.pdf`,
          content: pdfBuffer.toString('base64'),
        },
      ],
    });

    res.json({ success: true });
  } catch (err) {
    console.error('send-letter error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}

// ─── DOCX ────────────────────────────────────────────────────────────────────

async function generateDocx(letterText) {
  const lines = letterText.split('\n');

  const children = lines.map((line) => {
    const t = line.trim();
    if (!t) return new Paragraph({ spacing: { after: 100 } });

    const isRe = t.startsWith('RE:') || t.startsWith('Re:');
    return new Paragraph({
      children: [
        new TextRun({
          text: t,
          bold: isRe,
          size: 24, // 12pt
          font: 'Times New Roman',
        }),
      ],
      spacing: { after: isRe ? 200 : 160 },
      alignment: AlignmentType.LEFT,
    });
  });

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1.25),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1.25),
          },
        },
      },
      children,
    }],
  });

  return Buffer.from(await Packer.toBuffer(doc));
}

// ─── PDF ─────────────────────────────────────────────────────────────────────

async function generatePdf(letterText) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const W = 612, H = 792;
  const mX = 90, mY = 72;
  const contentW = W - mX * 2;
  const fontSize = 11;
  const lineH = 17;
  const paraGap = 7;

  let page = pdfDoc.addPage([W, H]);
  let y = H - mY;

  for (const rawLine of letterText.split('\n')) {
    const line = rawLine.trim();
    if (!line) {
      y -= paraGap;
      if (y < mY) { page = pdfDoc.addPage([W, H]); y = H - mY; }
      continue;
    }

    const isRe = line.startsWith('RE:') || line.startsWith('Re:');
    const f = isRe ? fontBold : font;

    for (const wrappedLine of wrapText(line, f, fontSize, contentW)) {
      if (y < mY + lineH) { page = pdfDoc.addPage([W, H]); y = H - mY; }
      page.drawText(wrappedLine, { x: mX, y, size: fontSize, font: f, color: rgb(0, 0, 0) });
      y -= lineH;
    }
    y -= paraGap;
  }

  return Buffer.from(await pdfDoc.save());
}

function wrapText(text, font, size, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (font.widthOfTextAtSize(test, size) > maxWidth && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// ─── Email HTML ───────────────────────────────────────────────────────────────

function buildEmailHtml(firstName) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1);">
<tr><td style="background:#0f172a;padding:28px 40px;">
  <p style="margin:0;color:#fff;font-size:20px;font-weight:700;">DepositBack</p>
  <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">depositback.ca</p>
</td></tr>
<tr><td style="padding:36px 40px;">
  <p style="margin:0 0 16px;font-size:16px;color:#0f172a;font-weight:600;">Hi ${firstName},</p>
  <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.6;">Your demand letter is attached — a <strong>Word file (.docx)</strong> you can edit, and a <strong>PDF</strong> ready to send directly to your landlord.</p>
  <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">Email it to your landlord, print and mail it, or send via registered mail for a paper trail.</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;border-left:3px solid #3b82f6;">
    <tr><td style="padding:18px 20px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#1e40af;text-transform:uppercase;letter-spacing:.5px;">Quick tips</p>
      <ul style="margin:0;padding-left:18px;color:#374151;font-size:14px;line-height:1.8;">
        <li>Keep a copy for your records</li>
        <li>Send via email and screenshot the sent receipt</li>
        <li>No response in 7 days? File with your provincial tribunal</li>
      </ul>
    </td></tr>
  </table>
  <p style="margin:24px 0 0;font-size:14px;color:#6b7280;">Good luck — you've got this. Reply to this email with any questions.</p>
</td></tr>
<tr><td style="border-top:1px solid #f1f5f9;padding:20px 40px;">
  <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">DepositBack · depositback.ca · Not legal advice.</p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}
