import { useEffect, useRef, useState } from "react";
import { ChevronUp, Mail, MessageCircle, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/OfficeContactButtons";
import { OFFICE_CONTACT } from "@/data/contact";
import { GERMAN_CITIZENSHIP_SOURCE_CODE } from "@/lib/sourceCode";
import { cn } from "@/lib/utils";

interface GermanContactFabProps {
  language?: "he" | "en";
}

export function GermanContactFab({
  language = "he",
}: GermanContactFabProps) {
  const isEnglish = language === "en";
  const whatsappText = isEnglish
    ? `Hello, I am interested in checking my eligibility for German citizenship (${GERMAN_CITIZENSHIP_SOURCE_CODE}) and would like more information.`
    : `שלום, אני מעוניין/ת לבדוק זכאות לאזרחות גרמנית (${GERMAN_CITIZENSHIP_SOURCE_CODE}) ואשמח לקבל פרטים נוספים.`;
  const actions = [
    {
      id: "phone",
      label: isEnglish ? "Call us" : "התקשרו אלינו",
      detail: OFFICE_CONTACT.phoneMobileLabel,
      href: `tel:${OFFICE_CONTACT.phoneMobile}`,
      icon: Phone,
      iconClass: "text-[#69b3dc]",
    },
    {
      id: "whatsapp",
      label: isEnglish ? "Send a WhatsApp message" : "שלחו WhatsApp",
      detail: isEnglish ? "Quick response from our team" : "מענה מהיר מהצוות",
      href: `${OFFICE_CONTACT.whatsappUrl}?text=${encodeURIComponent(
        whatsappText
      )}`,
      icon: WhatsAppIcon,
      iconClass: "text-[#38d979]",
      external: true,
    },
    {
      id: "email",
      label: isEnglish ? "Send an email" : "שלחו דוא״ל",
      detail: OFFICE_CONTACT.email,
      href: `mailto:${OFFICE_CONTACT.email}`,
      icon: Mail,
      iconClass: "text-[#d8bd83]",
    },
  ] as const;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openFromHover = () => {
    if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
    hoverCloseTimer.current = null;
    setOpen(true);
  };

  const closeFromHover = () => {
    hoverCloseTimer.current = setTimeout(() => {
      setOpen(false);
      hoverCloseTimer.current = null;
    }, 220);
  };

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("touchstart", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("touchstart", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(
    () => () => {
      if (hoverCloseTimer.current) clearTimeout(hoverCloseTimer.current);
    },
    []
  );

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-[80] flex flex-col items-end sm:bottom-7 sm:right-7"
      onMouseEnter={openFromHover}
      onMouseLeave={closeFromHover}
    >
      <div
        id="german-contact-menu"
        role="menu"
        aria-hidden={!open}
        className={cn(
          "absolute bottom-full right-0 mb-2 w-[min(calc(100vw-2.5rem),19rem)] origin-bottom-right overflow-hidden rounded-2xl bg-[#0d2238]/95 p-2 text-white shadow-[0_22px_60px_rgba(4,17,29,0.35)] backdrop-blur-xl transition duration-200",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-2 scale-95 opacity-0"
        )}
      >
        <p className="px-3 pb-2 pt-1 text-xs font-bold tracking-wide text-[#d8bd83]">
          {isEnglish ? "How would you like to contact us?" : "איך נוח לכם לדבר איתנו?"}
        </p>
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <a
              key={action.id}
              href={action.href}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              {...("external" in action
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-white/10"
            >
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center transition group-hover:scale-110",
                  action.iconClass
                )}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="min-w-0 text-start">
                <span className="block text-sm font-bold">{action.label}</span>
                <span
                  className="mt-0.5 block truncate text-xs text-white/55"
                  dir={action.id === "email" ? "ltr" : undefined}
                >
                  {action.detail}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="german-contact-menu"
        className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-gradient-to-l from-[#337ca4] to-[#245f82] px-5 py-3.5 font-bold text-white shadow-[0_12px_30px_rgba(7,21,34,0.3)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(7,21,34,0.38)]"
      >
        <MessageCircle className="h-5 w-5" aria-hidden />
        <span>{isEnglish ? "Contact us" : "צור קשר"}</span>
        <ChevronUp
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}
