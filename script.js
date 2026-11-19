(() => {
  "use strict";

  // ---------- Config (edit these) ----------
  const CONFIG = {
    whatsappNumber: "94778147389",          // 077 81 47 389, digits only, with country code 94
    whatsappMessage: "Hello Jeyam Real Estate, I would like to know more about your projects.",
    formEndpoint: "",                       // e.g. a Formspree / Vercel function URL; empty = demo mode
  };

  // Photos taken from the company's own pictures. Captions only describe what is shown.
  const PROJECT_PHOTOS = [
    { src: "images/aerial.jpg", alt: "Aerial view of land and houses in Jaffna", caption: "Aerial view of the land and homes in Jaffna" },
    { src: "images/boards-1.jpg", alt: "Project display boards along a road in Jaffna", caption: "Project display boards along the road" },
    { src: "images/boards-2.jpg", alt: "Project display boards beside a road", caption: "Project display boards beside the road" },
    { src: "images/boards-3.jpg", alt: "Project display boards along a roadside wall", caption: "Project display boards on the roadside" },
  ];

  const OFFICE_PHOTOS = [
    { src: "images/sign-indoor.jpg", alt: "Jeyam Real Estate sign in the office", caption: "Jeyam Real Estate sign in the office" },
    { src: "images/office-1.jpg", alt: "Office waiting area with blue chairs", caption: "Waiting area" },
    { src: "images/office-2.jpg", alt: "Office with desks and filing cabinets", caption: "Office and filing" },
    { src: "images/office-3.jpg", alt: "Office desk with a computer and file shelves", caption: "Desk and filing shelves" },
    { src: "images/office-4.jpg", alt: "Office with a wooden desk and chairs", caption: "Office desk" },
    { src: "images/office-5.jpg", alt: "Office with printer and wooden desk", caption: "Office with printer" },
    { src: "images/office-6.jpg", alt: "Office with filing cabinets and a desk", caption: "Office with filing cabinets" },
  ];

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const waLink = (text) =>
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(text || CONFIG.whatsappMessage)}`;

  // ---------- Static links & year ----------
  $("#year").textContent = new Date().getFullYear();
  ["#heroWhatsApp", "#waSocial", "#floatWhatsApp", "#modalWhatsApp"].forEach((s) => ($(s).href = waLink()));
  $("#phoneLink").href = "tel:+" + CONFIG.whatsappNumber;
  $("#phoneLink2").href = "tel:+94779865457";

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

  // ---------- Galleries ----------
  let lastFocus = null;
  const modal = $("#modal");

  function buildGallery(container, photos, lightbox) {
    photos.forEach((p, i) => {
      const fig = document.createElement("button");
      fig.type = "button";
      fig.className = "gallery-item";
      fig.setAttribute("aria-label", `View photo: ${p.caption}`);
      fig.style.animationDelay = `${i * 60}ms`;
      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt;
      img.loading = "lazy";
      img.decoding = "async";
      const cap = document.createElement("span");
      cap.className = "gallery-caption";
      cap.textContent = p.caption;
      fig.append(img, cap);
      fig.addEventListener("click", () => openModal(p));
      container.appendChild(fig);
    });
  }

  buildGallery($("#projectGallery"), PROJECT_PHOTOS);
  buildGallery($("#officeGallery"), OFFICE_PHOTOS);

  // ---------- Lightbox ----------
  function openModal(p) {
    lastFocus = document.activeElement;
    const img = $("#modalImg");
    img.src = p.src;
    img.alt = p.alt;
    $("#modalCaption").textContent = p.caption;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();
  }

  function closeModal() {
    modal.hidden = true;
    $("#modalImg").src = "";
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
})();
