<script>
import { base } from "$app/paths";
import { page } from "$app/stores";

let pages = [
    { url: "/", title: "Home" },
    { url: "/projects", title: "Projects" },
    { url: "/contact", title: "Contact" },
    { url: "/cv", title: "Resume" },
    { url: "/meta", title: "Meta" },
    {url: "https://github.com/gbussds", title:"Github"}
];

let localStorage = globalThis.localStorage ?? {};

let root = globalThis?.document?.documentElement;
let colorScheme = localStorage.colorScheme ?? "light"; 

$: root?.style.setProperty("color-scheme", colorScheme);
$: localStorage.colorScheme = colorScheme;

</script>

<div class = 'header'>
    <h1>Guilherme Buss</h1>
    <div class='links'>
        {#each pages as p}
            <a
                href={p.url.startsWith("http") ? p.url: `${base}${p.url}`}
                class:current={$page.route.id === p.url}
                target={p.url.startsWith("http") ? "_blank" : undefined}
            >
                {p.title}
            </a>
        {/each}
    </div>

    <label class="color-scheme">
        Theme:
        <select bind:value={ colorScheme }>
            <option value="light"> Light </option>
            <option value="dark"> Dark </option>
        </select>
    </label>
</div>
<slot />