import { useEffect, useState } from 'react'

export const Input = props => {
	const {
		label,
		name,
		type,
		maxLength,
		disabled,
		formik,
		disable,
		defaultData,
		errorforid,
		...rest
	} = props

	const { errors, touched } = formik

	const [onFocus, setOnFocus] = useState(false)

	useEffect(_ => {
		if (defaultData) setOnFocus(true)
	}, [defaultData])

	return (
		<div className='input-wrap'>
				<label>{label}</label>
			<div className={`input ${(errors[name] && touched[name] ) ? 'js--error' : ''} ${onFocus ? 'js--focus' : ''} ${disabled ? 'js--readonly' : ''}`}>
				<input
					id={name}
					name={name}
					type={type}
					errorforid={errorforid}
					maxLength={maxLength}
					autoComplete='off'
					readOnly={disabled}
					onFocus={(e) => {
						setOnFocus(true)
					}}
					onBlur={(e) => {
						if (!e.target.value) setOnFocus(false)
						formik.setFieldTouched(name, true)
					}}
					onChange={formik.handleChange}
					value={formik.values[name]}
					{...rest}
				/>
				{errorforid && <p className='error'>ID no válido</p>}
			</div>
		</div>
	)
}

Input.defaultProps = {
	type: 'text'
}
