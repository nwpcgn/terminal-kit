import type { PageLoad } from './$types'

export const load = (async () => {
	return {
		title: 'Map'
	}
}) satisfies PageLoad
