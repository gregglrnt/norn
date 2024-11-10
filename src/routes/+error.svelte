<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="error-page">
	<h1>Something went wrong... 🥺</h1>
	<p>{$page.error?.message}</p>
</div>
