import { Searcher } from '../../components/Searcher'
import { Table } from '../../components/Table'
import { useLayerContext } from '../../context/layers/LayersProvider'
import * as TYPE from '../../context/layers/LayersTypes'
import style from'./style.module.css'

export default function Home () {

	const {dispatch} = useLayerContext()
	
	return (
		<div className={style.main}>
			<div className='container'>
				<div className={style.headline}>
					<Searcher placeholder='Search...'/>
					<button
						className='button'
						role='button'
						onClick={_ => {
							dispatch({
								type: TYPE.TOGGLE_MODAL_REGISTER,
								payload: true
							})
							dispatch({
								type: TYPE.UPDATE_CURRENT_PRODUCT,
								payload: null
							})
						}}
					>
						Agregar
					</button>
				</div>
				<Table/>
			</div>
		</div>
	)
}
