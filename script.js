const CONFIG = {
  JSONBIN_KEY: "",
  JSONBIN_BIN_ID: "",
  GOOGLE_FORM_URL: "https://docs.google.com/forms/",
  ADMIN: { email: "admin@goabroad.com", password: "goabroad123" }
};

const FALLBACK_IMG = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80";
const LS_KEY = "goabroad_scholarships_v1";
const AUTH_KEY = "goabroad_auth_v1";

const SEED = [
  {
    id: "seed-1",
    title: "Fulbright Foreign Student Program 2026",
    country: "USA",
    degree: "Masters / PhD",
    deadline: "May 30, 2026",
    source: "GoAbroad",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
    shortDetails: "Fully funded graduate studies in the United States covering tuition, a living stipend, airfare and health insurance for international students.",
    fullDetails: "The Fulbright Foreign Student Program enables graduate students, young professionals and artists from abroad to study and conduct research in the United States.\n\nBENEFITS\n• Full tuition waiver\n• Monthly living stipend\n• Round-trip airfare\n• Health insurance\n• Book and equipment allowance\n\nELIGIBILITY\n• Bachelor's degree or equivalent\n• Strong academic record\n• Demonstrated leadership potential\n• English proficiency (TOEFL / IELTS)\n\nHOW TO APPLY\nSubmit your application through the Fulbright commission or U.S. embassy in your home country before the deadline. Required documents include transcripts, three recommendation letters, a study objective and a personal statement.",
    createdAt: Date.now() - 500000
  },
  {
    id: "seed-2",
    title: "Chevening Scholarship — UK Government",
    country: "UK",
    degree: "Masters",
    deadline: "November 7, 2026",
    source: "GoAbroad",
    image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=900&q=80",
    shortDetails: "UK government scholarship for outstanding emerging leaders to pursue a one-year master's degree at any UK university.",
    fullDetails: "Chevening Scholarships are awarded to individuals with strong leadership potential and a commitment to creating positive change.\n\nBENEFITS\n• Full tuition fees\n• Monthly living allowance\n• Return flights to the UK\n• Arrival and departure allowances\n• Thesis or dissertation grant\n\nELIGIBILITY\n• Undergraduate degree\n• At least two years of work experience\n• Meet the Chevening English language requirement\n• Return to your home country for at least two years after the award\n\nHOW TO APPLY\nApply online through the Chevening portal. You will need to complete four essays covering leadership, networking, career goals and why you chose your three course options.",
    createdAt: Date.now() - 400000
  },
  {
    id: "seed-3",
    title: "Vanier Canada Graduate Scholarships",
    country: "Canada",
    degree: "PhD",
    deadline: "November 1, 2026",
    source: "External",
    image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=900&q=80",
    shortDetails: "CAD $50,000 per year for three years for doctoral students who demonstrate academic excellence and leadership.",
    fullDetails: "The Vanier Canada Graduate Scholarships program attracts world-class doctoral students and establishes Canada as a global centre of excellence in research and higher learning.\n\nBENEFITS\n• CAD $50,000 per year\n• Renewable for up to three years\n• Prestige and research network access\n\nELIGIBILITY\n• Pursuing a doctoral degree at a Canadian university\n• Academic excellence\n• Research potential\n• Leadership skills\n\nHOW TO APPLY\nYou must be nominated by a Canadian institution with a Vanier allocation. Contact your proposed supervisor early and prepare your research proposal well in advance.",
    createdAt: Date.now() - 300000
  },
  {
    id: "seed-4",
    title: "Chinese Government Scholarship (CSC)",
    country: "China",
    degree: "Bachelors / Masters / PhD",
    deadline: "April 10, 2026",
    source: "External",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=900&q=80",
    shortDetails: "Full scholarship covering tuition, accommodation, living stipend and medical insurance at Chinese universities.",
    fullDetails: "The Chinese Government Scholarship (CSC) supports international students pursuing undergraduate, master's and doctoral degrees in China.\n\nBENEFITS\n• Full tuition waiver\n• Free university accommodation\n• Monthly living stipend\n• Comprehensive medical insurance\n• Chinese language training (where required)\n\nELIGIBILITY\n• Non-Chinese nationality\n• Age and degree requirements vary by program\n• Good academic standing\n\nHOW TO APPLY\nApply through the CSC online system and select up to three university choices. You must also submit a study plan, notarised transcripts and two recommendation letters.",
    createdAt: Date.now() - 200000
  },
  {
    id: "seed-5",
    title: "Australia Awards Scholarship",
    country: "Australia",
    degree: "Masters",
    deadline: "April 30, 2026",
    source: "External",
    image: FALLBACK_IMG,
    shortDetails: "Fully funded postgraduate study in Australia with tuition, living support and travel assistance.",
    fullDetails: "Australia Awards supports future leaders from developing countries to study in Australia.",
    createdAt: Date.now() - 100000
  },
  {
    id: "seed-6",
    title: "DAAD Development-Related Postgraduate Courses",
    country: "Germany",
    degree: "Masters / PhD",
    deadline: "October 15, 2026",
    source: "External",
    image: FALLBACK_IMG,
    shortDetails: "Scholarships for international graduates pursuing development-focused study in Germany.",
    fullDetails: "DAAD scholarships support talented graduates at selected German universities.",
    createdAt: Date.now() - 90000
  },
  {
    id: "seed-7",
    title: "MEXT Japanese Government Scholarship",
    country: "Japan",
    degree: "Bachelors / Masters / PhD",
    deadline: "June 15, 2026",
    source: "External",
    image: FALLBACK_IMG,
    shortDetails: "Government-funded study in Japan with tuition support, stipend and travel allowance.",
    fullDetails: "The MEXT scholarship supports international students across multiple study levels.",
    createdAt: Date.now() - 80000
  },
  {
    id: "seed-8",
    title: "Eiffel Excellence Scholarship",
    country: "France",
    degree: "Masters / PhD",
    deadline: "January 10, 2027",
    source: "External",
    image: FALLBACK_IMG,
    shortDetails: "French government support for outstanding international students at French institutions.",
    fullDetails: "The Eiffel program attracts high-level international applicants to French higher education.",
    createdAt: Date.now() - 70000
  },
  {
    id: "seed-9",
    title: "Rwanda Global Excellence Scholarship",
    country: "Rwanda",
    degree: "Bachelors / Masters",
    deadline: "August 1, 2026",
    source: "GoAbroad",
    image: FALLBACK_IMG,
    shortDetails: "Support for ambitious students pursuing high-quality study opportunities in Rwanda.",
    fullDetails: "This opportunity connects talented students with partner institutions in Rwanda.",
    createdAt: Date.now() - 60000
  }
];

const SERVICES = [
  { icon: "compass", title: "University Selection", description: "Personalised shortlisting of universities and programs that match your profile, budget and career goals." },
  { icon: "trophy", title: "Scholarship Guidance", description: "We identify fully-funded and partial scholarships you qualify for and help you build a winning application." },
  { icon: "file-text", title: "Application & Essays", description: "Complete application support — SOPs, motivation letters, CV polishing and document review." },
  { icon: "plane", title: "Visa & Travel Support", description: "Visa filing, interview preparation, flight booking and pre-departure orientation." },
  { icon: "home", title: "Accommodation & Arrival", description: "Help with on-campus housing, airport pickup and settling into your new city." },
  { icon: "briefcase", title: "Career & Internships", description: "Post-arrival career coaching, internship referrals and part-time work guidance." }
];

const state = {
  route: "home",
  scholarships: [],
  loading: true,
  error: null,
  isAuthed: sessionStorage.getItem(AUTH_KEY) === "1",
  selected: null,
  search: "",
  country: "",
  editingId: null,
  imageData: "",
  founderTyped: false
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const on = (sel, event, handler) => {
  const element = $(sel);
  if (element) element.addEventListener(event, handler);
};
const uid = () => "s-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function toast(message, type = "success") {
  const colors = {
    success: "bg-emerald-600",
    error: "bg-red-600",
    info: "bg-purple-700"
  };
  const icons = { success: "check-circle-2", error: "alert-circle", info: "info" };
  const el = document.createElement("div");
  el.className = "toast-in " + colors[type] + " text-white rounded-2xl px-5 py-4 shadow-2xl flex items-start gap-3 text-sm font-medium";
  el.innerHTML = '<i data-lucide="' + icons[type] + '" class="w-5 h-5 flex-shrink-0 mt-0.5"></i><span>' + esc(message) + "</span>";
  $("#toasts").appendChild(el);
  refreshIcons();
  setTimeout(() => {
    el.style.transition = "opacity .3s ease, transform .3s ease";
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    setTimeout(() => el.remove(), 320);
  }, 3600);
}

const MOTION = {
  up:    { kf: [{ opacity: 0, transform: "translateY(44px)" }, { opacity: 1, transform: "translateY(0)" }], duration: 700, easing: "cubic-bezier(.22,1,.36,1)" },
  down:  { kf: [{ opacity: 0, transform: "translateY(-44px)" }, { opacity: 1, transform: "translateY(0)" }], duration: 700, easing: "cubic-bezier(.22,1,.36,1)" },
  left:  { kf: [{ opacity: 0, transform: "translateX(-60px)" }, { opacity: 1, transform: "translateX(0)" }], duration: 700, easing: "cubic-bezier(.22,1,.36,1)" },
  right: { kf: [{ opacity: 0, transform: "translateX(60px)" }, { opacity: 1, transform: "translateX(0)" }], duration: 700, easing: "cubic-bezier(.22,1,.36,1)" },
  scale: { kf: [{ opacity: 0, transform: "scale(.9)" }, { opacity: 1, transform: "scale(1)" }], duration: 650, easing: "cubic-bezier(.22,1,.36,1)" },
  pop:   { kf: [{ opacity: 0, transform: "scale(.6) rotate(-8deg)" }, { opacity: 1, transform: "scale(1) rotate(0deg)" }], duration: 800, easing: "cubic-bezier(.34,1.56,.64,1)" }
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const motionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    motionObserver.unobserve(entry.target);
    playMotion(entry.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

function playMotion(el) {
  if (el.dataset.motionDone === "1") return;
  el.dataset.motionDone = "1";
  if (reduceMotion) { el.style.opacity = 1; return; }

  const preset = MOTION[el.dataset.motion] || MOTION.up;
  const delay = parseInt(el.dataset.delay || "0", 10);

  el.animate(preset.kf, {
    duration: preset.duration,
    delay: delay,
    easing: preset.easing,
    fill: "both"
  });
}

function setupMotion(root = document) {
  $$("[data-motion]", root).forEach((el) => {
    if (el.dataset.motionDone === "1") return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      playMotion(el);
    } else {
      motionObserver.observe(el);
    }
  });
}

function runCounters() {
  $$("[data-count]").forEach((el) => {
    if (el.dataset.counted === "1") return;
    el.dataset.counted = "1";
    const target = parseInt(el.dataset.count, 10);
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(target * eased).toLocaleString() + (p === 1 ? "+" : "");
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

const FOUNDER_TEXT_1 = "When I started GoAbroad Admissions, I had one goal: to make world-class education accessible to every ambitious student, no matter where they come from. I have walked this road myself — I know how confusing the applications, the deadlines and the visa process can feel.";
const FOUNDER_TEXT_2 = "Our team walks with you from your very first question to your visa approval: scholarships, university applications, essays, interviews and pre-departure preparation. Your dream is our mission.";

function typeWriter(el, text, speed, onDone) {
  if (reduceMotion) { el.textContent = text; if (onDone) onDone(); return; }
  let i = 0;
  el.textContent = "";
  (function step() {
    el.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(step, speed);
    else if (onDone) onDone();
  })();
}

function startFounderTyping() {
  if (state.founderTyped) return;
  state.founderTyped = true;
  const el1 = $("#founderText1");
  const el2 = $("#founderText2");
  if (!el1 || !el2) return;
  el1.classList.add("cursor-blink");
  typeWriter(el1, FOUNDER_TEXT_1, 14, () => {
    el1.classList.remove("cursor-blink");
    el2.classList.add("cursor-blink");
    typeWriter(el2, FOUNDER_TEXT_2, 14, () => el2.classList.remove("cursor-blink"));
  });
}

const useRemote = () => Boolean(CONFIG.JSONBIN_KEY && CONFIG.JSONBIN_BIN_ID);

async function loadScholarships() {
  if (useRemote()) {
    const res = await fetch("https://api.jsonbin.io/v3/b/" + CONFIG.JSONBIN_BIN_ID + "/latest", {
      headers: { "X-Master-Key": CONFIG.JSONBIN_KEY, "X-Bin-Meta": "false" }
    });
    if (!res.ok) throw new Error("JSONBin read failed (" + res.status + ")");
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.scholarships)) return data.scholarships;
    return [];
  }
  const raw = localStorage.getItem(LS_KEY);
  if (raw) {
    try {
      const stored = JSON.parse(raw);
      if (Array.isArray(stored)) {
        const existingIds = new Set(stored.map((scholarship) => scholarship.id));
        return stored.concat(SEED.filter((scholarship) => !existingIds.has(scholarship.id)));
      }
    } catch (e) { }
  }
  return SEED.slice();
}

async function persistScholarships(list) {
  if (useRemote()) {
    try {
      const res = await fetch("https://api.jsonbin.io/v3/b/" + CONFIG.JSONBIN_BIN_ID, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Master-Key": CONFIG.JSONBIN_KEY },
        body: JSON.stringify(list)
      });
      if (!res.ok) throw new Error("JSONBin write failed (" + res.status + ")");
      return;
    } catch (error) {
      console.warn(error.message + ". Saved scholarship changes locally.");
    }
  }
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function chip(icon, text) {
  if (!text) return "";
  return '<span class="text-xs bg-gray-100 text-purple-700 px-3 py-1.5 rounded-full font-medium inline-flex items-center gap-1 hover:bg-purple-100 transition-colors">' +
    '<i data-lucide="' + icon + '" class="w-3 h-3"></i>' + esc(text) + "</span>";
}

function scholarshipCard(s, idx) {
  const sourceClass = (s.source === "GoAbroad") ? "bg-green-600/90" : "bg-blue-600/90";
  return '' +
  '<article data-motion="left" data-delay="' + (idx * 100) + '" ' +
    'class="card-hover group bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden border border-gray-100 hover:border-purple-200" ' +
    'data-action="open" data-id="' + esc(s.id) + '">' +
    '<div class="flex flex-col md:flex-row">' +
      '<div class="md:w-56 h-56 md:h-auto relative overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50 flex-shrink-0">' +
        '<img src="' + esc(s.image || FALLBACK_IMG) + '" alt="' + esc(s.title) + '" loading="lazy" ' +
          'class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" ' +
          'onerror="this.onerror=null;this.src=\'' + FALLBACK_IMG + '\'">' +
        '<div class="absolute top-4 left-4">' +
          '<span class="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md inline-flex items-center gap-1">' +
            '<i data-lucide="trophy" class="w-3 h-3"></i> Fully Funded</span>' +
        '</div>' +
        '<div class="absolute bottom-4 right-4">' +
          '<span class="text-white text-xs px-3 py-1.5 rounded-full inline-flex items-center gap-1 backdrop-blur-md shadow-lg ' + sourceClass + '">' +
            '<i data-lucide="external-link" class="w-3 h-3"></i> ' + esc(s.source || "GoAbroad") + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="flex-1 p-6 min-w-0">' +
        '<h3 class="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">' +
          esc(s.title) + '</h3>' +
        '<div class="flex flex-wrap gap-2 mb-4">' +
          chip("globe", s.country) +
          chip("graduation-cap", s.degree) +
          chip("calendar", s.deadline) +
        '</div>' +
        '<p class="text-gray-600 text-sm mb-5 line-clamp-3 leading-relaxed">' + esc(s.shortDetails || "") + '</p>' +
        '<div class="flex flex-wrap gap-3">' +
          '<button data-action="open" data-id="' + esc(s.id) + '" ' +
            'class="bg-gradient-to-r from-purple-700 to-purple-900 text-white px-5 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2">' +
            '<i data-lucide="book-open" class="w-4 h-4"></i> Read More</button>' +
          '<button data-action="assist" ' +
            'class="border-2 border-purple-600 text-purple-700 px-5 py-2 rounded-xl text-sm font-medium hover:bg-purple-50 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2">' +
            '<i data-lucide="message-square" class="w-4 h-4"></i> Request Assistance</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</article>';
}

function emptyState(message, sub) {
  return '<div data-motion="scale" class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">' +
    '<i data-lucide="book-open" class="w-20 h-20 text-gray-300 mx-auto mb-4"></i>' +
    '<p class="text-gray-500 font-medium">' + esc(message) + '</p>' +
    (sub ? '<p class="text-gray-400 text-sm mt-2">' + esc(sub) + '</p>' : '') +
  '</div>';
}

function loadingState() {
  return '<div class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">' +
    '<div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-700 mb-4"></div>' +
    '<p class="text-gray-500 font-medium">Loading latest scholarships...</p>' +
  '</div>';
}

function errorState(message) {
  return '<div class="text-center py-20 bg-red-50 rounded-2xl shadow-sm border border-red-200">' +
    '<i data-lucide="alert-circle" class="w-16 h-16 text-red-500 mx-auto mb-4"></i>' +
    '<p class="text-red-600 font-medium mb-4">' + esc(message) + '</p>' +
    '<button data-action="reload" class="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition inline-flex items-center gap-2 mx-auto">' +
      '<i data-lucide="refresh-cw" class="w-4 h-4"></i> Refresh</button>' +
  '</div>';
}

function renderHomeScholarships() {
  const box = $("#homeScholarshipList");
  if (!box) return;
  if (state.loading) { box.innerHTML = loadingState(); return; }
  if (state.error) { box.innerHTML = errorState(state.error); return; }

  const list = state.scholarships
    .filter((s) => !state.country || s.country === state.country)
    .slice(0, 4);
  box.innerHTML = list.length
    ? list.map(scholarshipCard).join("")
    : emptyState("No scholarships available at the moment.", "Please check back later.");

  refreshIcons();
  setupMotion(box);
}

function renderAllScholarships() {
  const box = $("#allScholarshipList");
  if (!box) return;
  if (state.loading) { box.innerHTML = loadingState(); return; }
  if (state.error) { box.innerHTML = errorState(state.error); return; }

  const q = state.search.trim().toLowerCase();
  const list = state.scholarships.filter((s) => {
    const matchesQuery = !q ||
      (s.title || "").toLowerCase().includes(q) ||
      (s.country || "").toLowerCase().includes(q) ||
      (s.degree || "").toLowerCase().includes(q) ||
      (s.shortDetails || "").toLowerCase().includes(q);
    const matchesCountry = !state.country || s.country === state.country;
    return matchesQuery && matchesCountry;
  });

  box.innerHTML = list.length
    ? list.map(scholarshipCard).join("")
    : emptyState("No scholarships match your search.", "Try a different keyword or destination.");

  refreshIcons();
  setupMotion(box);
}

function renderCountryFilter() {
  const select = $("#countryFilter");
  if (!select) return;
  const countries = Array.from(new Set(state.scholarships.map((s) => s.country).filter(Boolean))).sort();
  const current = select.value;
  select.innerHTML = '<option value="">All Destinations</option>' +
    countries.map((c) => '<option value="' + esc(c) + '">' + esc(c) + "</option>").join("");
  select.value = current;
}

function renderServices() {
  const grid = $("#servicesGrid");
  if (!grid) return;
  grid.innerHTML = SERVICES.map((service, index) =>
    '<div data-motion="up" data-delay="' + (index * 80) + '" ' +
      'class="card-hover group bg-white p-8 rounded-2xl border-l-4 border-purple-600 shadow-md cursor-pointer">' +
      '<div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">' +
        '<i data-lucide="' + service.icon + '" class="w-7 h-7 text-purple-700"></i></div>' +
      '<h3 class="text-lg font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">' + esc(service.title) + '</h3>' +
      '<p class="text-gray-500 text-sm leading-relaxed">' + esc(service.description) + '</p>' +
    '</div>'
  ).join("");
  refreshIcons();
  setupMotion(grid);
}

function renderDashboard() {
  if (!state.isAuthed) return;

  const badge = $("#storageBadge");
  const list = $("#dashboardList");
  if (!badge || !list) return;
  badge.innerHTML = useRemote()
    ? '<i data-lucide="cloud" class="w-3.5 h-3.5 inline mr-1"></i> JSONBin Cloud Storage'
    : '<i data-lucide="hard-drive" class="w-3.5 h-3.5 inline mr-1"></i> Local Storage (demo)';

  const total = state.scholarships.length;
  const goabroad = state.scholarships.filter((s) => s.source === "GoAbroad").length;
  const external = state.scholarships.filter((s) => s.source !== "GoAbroad").length;
  const countries = new Set(state.scholarships.map((s) => s.country).filter(Boolean)).size;

  [["#statTotal", total], ["#statGoabroad", goabroad], ["#statExternal", external], ["#statCountries", countries], ["#dashCount", total + " item" + (total === 1 ? "" : "s")]].forEach(([selector, value]) => {
    const element = $(selector);
    if (element) element.textContent = value;
  });
  if (!total) {
    list.innerHTML = '<div class="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">' +
      '<i data-lucide="inbox" class="w-14 h-14 text-gray-300 mx-auto mb-3"></i>' +
      '<p class="text-gray-500 font-medium">No scholarships yet</p>' +
      '<p class="text-gray-400 text-sm mt-1">Use the form to publish your first scholarship.</p></div>';
    refreshIcons();
    return;
  }

  list.innerHTML = state.scholarships
    .slice()
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .map((s) =>
      '<div data-motion="right" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex gap-4 hover:shadow-lg transition">' +
        '<img src="' + esc(s.image || FALLBACK_IMG) + '" alt="" class="w-24 h-24 rounded-xl object-cover flex-shrink-0" ' +
          'onerror="this.onerror=null;this.src=\'' + FALLBACK_IMG + '\'">' +
        '<div class="flex-1 min-w-0">' +
          '<h3 class="font-bold text-gray-800 line-clamp-1">' + esc(s.title) + '</h3>' +
          '<p class="text-xs text-gray-500 mt-1 line-clamp-2">' + esc(s.shortDetails || "") + '</p>' +
          '<div class="flex flex-wrap gap-2 mt-2">' +
            '<span class="text-[11px] bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-semibold">' + esc(s.country || "—") + '</span>' +
            '<span class="text-[11px] bg-purple-50 text-purple-700 px-2 py-1 rounded-full font-semibold">' + esc(s.degree || "—") + '</span>' +
            '<span class="text-[11px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-semibold">' + esc(s.source || "GoAbroad") + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="flex flex-col gap-2 flex-shrink-0">' +
          '<button data-action="edit" data-id="' + esc(s.id) + '" title="Edit" ' +
            'class="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 flex items-center justify-center transition">' +
            '<i data-lucide="pencil" class="w-4 h-4"></i></button>' +
          '<button data-action="delete" data-id="' + esc(s.id) + '" title="Delete" ' +
            'class="w-9 h-9 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition">' +
            '<i data-lucide="trash-2" class="w-4 h-4"></i></button>' +
        '</div>' +
      '</div>'
    ).join("");

  refreshIcons();
  setupMotion(list);
}

function renderAll() {
  renderHomeScholarships();
  renderAllScholarships();
  renderCountryFilter();
  renderServices();
  renderDashboard();
}

function openModal(scholarship) {
  state.selected = scholarship;
  const m = $("#modal");

  $("#modalImage").src = scholarship.image || FALLBACK_IMG;
  $("#modalImage").onerror = function () { this.onerror = null; this.src = FALLBACK_IMG; };
  $("#modalTitle").textContent = scholarship.title || "";

  const srcBadge = $("#modalSource");
  srcBadge.className = "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-lg " +
    (scholarship.source === "GoAbroad" ? "bg-green-600/90 text-white" : "bg-blue-600/90 text-white");
  srcBadge.querySelector("span").textContent = scholarship.source || "GoAbroad";

  $("#modalCountry").textContent = scholarship.country || "—";
  $("#modalDegree").textContent = scholarship.degree || "—";
  $("#modalDeadline").textContent = scholarship.deadline || "—";
  $("#modalSourceText").textContent = scholarship.source || "GoAbroad";
  $("#modalFull").textContent = scholarship.fullDetails || scholarship.shortDetails || "No further details provided.";

  m.classList.remove("hidden");
  m.classList.add("flex");
  document.body.style.overflow = "hidden";

  if (!reduceMotion) {
    $("#modalCard").animate(
      [{ opacity: 0, transform: "scale(.92) translateY(30px)" }, { opacity: 1, transform: "scale(1) translateY(0)" }],
      { duration: 400, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" }
    );
  }
  refreshIcons();
}

function closeModal() {
  const m = $("#modal");
  m.classList.add("hidden");
  m.classList.remove("flex");
  document.body.style.overflow = "";
  state.selected = null;
}

const ROUTES = ["home", "scholarships", "login", "dashboard"];

function parseRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "").split("?")[0];
  if (!hash) return "home";
  return ROUTES.includes(hash) ? hash : "home";
}

function navigate(route) {
  if (route === "dashboard" && !state.isAuthed) {
    toast("Please sign in to access the dashboard.", "info");
    window.location.hash = "#/login";
    return;
  }
  window.location.hash = "#/" + (route === "home" ? "" : route);
}

function renderRoute() {
  const route = parseRoute();

  if (route === "dashboard" && !state.isAuthed) {
    window.location.hash = "#/login";
    return;
  }

  state.route = route;

  const hideLayout = route === "login" || route === "dashboard";
  const appHeader = $("#appHeader");
  const appFooter = $("#appFooter");
  appHeader.classList.toggle("hidden", hideLayout);
  appFooter.classList.toggle("hidden", hideLayout);
  appHeader.style.display = hideLayout ? "none" : "";
  appFooter.style.display = hideLayout ? "none" : "";

  $$(".view").forEach((v) => v.classList.add("hidden"));
  const view = $("#view-" + route);
  if (view) {
    view.classList.remove("hidden");
    view.classList.remove("fade-view");
    void view.offsetWidth;
    view.classList.add("fade-view");
  }

  $$("[data-nav]").forEach((a) => {
    a.classList.toggle("active", a.dataset.nav === route);
  });

  $$("[data-motion]", view || document).forEach((el) => {
    el.dataset.motionDone = "0";
    el.style.opacity = "";
  });
  setupMotion(view || document);

  if (route === "home") {
    runCounters();
    const founder = $("#founder");
    if (founder) {
      const rect = founder.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) startFounderTyping();
    }
  }

  if (route === "dashboard") renderDashboard();

  window.scrollTo({ top: 0, behavior: "auto" });
  $("#mobileMenu").classList.add("hidden");
  refreshIcons();
}

function openGoogleForm() {
  window.open(CONFIG.GOOGLE_FORM_URL, "_blank", "noopener");
}

document.addEventListener("click", async (e) => {
  const actionEl = e.target.closest("[data-action]");
  const scrollEl = e.target.closest("[data-scroll]");

  if (scrollEl) {
    const id = scrollEl.dataset.scroll;
    if (state.route !== "home") {
      window.location.hash = "#/";
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    } else {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    $("#mobileMenu").classList.add("hidden");
    return;
  }

  if (!actionEl) return;
  const action = actionEl.dataset.action;
  const id = actionEl.dataset.id;

  if (action === "assist") {
    e.preventDefault();
    openGoogleForm();
    return;
  }

  if (action === "open") {
    if (e.target.closest("button")) return;
    const s = state.scholarships.find((x) => x.id === id);
    if (s) openModal(s);
    return;
  }

  if (action === "close-modal") {
    closeModal();
    return;
  }

  if (action === "reload") {
    await bootstrap();
    return;
  }

  if (action === "logout") {
    state.isAuthed = false;
    sessionStorage.removeItem(AUTH_KEY);
    toast("Signed out successfully.", "info");
    window.location.hash = "#/";
    return;
  }

  if (action === "edit") {
    const s = state.scholarships.find((x) => x.id === id);
    if (!s) return;
    state.editingId = s.id;
    state.imageData = "";
    $("#editId").value = s.id;
    $("#fTitle").value = s.title || "";
    $("#fShort").value = s.shortDetails || "";
    $("#fFull").value = s.fullDetails || "";
    $("#fImageUrl").value = (s.image && s.image.startsWith("data:")) ? "" : (s.image || "");
    $("#fCountry").value = s.country || "";
    $("#fDegree").value = s.degree || "";
    $("#fDeadline").value = s.deadline || "";
    $("#fSource").value = s.source || "GoAbroad";

    if (s.image) {
      $("#imagePreviewWrap").classList.remove("hidden");
      $("#imagePreview").src = s.image;
    } else {
      $("#imagePreviewWrap").classList.add("hidden");
    }

    $("#formTitle").textContent = "Edit Scholarship";
    $("#submitLabel").textContent = "Update Scholarship";
    $("#cancelEdit").classList.remove("hidden");
    $("#scholarshipForm").scrollIntoView({ behavior: "smooth", block: "center" });
    refreshIcons();
    return;
  }

  if (action === "delete") {
    const s = state.scholarships.find((x) => x.id === id);
    if (!s) return;
    if (!confirm('Delete "' + s.title + '"? This cannot be undone.')) return;

    const previous = state.scholarships.slice();
    state.scholarships = state.scholarships.filter((x) => x.id !== id);
    renderAll();
    try {
      await persistScholarships(state.scholarships);
      toast("Scholarship deleted.");
    } catch (err) {
      state.scholarships = previous;
      renderAll();
      toast(err.message, "error");
    }
    return;
  }
});

on("#modal", "click", (e) => {
  if (e.target.id === "modal") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

on("#loginForm", "submit", (e) => {
  e.preventDefault();
  const email = $("#loginEmail").value.trim();
  const password = $("#loginPassword").value;
  const errorBox = $("#loginError");

  if (!email || !password) {
    errorBox.textContent = "Please enter both your email and password.";
    errorBox.classList.remove("hidden");
    return;
  }

  if (email.toLowerCase() === CONFIG.ADMIN.email.toLowerCase() && password === CONFIG.ADMIN.password) {
    state.isAuthed = true;
    sessionStorage.setItem(AUTH_KEY, "1");
    errorBox.classList.add("hidden");
    $("#loginForm").reset();
    toast("Welcome back, Admin!");
    window.location.hash = "#/dashboard";
  } else {
    errorBox.textContent = "Invalid email or password. Please try again.";
    errorBox.classList.remove("hidden");
    if (!reduceMotion) {
      $("#loginForm").animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "translateX(0)" }],
        { duration: 300, easing: "ease-in-out" }
      );
    }
  }
});

on("#togglePassword", "click", () => {
  const input = $("#loginPassword");
  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  $("#togglePassword").innerHTML = '<i data-lucide="' + (isPassword ? "eye-off" : "eye") + '" class="w-4 h-4"></i>';
  refreshIcons();
});

on("#fImageUrl", "input", (e) => {
  const url = e.target.value.trim();
  if (url) {
    $("#imagePreviewWrap").classList.remove("hidden");
    $("#imagePreview").src = url;
    state.imageData = "";
    $("#fImageFile").value = "";
  } else {
    $("#imagePreviewWrap").classList.add("hidden");
  }
});

on("#fImageFile", "change", (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 900 * 1024) {
    toast("Image is larger than 900KB. Please use a smaller file or an image URL.", "error");
    e.target.value = "";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    state.imageData = reader.result;
    $("#fImageUrl").value = "";
    $("#imagePreviewWrap").classList.remove("hidden");
    $("#imagePreview").src = state.imageData;
  };
  reader.readAsDataURL(file);
});

on("#cancelEdit", "click", resetForm);

function resetForm() {
  state.editingId = null;
  state.imageData = "";
  $("#scholarshipForm").reset();
  $("#editId").value = "";
  $("#imagePreviewWrap").classList.add("hidden");
  $("#imagePreview").src = "";
  $("#formError").classList.add("hidden");
  $("#formTitle").textContent = "Post a New Scholarship";
  $("#submitLabel").textContent = "Publish Scholarship";
  $("#cancelEdit").classList.add("hidden");
}

on("#scholarshipForm", "submit", async (e) => {
  e.preventDefault();

  const title  = $("#fTitle").value.trim();
  const shortD = $("#fShort").value.trim();
  const fullD  = $("#fFull").value.trim();
  const imgUrl = $("#fImageUrl").value.trim();
  const image  = state.imageData || imgUrl;
  const errorBox = $("#formError");

  if (!title || !shortD || !fullD || !image) {
    errorBox.textContent = "Title, short details, full details and an image are all required.";
    errorBox.classList.remove("hidden");
    return;
  }
  errorBox.classList.add("hidden");

  const payload = {
    title,
    shortDetails: shortD,
    fullDetails: fullD,
    image,
    country: $("#fCountry").value.trim() || "Worldwide",
    degree: $("#fDegree").value.trim() || "All levels",
    deadline: $("#fDeadline").value.trim() || "Open",
    source: $("#fSource").value
  };

  const btn = $("#submitBtn");
  const originalHTML = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Saving...';
  refreshIcons();

  const previous = state.scholarships.slice();

  if (state.editingId) {
    state.scholarships = state.scholarships.map((s) =>
      s.id === state.editingId ? Object.assign({}, s, payload) : s
    );
  } else {
    state.scholarships = [Object.assign({ id: uid(), createdAt: Date.now() }, payload)].concat(state.scholarships);
  }

  try {
    await persistScholarships(state.scholarships);
    toast(state.editingId ? "Scholarship updated successfully!" : "Scholarship published successfully!");
    resetForm();
    renderAll();
  } catch (err) {
    state.scholarships = previous;
    renderAll();
    toast(err.message, "error");
  } finally {
    btn.disabled = false;
    btn.innerHTML = originalHTML;
    refreshIcons();
  }
});

on("#countryFilter", "change", (e) => {
  state.country = e.target.value;
  renderHomeScholarships();
  renderAllScholarships();
});

on("#mobileToggle", "click", () => {
  $("#mobileMenu").classList.toggle("hidden");
});

window.addEventListener("scroll", () => {
  const header = $("#appHeader");
  if (window.scrollY > 0) {
    header.classList.add(
      "bg-gradient-to-r",
      "from-yellow-400/90",
      "via-amber-300/85",
      "to-purple-800/90",
      "backdrop-blur-md",
      "border-yellow-200/40",
      "shadow-2xl"
    );
    header.classList.remove(
      "from-yellow-400/55",
      "via-amber-300/50",
      "to-purple-800/55",
      "backdrop-blur-sm",
      "border-yellow-200/25",
      "bg-transparent",
      "backdrop-blur-none",
      "border-transparent"
    );
  } else {
    header.classList.remove(
      "from-yellow-400/90",
      "via-amber-300/85",
      "to-purple-800/90",
      "backdrop-blur-md",
      "border-yellow-200/40",
      "shadow-2xl"
    );
    header.classList.add(
      "from-yellow-400/55",
      "via-amber-300/50",
      "to-purple-800/55",
      "backdrop-blur-sm",
      "border-yellow-200/25"
    );
  }

  if (state.route === "home") {
    const founder = $("#founder");
    if (founder) {
      const rect = founder.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) startFounderTyping();
    }
  }
}, { passive: true });

async function bootstrap() {
  state.loading = true;
  state.error = null;
  renderHomeScholarships();
  renderAllScholarships();

  try {
    const data = await loadScholarships();
    state.scholarships = Array.isArray(data) ? data : [];
  } catch (err) {
    state.error = err.message || "Unable to load scholarships.";
    state.scholarships = [];
  } finally {
    state.loading = false;
    renderAll();
  }
}

window.addEventListener("hashchange", renderRoute);

(async function init() {
  refreshIcons();

  if (!useRemote()) {
    console.info(
      "%cGoAbroad Admissions%c\nRunning in LOCAL STORAGE mode.\nTo enable JSONBin cloud storage, set CONFIG.JSONBIN_KEY and CONFIG.JSONBIN_BIN_ID.",
      "font-weight:bold;color:#7c3aed;font-size:14px", "color:#555"
    );
  }

  await bootstrap();
  renderRoute();
  setupMotion();
  runCounters();
  refreshIcons();
})();
