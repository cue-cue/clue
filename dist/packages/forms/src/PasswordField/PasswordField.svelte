<script>import { generateClassNames } from "@clue/utils";
import { TextFieldButton, TextFieldBase, TextField } from "../index.js";
import icon from "@clue/icons/line/eye.svg";
import iconClosed from "@clue/icons/line/eye-closed.svg";
let className = "";
export { className as class };
export let visible = false;
export const show = () => {
  visible = true;
};
export const hide = () => {
  visible = false;
};
export const toggle = () => {
  visible = !visible;
};
const handler = {
  changeClick() {
    toggle();
  }
};
</script>

<TextField class={generateClassNames(['PasswordField', className])}>
	<svelte:fragment slot='base'>
		<TextFieldBase type={visible ? 'text' : 'password'} {...$$restProps}>
			<svelte:fragment slot='buttons'>
				<TextFieldButton
					icon={visible ? icon : iconClosed}
					on:click={handler.changeClick}
				/>
			</svelte:fragment>
		</TextFieldBase>
	</svelte:fragment>
</TextField>