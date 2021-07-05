export default async function updateSiteName(
  max_login_duration: number,
  userId: string,
  siteID: string
) {
  const res = await fetch(process.env.HARPERDB_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${process.env.HARPERDB_KEY}`,
    },
    body: JSON.stringify({
      operation: 'sql',
      sql: `update site_schema.sites set max_login_duration = "${max_login_duration}" where user_id = "${userId}" and id = "${siteID}"`,
    }),
  });

  return res.json();
}
