<script lang='ts'>
	import {generateClassNames} from '@clue/utils'
	import { onMount, tick } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends Omit<HTMLInputAttributes, 'type' | 'value'> {
		class?:string
		type?:Extract<HTMLInputAttributes['type'], 'checkbox' | 'radio'>
		group:(string | number)[]
		value:string
	}
	
	let className = ''
	export { className as class }

	export let checked:$$Props['checked'] = false
	export let group:$$Props['group'] = []
	export let value:$$Props['value'] = ''

	function init(_: HTMLElement, _group: (string | number)[]) {
		if (checked === undefined) checked = _group.includes(value);
		onChange();

		return {
		update(_group: (string | number)[]) {
			checked = _group.includes(value);
		}
		};
	}

  function onChange() {
    // There's a bug in Svelte and bind:group is not working with wrapped checkbox
    // This workaround is taken from:
    // https://svelte.dev/repl/de117399559f4e7e9e14e2fc9ab243cc?version=3.12.1
    const index = group.indexOf(value);

    if (checked === undefined) checked = index >= 0;

    if (checked) {
      if (index < 0) {
        group.push(value);
        group = group;
      }
    } else {
      if (index >= 0) {
        group.splice(index, 1);
        group = group;
      }
    }
  }
	
</script>
<span style="position: absolute; transform: translateY(-40px)">
	{group}
</span>
<input
	class={generateClassNames(['InputCheckbox', className])}
	use:init={group}
	type="checkbox"
	bind:checked 
	on:keyup 
	on:keydown 
	on:keypress 
	on:focus 
	on:blur 
	on:click 
	on:mouseover 
	on:mouseenter 
	on:mouseleave 
	on:paste 
	on:change={onChange} 
	on:change 
	{value}
	{...$$restProps}
/>