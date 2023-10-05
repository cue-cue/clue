<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import { Hint } from '@clue/base';

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }
	
</script>

<Hint class={generateClassNames(['TextFieldHint', className])}><slot/></Hint>