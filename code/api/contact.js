// Vercel serverless function: the browser posts here, and this forwards to your form service.
// The secret key lives in Vercel's Environment Variables, never in the code or the browser.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false });

  const { email, message, website } = req.body || {};
  if (website) return res.status(200).json({ success: true }); // honeypot: bots fill this in

  const valid =
    typeof email === "string" && /^\S+@\S+\.\S+$/.test(email) && email.length <= 200 &&
    typeof message === "string" && message.trim() && message.length <= 5000;
  if (!valid) return res.status(400).json({ success: false });

  const endpoint = process.env.FORM_ENDPOINT || "https://api.web3forms.com/submit";
  const key = process.env.WEB3FORMS_KEY;
  try {
    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...(key && { access_key: key }),
        subject: "message from your portfolio",
        from_name: "portfolio",
        email,
        message,
      }),
    });
    const data = await r.json().catch(() => ({}));
    const ok = r.ok && data.success !== false;
    return res.status(ok ? 200 : 502).json({ success: ok });
  } catch {
    return res.status(502).json({ success: false });
  }
}
