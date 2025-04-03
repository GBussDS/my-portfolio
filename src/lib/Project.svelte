<script>
    export let data = {};
    export let hLevel = 2;
</script>

<!-- <Project data={project} /> -->



<div class="projects">
    <article>
        <svelte:element this={"h" + hLevel}>{data.title}</svelte:element>
        <img src={data.image} alt="" />
        <p>{data.description}</p>
        <h3>{data.year}</h3>
    </article>
</div>
