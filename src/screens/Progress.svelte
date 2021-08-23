<script>
  import LevelMenu from "../components/LevelMenu.svelte";

  import { levelCompleted, levelUnlocked } from "../store.js";
  import { hoursTillNextDay } from "../time";
</script>

<header>
  <h1>Vooruitgang</h1>
</header>
<main>
  <LevelMenu />
</main>
<footer>
  <p>{$levelCompleted}/30</p>
  {#if $levelCompleted === $levelUnlocked}
    <p>Volgend level over: {hoursTillNextDay()}u</p>
  {/if}
</footer>
