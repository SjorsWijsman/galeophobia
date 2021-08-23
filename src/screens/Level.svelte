<script>
  import {
    currentLevel,
    levelCompleted,
    dayLastCompleted,
    records,
  } from "../store.js";
  import { dayOfYear } from "../time.js";
  // States = blurred, visible, result, reward
  const states = ["blurred", "visible", "result", "reward"];
  let state = "blurred";
  let time = 0;

  function back() {
    const stateIndex = states.indexOf(state);
    // Go back to overview
    if (state === "blurred") {
      $currentLevel = 0;
    } else if (state === "result") {
      time = 0;
      state = states[stateIndex - 2];
    } else {
      state = states[stateIndex - 1];
    }
  }

  function next() {
    const stateIndex = states.indexOf(state);
    // Go back to overview
    if (state === "reward") {
      $levelCompleted = $currentLevel;
      $currentLevel = 0;
    } else {
      state = states[stateIndex + 1];
      // Save result
      if (state === "result") {
        if ($currentLevel > $levelCompleted) {
          $dayLastCompleted = dayOfYear();
        }
        if (time > $records[$currentLevel]) {
          $records[$currentLevel] = time;
        }
        console.log("save result");
      }
    }
  }

  function incrementSeconds() {
    if (state === "visible") {
      time += 1;
    }
  }

  const cancel = setInterval(incrementSeconds, 1000);
</script>

<header>
  {#if state === states[0]}
    <button on:click={() => back()}>Overzicht</button>
  {:else}
    <button on:click={() => back()}>Terug</button>
  {/if}
</header>
{#if state === "blurred" || state === "visible"}
  <main>
    <h1>{$currentLevel}</h1>
    <section>
      {#if state === "blurred"}
        <p>
          <span>Niveau {Math.ceil($currentLevel / 5)}</span>
          Record:
          <br />
          {$records[$currentLevel]}s
        </p>
      {/if}
      <img
        class:blurred={state === "blurred"}
        src="./sharks/{$currentLevel}.png"
        alt="Haai"
      />
    </section>
    <p>{time}s</p>
  </main>
{:else if state === "result"}
  <main>
    <h1>Ez pz bbq.</h1>
    <p>
      Je hebt de haai voor {time} seconden bekeken. Goed gedaan! Ik ben trots op
      je :)
    </p>
    <p>Je bent klaar voor vandaag. Morgen is het tijd voor een nieuwe haai!</p>
  </main>
{:else if state === "reward"}
  <main>
    <h1>Je beloning!</h1>
    <section>
      <img class:blurred={state === "blurred"} src="" alt="Haai" />
    </section>
  </main>
{/if}
<footer>
  {#if state === "blurred"}
    <button on:click={() => next()}>Bekijken</button>
  {:else if state === "visible"}
    <button on:click={() => next()}>Genoeg gehad</button>
  {:else if state === "result"}
    <button on:click={() => next()}>Verder</button>
  {:else if state === "reward"}
    <button on:click={() => next()}>Overzicht</button>
  {/if}
</footer>

<style>
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  header {
    display: flex;
    padding-bottom: 1rem;
  }

  header button {
    text-align: center;
    text-shadow: 0 0.2rem 0.7rem rgba(10, 4, 39, 0.123);
  }

  header button::before {
    content: "< ";
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 0.5rem;
    height: 100%;
  }

  main p {
    padding-bottom: 2rem;
  }

  main section {
    margin-top: -8rem;
    margin-bottom: -3.5rem;
    height: 40rem;
    width: 26rem;
    z-index: -1;
    border: 0.3rem solid white;
    overflow: hidden;
    background: linear-gradient(to bottom, #557eed, #2a3d72);
  }

  main section img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 1s;
  }

  main section img.blurred {
    filter: blur(4rem);
  }

  main section p {
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  main p {
    font-size: 1.8rem;
  }

  main p span {
    display: block;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 2rem;
  }

  footer {
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    bottom: 0;
    width: 100%;
    padding-bottom: 2rem;
  }

  footer button {
    background-color: white;
    color: #2a3d72;
    font-size: 1.8rem;
    padding: 1rem;
    width: 100%;
    border-radius: 10rem;
    box-shadow: 0 0.2rem 0.7rem rgba(10, 4, 39, 0.123);
  }
</style>
