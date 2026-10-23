/* ===== EDIT THIS SECTION: all site content lives here ===== */
const SITE = {
  name: "Wesley Kwiecinski",
  tagline: "MS Graduate from the University of Illinois Chicago",
  about: [
    "I am a computer scientist with a research interests of high-performance computing, data visualization and analysis, and performance analysis. I received my MS in Computer Science from the University of Illinois Chicago, and my BS in Computer Science from Northern Illinois University. During my time as a master's student at UIC, I was a fellow under the C2-The-P2 Fellowship doing work in computational physics. Most of professional career has been academic and spent working at Argonne National Laboratory. I love working across multi-institutional teams, bridging the gap between domain science and compute power to accelerate good science and to use compute power in the most efficient way possible."
  ],
  interests: ["High-Performance Computing", "Data Visualization", "I/O", "Computational Science", "Performance Profiling", "Containerization"],
  links: [
    {label: "Email", href: "kwiecinskiwesley@gmail.com"},
    {label: "GitHub", href: "https://github.com/WesKw"},
    {label: "CV", href: "data/CV/Kwiecinski_SE_Industry_v4.pdf"}
  ]
};
const POSTS = [
  {title: "Placeholder: Reading Darshan traces at scale", date: "2026-10-01", summary: "One or two sentences describing the post.", href: "#"},
  {title: "Placeholder: Notes on container runtimes and I/O", date: "2026-09-14", summary: "One or two sentences describing the post.", href: "#"}
];
const PROJECTS = [
  {name: "Project name", desc: "What it does and why it matters, in a sentence or two.", tags: ["Python", "HPC"], code: "https://github.com/your-handle/project", demo: ""},
  {name: "Another project", desc: "Short description of the goal, your role, and the outcome.", tags: ["C++", "MPI"], code: "https://github.com/your-handle/another", demo: ""},
  {name: "Third project", desc: "Short description.", tags: ["PyTorch"], code: "", demo: ""}
];
const PUBS = [
  {title: "Analysis of ATLAS Derivation I/O on High-Performance Computing Systems", authors: "Kwiecinski, W.", venue: "Master's Thesis", year: 2026, pdf: "", doi: "", note: "Published"},
  {title: "Characterizing event I/O access patterns in HEP using darshan", authors: "Yildiz, O., Wang, R., Gartung, P, Kwiecinski, W.", venue: "28th Conference on Computing in High Energy and Nuclear Physics", year: 2026, pdf: "", doi: "", note: ""},
  {title: "Evaluating I/O Behavior of ATLAS Derivations Across Container Runtimes on HPC Platforms", authors: "Kwiecinski, W., Papka, M.", venue: "Greater Chicago Area Systems Research Workshop", year: 2026, note: "Poster"},
  {title: "ORCHA – A Performance Portability System for Post Exascale Systems", authors: "Lee, Y., Weide, K., Kwiecinski, W., O’Neal, J., Rudi, J., Dubey, A.", venue: "", year: 2025, pdf: "", doi: "https://doi.org/10.48550/arXiv.2507.09337", note: ""},
];
/* ===== END EDIT SECTION ===== */

const NAV = [
  {id: "home", label: "Home", href: "index.html"},
  {id: "blog", label: "Blog", href: "blog.html"},
  {id: "projects", label: "Software", href: "projects.html"},
  {id: "publications", label: "Publications", href: "publications.html"}
];

const esc = t => String(t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const tags = a => a && a.length ? `<div class="tags">${a.map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>` : "";
const post = p => `<div class="card"><h3><a href="${esc(p.href)}">${esc(p.title)}</a></h3><div class="meta">${esc(p.date)}</div><p>${esc(p.summary)}</p></div>`;
const proj = p => `<div class="card"><h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p>${tags(p.tags)}<div class="links">${p.code?`<a href="${esc(p.code)}">Code</a>`:""}${p.demo?`<a href="${esc(p.demo)}">Demo</a>`:""}</div></div>`;
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
  publications: () => `<h1>Publications</h1><p class="sub">Papers, preprints, and talks.</p>${PUBS.map(pub).join("")}`
};

(function render(){
  const page = document.body.dataset.page || "home";
  document.getElementById("site-header").innerHTML =
    `<div class="bar"><a class="brand" href="index.html">${esc(SITE.name)}</a><nav>` +
    NAV.map(n => `<a href="${n.href}"${n.id === page ? ' class="on"' : ""}>${n.label}</a>`).join("") +
    `</nav></div>`;
  document.getElementById("view").innerHTML = PAGES[page]();
  document.getElementById("site-footer").innerHTML = SITE.links.map(l=>`<a href="${esc(l.href)}">${esc(l.label)}</a>`).join(" · ");
  const label = NAV.find(n => n.id === page).label;
  document.title = (page === "home" ? "" : label + " · ") + SITE.name;
})();
