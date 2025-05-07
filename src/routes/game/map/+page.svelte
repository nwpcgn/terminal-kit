<script lang="ts">
	import Map from '$lib/game/map/Map.svelte'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<Map></Map>
