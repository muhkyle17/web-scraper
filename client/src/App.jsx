import './App.css'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'
import axios from 'axios'
import Footer from './components/Footer'
import Header from './components/Header'
import RefreshButton from './components/RefreshButton'
import Grid from './components/Grid'
import Loader from './components/Loader'

function App() {
  const [listings, setListings] = useLocalStorage('properties', [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchListings = async () => {
    setLoading(true)
    setError('')
    setListings([])

    try {
      const response = await axios.get('http://localhost:5001/scrape')

      if (response.data.length === 0) {
        throw new Error('No listings found')
      }

      setListings(response.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch listings. Please try again')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (listings.length === 0) {
      fetchListings()
    }
  }, [])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Header />
      <RefreshButton callback={fetchListings} loading={loading} />
      <main className='flex flex-col items-center justify-center flex-1 w-full px-4 relative'>
        {error && <p className='text-red-500'>{error}</p>}
        {loading ? <Loader /> : <Grid listings={listings} />}
      </main>
      <Footer />
    </div>
  )
}

export default App
