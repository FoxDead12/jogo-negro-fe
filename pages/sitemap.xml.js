//pages/sitemap.xml.js
function generateSiteMap(date) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>https://www.jogodenegro.pt/</loc>
        <video:video>
          <video:title>Jogo de Negro</video:title>
          <video:content_loc>https://www.jogodenegro.pt/vd/video1_AdobeExpress.mp4</video:content_loc>
        </video:video>
       <lastmod>${date}</lastmod>      
     </url>
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const date = new Date().toISOString();
  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(date);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;