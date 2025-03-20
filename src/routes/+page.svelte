<script>
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
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

<div class = "projects">
    {#each projects.slice(0, 3) as p}
    <Project data={p} hLevel="2" />
    {/each}
</div>