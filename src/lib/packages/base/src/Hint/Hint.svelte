<script lang='ts'>
	import {generateClassNames} from '@cluue/utils'
	import {Icon} from '@cluue/icons'
	import questionCircle from '@cluue/icons/line/question-circle.svg?clue'

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }

	let slotContent:string | undefined = undefined
	
</script>

<div
	role='button'
	class={generateClassNames(['Hint', className])}
	title={slotContent}
>
	<Icon icon={questionCircle} width={16}/>
	<span contenteditable="true" bind:textContent={slotContent}>
		<slot/>
	</span>
</div>

<style lang='sass'>
	.ClueHint
		--clue-icon-color: var(--clue-color-gray-200)
		cursor: pointer
		&:hover
			--clue-icon-color: var(--clue-color-gray-400)
		span
			display: none
</style>