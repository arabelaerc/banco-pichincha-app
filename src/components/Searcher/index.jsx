import { useLayerContext } from '../../context/layers/LayersProvider'
import * as TYPE from '../../context/layers/LayersTypes'
import style from'./style.module.css'

export function Searcher({placeholder}) {

	const { dispatch } = useLayerContext()

	function setKeyword(value) {
		dispatch({
			type: TYPE.SET_KEYWORD,
			payload: value
		})
	}

	return (
		<input 
			id='input-search'
			data-testid='input-search'
			type='search' 
			role='search' 
			placeholder={placeholder} 
			className={style.searcher}
			onChange={event => {
				setKeyword(event.target.value)
			}}
		>
		</input>
	)
}
