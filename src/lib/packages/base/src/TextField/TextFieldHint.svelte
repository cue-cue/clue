<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import {Icon} from '@clue/icons'
	import questionCircle from '@clue/icons/line/question-circle.svg'
	import { onMount } from 'svelte';

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }

	let hintNode:HTMLDivElement

	let title = ''

	onMount(() => {
		title = hintNode.innerText
		hintNode.remove()
	})
	
</script>

<div role='button' class={generateClassNames(['TextFieldHint', className])} {title}>
	<Icon icon={questionCircle} width={16}/>
	<div bind:this={hintNode}>
		<slot/>
	</div>
</div>


<style lang='sass'>
	.ClueTextFieldHint
		--clue-icon-color: #B0B2C0
		cursor: pointer
		&:hover
			--clue-icon-color: #333
		div
			display: none
</style>