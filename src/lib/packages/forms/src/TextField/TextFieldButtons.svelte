<script lang='ts'>
	import {generateClassNames} from '@clue/utils'

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }
	
</script>

<div class={generateClassNames(['TextFieldButtons', className])}>
	<slot/>
</div>

<style lang='sass'>
	.ClueTextFieldButtons
		display: flex
		align-items: center
		:global(.ClueTextFieldButton)
			position: relative
			&:not(:last-child)
				margin-right: 24px
				&::after
					opacity: 1
			&::after
				content: ''
				opacity: 0
				pointer-events: none
				width: 1px
				height: 16px
				background: var(--clue-color-border)
				display: block
				position: absolute
				right: -12px
				top: 50%
				transform: translateY(-50%)
				transition: var(--clue-transition)
				transition-property: opacity
</style>