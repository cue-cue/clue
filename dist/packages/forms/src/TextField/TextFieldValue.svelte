<script>import { generateClassNames } from "@clue/utils";
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