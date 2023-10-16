<script>import { Icon } from "@cluue/icons";
import { generateClassNames } from "@cluue/utils";
let className = "";
export { className as class };
export let icon;
</script>

<div class={generateClassNames(['ButtonIcon', className])}>
	<Icon width={24} {icon} {...$$restProps}/>
</div>

<style>.ClueButtonIcon {
  --clue-icon-color: currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ClueButtonIcon :global(.ClueIcon) {
  transition-property: none;
  width: 100%;
  height: 100%;
}</style>