import CONSTANTS from '../constants'
import { useEffect, useState } from 'react'
import { useLayerContext } from '../context/layers/LayersProvider'
import * as TYPE from '../context/layers/LayersTypes'

export const useGet = () => {
  
  const [isFetching, setIsFetching] = useState(true)
  const { METHOD_GET, BASE_URL_API, AUTHOR_ID } = CONSTANTS
  const {dispatch} = useLayerContext()

  useEffect(_ => {

    fetch(BASE_URL_API, {
      method: METHOD_GET,
      headers: {
        authorId: AUTHOR_ID,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then( response => response.json())
    .then( data => {
      dispatch({
        type: TYPE.SAVE_PRODUCTS,
        payload: data
      })
      setIsFetching(false)
    })

	}, [])

  return { isFetching }
}