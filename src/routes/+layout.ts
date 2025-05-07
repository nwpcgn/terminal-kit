import type { LayoutLoad } from './$types'
import { nav } from '$lib'

export const load = (async () => {
	return {
		name: 'Nwp-Terminal',
		nav
	}
}) satisfies LayoutLoad
