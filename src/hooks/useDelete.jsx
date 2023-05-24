import CONSTANTS from '../constants'

export const useDelete = (id) => {
  const { METHOD_DELETE, BASE_URL_API, AUTHOR_ID } = CONSTANTS;

  fetch(`${BASE_URL_API}/?id=${id}`, {
    method: METHOD_DELETE,
    headers: {
      authorId: AUTHOR_ID,
      'Content-Type': 'text/plain;charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  })
  .then( response => response.text())
}