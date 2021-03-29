import React from 'react'

/* -------------------------------------------------------------------------- */

export const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
}

const { idle, pending, resolved, rejected } = STATUS

/* -------------------------------------------------------------------------- */

export default function useFetchData(api) {
  const [status, setStatus] = React.useState(idle)
  const [error, setError] = React.useState(null)
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    setStatus(idle)
    setError(null)

    const fetchData = async () => {
      setStatus(pending)
      try {
        const response = await fetch(api)
        const json = await response.json()
        setData(json)
        setStatus(resolved)
      } catch (error) {
        setError(error)
        setStatus(rejected)
      }
    }

    fetchData(api)
  }, [api])

  return [status, error, data]
}
