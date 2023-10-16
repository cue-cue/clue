<script>import { generateClassNames } from "@cluue/utils";
import { Label } from "../Label/index.js";
import RadioBase from "./RadioBase.svelte";
import { fieldContext } from "../FieldContext/index.js";
import { writable } from "svelte/store";
let className = "";
export { className as class };
export let group = void 0;
export let disabled = void 0;
export let id = void 0;
export let name = void 0;
export let value = void 0;
const fieldContextStore = fieldContext.set(writable({ id, name, disabled }));
$:
  fieldContextStore.set({ id, name, disabled });
</script>

<Label
	class={generateClassNames(['Checkbox', className])}
	slots={{
		label: $$slots.default,
		desc: $$slots.desc
	}}
>
	<RadioBase {disabled} {value} bind:group bind:id {name} {...$$restProps}/>
	<svelte:fragment slot='label' let:component>
		<slot label={component}/>
	</svelte:fragment>
	<svelte:fragment slot='desc'>
		<slot name='desc'/>
	</svelte:fragment>
</Label>