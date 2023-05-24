import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { Input } from '../../components/Input'
import { usePost } from '../../hooks/usePost'
import { usePut } from '../../hooks/usePut'
import style from './style.module.css'
import { useLayerContext } from '../../context/layers/LayersProvider'
import * as TYPE from '../../context/layers/LayersTypes'
import { validateId } from '../../utils/validateId'
import { useState } from 'react';
import { formatDate } from '../../utils/formatDate'

export function Register() {

	const initialValues = {
		id: '',
		name: '',
		description: '',
		logo: '',
		date_release: '',
		date_revision: ''
	}

	const validationSchema = Yup.object({
		id: Yup.string()
			.required('')
			.min(1, 'Debe ser un mínimo de 3 caracteres')
			.max(10, 'Debe ser menor a 10 caracteres.'),
		name: Yup.string()
			.required('')
			.min(1, 'Debe ser un mínimo de 5 caracteres')
			.max(100, 'Debe ser menor a 100 caracteres.'),
		description: Yup.string()
			.required('')
			.min(1, 'Debe ser un mínimo de 10 caracteres')
			.max(200, 'Debe ser menor a 200 caracteres.'),
		logo: Yup.string()
			.required('')
			.min(3, 'Debe ser un mínimo de 3 caracteres'),
		date_release: Yup.string()
			.required('')
			.min(10, 'Debe ser un mínimo de 10 caracteres'),
	})

	const {dispatch, products, currentProductId} = useLayerContext()
	const currentProduct = products.filter(product => product.id === currentProductId)[0]
	const DUPLICATE_ID = localStorage.getItem('DUPLICATE_ID')

	const [inputDateLib, setInputDateLib] = useState('')
	const [inputDateRel, setInputDateRel] = useState('')
	
	const onSubmit = async (values) => {
		
		if (currentProductId) {
			const product = await usePut(values)
			dispatch({
				type: TYPE.UPDATE_PRODUCT,
				payload: product
			})
			dispatch({
				type: TYPE.TOGGLE_MODAL_REGISTER,
				payload: false
			})

		} else {
			const product = await usePost(values)
			dispatch({
				type: TYPE.ADD_PRODUCT,
				payload: product
			})
			dispatch({
				type: TYPE.TOGGLE_MODAL_REGISTER,
				payload: false
			})
		}
	}

	function inputIdActions(value) {
		validateId(value)

		if (value === '') {
			localStorage.removeItem('DUPLICATE_ID')
		} 
	}

	function handleChange(date) {
		const dateFormat = new Date(date).getDate() < 10 ? `0${new Date(date).getDate()}` : `${new Date(date).getDate() + 1}`;
		const monthFormat = new Date(date).getMonth() < 9 ? `0${new Date(date).getMonth() + 1}` : `${new Date(date).getMonth() + 1}`;
		const yearFormat = new Date(date).getFullYear() + 1
		setInputDateRel(date);
		setInputDateLib(date)
	}
	

	return (
		<>
			<h2>{ currentProduct ? 'Editar Producto' : 'Formulario de registro'}</h2>
			<Formik
				initialValues={currentProduct || initialValues}
				validationSchema={validationSchema}
				validateOnChange={true}
				onSubmit={onSubmit}
			>
				{
					formik => {
						return (
							<Form
								autoComplete='off'
								className={style.form}
							>
								<div className={`${style.input_d} input-double`}>
									{currentProductId ? (
											<Input
												type='text'
												name='id'
												label='ID'
												disabled={true}
												formik={formik}
											/>
										) : (
											<>
												<Input
													type='text'
													name='id'
													label='ID'
													errorforid={DUPLICATE_ID}
													formik={formik}
													onKeyPress ={event => {
														inputIdActions(event.target.value)
													}}
												/>
											</>
										)
									}

									<Input
										type='text'
										name='name'
										label='Nombre'
										formik={formik}	
									/>
								</div>

								<div className={`${style.input_d} input-double`}>
									<Input
										type='text'
										name='description'
										label='Descripción'
										formik={formik}
									/>

									<Input
										type='text'
										name='logo'
										label='Logo'
										formik={formik}
									/>
								</div>

								<div className={`${style.input_d} input-double`}>

									{ !currentProductId ? (
										<>
											<Input
												type='text'
												name='date_release'
												label='Fecha de liberación'
												formik={formik}
												// value={inputDateLib}
												// onKeyPress={event => {
												// 	handleChange(event.target.value)
												// }}
											/>
											<Input
												type='text'
												name='date_revision'
												label='Fecha Revisión'
												// value={inputDateRel}
												// disabled={!currentProductId && true}
												formik={formik}
											/>
										</>
										) : (
											<>
												<Input
													type='text'
													name='date_release'
													label='Fecha de liberación'
													formik={formik}
												/>
												<Input
													type='text'
													name='date_revision'
													label='Fecha Revisión'
													formik={formik}
												/>
											</>
									)}
								</div>

								<div className={style.buttons}>
									{ !currentProductId &&
										<button
												type='reset'
												className='button button--loader'
												onClick={ e => formik.resetForm()}
											>
												<span>Reiniciar</span>
										</button>
									}

									<button
										type='submit'
										className={`button button--loader ${(!(formik.isValid && formik.dirty)) ? 'js--disabled' : ''}`}
										disabled={!(formik.isValid && formik.dirty)}
									>
										<span>Enviar</span>
									</button>
								</div>
							</Form>
						)
					}
				}
			</Formik>
		</>
	)
}
