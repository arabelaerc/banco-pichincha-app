import { createContext, useContext, useReducer } from 'react'
import reducer from './LayersReducer'

const initialState = {
	currentProductId: null,
	modalRegister: false,
	products: [],
	keyword: '',
	verifyIdCreated: ''
}

const LayerContext = createContext()

function LayersProvider({children}) {

	const [state, dispatch] = useReducer(reducer, initialState)

	return (
		<LayerContext.Provider value={{
			currentProductId: state.currentProductId,
			verifyIdCreated: state.verifyIdCreated,
			modalRegister: state.modalRegister,
			products: state.products,
			keyword: state.keyword,
			dispatch
		}}>
			{children}
		</LayerContext.Provider>
	)
}

function useLayerContext() {
	return useContext(LayerContext)
}

export default LayersProvider
export {
	useLayerContext
}
