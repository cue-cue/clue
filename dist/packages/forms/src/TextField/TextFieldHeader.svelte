<script>import { generateClassNames } from "@cluue/utils";
let className = "";
export { className as class };
</script>

<div class={generateClassNames(['TextFieldHeader', className])}>
	<slot></slot>
</div>

<style>.ClueTextFieldHeader {
  min-height: 18px;
  display: flex;
  align-items: center;
}
.ClueTextFieldHeader :global(.ClueTextFieldHint) {
  margin-left: auto;
}</style>