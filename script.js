(() => {
  "use strict";

  // ---------- Config (edit these) ----------
  const CONFIG = {
    whatsappNumber: "94778147389",          // +94 77 814 7389, digits only, no +
    whatsappMessage: "Hello Jeyam Real Estate, I would like to know more about your projects.",
    formEndpoint: "",                       // e.g. a Formspree / Vercel function URL; empty = demo mode
  };

  // Portfolio projects. PLACEHOLDERS: replace with your real projects.
  // Add a photo later by setting `image` to a URL in the project's folder.
  const PROJECTS = [
    { id: 1, category: "land", title: "Residential land development", location: "Jaffna", year: 2023, size: "20 perches", tint: ["#0f766e", "#14b8a6"], desc: "Plot layout and access road for a residential development in a quiet neighbourhood." },
    { id: 2, category: "home", title: "Family home with garden", location: "Jaffna", year: 2024, size: "1,850 sq ft", tint: ["#334155", "#64748b"], desc: "Three-bedroom custom home with a front garden, car porch and open-plan kitchen." },
    { id: 3, category: "commercial", title: "Shop and office space", location: "Jaffna town", year: 2022, size: "2,400 sq ft", tint: ["#1e3a8a", "#3b82f6"], desc: "Ground-floor retail space with office area on a main road, built for a local business." },
    { id: 4, category: "home", title: "Custom build, modern design", location: "Jaffna area", year: 2025, size: "1,400 sq ft", tint: ["#166534", "#22c55e"], desc: "New home designed to the client's brief, from floor plan to handover." },
    { id: 5, category: "land", title: "Plot development project", location: "Jaffna area", year: 2024, size: "12 perches", tint: ["#78350f", "#f59e0b"], desc: "Small-scale land development, prepared for future home construction." },
    { id: 6, category: "commercial", title: "Showroom fit-out", location: "Jaffna", year: 2025, size: "1,000 sq ft", tint: ["#7c2d12", "#ea580c"], desc: "Showroom design and construction for a retail client." },
  ];

  const CATEGORY_LABEL = { land: "Land development", home: "Custom home", commercial: "Commercial" };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const waLink = (text) =>
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text || CONFIG.whatsappMessage)}`;

  // ---------- Static links & year ----------
  $("#year").textContent = new Date().getFullYear();
  ["#heroWhatsApp", "#waSocial", "#floatWhatsApp"].forEach((s) => ($(s).href = waLink()));
  $("#phoneLink").href = "tel:+" + CONFIG.whatsappNumber;

  // ---------- Header: shadow on scroll + mobile menu ----------
  const header = $("#siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $("#menuToggle");
  const nav = $("#mainNav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  });
  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }
  });

  // ---------- Dark mode ----------
  const themeBtn = $("#themeToggle");
  const root = document.documentElement;
  const prefersDark = () => matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = (() => { try { return localStorage.getItem("jeyam-theme"); } catch { return null; } })();
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  const currentTheme = () => root.getAttribute("data-theme") || (prefersDark() ? "dark" : "light");
  const syncThemeLabel = () => { themeBtn.textContent = currentTheme() === "dark" ? "Light mode" : "Dark mode"; };
  themeBtn.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("jeyam-theme", next); } catch { /* storage unavailable */ }
    syncThemeLabel();
  });
  syncThemeLabel();

  // ---------- Portfolio: filter and render ----------
  const grid = $("#listingGrid");
  const countEl = $("#resultCount");
  const emptyEl = $("#emptyState");
  const chips = $$(".chip");
  let activeCategory = "all";

  function render() {
    const list = PROJECTS.filter((p) => activeCategory === "all" || p.category === activeCategory);
    grid.innerHTML = "";
    list.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "listing";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${p.title}, ${p.location}. View details`);
      card.style.animationDelay = `${i * 60}ms`;
      card.innerHTML = `
        <div class="listing-visual" style="background:linear-gradient(135deg, ${p.tint[0]}, ${p.tint[1]})">
          <span class="tag">${CATEGORY_LABEL[p.category]}</span>
          <span aria-hidden="true">${CATEGORY_LABEL[p.category].charAt(0)}</span>
        </div>
        <div class="listing-body">
          <h3></h3>
          <p class="listing-meta">${p.location} &middot; ${p.year}</p>
          <div class="listing-specs"><span>${p.size}</span></div>
        </div>`;
      card.querySelector("h3").textContent = p.title;
      card.addEventListener("click", () => openModal(p));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(p); }
      });
      grid.appendChild(card);
    });
    countEl.textContent = `${list.length} ${list.length === 1 ? "project" : "projects"}`;
    emptyEl.hidden = list.length > 0;
  }

  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.filter;
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      render();
    })
  );

  // ---------- Project modal ----------
  const modal = $("#modal");
  let lastFocus = null;

  function openModal(p) {
    lastFocus = document.activeElement;
    $("#modalVisual").style.background = `linear-gradient(135deg, ${p.tint[0]}, ${p.tint[1]})`;
    $("#modalVisual").textContent = CATEGORY_LABEL[p.category].charAt(0);
    $("#modalTitle").textContent = p.title;
    $("#modalMeta").textContent = `${p.location} · ${p.year}`;
    $("#modalDesc").textContent = p.desc;
    const specs = $("#modalSpecs");
    specs.innerHTML = "";
    [CATEGORY_LABEL[p.category], p.location, p.size, String(p.year)]
      .forEach((t) => { const li = document.createElement("li"); li.textContent = t; specs.appendChild(li); });
    $("#modalWhatsApp").href = waLink(`Hello, I would like to know more about your project "${p.title}".`);
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  $("#modalClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });

  // ---------- Counters ----------
  const counters = $$("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / 900, 1);
          el.textContent = Math.round(target * p);
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => io.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  // ---------- Contact form ----------
  const form = $("#contactForm");
  const status = $("#formStatus");
  const rules = {
    cName: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
    cPhone: (v) => (/^\+?[0-9\s-]{9,15}$/.test(v.trim()) ? "" : "Enter a valid phone number."),
    cMessage: (v) => (v.trim().length >= 5 ? "" : "Please write a short message."),
  };

  function validateField(id) {
    const input = document.getElementById(id);
    const msg = rules[id](input.value);
    input.closest(".field").classList.toggle("invalid", !!msg);
    input.setAttribute("aria-invalid", String(!!msg));
    $(`[data-error-for="${id}"]`).textContent = msg;
    return !msg;
  }

  Object.keys(rules).forEach((id) => {
    document.getElementById(id).addEventListener("blur", () => validateField(id));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = Object.keys(rules).map(validateField).every(Boolean);
    if (!ok) { status.textContent = "Please fix the highlighted fields."; return; }

    const data = Object.fromEntries(new FormData(form).entries());
    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    status.textContent = "Sending...";

    try {
      if (CONFIG.formEndpoint) {
        const res = await fetch(CONFIG.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Demo mode: no backend configured yet, so open WhatsApp with the message instead.
        window.open(waLink(`Name: ${data.name}\nPhone: ${data.phone}\nInterest: ${data.interest}\n${data.message}`), "_blank", "noopener");
      }
      status.textContent = "Thank you! We will contact you shortly.";
      form.reset();
    } catch {
      status.textContent = "Sorry, something went wrong. Please call or WhatsApp us directly.";
    } finally {
      btn.disabled = false;
    }
  });

  // ---------- Init ----------
  render();
})();
