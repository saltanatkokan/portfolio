// ---- Certificates (newest first). To add one: drop the image in certificates/ and add an object here.
const certificates = [
  {
    issuer: "Cisco", program: "Cisco Networking Academy", logo: "CN",
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    date: "Dec 09, 2025", type: "Course completion",
    img: "certificates/cisco-ccna-srwe.jpg", pdf: "certificates/cisco-ccna-srwe.pdf",
    desc: "Student-level credential covering the core skills behind enterprise LAN design: switching, VLANs, routing and wireless networking, with a strong focus on security best practices.",
    can: [
      "Configure VLANs and inter-VLAN routing with security best practices",
      "Build redundant switched networks using STP and EtherChannel",
      "Configure IPv4/IPv6 static routing and dynamic IPv6 addressing",
      "Set up WLANs with a WLC and secure switches against LAN attacks"
    ],
    skills: ["VLAN", "Inter-VLAN Routing", "STP", "EtherChannel", "IPv6", "WLAN", "Switch Security", "Static Routing"],
    note: "Verifiable through the QR code on the certificate."
  },
  {
    issuer: "Cisco", program: "Cisco Networking Academy", logo: "CN",
    title: "Junior Cybersecurity Analyst Career Path",
    date: "Apr 22, 2025", type: "Career path completion",
    img: "certificates/cisco-junior-cybersecurity-analyst.jpg", pdf: "certificates/cisco-junior-cybersecurity-analyst.pdf",
    desc: "A career-path credential preparing for an entry-level security analyst role: understanding threats, assessing risk and responding to incidents.",
    can: [
      "Recommend cybersecurity controls to enhance network and information security",
      "Mitigate network and systems security threats",
      "Evaluate security posture with vulnerability and risk assessment tools",
      "Recommend incident management activities for an incident response plan"
    ],
    skills: ["Cybersecurity", "Network Security", "Vulnerability Assessment", "Risk Assessment", "Incident Response"],
    note: "Verifiable through the QR code on the certificate."
  },
  {
    issuer: "Huawei", program: "Huawei Talent Online", logo: "H",
    title: "Artificial Intelligence Technology and Applications",
    date: "Apr 18, 2025", id: "ICT20250418000674", type: "Course completion (Kazakh)",
    img: "certificates/huawei-ai-technology-applications.jpg",
    desc: "Course on how modern AI technologies work and where they are applied in real products and industries. Completed with a final exam.",
    can: [
      "Explain the main AI technologies and their practical applications",
      "Connect AI methods to real-world use cases"
    ],
    skills: ["Artificial Intelligence", "Machine Learning", "AI Applications"],
    note: "This certificate confirms course completion and does not represent passing the Huawei Certification exam."
  },
  {
    issuer: "Huawei", program: "Huawei Talent Online", logo: "H",
    title: "5G Network Architecture and Key Technologies",
    date: "Apr 15, 2025", id: "ICT20250415000025", type: "Course certificate",
    img: "certificates/huawei-5g-network-architecture.jpg",
    desc: "Course on how 5G networks are structured and which key technologies make them work. Completed with a passing grade.",
    can: [
      "Describe the 5G network architecture and its main components",
      "Explain the key technologies behind 5G"
    ],
    skills: ["5G", "Network Architecture", "Telecommunications"],
    note: "This certificate confirms passing the course assessment and does not represent a Huawei Certification."
  },
  {
    issuer: "Huawei", program: "Huawei Talent Online", logo: "H",
    title: "AI Basics: Overview of AI",
    date: "Mar 16, 2025", id: "ICT20250316013877", type: "Course completion (Kazakh)",
    img: "certificates/huawei-ai-basics.jpg",
    desc: "Introductory course on the fundamentals of artificial intelligence: key concepts, terminology and the big picture of the field. Completed with an exam.",
    can: [
      "Understand core AI concepts and terminology",
      "Describe the overall landscape of AI technologies"
    ],
    skills: ["Artificial Intelligence", "AI Fundamentals"],
    note: "This certificate confirms course completion and does not represent passing the Huawei Certification exam."
  },
  {
    issuer: "Cisco", program: "Cisco Networking Academy", logo: "CN",
    title: "Networking Basics",
    date: "Dec 08, 2024", type: "Course completion",
    img: "certificates/cisco-networking-basics.jpg", pdf: "certificates/cisco-networking-basics.pdf",
    desc: "Foundation course in how computer networks work, from Ethernet and IP addressing to setting up a secure home or small-office wireless router.",
    can: [
      "Explain network types, components, standards and protocols",
      "Describe Ethernet, IPv4 and IPv6 addressing and how routers connect networks",
      "Test and troubleshoot network connectivity with common tools",
      "Configure a wireless router and client to connect securely to the internet"
    ],
    skills: ["Networking", "Ethernet", "IPv4", "IPv6", "Routing", "Troubleshooting", "Wireless"],
    note: "Verifiable through the QR code on the certificate."
  }
];

const box = document.getElementById('certs');
const $ = id => document.getElementById(id);
const chip = t => { const s = document.createElement('span'); s.className = 'chip'; s.textContent = t; return s; };

certificates.forEach((c, i) => {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = 'cert';
  el.dataset.issuer = c.issuer;
  el.style.animationDelay = (i * 70) + 'ms';
  el.innerHTML = '<span class="cthumb"><img loading="lazy"></span><span class="cinfo"><h3></h3><p></p></span><span class="view">View</span>';
  const img = el.querySelector('img'); img.src = c.img; img.alt = '';
  el.querySelector('h3').textContent = c.title;
  el.querySelector('p').textContent = c.program + ' · ' + c.date.replace(/ \d{2},/, '');
  el.addEventListener('click', () => openCert(c));
  box.appendChild(el);
});

// highlight the first visible row until the mouse enters the list
function markFirst() {
  box.querySelectorAll('.cert').forEach(x => x.classList.remove('featured'));
  const f = box.querySelector('.cert:not([hidden])'); if (f) f.classList.add('featured');
}
markFirst();
box.addEventListener('mouseenter', () => box.querySelectorAll('.featured').forEach(x => x.classList.remove('featured')));
box.addEventListener('mouseleave', markFirst);

$('statTotal').textContent = certificates.length;
$('statSkills').textContent = new Set(certificates.flatMap(c => c.skills)).size;

// filters
document.querySelectorAll('.fchip').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.fchip').forEach(x => { x.classList.toggle('active', x === b); x.setAttribute('aria-pressed', x === b); });
  const f = b.dataset.filter;
  box.querySelectorAll('.cert').forEach(el => { el.hidden = f !== 'all' && el.dataset.issuer !== f; });
  markFirst();
}));

// modal
const modal = $('certModal');
function openCert(c) {
  const k = c.issuer.toLowerCase();
  $('mImg').src = c.img; $('mImg').alt = c.title + ' certificate';
  $('mLogo').className = 'logo-tile ' + k; $('mLogo').textContent = c.logo;
  $('mIssuer').textContent = c.issuer; $('mProgram').textContent = c.program;
  $('mTitle').textContent = c.title;
  $('mDate').textContent = c.date; $('mType').textContent = c.type;
  $('mIdRow').hidden = !c.id; $('mId').textContent = c.id || '';
  $('mDesc').textContent = c.desc;
  const list = $('mList'); list.innerHTML = '';
  c.can.forEach(t => { const li = document.createElement('li'); li.textContent = t; list.appendChild(li); });
  const sk = $('mSkills'); sk.innerHTML = ''; c.skills.forEach(s => sk.appendChild(chip(s)));
  $('mOpen').href = c.pdf || c.img;
  $('mDownload').href = c.pdf || c.img;
  $('mNote').textContent = c.note || '';
  modal.showModal();
  modal.querySelector('.m-info').scrollTop = 0;
}
$('mClose').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

// ---- Mobile menu
const menu = document.getElementById('menu'), links = document.getElementById('links');
menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links.addEventListener('click', e => { if (e.target.tagName === 'A') links.classList.remove('open'); });
// ---- Contact form: opens the visitor's email app with the message filled in
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target;
  const subject = 'Portfolio message from ' + f.name.value;
  const body = f.message.value + '\n\n— ' + f.name.value + ' (' + f.email.value + ')';
  window.location.href = 'mailto:kokansaltanat2@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
});