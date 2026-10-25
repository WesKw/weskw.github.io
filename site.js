/* ===== EDIT THIS SECTION: all site content lives here ===== */
const SITE = {
  name: "Wesley Kwiecinski",
  tagline: "MS Graduate from the University of Illinois Chicago",
  photo: "data/index/image0.jpg",  // e.g. "data/headshot.jpg"; leave empty to hide
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
  // href points to the post's HTML file in posts/ (copy posts/_template.html to start a new one)
  // {title: "A Look Back", date: "2026-10-25", summary: "A look back at some smaller projects that I've worked on over the years. Will probably be updated as I feel like it.", href: "posts/a-look-back.html"},
  {title: "Integrating Darshan I/O Analysis into SPOT's Performance Monitoring Board", date: "2026-10-25", summary: "ATLAS's SPOT team uses a web-based performance monitoring dashboard for watching performance degredations of ATLAS software. Recently, I completed a project that integrated Darshan I/O monitoring into this dashboard.", href: "posts/darshan-traces.html"},
];
const PROJECTS = [
  // href points to the project's HTML file in project/ (copy project/_template.html to start a new one)
  {name: "Token Ordering for Downstream LLM Performance", desc: "A small ALCF summer project for evaluating how token orders affect downstream LLM tasks.", tags: ["Python", "HPC", "MPI", "LLM", "AI", "Datasets", "Training"], code: "https://github.com/WesKw/CorpusExploration", demo: "", href: "project/corpus-explore.html"},
  {name: "Derivation I/O Analysis on HPC Systems", desc: "My masters thesis. The goal was to understand how I/O is performed on ATLAS derivations and how container runtimes affect I/O.", tags: ["Python", "HEP", "Darshan I/O", "Athena", "ATLAS"], code: "https://github.com/WesKw/DerivationExperiments", demo: "", href: "project/ms-thesis.html"},
  {name: "RustyChip8", desc: "A small Chip8 interpreter built with Rust.", tags: ["Rust", "Emulation", "CHIP-8"], code: "https://github.com/WesKw/RustyChip8", demo: "", href: "project/rustychip8.html"},
];
const PUBS = [
  {title: "Analysis of ATLAS Derivation I/O on High-Performance Computing Systems", authors: "Kwiecinski, W.", venue: "Master's Thesis", year: 2026, pdf: "", doi: "", note: "Not yet published"},
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

// pages in subfolders (posts/, project/) set data-root="../" so site-relative links still resolve
const ROOT = document.body.dataset.root || "";
const url = h => /^([a-z]+:|#|\/)/i.test(h) ? h : ROOT + h;
const current = list => list.find(p => location.pathname.endsWith("/" + p.href));

const esc = t => String(t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const tags = a => a && a.length ? `<div class="tags">${a.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>` : "";
const post = p => `<div class="card"><h3><a href="${esc(p.href)}">${esc(p.title)}</a></h3><div class="meta">${esc(p.date)}</div><p>${esc(p.summary)}</p></div>`;
const projLinks = p => `<div class="links">${p.code?`<a href="${esc(p.code)}">Code</a>`:""}${p.demo?`<a href="${esc(p.demo)}">Demo</a>`:""}</div>`;
const proj = p => `<div class="card"><h3><a href="${esc(p.href)}">${esc(p.name)}</a></h3><p>${esc(p.desc)}</p>${tags(p.tags)}${projLinks(p)}</div>`;
const pub = p => `<div class="card"><h3>${esc(p.title)}</h3><div class="meta">${esc(p.authors)}</div><div class="meta"><em>${esc(p.venue)}</em>, ${esc(p.year)}${p.note?` · ${esc(p.note)}`:""}</div><div class="links">${p.pdf?`<a href="${esc(p.pdf)}">PDF</a>`:""}${p.doi?`<a href="${esc(p.doi)}">DOI</a>`:""}</div></div>`;

// headings for standalone pages (posts/, project/), whose body is written in the page itself
const HEADS = {
  post: () => {
    const p = current(POSTS) || {title: document.title, date: ""};
    return [p.title, `<a class="more" href="${url("blog.html")}">← All posts</a><h1>${esc(p.title)}</h1><p class="sub">${esc(p.date)}</p>`];
  },
  project: () => {
    const p = current(PROJECTS) || {name: document.title, desc: ""};
    return [p.name, `<a class="more" href="${url("projects.html")}">← All projects</a><h1>${esc(p.name)}</h1><p class="sub">${esc(p.desc)}</p>${tags(p.tags)}${projLinks(p)}`];
  }
};

const PAGES = {
  home: () => `
    <h1>${esc(SITE.name)}</h1>
    <p class="sub">${esc(SITE.tagline)}</p>
    <div class="about">${SITE.photo?`<img class="headshot" src="${esc(SITE.photo)}" alt="${esc(SITE.name)}">`:""}<div>${SITE.about.map(t=>`<p>${esc(t)}</p>`).join("")}</div></div>
    ${tags(SITE.interests)}
    <h2>Latest writing</h2>${POSTS.slice(0,2).map(post).join("")}<a class="more" href="blog.html">All posts →</a>
    <h2>Most Recent Projects</h2><div class="grid">${PROJECTS.slice(0,3).map(proj).join("")}</div><a class="more" href="projects.html">All projects →</a>
    <h2>Recent publications</h2>${PUBS.slice(0,2).map(pub).join("")}<a class="more" href="publications.html">All publications →</a>`,
  blog: () => `<h1>Blog</h1><p class="sub">Notes, write-ups, and ideas.</p>${POSTS.map(post).join("")}`,
  projects: () => `<h1>Projects</h1><p class="sub">Tools and projects I’ve built.</p><div class="grid">${PROJECTS.map(proj).join("")}</div>`,
  publications: () => `<h1>Publications</h1><p class="sub">Papers, preprints, and talks.</p>${PUBS.map(pub).join("")}`
};

(function render(){
  const page = document.body.dataset.page || "home";
  const navId = {project: "projects", post: "blog"}[page] || page;
  document.getElementById("site-header").innerHTML =
    `<div class="bar"><a class="brand" href="${url("index.html")}">${esc(SITE.name)}</a><nav>` +
    NAV.map(n => `<a href="${url(n.href)}"${n.id === navId ? ' class="on"' : ""}>${n.label}</a>`).join("") +
    `</nav></div>`;
  const view = document.getElementById("view");
  let label;
  if (HEADS[page]) {
    const [title, head] = HEADS[page]();
    view.insertAdjacentHTML("afterbegin", head);
    label = title;
  } else {
    view.innerHTML = PAGES[page]();
    label = NAV.find(n => n.id === page).label;
  }
  document.getElementById("site-footer").innerHTML = SITE.links.map(l=>`<a href="${esc(url(l.href))}">${esc(l.label)}</a>`).join(" · ");
  document.title = (page === "home" ? "" : label + " · ") + SITE.name;
})();
