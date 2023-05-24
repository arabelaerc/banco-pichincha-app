import CONSTANTS from '../constants'

export const usePut = async (data) => {
  
  const { METHOD_PUT, BASE_URL_API, AUTHOR_ID } = CONSTANTS
  
  const response = await fetch(BASE_URL_API, {
    method: METHOD_PUT,
    headers: {
      authorId: AUTHOR_ID,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data)
  })

  const product = await response.json()
  
  return product
}