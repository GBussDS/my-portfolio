console.log("IT’S ALIVE!");

const ARE_WE_HOME = document.documentElement.classList.contains("home");

function $$ (selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$(".links a");
// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);
// currentLink?.classList.add("current");

let pages = [
    {url: "", title: "Home"},
    {url: "projects/", title: "Projects"},
    {url: "cv/", title: "Curriculum Vitae"},
    {url: "contact/", title: "Contact"},
    {url: "https://github.com/GBussDS", title: "GitHub"},
];  

let nav = document.createElement("div");
nav.classList.add("links")
document.body.prepend(nav);

let header = document.querySelector(".header");

header.insertAdjacentHTML("afterend", `
    <label class="color-scheme">
        Theme:
        <select>
            <option>Auto</option>
            <option>Light</option>
            <option>Dark</option>
        </select>
    </label>`
);

header.appendChild(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    if (!ARE_WE_HOME && !url.startsWith("http")) {
        url = "../" + url;
    }

    // Create link and add it to nav
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    nav.append(a);

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }
    else if (a.host != location.host) {
        a.target = "_blank"
    }
}

let select = document.querySelector("select");
select.addEventListener("input", function (event) {
    localStorage.colorScheme = event.target.value;
    select.value = localStorage.colorScheme;
    document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
});
