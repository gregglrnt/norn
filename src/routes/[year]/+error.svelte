<script lang="ts">
	import { page } from '$app/stores'
</script>

<h1>Some error here :)</h1>
<p>{$page.error?.message}</p>
