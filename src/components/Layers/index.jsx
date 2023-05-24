import { Modal } from '../Modal'
import { Register } from '../../layers/Register'
import { useLayerContext } from '../../context/layers/LayersProvider'
import * as TYPE from '../../context/layers/LayersTypes'
import style from './style.module.css'


export function Layers() {
	const {modalRegister} = useLayerContext()

	return (
		<section className={style.layer}>
			{ modalRegister && <Modal component={Register} dispatchType={TYPE.TOGGLE_MODAL_REGISTER}/>}
		</section>
	)
}
