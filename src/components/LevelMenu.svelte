<script>
  import { levelCompleted, levelUnlocked, currentLevel } from "../store.js";
</script>

<ul>
  {#each Array(30) as _, i}
    <li>
      <button
        class:completed={i + 1 <= $levelCompleted}
        disabled={i + 1 > $levelUnlocked}
        on:click={() => ($currentLevel = i + 1)}
      >
        {i + 1}
      </button>
    </li>
  {/each}
</ul>

<style>
  ul {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
    padding-bottom: 3rem;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    padding-left: 0;
    width: 100%;
    height: 100%;
  }

  button {
    width: 4.2rem;
    height: 4.2rem;
    max-width: 100%;
    max-height: 100%;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    background-blend-mode: overlay;
    box-shadow: 0 0.2rem 0.7rem rgba(10, 4, 39, 0.151),
      rgba(255, 255, 255, 0.568) -0.2rem 0.2rem 0.4rem inset;
    cursor: pointer;
    font-size: 1.8rem;
  }

  button.completed {
    opacity: 1;
    border: 0.25rem solid #d6ff1e;
  }

  button.completed::after {
    position: absolute;
    transform: translate(-62%, -25%);
    content: "";
    width: 4.2rem;
    height: 4.2rem;
    max-width: 100%;
    max-height: 100%;
    border: none;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    background-blend-mode: overlay;
    box-shadow: 0 0.2rem 0.7rem rgba(10, 4, 39, 0.151),
      rgba(255, 255, 255, 0.568) -0.2rem 0.2rem 0.4rem inset;
  }

  button:disabled {
    opacity: 0.2;
    cursor: default;
  }
</style>
