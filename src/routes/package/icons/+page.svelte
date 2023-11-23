<script lang="ts">
	import { navigating } from '$app/stores'
</script>

<h2 style="text-align: center;">
	Go to {$navigating?.to?.params?.group ? `${$navigating?.to?.params?.group}...` : ''}
</h2>
