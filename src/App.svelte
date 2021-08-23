<script>
  import Progress from "./screens/Progress.svelte";
  import Level from "./screens/Level.svelte";

  import { currentLevel, levelUnlocked, dayLastCompleted } from "./store.js";
  import { dayOfYear } from "./time";

  if ($dayLastCompleted && dayOfYear() > $dayLastCompleted) {
    $levelUnlocked++;
  }
</script>

{#if $currentLevel === 0}
  <Progress />
{:else}
  <Level />
{/if}
