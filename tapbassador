export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const code = (req.query.code || '').trim().toUpperCase();
  if (!code) return res.status(400).json({ error: 'Missing code' });

  const shop = process.env.SHOPIFY_STORE;
  const token = process.env.SHOPIFY_TOKEN;

  try {
    const response = await fetch(
      `https://${shop}/admin/api/2024-01/discount_codes/lookup.json?code=${encodeURIComponent(code)}`,
      { headers: { 'X-Shopify-Access-Token': token } }
    );

    if (response.status === 404) {
      return res.status(404).json({ error: 'Code not found' });
    }

    const data = await response.json();
    const dc = data.discount_code;

    return res.status(200).json({
      code: dc.code,
      usage_count: dc.usage_count,
    });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }
}
