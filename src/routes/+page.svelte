<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()
</script>

<article class="article">
	<section class="nwp page">
		<div class="content content-1">
			<h1>{data.name}</h1>
			<h2>{data.title}</h2>
			<nav class="flex gap-2">
				{#each data.nav as { name, href, icon }}
					<a href="#{href}">{name}</a>
				{/each}
			</nav>
		</div>
	</section>
</article>