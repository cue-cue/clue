<script>import { generateClassNames } from "@clue/utils";
import { Hint } from "@clue/base";
let className = "";
export { className as class };
</script>

<Hint class={generateClassNames(['TextFieldHint', className])}><slot/></Hint>