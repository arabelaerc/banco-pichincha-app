import { useLayerContext } from '../../context/layers/LayersProvider'
import style from './style.module.css'

export function Modal(props) {

	const {
		dispatchType,
		component: Component
	} = props

	const closeModal = _ => {
		dispatch({
			type: dispatchType,
			payload: false
		})
	}

	const {dispatch} = useLayerContext()

	return (
		<article
			className={style.modal}
			// onClick={closeModal}
		>
			<div
				className={style.modalWrap}
				onClick={e => e.stopPropagation()}
			>
				<i
					className={style.modalButtonClose}
					onClick={closeModal}
				>
					<img src='/images/close-circle.svg'/>
				</i>
				<Component/>
			</div>
		</article>
	)
}
