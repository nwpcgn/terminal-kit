<script lang="ts">
	import '../scss/dungeon.scss'
	import Loading from '../comp/Loading.svelte'
	import Canvas from './Canvas.svelte'
	import {
		generateDungeon,
		sleep,
		randNum,
		type Room
	} from './dungeonGenerator'

	let frame = $state({ w: 0, h: 0 })
	let cols = $state.raw(60)
	let rows = $state.raw(60)
	let scale = $state.raw(0.98)
	let maxH = $derived(`${Math.floor((frame.h / rows) * scale)}`)
	let maxW = $derived(`${Math.floor((frame.w / cols) * scale)}`)
	let options = $derived({ tileSize: Math.min(maxH, maxW), cols, rows })
	let grid: string[][] | null = $state()
	let hero = $state({ x: 0, y: 0 })
	let heroPos = $derived(
		`${hero.x.toString().padStart(2, '0')}|${hero.y.toString().padStart(2, '0')}`
	)
	let rooms: Room[] | null = $state()
	let freeCells: string[] = $state()

	const getDungeon = async () => {
		const data = generateDungeon(cols, rows)
		grid = data.tileMap
		freeCells = data.freeCells
		rooms = data.rooms
		const randId = randNum(0, rooms.length - 1)
		const { centerX, centerY } = rooms[randId]

		hero = { x: centerX, y: centerY }
		await sleep(1200)
		return data
	}
	const recreate = () => {
		promise = getDungeon()
	}

	let promise = $state(getDungeon())

	function canMove(a: GameObj, b: GameObj) {
		return !(a.x == b.x || a.y == b.y)
	}
	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') movePlayer(0, -1)
		if (e.key === 'ArrowDown') movePlayer(0, 1)
		if (e.key === 'ArrowLeft') movePlayer(-1, 0)
		if (e.key === 'ArrowRight') movePlayer(1, 0)
	}

	function movePlayer(dx: number, dy: number) {
		const newX = hero.x + dx
		const newY = hero.y + dy
		if (grid[newY][newX] === '#') {
			return
		}
		if (grid[newY][newX] === 'x') {
			return
		}
		hero.x = newX
		hero.y = newY
		// console.log({ newX, newY })
	}

	// $inspect(grid)
</script>

<aside class="side-bar">
	<div class="flex w-[280px] flex-col">
		<nav class="grid gap-2 p-4">
			<button onclick={recreate}>Create</button>
			<div class="flex items-center justify-between gap-2">
				<span>Hero: </span>
				<span>{heroPos}</span>
			</div>
		</nav>
	</div>
</aside>
<article class="article">
	<section
		class="nwp page center"
		bind:clientWidth={frame.w}
		bind:clientHeight={frame.h}>
		{#await promise}
			<Loading></Loading>
		{:then value}
			<Canvas {value} {hero} {...options} tileSize={40}></Canvas>
		{/await}
	</section>
</article>

<svelte:window onkeydown={handleKey} />
