let projects = JSON.parse(
    localStorage.sphereProjects || '["CampusFlow","AccessAI","TripCanvas"]',
  ),
  page = "Profile";
const save = () => (localStorage.sphereProjects = JSON.stringify(projects));
document.body.innerHTML = `<style>*{box-sizing:border-box}body{margin:0;background:#111016;color:#f6f1eb;font:14px system-ui}.app{display:grid;grid-template-columns:250px 1fr;min-height:100vh}.side{padding:30px;background:#1d1a28}.logo{font-size:22px;font-weight:900;color:#e5ff00}.side button{display:block;width:100%;padding:14px;border:0;background:none;text-align:left;color:#c7c1d0}.side button.on{background:#342d49;color:#fff;border-radius:7px}.content{padding:48px;max-width:1000px}.hero{font-size:clamp(45px,9vw,100px);line-height:.85;letter-spacing:-.07em}.hero i{color:#e5ff00}.card{background:#201d29;border:1px solid #3e384e;border-radius:16px;padding:23px;margin-top:20px}.projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:13px}.project{padding:22px;border-radius:12px;background:#9b5cff;color:#160b2c;min-height:150px;display:flex;flex-direction:column;justify-content:space-between}.project button,.primary{border:0;border-radius:7px;padding:9px;background:#e5ff00;color:#111016;font-weight:700}.skills button{background:#272233;color:#e5ff00;border:1px solid #514969;border-radius:20px;padding:9px;margin:4px}.skills button.on{background:#e5ff00;color:#111016}input,textarea{display:block;width:100%;padding:11px;margin:8px 0 14px;border-radius:7px;border:0}@media(max-width:650px){.app{grid-template-columns:1fr}.side{display:flex;padding:10px;overflow:auto}.side button{width:auto;white-space:nowrap}.content{padding:25px}}</style><div class="app"><aside class="side"><div class="logo">SKILLSPHERE</div>${["Profile", "Projects", "Skills", "Contact"].map((x) => `<button class="${x === page ? "on" : ""}" onclick="route('${x}')">${x}</button>`).join("")}</aside><main class="content" id="app"></main></div>`;
function route(x) {
  page = x;
  document
    .querySelectorAll(".side button")
    .forEach((b) => b.classList.toggle("on", b.textContent === x));
  render();
}
function render() {
  if (page === "Profile")
    app.innerHTML = `<small>CREATIVE TECHNOLOGIST</small><h1 class="hero" contenteditable oninput="localStorage.sphereBio=this.innerHTML">${localStorage.sphereBio || "Ideas with<br><i>motion.</i>"}</h1><div class="card"><h2>About this portfolio</h2><p>Edit this headline directly, then explore the projects and skill workspace.</p></div>`;
  if (page === "Projects")
    app.innerHTML = `<h1>Project lab</h1><p>Create, rename, or open a project case study.</p><div class="projects">${projects.map((p, i) => `<div class="project"><b contenteditable oninput="projects[${i}]=this.innerText;save()">${p}</b><button onclick="alert('Opening ${p}: case study preview')">Open case study →</button><button onclick="projects.splice(${i},1);save();render()">Delete</button></div>`).join("")}</div><p><button class="primary" onclick="newProject()">+ New project</button></p>`;
  if (page === "Skills")
    app.innerHTML = `<h1>Skill playground</h1><div class="card skills">${["React", "UX research", "Motion", "Accessibility", "Figma", "JavaScript"].map((x, i) => `<button class="${localStorage["ss" + i] ? "on" : ""}" onclick="this.classList.toggle('on');localStorage['ss${i}']=this.classList.contains('on')?'1':''">${x}</button>`).join("")}</div>`;
  if (page === "Contact")
    app.innerHTML = `<h1>Let’s collaborate.</h1><div class="card"><input id="name" placeholder="Your name"><textarea id="message" placeholder="What would you like to make?"></textarea><button class="primary" onclick="localStorage.message=message.value;alert('Message saved locally for this demo.')">Save message</button></div>`;
}
function newProject() {
  const x = prompt("Project name");
  if (x) {
    projects.push(x);
    save();
    render();
  }
}
render();
