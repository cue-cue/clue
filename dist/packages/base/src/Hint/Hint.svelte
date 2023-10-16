<script>import { generateClassNames } from "@cluue/utils";
import { Icon } from "@cluue/icons";
import questionCircle from "@cluue/icons/line/question-circle.svg";
let className = "";
export { className as class };
let slotContent = void 0;
</script>

<div
	role='button'
	class={generateClassNames(['Hint', className])}
	title={slotContent}
>
	<Icon icon={questionCircle} width={16}/>
	<span contenteditable="true" bind:textContent={slotContent}>
		<slot/>
	</span>
</div>

<style>.ClueHint {
  --clue-icon-color: var(--clue-color-gray-200);
  cursor: pointer;
}
.ClueHint:hover {
  --clue-icon-color: var(--clue-color-gray-400);
}
.ClueHint span {
  display: none;
}</style>