<script>
  import Progress from "./screens/Progress.svelte";
  import Level from "./screens/Level.svelte";
  import {
    currentLevel,
    levelUnlocked,
    dayLastCompleted,
    records,
  } from "./store.js";
  import { dayOfYear } from "./time";

  if ($dayLastCompleted && dayOfYear() > $dayLastCompleted) {
    $levelUnlocked++;
  }

  for (let index = 1; index <= 30; index++) {
    if (!$records[index]) $records[index] = 0;
  }
</script>

{#if $currentLevel === 0}
  <Progress />
{:else}
  <Level />
{/if}
