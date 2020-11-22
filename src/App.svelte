<script>
	import Header from './components/Header.svelte'
	import Sales from './components/Sales.svelte'
	import SystemStatus from './components/SystemStatus.svelte'
	import TopSellers from './components/TopSellers.svelte'
	import Orders from './components/Orders.svelte'
	
	
</script>

<Header />
<main>
	<Sales grid="sales"/>
	<SystemStatus grid="system" />
	<TopSellers grid="topSellers" />
	<Orders grid="orders" />
</main>

<style>

	main {
		/* text-align: center; */
		padding: 1em;
		max-width: 90vw;
		margin: 0 auto;
		display: grid;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: auto;
			grid-template-areas: 
				"orders sales sales topSellers"
				"orders sales sales system"
			;
			gap: 2rem;
		}
	}
</style>