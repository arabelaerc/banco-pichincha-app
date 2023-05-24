import CONSTANTS from '../constants'

export const usePost = async (data) => {
  
  const { METHOD_POST, BASE_URL_API, AUTHOR_ID } = CONSTANTS
  
  const response = await fetch(BASE_URL_API, {
    method: METHOD_POST,
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