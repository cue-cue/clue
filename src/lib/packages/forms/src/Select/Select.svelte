<script lang='ts'>
	import {generateClassNames, outclick, type OutclickEvent} from '@clue/utils'
	import SelectBase from './SelectBase.svelte'
	import type { ComponentEvents } from 'svelte'

	interface $$Props {
		class?:string
		opened?:boolean
	}
	
	let className = ''
	export { className as class }
	export let opened:$$Props['opened'] = false

	const setOpened = (_opened:typeof opened) => {
		opened = _opened
	}

	export const open = () => {
		setOpened(true)
	}

	export const close = () => {
		setOpened(false)
	}

	export const toggle = () => {
		setOpened(!opened)
	}

	const handler = {
		outclick(e:OutclickEvent) {
			close()
		}
	}
</script>
{opened}
<div
	class={generateClassNames(['Select', className])}
	use:outclick
	on:outclick={handler.outclick}
>
	<SelectBase bind:opened />
</div>

<style lang='sass'>
	.ClueSelect
</style>