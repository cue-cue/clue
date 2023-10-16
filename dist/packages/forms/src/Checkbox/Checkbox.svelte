<script>import { generateClassNames } from "@cluue/utils";
import { Label } from "../Label/index.js";
import CheckboxBase from "./CheckboxBase.svelte";
import { fieldContext } from "../FieldContext/index.js";
import { writable } from "svelte/store";
let className = "";
export { className as class };
export let group = [];
export let checked = void 0;
export let disabled = void 0;
export let id = void 0;
export let name = void 0;
export let value = "";
export let manual = void 0;
const fieldContextStore = fieldContext.set(writable({ id, name, disabled, manual }));
$:
  fieldContextStore.set({ id, name, disabled, manual });
</script>

<Label
	class={generateClassNames(['Checkbox', className])}
	slots={{
		label: $$slots.default,
		desc: $$slots.desc
	}}
>
	<CheckboxBase {value} {disabled} bind:checked bind:group bind:id {name} {...$$restProps}/>
	<svelte:fragment slot='label' let:Component>
		<slot Label={Component}/>
	</svelte:fragment>
	<svelte:fragment slot='desc'>
		<slot name='desc'/>
	</svelte:fragment>
</Label>