<script>import { generateClassNames } from "@cluue/utils";
let className = "";
export { className as class };
</script>

<span class={generateClassNames(['TextFieldValue', className])}>
	<slot></slot>
</span>

<style>.ClueTextFieldValue {
  overflow: hidden;
  white-space: nowrap;
}</style>