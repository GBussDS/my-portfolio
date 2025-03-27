<script>
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

{#await fetch("https://api.github.com/users/gbussds")}
  <p>Loading...</p>
{:then response}
  {#await response.json()}
    <p>Decoding...</p>
  {:then data} 
    <section>
      <h2>My Github Stats</h2>
      <dl>
        <dt>Followers</dt>
        <dd>{data.followers}</dd>
        <dt>Following</dt>
        <dd>{data.following}</dd>
        <dt>Public Repos</dt>
        <dd>{data.public_repos}</dd>
      </dl>
    </section>
  {:catch error}
    <p class="error">Something went wrong: {error.message}</p>
  {/await}
  {:catch error}
    <p class="error">Something went wrong: {error.message}</p>
{/await}

<div class = "projects">
    {#each projects.slice(0, 3) as p}
    <Project data={p} hLevel="2" />
    {/each}
</div>
