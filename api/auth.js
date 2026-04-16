export default function handler(req, res) {
  const shop = process.env.SHOPIFY_STORE;
  const clientId = process.env.SHOPIFY_CLIENT_ID;
  const redirectUri = `https://tapbassador-api.vercel.app/api/callback`;
  const scopes = 'read_price_rules,read_discounts';
  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}`;
  res.redirect(authUrl);
}
