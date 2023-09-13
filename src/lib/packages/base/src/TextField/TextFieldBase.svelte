<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import Input from '../Input/Input.svelte';
	import type { ComponentProps } from 'svelte';

	interface $$Props extends ComponentProps<Input> {
		class?:string
	}
	
	let className = ''
	export { className as class }
	
</script>

<div class={generateClassNames(['TextFieldBase', className])}>
	<Input {...$$restProps}/>
</div>

<style lang='sass'>
	.ClueTextFieldBase
</style>