const TOKEN = 'skRIhey92sMCEfRFDuAu564oT6Dv7Fh2vZXnjSc6cS5bbSaEgttkCEF9Pp1gsDJuR3CqUMbh2Oszn8spA'
const PROJECT = 'uii0qugi'

const types = ['blogPost', 'travelPackage', 'portfolioItem', 'aboutContent', 'siteSettings']

for (const type of types) {
  const query = encodeURIComponent(`count(*[_type=="${type}"])`)
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v2024-01-01/data/query/production?query=${query}`,
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  )
  const json = await res.json()
  console.log(`${type}: ${json.result} documents`)
}
