export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const code = (req.query.code || '').trim().toUpperCase();
  if (!code) return res.status(400).json({ error: 'Missing code' });

  const shop = process.env.SHOPIFY_STORE;
  const token = process.env.SHOPIFY_TOKEN;

  if (!shop || !token) {
    return res.status(500).json({ error: 'Missing env vars', shop: !!shop, token: !!token });
  }

  const url = `https://${shop}/admin/api/2024-01/discount_codes/lookup.json?code=${encodeURIComponent(code)}`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json'
      }
    });

    const text = await response.text();

    if (response.status === 404) {
      return res.status(404).json({ error: 'Code not found' });
    }

    if (!response.ok) {
      return res.status(500).json({ error: 'Shopify error', status: response.status, body: text });
    }

    const data = JSON.parse(text);
    const dc = data.discount_code;

    return res.status(200).json({
      code: dc.code,
      usage_count: dc.usage_count,
    });

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
