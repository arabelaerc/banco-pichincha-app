import * as TYPE from './LayersTypes'

export default function reducer (state, action) {
	const {type, payload} = action

	switch (type) {
		case TYPE.TOGGLE_MODAL_REGISTER:
			return {
				...state,
				modalRegister: payload
			}
		case TYPE.UPDATE_CURRENT_PRODUCT:
			return {
				...state,
				currentProductId: payload
			}
		case TYPE.SAVE_PRODUCTS:
			return {
				...state,
				products: payload
			}
		case TYPE.ADD_PRODUCT:
			return {
				...state,
				products: [
					...state.products,
					payload
				]
			}
		case TYPE.DELETE_PRODUCT: {
			const indexTodelete = state.products.findIndex(product => product.id === payload)
			state.products.splice(indexTodelete, 1)
			return {
				...state,
				products: state.products
			}
		}
		case TYPE.UPDATE_PRODUCT: {
			const newProducts = state.products.map(product => {
				if(product.id === state.currentProductId) {
					return {
						id: product.id,
						...payload
					}
				} else {
					return product
				}
			})
			return {
				...state,
				products: newProducts
			}
		}
		case TYPE.SET_KEYWORD:
			return {
				...state,
				keyword: payload
			}
		case TYPE.VERIFY_ID_PRODUCT:
			return {
				...state,
				products: payload
			}			
		default:
			return state
	}
}
