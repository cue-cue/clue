// See https://kit.svelte.dev/docs/types#app

import type { OutclickEvent } from "$lib/packages/utils/src/actions/outclick.ts";

// for information about these interfaces
declare global {
	namespace Vars {
		type Colors = 'secondary' | 'error' | 'accent' | 'disabled'
	}
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	namespace svelteHTML {
		interface HTMLAttributes {
			'on:outclick'?: (event: OutclickEvent) => void;
		}
	}
}

export {};
