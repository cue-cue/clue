<script>import { generateClassNames } from "@cluue/utils";
import { Hint } from "@cluue/base";
let className = "";
export { className as class };
</script>

<Hint class={generateClassNames(['TextFieldHint', className])}><slot/></Hint>