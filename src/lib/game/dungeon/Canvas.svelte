<script lang="ts">
	import GridTile from './canvas/GridTile.svelte'
	import HeroTile from './canvas/HeroTile.svelte'
	import { Canvas, Layer } from 'svelte-canvas'
	import { Spring } from 'svelte/motion'
	let { value, rows, cols, hero, tileSize = 40 } = $props()

	const cameraWidth = 18
	const cameraHeight = 18

	let cameraX = $state(Math.max(0, hero.x - Math.floor(cameraWidth / 2)))
	let cameraY = $state(Math.max(0, hero.y - Math.floor(cameraHeight / 2)))
	cameraX = Math.min(cameraX, cols - cameraWidth)
	cameraY = Math.min(cameraY, rows - cameraHeight)
	let targetX = $derived(
		Math.max(
			0,
			Math.min(hero.x - Math.floor(cameraWidth / 2), cols - cameraWidth)
		)
	)
	let targetY = $derived(
		Math.max(
			0,
			Math.min(hero.y - Math.floor(cameraHeight / 2), rows - cameraHeight)
		)
	)
	const camera = new Spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 0.5
		}
	)

	$effect(() => {
		camera.target = { x: targetX, y: targetY }
	})

	const tileclick = (e) => {
		console.log(e)
	}
</script>

{#if value?.tileMap}
	<Canvas
		layerEvents
		width={cameraWidth * tileSize}
		height={cameraHeight * tileSize}
		class="border-accent-500 border">
		{#each value.tileMap.slice(Math.floor(camera.target.y), Math.floor(camera.target.y) + cameraHeight) as row, yOffset}
			{#each row.slice(Math.floor(camera.target.x), Math.floor(camera.target.x) + cameraWidth) as col, xOffset}
				{#if col !== '#'}
					<GridTile
						onclick={tileclick}
						x={xOffset}
						y={yOffset}
						{col}
						{tileSize} />
				{/if}
			{/each}
		{/each}
		<HeroTile
			onclick={tileclick}
			hero={{
				x: hero.x - Math.floor(camera.target.x),
				y: hero.y - Math.floor(camera.target.y)
			}}
			color="#450b26"
			col="@"
			{tileSize} />
	</Canvas>
{/if}

<aside class="absolute top-4 left-4">
	{camera.target.x}/{cols} X {camera.target.y}/{rows}
</aside>
