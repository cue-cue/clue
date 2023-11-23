<script lang="ts">
	import { generateClassNames } from '@cluue/utils'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<span class={generateClassNames(['TextFieldValue', className])}>
	<slot />
</span>

<style lang="sass">
	.ClueTextFieldValue
		overflow: hidden
		white-space: nowrap
</style>
