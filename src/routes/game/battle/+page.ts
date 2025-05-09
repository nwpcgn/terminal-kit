import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Battle'
	}
}) satisfies PageLoad
