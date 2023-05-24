import style from './style.module.css'
import { useGet } from '../../hooks/useGet'
import { useDelete } from '../../hooks/useDelete'
import { useLayerContext } from '../../context/layers/LayersProvider'
import * as TYPE from '../../context/layers/LayersTypes'
import { formatDate } from '../../utils/formatDate'

export function Table() {

	const { isFetching } = useGet()
	const { products, dispatch, keyword } = useLayerContext()

	const headlines = [
		{ id: '1', name: 'Logo' },
		{ id: '2', name: 'Nombre del producto' },
		{ id: '3', name: 'Descripción' },
		{ id: '4', name: 'Fecha de liberación' },
		{ id: '5', name: 'Fecha de reestructuración' },
	]

	return (
		<div className={style.table} role='head-table'>
			<div className={style.headline}>
				{
					headlines.map(headline => (
						<div key={headline.id}>{headline.name}</div>
					))
				}
			</div>
			<div className={style.rows} role='product-row'>
				{
					isFetching && (
						<div className='loading'></div>
					)
				}
				{
					keyword ? (
						<>
							{products.filter(product => product.name.includes(keyword)).map(product => (
								
								<div className={style.row} key={product.id} role='product-list'>
									<div>
										<h6 className='hide-md'>Logo</h6>
										<img src={product.logo}></img>
									</div>
									<div>
										<h6 className='hide-md'>Nombre del Producto</h6>
										<p>{product.name}</p>
									</div>
									<div>
										<h6 className='hide-md'>Descripción</h6>
										<p>{product.description} </p>
									</div>
									<div>
										<h6 className='hide-md'>Fecha de liberación</h6>
										<p>{formatDate(product.date_release)}</p>
									</div>
									<div>
										<h6 className='hide-md'>Fecha de reestructuración</h6>
										<p>{formatDate(product.date_revision)}</p>
									</div>
									<div>
										<img src='/images/dots-vertical.svg' />
										<div className={style.buttons}>
											<button
												onClick={_ => {
													dispatch({
														type: TYPE.TOGGLE_MODAL_REGISTER,
														payload: true
													})
													dispatch({
														type: TYPE.UPDATE_CURRENT_PRODUCT,
														payload: product.id
													})
												}}
											>
												Editar
											</button>
											<button
												onClick={_ => {
													useDelete(product.id)
													dispatch({
														type: TYPE.UPDATE_CURRENT_PRODUCT,
														payload: product.id
													})
													dispatch({
														type: TYPE.DELETE_PRODUCT,
														payload: product.id
													})
												}}
											>
												Eliminar
											</button>
										</div>
									</div>
								</div>
							))}
							<p className={style.results}>{products.filter(product => product.name.includes(keyword)).length} Resultados</p>
						</>
					) : (
						<>
							{products.map((product) => (
								<div className={style.row} key={product.id} role='product-list'>
									<div>
										<h6 className='hide-md'>Logo</h6>
										<img src={product.logo}></img>
									</div>
									<div>
										<h6 className='hide-md'>Nombre del Producto</h6>
										<p>{product.name}</p>
									</div>
									<div>
										<h6 className='hide-md'>Descripción</h6>
										<p>{product.description} </p>
									</div>
									<div>
										<h6 className='hide-md'>Fecha de liberación</h6>
										<p>{formatDate(product.date_release)}</p>
									</div>
									<div>
										<h6 className='hide-md'>Fecha de reestructuración</h6>
										<p>{formatDate(product.date_revision)}</p>
									</div>
									<div>
										<img src='/images/dots-vertical.svg' />
										<div className={style.buttons}>
											<button
												onClick={_ => {
													dispatch({
														type: TYPE.TOGGLE_MODAL_REGISTER,
														payload: true
													})
													dispatch({
														type: TYPE.UPDATE_CURRENT_PRODUCT,
														payload: product.id
													})
												}}
											>
												Editar
											</button>
											<button
												onClick={async _ => {
													await useDelete(product.id)
													dispatch({
														type: TYPE.UPDATE_CURRENT_PRODUCT,
														payload: product.id
													})
													dispatch({
														type: TYPE.DELETE_PRODUCT,
														payload: product.id
													})
												}}
											>
												Eliminar
											</button>
										</div>
									</div>
								</div>
							))}
							<p className={style.results}>{products.length} Resultados</p>
						</>
					)
				}
			</div>
		</div>
	)
}
