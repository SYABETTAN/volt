import { isAccentId } from "../lib/accents";
import { track } from "../lib/analytics";
import {
  buildInquiryMailto,
  validateInquiry,
  type InquiryInput,
  type RequestKind,
  type SiteSituation,
} from "../lib/inquiry";
import { sanitizeBrandName } from "../lib/sanitize";

export function initInterface(): void {
  if (document.getElementById("agency-dialog")) track("demo_viewed");
  bindDialogs();
  initPersonalization();
  initInquiry();
  initQuote();
  initLightbox();
}

function bindDialogs(): void {
  const dialogs = [...document.querySelectorAll("dialog")].filter(
    (node): node is HTMLDialogElement => node instanceof HTMLDialogElement,
  );

  document.querySelectorAll<HTMLElement>("[data-open]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const id = trigger.dataset.open;
      const dialog = id ? document.getElementById(id) : null;
      if (!(dialog instanceof HTMLDialogElement)) return;
      dialogs.forEach((other) => {
        if (other !== dialog && other.open) other.close();
      });
      if (!dialog.open) dialog.showModal();
      if (id === "agency-dialog") track("commercial_offer_opened");
      if (
        trigger instanceof HTMLButtonElement &&
        trigger.hasAttribute("aria-controls")
      ) {
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  dialogs.forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document
        .querySelectorAll(`[aria-controls="${dialog.id}"]`)
        .forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
    });
    dialog.querySelectorAll<HTMLElement>("[data-close]").forEach((button) => {
      button.addEventListener("click", () => dialog.close());
    });
  });

  document.querySelectorAll("#menu-dialog a").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("menu-dialog")?.closest("dialog")?.close();
      if (link.closest("dialog") instanceof HTMLDialogElement) {
        link.closest("dialog")?.close();
      }
    });
  });
}

function initPersonalization(): void {
  const form = document.querySelector<HTMLFormElement>("#personalize-form");
  const input = document.querySelector<HTMLInputElement>("#brand-name");
  const reset = document.querySelector<HTMLButtonElement>("#brand-reset");
  const status = document.querySelector<HTMLElement>("#brand-status");
  const root = document.documentElement;
  const fallback = root.dataset.defaultBrand || "VOLT";
  if (!form || !input || !reset) return;

  let started = false;
  let completed = false;
  const nextStep = document.getElementById("personalize-next");
  const apply = (rawName: string, accent: string) => {
    const cleaned = sanitizeBrandName(rawName);
    const brand = cleaned || fallback;
    document.querySelectorAll<HTMLElement>("[data-brand]").forEach((node) => {
      node.textContent = brand;
    });
    if (isAccentId(accent)) root.dataset.accent = accent;
    document.title = `${brand} — Électricité Paris | Site de démonstration`;
    if (status) {
      status.textContent =
        brand === fallback
          ? "Aperçu VOLT. Démonstration inchangée."
          : `Aperçu : ${brand}. Les exemples fictifs restent ceux de la démonstration.`;
    }
    if (nextStep) nextStep.hidden = brand === fallback;
    if (!started && cleaned && cleaned !== fallback) {
      started = true;
      track("personalization_started");
    }
    if (brand !== fallback && !completed) {
      completed = true;
      track("personalization_completed");
    }
    if (brand === fallback) completed = false;
  };

  const selectedAccent = () => {
    const checked = form.querySelector<HTMLInputElement>(
      'input[name="accent"]:checked',
    );
    return checked?.value || "volt";
  };

  input.addEventListener("input", () => apply(input.value, selectedAccent()));
  form
    .querySelectorAll<HTMLInputElement>('input[name="accent"]')
    .forEach((radio) => {
      radio.addEventListener("change", () =>
        apply(input.value, selectedAccent()),
      );
    });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    apply(input.value, selectedAccent());
  });
  reset.addEventListener("click", () => {
    input.value = fallback;
    const volt = form.querySelector<HTMLInputElement>(
      'input[name="accent"][value="volt"]',
    );
    if (volt) volt.checked = true;
    apply(fallback, "volt");
    input.focus();
  });
}

function initInquiry(): void {
  const recipient = document.documentElement.dataset.inquiryTo || "";
  document
    .querySelectorAll<HTMLFormElement>("form[data-inquiry]")
    .forEach((form) => bindInquiry(form, recipient));

  const presentation =
    document.querySelector<HTMLFormElement>("#presentation-form");
  document
    .querySelectorAll<HTMLButtonElement>("[data-package]")
    .forEach((card) => {
      card.addEventListener("click", () => {
        const select = presentation?.querySelector<HTMLSelectElement>(
          "select[name='packageId']",
        );
        if (!select || !card.dataset.package) return;
        select.value = card.dataset.package;
        document
          .querySelectorAll<HTMLButtonElement>("[data-package]")
          .forEach((other) => {
            const selected = other === card;
            other.setAttribute("aria-pressed", selected ? "true" : "false");
            other.classList.toggle("is-selected", selected);
            other
              .closest(".package")
              ?.classList.toggle("is-selected", selected);
          });
        track("package_selected", { package: card.dataset.package });
        select.focus();
      });
    });
}

function bindInquiry(form: HTMLFormElement, recipient: string): void {
  const prefix = form.id.replace(/-form$/, "");
  const status = document.getElementById(`${prefix}-status`);
  if (!status) return;
  const kind: RequestKind =
    form.dataset.inquiry === "diagnostic" ? "diagnostic" : "presentation";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const honeypot = form.querySelector<HTMLInputElement>(
      'input[name="company_website_confirm"]',
    );
    if (honeypot?.value) {
      status.textContent =
        "Le message n’a pas pu être préparé. Aucune demande n’a été transmise.";
      track("contact_submit_error", { kind, reason: "rejected" });
      return;
    }

    const input = readInquiry(form, kind);
    const errors = validateInquiry(input);
    clearErrors(form);
    const fields = Object.keys(errors) as (keyof InquiryInput)[];
    if (fields.length > 0) {
      fields.forEach((field) => showError(prefix, field, errors[field] || ""));
      status.textContent =
        "Le formulaire contient des erreurs. Aucun e-mail n’a été préparé.";
      track("contact_submit_error", { kind, reason: "validation" });
      (
        document.getElementById(`${prefix}-${fieldControl(fields[0])}`) ||
        form.querySelector<HTMLElement>("[aria-invalid='true']")
      )?.focus();
      return;
    }

    const select = form.querySelector<HTMLSelectElement>(
      "select[name='packageId']",
    );
    const packageName =
      select?.selectedOptions[0]?.textContent?.trim() || input.packageId;
    try {
      const href = buildInquiryMailto(input, recipient, packageName);
      status.textContent = `Votre application de messagerie devrait s’ouvrir. Tant que le message ne part pas de votre messagerie, la demande n’est pas transmise. Sinon, écrivez à ${recipient}.`;
      if (kind === "diagnostic") track("diagnostic_requested");
      else track("presentation_requested", { package: input.packageId });
      track("contact_submit_success", { kind });
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.rel = "nofollow";
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
    } catch {
      status.textContent =
        "Le message n’a pas pu être préparé. Aucune demande n’a été transmise.";
      track("contact_submit_error", { kind, reason: "mailto" });
    }
  });
}

function readInquiry(form: HTMLFormElement, kind: RequestKind): InquiryInput {
  const data = new FormData(form);
  const situation = String(data.get("situation") || "") as SiteSituation;
  return {
    kind,
    name: String(data.get("name") || ""),
    company: String(data.get("company") || ""),
    email: String(data.get("email") || ""),
    phone: String(data.get("phone") || ""),
    website: String(data.get("website") || ""),
    packageId: String(data.get("packageId") || ""),
    situation:
      situation === "has-site" || situation === "no-site" ? situation : "",
    message: String(data.get("message") || ""),
  };
}

function fieldControl(field: keyof InquiryInput): string {
  return field === "packageId" ? "package" : field;
}

function clearErrors(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLElement>(".field-error").forEach((node) => {
    node.hidden = true;
    node.textContent = "";
  });
  form.querySelectorAll<HTMLElement>("[aria-invalid]").forEach((node) => {
    node.setAttribute("aria-invalid", "false");
  });
}

function showError(
  prefix: string,
  field: keyof InquiryInput,
  message: string,
): void {
  const id = `${prefix}-${fieldControl(field)}`;
  const control =
    document.getElementById(id) ||
    (field === "situation"
      ? document.querySelector<HTMLElement>(
          `#${prefix}-form input[name="situation"]`,
        )
      : null);
  const error = document.getElementById(`${prefix}-${field}-error`);
  if (control) {
    control.setAttribute("aria-invalid", "true");
    if (error) control.setAttribute("aria-describedby", error.id);
  }
  if (error) {
    error.hidden = false;
    error.textContent = message;
  }
}

function initQuote(): void {
  const form = document.querySelector<HTMLFormElement>("#quote-demo");
  const next = document.querySelector<HTMLButtonElement>("#quote-next");
  const back = document.querySelector<HTMLButtonElement>("#quote-back");
  const done = document.querySelector<HTMLElement>("#quote-done");
  const restart = document.querySelector<HTMLButtonElement>("#quote-restart");
  const progress = document.querySelector<HTMLElement>("#quote-progress");
  const error = document.querySelector<HTMLElement>("#quote-error");
  const summary = document.querySelector<HTMLElement>("#quote-summary");
  if (
    !form ||
    !next ||
    !back ||
    !done ||
    !restart ||
    !progress ||
    !error ||
    !summary
  )
    return;

  let step = 1;
  const labels = [
    "Étape 1 sur 3 — la prestation",
    "Étape 2 sur 3 — le lieu",
    "Étape 3 sur 3 — vérification",
  ];

  const paint = () => {
    form.querySelectorAll<HTMLElement>("[data-quote-step]").forEach((panel) => {
      panel.hidden = panel.dataset.quoteStep !== String(step);
    });
    progress.textContent = labels[step - 1] || "";
    back.hidden = step === 1;
    next.textContent = step === 3 ? "Terminer la simulation" : "Continuer";
    error.hidden = true;
  };

  const value = (name: string) =>
    form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)
      ?.value || "";

  next.addEventListener("click", () => {
    if (step === 1 && !value("prestation")) {
      error.hidden = false;
      error.textContent = "Choisissez une prestation pour continuer.";
      return;
    }
    if (
      step === 2 &&
      (!value("lieu") ||
        !form.querySelector<HTMLSelectElement>("#horizon")?.value)
    ) {
      error.hidden = false;
      error.textContent = "Précisez le type de lieu et l’horizon.";
      return;
    }
    if (step < 3) {
      if (step === 2) {
        const horizon =
          form.querySelector<HTMLSelectElement>("#horizon")?.value || "";
        summary.textContent = `${value("prestation")} · ${value("lieu")} · ${horizon}. Aucune coordonnée n’a été demandée.`;
      }
      step += 1;
      paint();
      return;
    }
    form.reset();
    form.hidden = true;
    done.hidden = false;
  });

  back.addEventListener("click", () => {
    step = Math.max(1, step - 1);
    paint();
  });

  restart.addEventListener("click", () => {
    step = 1;
    form.hidden = false;
    done.hidden = true;
    form.reset();
    paint();
  });
}

function initLightbox(): void {
  const dialog = document.querySelector<HTMLDialogElement>("#project-dialog");
  const cards = [
    ...document.querySelectorAll<HTMLButtonElement>("[data-lightbox]"),
  ];
  const image = document.querySelector<HTMLImageElement>(
    "#project-dialog-image",
  );
  const title = document.querySelector<HTMLElement>("#project-dialog-title");
  const summary = document.querySelector<HTMLElement>(
    "#project-dialog-summary",
  );
  const category = document.querySelector<HTMLElement>(
    "#project-dialog-category",
  );
  const prev = document.querySelector<HTMLButtonElement>("#project-prev");
  const next = document.querySelector<HTMLButtonElement>("#project-next");
  if (
    !dialog ||
    !image ||
    !title ||
    !summary ||
    !category ||
    !prev ||
    !next ||
    cards.length === 0
  )
    return;

  let index = 0;
  const render = () => {
    const card = cards[index];
    if (!card) return;
    const source = card.querySelector("img");
    image.src = source?.currentSrc || source?.src || "";
    image.alt = source?.alt || "";
    title.textContent = card.dataset.title || "";
    summary.textContent = card.dataset.summary || "";
    category.textContent = `${card.dataset.category || ""} · Projet illustratif`;
  };
  const open = (nextIndex: number) => {
    index = (nextIndex + cards.length) % cards.length;
    render();
    if (!dialog.open) dialog.showModal();
  };

  cards.forEach((card, cardIndex) => {
    card.addEventListener("click", () => open(cardIndex));
  });
  prev.addEventListener("click", () => open(index - 1));
  next.addEventListener("click", () => open(index + 1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      open(index - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      open(index + 1);
    }
  });
}
