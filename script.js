(() => {
  "use strict";

  // ---------- Config (edit these) ----------
  const CONFIG = {
    whatsappNumber: "94778147389",          // +94 77 814 7389, digits only, no +
    whatsappMessage: "Hello Jeyam Real Estate, I would like to know more about your properties.",
    formEndpoint: "",                       // e.g. a Formspree / Vercel function URL; empty = demo mode
  };

  // Sample listings. Replace with real ones (no photos were downloaded; add image URLs to `image` when you have them).
  const LISTINGS = [
    { id: 1, type: "land", title: "Residential land, near Jaffna town", location: "Jaffna", price: 12000000, area: "20 perches", beds: null, tint: ["#0f766e", "#14b8a6"], desc: "Level residential plot in a quiet neighbourhood. Good road access, ready for a custom home." },
    { id: 2, type: "house", title: "Family house with garden", location: "Jaffna", price: 34500000, area: "1,850 sq ft", beds: 3, tint: ["#334155", "#64748b"], desc: "Three-bedroom house with a front garden, car porch and an open kitchen. Close to schools and shops." },
    { id: 3, type: "apartment", title: "Modern apartment, city centre", location: "Jaffna", price: 18900000, area: "1,100 sq ft", beds: 2, tint: ["#7c2d12", "#ea580c"], desc: "Two-bedroom apartment on a higher floor with balcony and secure parking." },
    { id: 4, type: "commercial", title: "Commercial space on main road", location: "Jaffna", price: 42000000, area: "2,400 sq ft", beds: null, tint: ["#1e3a8a", "#3b82f6"], desc: "Ground-floor shop space on a busy main road. Suitable for retail, office or showroom." },
    { id: 5, type: "house", title: "New build home, custom design", location: "Jaffna area", price: 27500000, area: "1,400 sq ft", beds: 3, tint: ["#166534", "#22c55e"], desc: "Newly built home designed to your brief. Built by Jeyam with full construction support." },
    { id: 6, type: "land", title: "Land plot for development", location: "Jaffna area", price: 7800000, area: "12 perches", beds: null, tint: ["#78350f", "#f59e0b"], desc: "Affordable plot ideal for a first home or a small development project." },
  ];

  const TYPE_LABEL = { land: "Land", house: "House", apartment: "Apartment", commercial: "Commercial" };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const fmtLKR = (n) => "LKR " + n.toLocaleString("en-LK");
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
  const savedTheme = (() => { try { return localStorage.getItem("jeyam-theme"); } catch { return null; } })();
  if (savedTheme) root.setAttribute("data-theme", savedTheme);
  const syncThemeLabel = () => {
    const current = root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    themeBtn.textContent = current === "dark" ? "Light mode" : "Dark mode";
  };
  themeBtn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("jeyam-theme", next); } catch { /* storage unavailable */ }
    syncThemeLabel();
  });
  syncThemeLabel();

  // ---------- Listings: filter, sort, render ----------
  const grid = $("#listingGrid");
  const countEl = $("#resultCount");
  const emptyEl = $("#emptyState");
  const chips = $$(".chip");
  const sortSel = $("#sortBy");
  const quickType = $("#qType");
  const quickMax = $("#qMax");
  let activeType = "all";

  function getFiltered() {
    const max = Number(quickMax.value) || Infinity;
    let list = LISTINGS.filter((l) =>
      (activeType === "all" || l.type === activeType) && l.price <= max
    );
    if (sortSel.value === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sortSel.value === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }

  function render() {
    const list = getFiltered();
    grid.innerHTML = "";
    list.forEach((l, i) => {
      const card = document.createElement("article");
      card.className = "listing";
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `${l.title}, ${fmtLKR(l.price)}. View details`);
      card.style.animationDelay = `${i * 60}ms`;
      card.innerHTML = `
        <div class="listing-visual" style="background:linear-gradient(135deg, ${l.tint[0]}, ${l.tint[1]})">
          <span class="tag">${TYPE_LABEL[l.type]}</span>
          <span aria-hidden="true">${TYPE_LABEL[l.type].charAt(0)}</span>
        </div>
        <div class="listing-body">
          <div class="listing-price">${fmtLKR(l.price)}</div>
          <h3></h3>
          <p class="listing-meta">${l.location}</p>
          <div class="listing-specs">
            <span>${l.area}</span>
            ${l.beds ? `<span>${l.beds} bed</span>` : ""}
          </div>
        </div>`;
      card.querySelector("h3").textContent = l.title;
      card.addEventListener("click", () => openModal(l));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(l); }
      });
      grid.appendChild(card);
    });
    countEl.textContent = `${list.length} ${list.length === 1 ? "property" : "properties"} found`;
    emptyEl.hidden = list.length > 0;
  }

  chips.forEach((chip) =>
    chip.addEventListener("click", () => {
      activeType = chip.dataset.filter;
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      quickType.value = activeType;
      render();
    })
  );
  sortSel.addEventListener("change", render);

  $("#quickSearch").addEventListener("submit", (e) => {
    e.preventDefault();
    activeType = quickType.value;
    chips.forEach((c) => c.classList.toggle("is-active", c.dataset.filter === activeType));
    render();
    $("#listings").scrollIntoView({ behavior: "smooth" });
  });
  quickType.addEventListener("change", () => {
    activeType = quickType.value;
    chips.forEach((c) => c.classList.toggle("is-active", c.dataset.filter === activeType));
  });
  quickMax.addEventListener("change", render);

  // ---------- Modal ----------
  const modal = $("#modal");
  let lastFocus = null;

  function openModal(l) {
    lastFocus = document.activeElement;
    $("#modalVisual").style.background = `linear-gradient(135deg, ${l.tint[0]}, ${l.tint[1]})`;
    $("#modalVisual").textContent = TYPE_LABEL[l.type].charAt(0);
    $("#modalTitle").textContent = l.title;
    $("#modalPrice").textContent = fmtLKR(l.price);
    $("#modalDesc").textContent = l.desc;
    const specs = $("#modalSpecs");
    specs.innerHTML = "";
    [TYPE_LABEL[l.type], l.location, l.area, l.beds ? `${l.beds} bedrooms` : null]
      .filter(Boolean)
      .forEach((t) => { const li = document.createElement("li"); li.textContent = t; specs.appendChild(li); });
    $("#modalWhatsApp").href = waLink(`Hello, I am interested in "${l.title}" (${fmtLKR(l.price)}).`);
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
        // Demo mode: no backend configured yet, so open WhatsApp with the enquiry instead.
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
