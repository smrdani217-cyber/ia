const prayers = [
  { id: "sign", title: "Sinal da Cruz", subtitle: "Início do terço", type: "start", symbol: "✝", text: "Em nome do Pai, e do Filho, e do Espírito Santo. Amém." },
  { id: "creed", title: "Creio", subtitle: "Profissão de fé", type: "large", symbol: "🕊️", text: "Creio em Deus Pai todo-poderoso, criador do céu e da terra; e em Jesus Cristo, seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos céus; está sentado à direita de Deus Pai todo-poderoso, donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne e na vida eterna. Amém." },
  { id: "ourfather-opening", title: "Pai-Nosso", subtitle: "Primeira conta grande", type: "large", symbol: "🙏", text: "Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso Reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém." },
  { id: "hail-opening-1", title: "Ave-Maria", subtitle: "Pela fé", type: "small", symbol: "🌹", text: "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém." },
  { id: "hail-opening-2", title: "Ave-Maria", subtitle: "Pela esperança", type: "small", symbol: "🌹", text: "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém." },
  { id: "hail-opening-3", title: "Ave-Maria", subtitle: "Pela caridade", type: "small", symbol: "🌹", text: "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém." },
  { id: "glory-opening", title: "Glória ao Pai", subtitle: "Antes dos mistérios", type: "large", symbol: "✨", text: "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém." },
];

const mysterySets = {
  gozosos: [
    "A Anunciação do Anjo a Maria",
    "A Visitação de Maria a Isabel",
    "O Nascimento de Jesus em Belém",
    "A Apresentação do Menino Jesus no Templo",
    "A Perda e o Encontro do Menino Jesus no Templo"
  ],
  luminosos: [
    "O Batismo de Jesus no Rio Jordão",
    "A autorrevelação de Jesus nas Bodas de Caná",
    "O Anúncio do Reino de Deus",
    "A Transfiguração de Jesus",
    "A Instituição da Eucaristia"
  ],
  dolorosos: [
    "A Agonia de Jesus no Horto",
    "A Flagelação de Jesus",
    "A Coroação de espinhos",
    "Jesus carrega a cruz até o Calvário",
    "A Crucificação e Morte de Jesus"
  ],
  gloriosos: [
    "A Ressurreição de Jesus",
    "A Ascensão de Jesus ao Céu",
    "A Vinda do Espírito Santo",
    "A Assunção de Maria ao Céu",
    "A Coroação de Maria como Rainha do Céu e da Terra"
  ]
};

const hailMary = "Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora de nossa morte. Amém.";
const ourFather = "Pai nosso, que estais nos céus, santificado seja o vosso nome; venha a nós o vosso Reino; seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.";
const glory = "Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.";
const jaculatory = "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno; levai as almas todas para o céu e socorrei principalmente as que mais precisarem da vossa misericórdia. Amém.";

let sequence = [...prayers];
let currentIndex = 0;
let guidedMode = false;
let selectedMystery = "gozosos";
let beadPositions = [];

function buildSequence() {
  sequence = [...prayers];
  for (let decade = 0; decade < 5; decade++) {
    sequence.push({
      id: `mystery-${decade}`, title: `Mistério ${decade + 1}`, subtitle: mysterySets[selectedMystery][decade],
      type: "mystery", symbol: "🕊️", text: `<p><strong>${mysterySets[selectedMystery][decade]}</strong></p><p>Reserve um momento de silêncio e medite neste mistério da vida de Jesus e de Maria.</p>`
    });
    sequence.push({ id: `ourfather-${decade}`, title: "Pai-Nosso", subtitle: `Dezena ${decade + 1} · abertura`, type: "large", symbol: "🙏", text: ourFather });
    for (let i = 0; i < 10; i++) {
      sequence.push({ id: `hail-${decade}-${i}`, title: "Ave-Maria", subtitle: `Dezena ${decade + 1} · conta ${i + 1} de 10`, type: "small", symbol: "🌹", text: hailMary });
    }
    sequence.push({ id: `glory-${decade}`, title: "Glória ao Pai", subtitle: `Dezena ${decade + 1} · encerramento`, type: "large", symbol: "✨", text: glory });
    sequence.push({ id: `jaculatory-${decade}`, title: "Ó meu Jesus", subtitle: `Dezena ${decade + 1} · oração opcional`, type: "small", symbol: "🕊️", text: jaculatory });
  }
  sequence.push({ id: "hail-queen", title: "Salve-Rainha", subtitle: "Oração final", type: "end", symbol: "🌹", text: "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos, os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei. E depois deste desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce sempre Virgem Maria. Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém." });
  sequence.push({ id: "sign-end", title: "Sinal da Cruz", subtitle: "Encerramento do terço", type: "end", symbol: "✝", text: "Em nome do Pai, e do Filho, e do Espírito Santo. Amém." });
}

function beadLabel(item) {
  if (item.id === "sign" || item.id === "sign-end") return "✝";
  if (item.id === "creed") return "C";
  if (item.id.includes("ourfather")) return "P";
  if (item.id.includes("glory")) return "G";
  if (item.id.includes("mystery")) return "M";
  if (item.id.includes("hail-queen")) return "S";
  return "";
}

function calculatePositions() {
  const pts = [];
  // O oval mostra as cinco dezenas: uma conta grande de Pai-Nosso e dez contas de Ave-Maria por dezena.
  const cx = 180, cy = 174, rx = 112, ry = 145;
  const total = 55;
  for (let i = 0; i < total; i++) {
    const angle = (-Math.PI / 2) + (i / total) * Math.PI * 2;
    const decade = Math.floor(i / 11);
    const beadInDecade = i % 11;
    const seqIndex = beadInDecade === 0
      ? sequence.findIndex(item => item.id === `ourfather-${decade}`)
      : sequence.findIndex(item => item.id === `hail-${decade}-${beadInDecade - 1}`);
    pts.push({ x: cx + rx * Math.cos(angle), y: cy + ry * Math.sin(angle), seqIndex: Math.max(0, seqIndex), kind: beadInDecade === 0 ? "large" : "small" });
  }
  // Contas iniciais na haste: sinal da cruz, Credo, Pai-Nosso e três Ave-Marias e Glória.
  const openingIds = ["sign", "creed", "ourfather-opening", "hail-opening-1", "hail-opening-2", "hail-opening-3", "glory-opening"];
  const openingYs = [300, 315, 330, 345, 360, 375, 390];
  openingIds.forEach((id, i) => {
    const seqIndex = sequence.findIndex(item => item.id === id);
    pts.push({ x: 180, y: openingYs[i], seqIndex: Math.max(0, seqIndex), kind: i === 1 || i === 2 || i === 6 ? "large" : "small" });
  });
  return pts;
}

function renderRosary() {
  const lines = document.getElementById("rosaryLines");
  const beads = document.getElementById("rosaryBeads");
  lines.innerHTML = "";
  beads.innerHTML = "";
  beadPositions = calculatePositions();
  const pts = beadPositions;
  // Loop connector lines
  const loopPts = pts.slice(0, 54);
  const path = loopPts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  lines.innerHTML = `<path d="${path}" /> <path d="M180 288 L180 390" />`;
  pts.forEach((p, i) => {
    const item = sequence[p.seqIndex] || sequence[0];
    const isLarge = p.kind === "large" || item.type === "large";
    const selected = p.seqIndex === currentIndex;
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", `bead ${isLarge ? "large" : ""} ${selected ? "selected" : ""}`);
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", `${item.title}: ${item.subtitle}`);
    g.dataset.index = p.seqIndex;
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", p.x); circle.setAttribute("cy", p.y); circle.setAttribute("r", isLarge ? 9.5 : 7);
    g.appendChild(circle);
    const label = beadLabel(item);
    if (label) {
      const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      text.setAttribute("x", p.x); text.setAttribute("y", p.y + .5); text.textContent = label; g.appendChild(text);
    }
    g.addEventListener("click", () => selectPrayer(p.seqIndex));
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectPrayer(p.seqIndex); } });
    beads.appendChild(g);
  });
}

function renderPrayer() {
  const item = sequence[currentIndex];
  document.getElementById("prayerTitle").textContent = item.title;
  document.getElementById("prayerSubtitle").textContent = item.subtitle;
  document.getElementById("prayerSymbol").textContent = item.symbol;
  document.getElementById("prayerNumber").textContent = `${currentIndex + 1} / ${sequence.length}`;
  const textEl = document.getElementById("prayerText");
  textEl.innerHTML = "";
  if (item.text.includes("<p>")) textEl.innerHTML = item.text;
  else {
    const p = document.createElement("p");
    p.textContent = item.text;
    textEl.appendChild(p);
  }
  document.getElementById("previousButton").disabled = currentIndex === 0;
  document.getElementById("nextButton").textContent = currentIndex === sequence.length - 1 ? "Recomeçar ↻" : "Próxima →";
  document.getElementById("progressPill").textContent = currentIndex === 0 ? "Início do terço" : `Etapa ${currentIndex + 1} de ${sequence.length}`;
  document.getElementById("modeNote").textContent = guidedMode ? "Modo guiado ativado: use Próxima para acompanhar a sequência." : "Modo livre: você pode selecionar qualquer conta.";
  renderRosary();
}

function selectPrayer(index) {
  currentIndex = Math.max(0, Math.min(index, sequence.length - 1));
  renderPrayer();
  if (window.innerWidth < 800) document.getElementById("prayerCard").scrollIntoView({ behavior: "smooth", block: "start" });
}
function nextPrayer() {
  if (currentIndex >= sequence.length - 1) currentIndex = 0;
  else currentIndex++;
  renderPrayer();
}
function previousPrayer() {
  if (currentIndex > 0) currentIndex--;
  renderPrayer();
}
function renderMysteries() {
  const list = document.getElementById("mysteryList");
  list.innerHTML = "";
  mysterySets[selectedMystery].forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    list.appendChild(li);
  });
}

document.getElementById("startButton").addEventListener("click", () => {
  guidedMode = false; selectPrayer(0);
});
document.getElementById("guidedButton").addEventListener("click", () => {
  guidedMode = true; selectPrayer(0);
  document.getElementById("modeNote").textContent = "Modo guiado ativado: use Próxima para acompanhar a sequência.";
});
document.getElementById("nextButton").addEventListener("click", nextPrayer);
document.getElementById("previousButton").addEventListener("click", previousPrayer);
document.getElementById("mysterySelect").addEventListener("change", e => {
  selectedMystery = e.target.value;
  buildSequence(); renderMysteries(); selectPrayer(Math.min(currentIndex, sequence.length - 1));
});
const helpDialog = document.getElementById("helpDialog");
document.getElementById("helpButton").addEventListener("click", () => helpDialog.showModal());
document.getElementById("closeHelp").addEventListener("click", () => helpDialog.close());
helpDialog.addEventListener("click", e => { if (e.target === helpDialog) helpDialog.close(); });

buildSequence();
renderMysteries();
renderPrayer();
