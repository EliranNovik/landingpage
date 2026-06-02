import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronUp, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Ltr } from "@/components/Ltr";
import { OFFICE_CONTACT } from "@/data/contact";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const contactButtonClass =
  "bg-accent text-white shadow-md shadow-accent/20 ring-1 ring-black/5 transition-[transform,background-color,box-shadow] duration-200 ease-out hover:scale-105 hover:bg-accent-hover hover:shadow-lg active:scale-[0.97]";

const contactMenuIconClass =
  "bg-accent text-white shadow-sm transition-colors duration-150 hover:bg-accent-hover";

interface ContactLinkProps {
  href: string;
  ariaLabel: string;
  external?: boolean;
  children: ReactNode;
}

function ContactLink({
  href,
  ariaLabel,
  external,
  children,
}: ContactLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-full",
        contactButtonClass
      )}
    >
      {children}
    </a>
  );
}

function MobileContactDropdown() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const { email, whatsappUrl, phoneMobile } = OFFICE_CONTACT;

  const menuItems: {
    id: string;
    href: string;
    label: ReactNode;
    external?: boolean;
    icon: ReactNode;
  }[] = [
    {
      id: "whatsapp",
      href: whatsappUrl,
      label: <Ltr>{t("officeContact.whatsapp")}</Ltr>,
      external: true,
      icon: <WhatsAppIcon className="h-5 w-5" />,
    },
    {
      id: "email",
      href: `mailto:${email}`,
      label: t("officeContact.email"),
      icon: <Mail className="h-5 w-5" strokeWidth={1.75} />,
    },
    {
      id: "phone",
      href: `tel:${phoneMobile}`,
      label: t("officeContact.callMobile"),
      icon: <Phone className="h-5 w-5" strokeWidth={1.75} />,
    },
  ];

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed bottom-4 end-4 z-50 flex flex-col items-end gap-2 md:hidden"
    >
      <div
        id="mobile-contact-menu"
        className={cn(
          "flex w-[min(calc(100vw-2rem),16rem)] flex-col gap-1 rounded-2xl border border-cream-dark/80 bg-white/95 p-2 shadow-lg backdrop-blur-sm transition-opacity duration-200",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        role="menu"
        aria-hidden={!open}
      >
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            {...(item.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-charcoal transition-colors duration-150 hover:bg-cream active:bg-cream-dark/60"
          >
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                contactMenuIconClass
              )}
            >
              {item.icon}
            </span>
            <span className="text-sm font-medium">{item.label}</span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="mobile-contact-menu"
        aria-haspopup="menu"
        className="flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-cream-dark/40 transition-colors duration-150 hover:bg-accent-hover active:scale-[0.98]"
      >
        {t("officeContact.needHelp")}
        <ChevronUp
          className={cn(
            "h-4 w-4 transition-transform duration-150",
            open && "rotate-180"
          )}
          aria-hidden
        />
      </button>
    </div>
  );
}

export function OfficeContactButtons() {
  const { t } = useTranslation();
  const { email, whatsappUrl, phoneDesktop } = OFFICE_CONTACT;

  return (
    <>
      <aside
        aria-label={t("officeContact.label")}
        className="fixed end-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 md:flex"
      >
        <ContactLink
          href={whatsappUrl}
          ariaLabel={t("officeContact.whatsapp")}
          external
        >
          <WhatsAppIcon className="h-6 w-6" />
        </ContactLink>
        <ContactLink
          href={`mailto:${email}`}
          ariaLabel={t("officeContact.email")}
        >
          <Mail className="h-6 w-6" strokeWidth={1.75} />
        </ContactLink>
        <ContactLink
          href={`tel:${phoneDesktop}`}
          ariaLabel={t("officeContact.callDesktop")}
        >
          <Phone className="h-6 w-6" strokeWidth={1.75} />
        </ContactLink>
      </aside>

      <MobileContactDropdown />
    </>
  );
}
