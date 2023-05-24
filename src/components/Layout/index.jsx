import LayersProvider from '../../context/layers/LayersProvider'
import { Header } from '../Header'
import { Layers } from '../Layers'

export function Layout(props) {
	const {
		children
	} = props

	return (
		<LayersProvider>
			<Header/>
			<main>
				{children}
			</main>
			<Layers/>
		</LayersProvider>
	)
}
