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
  } catch (browserError) {
    throw new Error(`Failed to launch browser: ${browserError.message}`)
  }
}
