<script>
  import LevelMenu from "../components/LevelMenu.svelte";

  import { levelCompleted, levelUnlocked, dayLastCompleted } from "../store.js";
  import { hoursTillNextDay, dayOfYear } from "../time";

  function skipDay() {
    if ($levelUnlocked < 30) {
      $levelUnlocked++;
      $dayLastCompleted = dayOfYear();
    }
  }
</script>

<header>
  <h1>Vooruitgang</h1>
</header>
<main>
  <LevelMenu />
</main>
<footer>
  <p>{$levelCompleted}/30</p>
  {#if $levelCompleted === 30}
    <p>Je hebt alle levels gehaald!</p>
  {:else if $levelCompleted === $levelUnlocked && $levelUnlocked !== 30}
    <p>Volgend level over: {hoursTillNextDay()}u</p>
    <button class="skip" on:click={() => skipDay()}>Naar volgende dag</button>
  {/if}
</footer>

<style>
  button.skip {
    background-color: transparent;
    border: none;
    color: inherit;
    text-decoration: underline;
    cursor: pointer;
    font-size: 1.4rem;
    opacity: 0.7;
  }
</style>
