<script lang="ts">
	import { generateClassNames } from '@cluue/utils'

	interface $$Props {
		class?: string
	}

	let className = ''
	export { className as class }
</script>

<div class={generateClassNames(['CalendarPickerContainer', className])}>
	<slot />
</div>

<style lang="sass">
    .ClueCalendarPickerContainer
        padding-left: 16px
        padding-right: 16px
</style>
