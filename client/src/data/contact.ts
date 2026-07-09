const OFFICE_ADDRESS = "Menachem Begin 11, 25th floor, Ramat Gan, Israel";

export const OFFICE_CONTACT = {
  email: "office@lawoffice.org.il",
  address: OFFICE_ADDRESS,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_ADDRESS)}`,
  whatsappUrl: "https://wa.me/972552780162",
  whatsappLabel: "WhatsApp",
  phone: "+97229903180",
  phoneDisplay: "029903180",
  phoneDesktop: "+97229903180",
  phoneDesktopLabel: "029903180",
  phoneMobile: "+97229903180",
  phoneMobileLabel: "029903180",
} as const;

export const SOCIAL_LINKS = [
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@DeckerPexLawoffice",
    ariaLabel: "Decker Pex Law Office on YouTube",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/DeckerPexCo",
    ariaLabel: "Decker Pex & Co. on Facebook",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/decker-pex-co/",
    ariaLabel: "Decker, Pex & Co on LinkedIn",
  },
] as const;
