<script>
    import { onMount } from "svelte";

    let githubData = null;
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const response = await fetch("https://api.github.com/users/YOUR_USERNAME");
            githubData = await response.json();
        } catch (err) {
            error = err;
        }
        loading = false;
    });

    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
    let profileData = fetch("https://api.github.com/users/gbussds");
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<div class = "container">
    <div class = "intro-text">
        <p>Olá! Me chamo <strong>Guilherme Buss da Silva</strong>. Atualmente, estou estudando <strong>Ciência de Dados e Inteligência Artificial</strong> na <strong>Fundação Getúlio Vargas</strong> do Rio de Janeiro, onde eu moro.</p>
        <ul>
            <li>Ex-Consultor da FGV Jr.</li>
            <li>Presidente da Altair Game Studio.</li>
        </ul>
    </div>
    <div class = "intro-image">
        <img class="imagem" src="images/eu.jpg" alt="Foto minha.">
    </div>
</div>

{#if loading}
    <p>Loading...</p>
{:else if error}
  <p class="error">Something went wrong: {error.message}</p>
{:else}
    <section>
      <h2>My Github Stats</h2>
      <dl>
        <dt>Followers</dt>
        <dd>{githubData.followers}</dd>
        <dt>Following</dt>
        <dd>{githubData.following}</dd>
        <dt>Public Repos</dt>
        <dd>{githubData.public_repos}</dd>
      </dl>
    </section>
{/if}

<div class = "projects">
    {#each projects.slice(0, 3) as p}
    <Project data={p} hLevel="2" />
    {/each}
</div>
