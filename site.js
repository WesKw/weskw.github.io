/* ===== EDIT THIS SECTION: all site content lives here ===== */
const SITE = {
  name: "Wesley Kwiecinski",
  tagline: "MS Graduate from the University of Illinois Chicago",
  about: [
    "I am a computer scientist with a research interests of high-performance computing, data visualization and analysis, and performance analysis. I received my MS in Computer Science from the University of Illinois Chicago, and my BS in Computer Science from Northern Illinois University. During my time as a master's student at UIC, I was a fellow under the C2-The-P2 Fellowship doing work in computational physics. Most of professional career has been academic and spent working at Argonne National Laboratory. I love working across multi-institutional teams, bridging the gap between domain science and compute power to accelerate good science and to use compute power in the most efficient way possible."
  ],
  interests: ["High-Performance Computing", "Data Visualization", "I/O", "Computational Science", "Performance Profiling", "Containerization", "Emulation", "Game Development"],
  links: [
    {label: "Email", href: "kwiecinskiwesley@gmail.com"},
    {label: "GitHub", href: "https://github.com/WesKw"},
    {label: "CV", href: "data/CV/Kwiecinski_SE_Industry_v4.pdf"},
    {label: "LinkedIn", href: "https://www.linkedin.com/in/wesley-pk/"},
  ]
};
const POSTS = [
  {title: "Placeholder: Reading Darshan traces at scale", date: "2026-10-01", summary: "One or two sentences describing the post.", href: "#"},
  {title: "Placeholder: Notes on container runtimes and I/O", date: "2026-09-14", summary: "One or two sentences describing the post.", href: "#"}
];
const PROJECTS = [
  {id: "corpus-explore", name: "Token Ordering for Downstream LLM Performance", desc: "A small ALCF summer project for evaluating how token orders affect downstream LLM tasks.", tags: ["Python", "HPC", "MPI", "LLM", "AI", "Datasets", "Training"], code: "https://github.com/WesKw/CorpusExploration", demo: "",
    details: ["Write-up in progress."]},
  {id: "ms-thesis", name: "Derivation I/O Analysis on HPC Systems", desc: "My masters thesis. The goal was to understand how I/O is performed on ATLAS derivations and how container runtimes affect I/O.", tags: ["Python", "HEP", "Darshan I/O", "Athena", "ATLAS"], code: "https://github.com/WesKw/DerivationExperiments", demo: "",
    details: ["Write-up in progress."]},
  {id: "rustychip8", name: "RustyChip8", desc: "A small Chip8 interpreter built with Rust.", tags: ["Rust", "Emulation", "CHIP-8"], code: "https://github.com/WesKw/RustyChip8", demo: "",
    details: ["Write-up in progress."]},
  {id: "relics", name: "Relics of Old Projects", desc: "A look at some projects from over the years.", tags: ["Godot", "Game Development"], code: "", demo: ""}
];
const PUBS = [
  {title: "Analysis of ATLAS Derivation I/O on High-Performance Computing Systems", authors: "Kwiecinski, W.", venue: "Master's Thesis", year: 2026, pdf: "", doi: "", note: "Published"},
  {title: "Characterizing event I/O access patterns in HEP using darshan", authors: "Yildiz, O., Wang, R., Gartung, P, Kwiecinski, W.", venue: "28th Conference on Computing in High Energy and Nuclear Physics", year: 2026, pdf: "", doi: "", note: ""},
  {title: "Evaluating I/O Behavior of ATLAS Derivations Across Container Runtimes on HPC Platforms", authors: "Kwiecinski, W., Papka, M.", venue: "Greater Chicago Area Systems Research Workshop", year: 2026, note: "Poster"},
  {title: "ORCHA: A performance portability system for extreme heterogeneity", authors: "Lee, Y., Weide, K., Dubey, A., Kwiecinski, W., O’Neal, J., Rudi, J.", venue: "The International Journal of High Performance Computing Applications", year: 2026, pdf: "", doi: "https://doi.org/10.1177/10943420261465929", note: ""},
];
/* ===== END EDIT SECTION ===== */

const NAV = [
  {id: "home", label: "Home", href: "index.html"},
  {id: "blog", label: "Blog", href: "blog.html"},
  {id: "projects", label: "Projects", href: "projects.html"},
  {id: "publications", label: "Publications", href: "publications.html"}
];

const esc = t => String(t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const tags = a => a && a.length ? `<div class="tags">${a.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>` : "";
const post = p => `<div class="card"><h3><a href="${esc(p.href)}">${esc(p.title)}</a></h3><div class="meta">${esc(p.date)}</div><p>${esc(p.summary)}</p></div>`;
const projHref = p => `project.html?id=${encodeURIComponent(p.id)}`;
const projLinks = p => `<div class="links">${p.code?`<a href="${esc(p.code)}">Code</a>`:""}${p.demo?`<a href="${esc(p.demo)}">Demo</a>`:""}</div>`;
// details blocks: a string is HTML (wrapped in <p> unless it starts with a tag), {img, alt, caption} is a figure
const block = b => typeof b === "string" ? (b.trim().startsWith("<") ? b : `<p>${b}</p>`)
  : `<figure><img src="${esc(b.img)}" alt="${esc(b.alt || "")}">${b.caption?`<figcaption>${esc(b.caption)}</figcaption>`:""}</figure>`;
const proj = p => `<div class="card"><h3><a href="${projHref(p)}">${esc(p.name)}</a></h3><p>${esc(p.desc)}</p>${tags(p.tags)}${projLinks(p)}</div>`;
const pub = p => `<div class="card"><h3>${esc(p.title)}</h3><div class="meta">${esc(p.authors)}</div><div class="meta"><em>${esc(p.venue)}</em>, ${esc(p.year)}${p.note?` · ${esc(p.note)}`:""}</div><div class="links">${p.pdf?`<a href="${esc(p.pdf)}">PDF</a>`:""}${p.doi?`<a href="${esc(p.doi)}">DOI</a>`:""}</div></div>`;

const PAGES = {
  home: () => `
    <h1>${esc(SITE.name)}</h1>
    <p class="sub">${esc(SITE.tagline)}</p>
    ${SITE.about.map(t=>`<p>${esc(t)}</p>`).join("")}
    ${tags(SITE.interests)}
    <h2>Latest writing</h2>${POSTS.slice(0,2).map(post).join("")}<a class="more" href="blog.html">All posts →</a>
    <h2>Selected software</h2><div class="grid">${PROJECTS.slice(0,3).map(proj).join("")}</div><a class="more" href="projects.html">All projects →</a>
    <h2>Recent publications</h2>${PUBS.slice(0,2).map(pub).join("")}<a class="more" href="publications.html">All publications →</a>`,
  blog: () => `<h1>Blog</h1><p class="sub">Notes, write-ups, and ideas.</p>${POSTS.map(post).join("")}`,
  projects: () => `<h1>Software</h1><p class="sub">Tools and projects I’ve built.</p><div class="grid">${PROJECTS.map(proj).join("")}</div>`,
  project: () => {
    const p = currentProject();
    if (!p) return `<h1>Project not found</h1><p class="sub">That project doesn’t exist.</p><a class="more" href="projects.html">← All projects</a>`;
    return `<a class="more" href="projects.html">← All projects</a><h1>${esc(p.name)}</h1><p class="sub">${esc(p.desc)}</p>${tags(p.tags)}${projLinks(p)}
      <div class="details">${(p.details || []).map(block).join("")}</div>`;
  },
  publications: () => `<h1>Publications</h1><p class="sub">Papers, preprints, and talks.</p>${PUBS.map(pub).join("")}`
};

const currentProject = () => PROJECTS.find(p => p.id === new URLSearchParams(location.search).get("id"));

(function render(){
  const page = document.body.dataset.page || "home";
  const navId = page === "project" ? "projects" : page;
  document.getElementById("site-header").innerHTML =
    `<div class="bar"><a class="brand" href="index.html">${esc(SITE.name)}</a><nav>` +
    NAV.map(n => `<a href="${n.href}"${n.id === navId ? ' class="on"' : ""}>${n.label}</a>`).join("") +
    `</nav></div>`;
  document.getElementById("view").innerHTML = PAGES[page]();
  document.getElementById("site-footer").innerHTML = SITE.links.map(l=>`<a href="${esc(l.href)}">${esc(l.label)}</a>`).join(" · ");
  const label = page === "project" ? (currentProject() || {name: "Project"}).name : NAV.find(n => n.id === page).label;
  document.title = (page === "home" ? "" : label + " · ") + SITE.name;
})();
