<script lang="ts">
	import { generateClassNames } from '@cluue/utils'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<div class={generateClassNames(['TextFieldHeader', className])}>
	<slot />
</div>

<style lang="sass">
	.ClueTextFieldHeader
		min-height: 18px
		display: flex
		align-items: center
		:global(.ClueTextFieldHint)
			margin-left: auto
</style>
