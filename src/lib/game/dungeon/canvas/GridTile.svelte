<script lang="ts">
	import { Layer } from 'svelte-canvas'
	const color = {
		'1': '#fcf2fb',
		'2': '#fadef5',
		'3': '#f7cbee',
		'4': '#f2a7e1',
		'5': '#ee82cf',
		'6': '#d66bb4',
		'7': '#b3498c',
		'8': '#8f2f65',
		'9': '#6b1b44'
	}
	let { x, y, col, onclick, tileSize } = $props()

	let _x = x * tileSize
	let _y = y * tileSize

	const atlas = {
		'#': '#1a170f',
		'.': color['4'],
		'*': color['4'],
		D: color['5']
	}

	const onDown = (e) => {
		onclick?.({ xTile: x, yTile: y, col, ...e })
	}

	const render = ({ context }) => {
		context.fillStyle = atlas[col]
		context.fillRect(_x, _y, tileSize, tileSize)
		if (col === '*') {
			context.font = `40px sans-serif`
			context.textAlign = 'center'
			context.textBaseline = 'middle'
			context.fillStyle = color['8']
			context.fillText('*', _x + tileSize / 2, _y + tileSize / 2)
		}
	}
</script>

<Layer onmousedown={onDown} {render} />
