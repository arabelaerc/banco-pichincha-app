import style from'./style.module.css'

export function Header() {

	return (
		<header className={style.header}>
			<div className='container'>
				<img src='/images/logo-bp.svg' alt='Banco Pichincha logo'/>
			</div>
		</header>
	)
}
