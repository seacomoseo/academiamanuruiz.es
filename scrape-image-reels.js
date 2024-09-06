const puppeteer = require('puppeteer')

const getImageUrlFromReel = async (reelUrl) => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  try {
    await page.goto(reelUrl, { waitUntil: 'networkidle2' })

    // Esperar a que se cargue la imagen de portada
    await page.waitForSelector('meta[property="og:image"]')

    // Extraer la URL de la imagen de la meta etiqueta
    const imageUrl = await page.$eval('meta[property="og:image"]', element => element.content)

    console.log(`Imagen de ${reelUrl}: ${imageUrl}`)

    return imageUrl
  } catch (error) {
    console.error(`Error al procesar ${reelUrl}:`, error)
  } finally {
    await browser.close()
  }
}

const getImagesFromReels = async (reelUrls) => {
  const imageUrls = []

  for (const url of reelUrls) {
    const imageUrl = await getImageUrlFromReel(url)
    if (imageUrl) {
      imageUrls.push(imageUrl)
    }
  }

  return imageUrls
}

// Lista de URLs de reels de ejemplo
const reelUrls = [
  "https://www.instagram.com/reel/C_dM6T2M-ia/",
  "https://www.instagram.com/reel/C8bUffQC0mq/",
  "https://www.instagram.com/reel/C754enpsTuX/",
  "https://www.instagram.com/reel/C71bML0iS7U/",
  "https://www.instagram.com/reel/C52mNbLstoM/",
  "https://www.instagram.com/reel/C5BE2oJs8u0/",
  "https://www.instagram.com/reel/C4BIm96Mopb/",
  "https://www.instagram.com/reel/C35sc-4sym0/",
  "https://www.instagram.com/reel/C3QVPEPMr6C/",
  "https://www.instagram.com/reel/C29otx0saui/",
  "https://www.instagram.com/reel/C2411HasyV8/",
  "https://www.instagram.com/reel/C21_t-ysEau/",
  "https://www.instagram.com/reel/C2fCLlYIsS4/",
  "https://www.instagram.com/reel/C2PbpsOImzg/",
  "https://www.instagram.com/reel/C2PZqgtIgCi/",
  "https://www.instagram.com/reel/Cx7u0sloIbU/",
  "https://www.instagram.com/reel/CxarapYMCQg/",
  // Agrega más URLs de reels aquí
]

// Ejecutar el scraper
getImagesFromReels(reelUrls).then((imageUrls) => {
  console.log('URLs de las imágenes de los reels:', imageUrls)
})