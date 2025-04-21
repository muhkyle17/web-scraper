const MAX_RETRIES = 3

const validateListing = listing => {
  return (
    typeof listing.title === 'string' &&
    typeof listing.price === 'string' &&
    typeof listing.link === 'string'
  )
}
