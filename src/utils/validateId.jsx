import CONSTANTS from '../constants'

export const validateId = async (id) => {
  const { METHOD_GET, BASE_URL_API, AUTHOR_ID } = CONSTANTS
  
  fetch(`${BASE_URL_API}/verification/?id=${id}`, {
    method: METHOD_GET,
    headers: {
      authorId: AUTHOR_ID,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then((response) => response.json())
  .then((responseData) => {
    if (responseData) {
      localStorage.setItem('DUPLICATE_ID', responseData);
    }
  })
  .catch(error => console.warn(error));
}