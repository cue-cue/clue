<script>import { generateClassNames } from "@cluue/utils";
let className = "";
export { className as class };
</script>

<div class={generateClassNames(['TextFieldFooter', className])}>
	<slot/>
</div>

<style>.ClueTextFieldFooter {
  display: flex;
  align-items: center;
  padding: 0 16px;
}</style>