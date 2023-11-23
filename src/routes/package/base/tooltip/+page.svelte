<script lang="ts">
	import icon from '@cluue/icons/line/eye.svg?clue'
	import { Icon } from '@cluue/icons'
	import { Tooltip } from '@cluue/base'
</script>

<h2>Tooltip</h2>
<ul>
	<li>
		<h3>Base</h3>
		<Tooltip>
			<Icon {icon} />
			<svelte:fragment slot="content">Tooltip label</svelte:fragment>
		</Tooltip>
	</li>
</ul>
