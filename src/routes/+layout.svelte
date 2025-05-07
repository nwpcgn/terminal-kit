<script lang="ts">
	import AppBar from '$lib/components/AppBar.svelte'
	import { Sprites } from '$lib'
	import '../app.css'
	import '../assets/terminal/index.scss'

	let { children } = $props()
</script>

<AppBar></AppBar>
<main class="main-app">
	{@render children()}
</main>
<Sprites></Sprites>
