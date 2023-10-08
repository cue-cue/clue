<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import {Icon} from '@clue/icons'
	import questionCircle from '@clue/icons/line/question-circle.svg'

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
			--clue-icon-color: #333
		span
			display: none
</style>