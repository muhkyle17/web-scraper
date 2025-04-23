const MAX_RETRIES = 3

const validateListing = listing => {
  return (
    typeof listing.title === 'string' &&
    typeof listing.price === 'string' &&
    typeof listing.link === 'string'
  )
}

export const scrapeListings = async ({ browser, retryCount }) => {
  try {
    const page = await browser.newPage()
    console.log(page, 'page')

    try {
      await page.goto('https://www.airbnb.com/', { waitUntil: 'load' })

      await page.waitForSelector('[itemprop="itemListElement"]', {
        timeout: 10000,
      })
    } catch (pageError) {
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`)
        return await scrapeListings(retryCount + 1)
      }
    } finally {
      await page.close
    }
  } catch (browserError) {
    throw new Error(`Failed to launch browser: ${browserError.message}`)
  }
}
