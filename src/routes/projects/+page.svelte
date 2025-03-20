<script>
    import projects from "$lib/projects.json";
    import Project from "$lib/Project.svelte";
</script>

<svelte:head>
  <title>Projetos</title>
</svelte:head>

<div class="content">
    <h2>Projetos</h2>

    <p>Meus { projects.length } projetos:</p>

    <div class="projects">
        {#each projects as p}
        <Project data={p} hLevel="2" />
        {/each}
    </div>
</div>