<script lang="ts">
	import { generateClassNames } from '@cluue/utils'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<div class={generateClassNames(['TextFieldFooter', className])}>
	<slot />
</div>

<style lang="sass">
	.ClueTextFieldFooter
		display: flex
		align-items: center
		padding: 0 16px
</style>
