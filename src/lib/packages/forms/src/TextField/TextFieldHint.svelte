<script lang='ts'>
	import {generateClassNames} from '@cluue/utils'
	import { Hint } from '@cluue/base';

	interface $$Props {
		class?:string
	}
	
	let className = ''
	export { className as class }
	
</script>

<Hint class={generateClassNames(['TextFieldHint', className])}><slot/></Hint>