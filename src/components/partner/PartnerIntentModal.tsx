"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, BriefcaseBusiness, X } from "lucide-react";
import { partnerIntentCopyByLang } from "@/content/partnerIntent";
import { useLanguage } from "@/context/LanguageContext";
import { localeBody, localeCta, localeHeading, localeMeta, localeNav } from "@/lib/localeTypography";

const PARTNER_INTENT_OPEN_EVENT = "sigma:open-partner-intent";

type PartnerIntentStep = "select" | "company" | "kol";
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_UPLOAD_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/pdf",
]);

type FormStatus = "idle" | "sending" | "success" | "error";
type KolRole = "KOL" | "IB" | "Trader";

type FieldErrors = Partial<Record<"fullName" | "companyName" | "email" | "description" | "role", string>>;

type CompanyState = {
  fullName: string;
  companyName: string;
  email: string;
  websiteAddress: string;
  description: string;
};

type KolState = {
  fullName: string;
  email: string;
  roles: KolRole[];
  socialLink: string;
  country: string;
  description: string;
  performanceFile: File | null;
};

export function openPartnerIntentFlow() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PARTNER_INTENT_OPEN_EVENT));
}

export function PartnerIntentTriggerButton({
  children,
  className,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  className: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        openPartnerIntentFlow();
      }}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </button>
  );
}

export function PartnerIntentModalHost() {
  const { language, isRtl } = useLanguage();
  const copy = partnerIntentCopyByLang[language] ?? partnerIntentCopyByLang.EN;
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<PartnerIntentStep>("select");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [fileError, setFileError] = useState("");
  const [companyForm, setCompanyForm] = useState<CompanyState>({
    fullName: "",
    companyName: "",
    email: "",
    websiteAddress: "",
    description: "",
  });
  const [kolForm, setKolForm] = useState<KolState>({
    fullName: "",
    email: "",
    roles: [],
    socialLink: "",
    country: "",
    description: "",
    performanceFile: null,
  });
  const reduceMotion = useReducedMotion() ?? false;
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const resetFormState = () => {
    setStatus("idle");
    setErrors({});
    setErrorMessage("");
    setFileError("");
  };

  const closeModal = () => {
    setOpen(false);
    setStep("select");
    resetFormState();
  };

  const backToSelect = () => {
    setStep("select");
    resetFormState();
  };

  const isValidEmailFormat = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 320;

  const isReasonableUrl = (raw: string) => {
    if (!raw.trim()) return true;
    try {
      const v = raw.trim();
      const url = v.startsWith("http://") || v.startsWith("https://")
        ? new URL(v)
        : new URL(`https://${v}`);
      return Boolean(url.hostname);
    } catch {
      return false;
    }
  };

  const submitForm = async (formData: FormData) => {
    const res = await fetch("/api/partner", { method: "POST", body: formData });
    if (res.ok) return true;
    let data: { error?: string } = {};
    try {
      data = await res.json();
    } catch {
      // ignore
    }
    setErrorMessage(
      data.error === "File too large"
        ? copy.fileTooLargeMessage
        : data.error === "Unsupported file type"
          ? copy.unsupportedFileTypeMessage
          : copy.errorMessage,
    );
    return false;
  };

  const buildCommonFormData = () => {
    const fd = new FormData();
    fd.set("locale", language);
    if (typeof window !== "undefined") {
      fd.set("submittedFrom", `${window.location.pathname}${window.location.search}`);
    } else {
      fd.set("submittedFrom", "");
    }
    fd.set("website_honeypot", "");
    return fd;
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    resetFormState();

    const nextErrors: FieldErrors = {};
    if (!companyForm.fullName.trim()) nextErrors.fullName = copy.requiredMessage;
    if (!companyForm.companyName.trim()) nextErrors.companyName = copy.requiredMessage;
    if (!companyForm.email.trim()) nextErrors.email = copy.requiredMessage;
    else if (!isValidEmailFormat(companyForm.email.trim())) nextErrors.email = copy.invalidEmailMessage;
    if (!companyForm.description.trim()) nextErrors.description = copy.requiredMessage;
    const companyWebsiteInvalid = !isReasonableUrl(companyForm.websiteAddress);

    if (Object.keys(nextErrors).length > 0 || companyWebsiteInvalid) {
      setErrors(nextErrors);
      if (companyWebsiteInvalid) {
        setErrorMessage(copy.errorMessage);
      }
      return;
    }

    setStatus("sending");
    const fd = buildCommonFormData();
    fd.set("intentType", "company");
    fd.set("fullName", companyForm.fullName.trim());
    fd.set("companyName", companyForm.companyName.trim());
    fd.set("email", companyForm.email.trim());
    fd.set("websiteAddress", companyForm.websiteAddress.trim());
    fd.set("description", companyForm.description.trim());

    const ok = await submitForm(fd);
    setStatus(ok ? "success" : "error");
  };

  const handleKolSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    resetFormState();

    const nextErrors: FieldErrors = {};
    if (!kolForm.fullName.trim()) nextErrors.fullName = copy.requiredMessage;
    if (!kolForm.email.trim()) nextErrors.email = copy.requiredMessage;
    else if (!isValidEmailFormat(kolForm.email.trim())) nextErrors.email = copy.invalidEmailMessage;
    if (kolForm.roles.length === 0) nextErrors.role = copy.requiredMessage;
    if (!kolForm.description.trim()) nextErrors.description = copy.requiredMessage;
    const socialLinkInvalid = !isReasonableUrl(kolForm.socialLink);

    if (Object.keys(nextErrors).length > 0 || socialLinkInvalid) {
      setErrors(nextErrors);
      if (socialLinkInvalid) setErrorMessage(copy.errorMessage);
      return;
    }

    if (kolForm.performanceFile) {
      if (kolForm.performanceFile.size > MAX_UPLOAD_BYTES) {
        setFileError(copy.fileTooLargeMessage);
        return;
      }
      if (!ALLOWED_UPLOAD_TYPES.has(kolForm.performanceFile.type)) {
        setFileError(copy.unsupportedFileTypeMessage);
        return;
      }
    }

    setStatus("sending");
    const fd = buildCommonFormData();
    fd.set("intentType", "kol");
    fd.set("fullName", kolForm.fullName.trim());
    fd.set("email", kolForm.email.trim());
    for (const role of kolForm.roles) {
      fd.append("roles", role);
    }
    fd.set("socialLink", kolForm.socialLink.trim());
    fd.set("country", kolForm.country.trim());
    fd.set("description", kolForm.description.trim());
    if (kolForm.performanceFile) {
      fd.set("performanceScreenshot", kolForm.performanceFile);
    }

    const ok = await submitForm(fd);
    setStatus(ok ? "success" : "error");
  };

  const onFileChange = (file: File | null) => {
    if (!file) {
      setKolForm((prev) => ({ ...prev, performanceFile: null }));
      setFileError("");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setKolForm((prev) => ({ ...prev, performanceFile: null }));
      setFileError(copy.fileTooLargeMessage);
      return;
    }
    if (!ALLOWED_UPLOAD_TYPES.has(file.type)) {
      setKolForm((prev) => ({ ...prev, performanceFile: null }));
      setFileError(copy.unsupportedFileTypeMessage);
      return;
    }
    setFileError("");
    setKolForm((prev) => ({ ...prev, performanceFile: file }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onOpen = () => {
      setStep("select");
      setOpen(true);
      resetFormState();
    };
    window.addEventListener(PARTNER_INTENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(PARTNER_INTENT_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setStep("select");
      setStatus("idle");
      setErrors({});
      setErrorMessage("");
      setFileError("");
    };
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const panel = dialogRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || focusables.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onTab);
    return () => {
      document.removeEventListener("keydown", onTab);
      lastFocusedRef.current?.focus();
    };
  }, [open, step]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[10070] flex cursor-auto items-end justify-center p-0 pb-[env(safe-area-inset-bottom,0px)] sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-auto bg-black/70 backdrop-blur-sm"
            aria-label={copy.backdropCloseAria}
            onClick={closeModal}
            tabIndex={-1}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            dir={isRtl ? "rtl" : "ltr"}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.985 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, scale: 0.985 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
            className="relative z-10 flex max-h-[min(88dvh,calc(100dvh-env(safe-area-inset-bottom,0px)-0.5rem))] w-full max-w-xl cursor-auto flex-col overflow-hidden rounded-t-2xl border border-white/[0.1] border-b-0 bg-gradient-to-b from-[#12161f] to-[#0a0c12] shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:max-h-[min(92vh,720px)] sm:rounded-xl sm:border-b [&_button]:cursor-pointer [&_input]:cursor-auto [&_label]:cursor-pointer [&_textarea]:cursor-auto"
            ref={dialogRef}
          >
            <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-3.5 sm:gap-4 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <h2 id={titleId} className={`font-display text-lg font-semibold text-white ${localeHeading(language)}`}>
                  {step === "select" ? copy.title : step === "company" ? copy.companyFormTitle : copy.kolFormTitle}
                </h2>
                <p id={descriptionId} className={`mt-1 text-sm leading-relaxed text-[#8b939e] ${localeBody(language)}`}>
                  {step === "select"
                    ? copy.body
                    : step === "company"
                      ? copy.companyFormDescription
                      : copy.kolFormDescription}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="inline-flex min-h-11 min-w-11 shrink-0 touch-manipulation items-center justify-center rounded-md border border-white/[0.08] p-2 text-[#adb5bd] transition-colors hover:border-[#bde0fe]/30 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#bde0fe]/55"
                aria-label={copy.closeLabel}
              >
                <X className="size-4" strokeWidth={2} aria-hidden />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6">
              {step === "select" ? (
                <div className="grid gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => setStep("company")}
                    className="group rounded-2xl border border-white/[0.11] bg-white/[0.03] p-4 text-start transition-colors hover:border-[#bde0fe]/28 hover:bg-white/[0.06]"
                  >
                    <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-[#0f141f] text-[#d0d6df]">
                      <Building2 className="size-5" aria-hidden />
                    </span>
                    <p className={`font-display text-sm font-semibold uppercase tracking-[0.1em] text-white ${localeNav(language)}`}>
                      {copy.companyLabel}
                    </p>
                    <p className={`mt-2 text-sm leading-relaxed text-[#aeb6c1] ${localeBody(language)}`}>
                      {copy.companyDescription}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep("kol")}
                    className="group rounded-2xl border border-white/[0.11] bg-white/[0.03] p-4 text-start transition-colors hover:border-[#bde0fe]/28 hover:bg-white/[0.06]"
                  >
                    <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-[#0f141f] text-[#d0d6df]">
                      <BriefcaseBusiness className="size-5" aria-hidden />
                    </span>
                    <p className={`font-display text-sm font-semibold uppercase tracking-[0.1em] text-white ${localeNav(language)}`}>
                      {copy.kolLabel}
                    </p>
                    <p className={`mt-2 text-sm leading-relaxed text-[#aeb6c1] ${localeBody(language)}`}>
                      {copy.kolDescription}
                    </p>
                  </button>
                </div>
              ) : step === "company" ? (
                <form onSubmit={handleCompanySubmit} className="space-y-4">
                  <input type="text" name="website_honeypot" tabIndex={-1} autoComplete="off" className="pointer-events-none absolute h-0 w-0 opacity-0" />
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>
                      {copy.nameLabel}
                    </label>
                    <input
                      value={companyForm.fullName}
                      onChange={(e) => setCompanyForm((prev) => ({ ...prev, fullName: e.target.value }))}
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm"
                    />
                    {errors.fullName ? <p className="mt-1 text-xs text-[#ff8f8f]">{errors.fullName}</p> : null}
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>
                      {copy.companyNameLabel}
                    </label>
                    <input
                      value={companyForm.companyName}
                      onChange={(e) => setCompanyForm((prev) => ({ ...prev, companyName: e.target.value }))}
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm"
                    />
                    {errors.companyName ? <p className="mt-1 text-xs text-[#ff8f8f]">{errors.companyName}</p> : null}
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>
                      {copy.emailLabel}
                    </label>
                    <input
                      type="email"
                      value={companyForm.email}
                      onChange={(e) => setCompanyForm((prev) => ({ ...prev, email: e.target.value }))}
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm"
                    />
                    {errors.email ? <p className="mt-1 text-xs text-[#ff8f8f]">{errors.email}</p> : null}
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>
                      {copy.websiteOptionalLabel}
                    </label>
                    <input
                      value={companyForm.websiteAddress}
                      onChange={(e) => setCompanyForm((prev) => ({ ...prev, websiteAddress: e.target.value }))}
                      className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>
                      {copy.descriptionLabel}
                    </label>
                    <textarea
                      rows={4}
                      value={companyForm.description}
                      onChange={(e) => setCompanyForm((prev) => ({ ...prev, description: e.target.value }))}
                      className="mt-1.5 min-h-[6rem] w-full resize-y rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm"
                    />
                    {errors.description ? <p className="mt-1 text-xs text-[#ff8f8f]">{errors.description}</p> : null}
                  </div>
                  {status === "success" ? (
                    <p className={`rounded-md border border-[#1c39bb]/35 bg-[#1c39bb]/12 p-3 text-sm text-[#d4e7ff] ${localeBody(language)}`}>{copy.successMessage}</p>
                  ) : null}
                  {status === "error" && errorMessage ? (
                    <p className={`text-sm text-[#ff8f8f] ${localeBody(language)}`}>{errorMessage}</p>
                  ) : null}
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                    <button type="button" onClick={backToSelect} className={`inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bde0fe]/35 hover:bg-white/[0.07] ${localeCta(language)}`}>{copy.backLabel}</button>
                    <button type="submit" disabled={status === "sending"} className={`inline-flex min-h-11 items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30 disabled:opacity-60 ${localeCta(language)}`}>{status === "sending" ? copy.sendingLabel : copy.submitLabel}</button>
                    <button type="button" onClick={closeModal} className={`inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#d7dce2] transition-colors hover:bg-white/[0.06] ${localeCta(language)}`}>{copy.closeLabel}</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleKolSubmit} className="space-y-4">
                  <input type="text" name="website_honeypot" tabIndex={-1} autoComplete="off" className="pointer-events-none absolute h-0 w-0 opacity-0" />
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>{copy.nameLabel}</label>
                    <input value={kolForm.fullName} onChange={(e) => setKolForm((prev) => ({ ...prev, fullName: e.target.value }))} className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm" />
                    {errors.fullName ? <p className="mt-1 text-xs text-[#ff8f8f]">{errors.fullName}</p> : null}
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>{copy.emailLabel}</label>
                    <input type="email" value={kolForm.email} onChange={(e) => setKolForm((prev) => ({ ...prev, email: e.target.value }))} className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm" />
                    {errors.email ? <p className="mt-1 text-xs text-[#ff8f8f]">{errors.email}</p> : null}
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>{copy.roleLabel}</label>
                    <p className={`mt-1 text-xs text-[#9ea8b4] ${localeBody(language)}`}>{copy.selectRolesHint}</p>
                    <div className="mt-2 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                      {([
                        { id: "KOL" as const, label: copy.roleKol },
                        { id: "IB" as const, label: copy.roleIb },
                        { id: "Trader" as const, label: copy.roleTrader },
                      ]).map((option) => {
                        const selected = kolForm.roles.includes(option.id);
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() =>
                              setKolForm((prev) => ({
                                ...prev,
                                roles: prev.roles.includes(option.id)
                                  ? prev.roles.filter((r) => r !== option.id)
                                  : [...prev.roles, option.id],
                              }))
                            }
                            aria-pressed={selected}
                            className={`rounded-xl border px-3 py-2.5 text-start text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                              selected
                                ? "border-[#1c39bb]/55 bg-[#1c39bb]/18 text-white"
                                : "border-white/[0.12] bg-white/[0.03] text-[#d7dde4] hover:border-[#bde0fe]/30 hover:bg-white/[0.06]"
                            } ${localeNav(language)}`}
                          >
                            <span className="inline-flex items-center gap-2">
                              <span
                                className={`inline-flex h-4 w-4 items-center justify-center rounded border ${
                                  selected
                                    ? "border-[#1c39bb]/65 bg-[#1c39bb]/45"
                                    : "border-white/[0.24] bg-transparent"
                                }`}
                                aria-hidden
                              >
                                {selected ? <span className="h-1.5 w-1.5 rounded-full bg-white" /> : null}
                              </span>
                              {option.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.role ? <p className="mt-1 text-xs text-[#ff8f8f]">{errors.role}</p> : null}
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>{copy.socialOptionalLabel}</label>
                    <input value={kolForm.socialLink} onChange={(e) => setKolForm((prev) => ({ ...prev, socialLink: e.target.value }))} className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm" />
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>{copy.countryOptionalLabel}</label>
                    <input value={kolForm.country} onChange={(e) => setKolForm((prev) => ({ ...prev, country: e.target.value }))} className="mt-1.5 min-h-11 w-full rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm" />
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>{copy.performanceOptionalLabel}</label>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
                      <label className={`inline-flex min-h-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-[#1c39bb]/45 hover:bg-[#1c39bb]/14 ${localeCta(language)}`}>
                        {copy.attachFileLabel}
                        <input type="file" className="hidden" accept="image/png,image/jpeg,image/webp,application/pdf" onChange={(e) => onFileChange(e.target.files?.[0] ?? null)} />
                      </label>
                      {kolForm.performanceFile ? (
                        <>
                          <span className={`text-xs text-[#bfc6cf] ${localeBody(language)}`}>{kolForm.performanceFile.name}</span>
                          <button type="button" onClick={() => onFileChange(null)} className={`text-[11px] font-semibold uppercase tracking-[0.1em] text-[#ffb4b4] hover:text-[#ffd0d0] ${localeMeta(language)}`}>{copy.removeFileLabel}</button>
                        </>
                      ) : null}
                    </div>
                    {fileError ? <p className="mt-1 text-xs text-[#ff8f8f]">{fileError}</p> : null}
                  </div>
                  <div>
                    <label className={`block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#868e96] ${localeNav(language)}`}>{copy.descriptionLabel}</label>
                    <textarea rows={4} value={kolForm.description} onChange={(e) => setKolForm((prev) => ({ ...prev, description: e.target.value }))} className="mt-1.5 min-h-[6rem] w-full resize-y rounded-md border border-white/[0.1] bg-[#07090f] px-3 py-2.5 text-base text-[#f1f3f5] outline-none transition-[border-color,box-shadow] focus:border-[#1c39bb]/55 focus:ring-2 focus:ring-[#1c39bb]/25 sm:text-sm" />
                    {errors.description ? <p className="mt-1 text-xs text-[#ff8f8f]">{errors.description}</p> : null}
                  </div>
                  {status === "success" ? (
                    <p className={`rounded-md border border-[#1c39bb]/35 bg-[#1c39bb]/12 p-3 text-sm text-[#d4e7ff] ${localeBody(language)}`}>{copy.successMessage}</p>
                  ) : null}
                  {status === "error" && errorMessage ? (
                    <p className={`text-sm text-[#ff8f8f] ${localeBody(language)}`}>{errorMessage}</p>
                  ) : null}
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                    <button type="button" onClick={backToSelect} className={`inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-[#bde0fe]/35 hover:bg-white/[0.07] ${localeCta(language)}`}>{copy.backLabel}</button>
                    <button type="submit" disabled={status === "sending"} className={`inline-flex min-h-11 items-center justify-center rounded-full border border-[#1c39bb]/50 bg-[#1c39bb]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#1c39bb]/30 disabled:opacity-60 ${localeCta(language)}`}>{status === "sending" ? copy.sendingLabel : copy.submitLabel}</button>
                    <button type="button" onClick={closeModal} className={`inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#d7dce2] transition-colors hover:bg-white/[0.06] ${localeCta(language)}`}>{copy.closeLabel}</button>
                  </div>
                </form>
              )}
            </div>

            {step === "select" ? (
              <div className="border-t border-white/[0.06] px-4 py-3 sm:px-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8f98a3] transition-colors hover:text-white ${localeMeta(language)}`}
                >
                  {copy.closeLabel}
                </button>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
