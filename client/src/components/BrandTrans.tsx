import { Trans } from "react-i18next";
import { Ltr } from "@/components/Ltr";
import {
  BRAND_LINKEDIN,
  BRAND_LAW_OFFICE,
  BRAND_SHORT,
  BRAND_YOUTUBE,
} from "@/data/brand";

export const brandTransComponents = {
  brand: <Ltr>{BRAND_SHORT}</Ltr>,
  brandOffice: <Ltr>{BRAND_LAW_OFFICE}</Ltr>,
  brandYt: <Ltr>{BRAND_YOUTUBE}</Ltr>,
  brandLinkedin: <Ltr>{BRAND_LINKEDIN}</Ltr>,
  yt: <Ltr>YouTube</Ltr>,
};

interface BrandTransProps {
  i18nKey: string;
  className?: string;
}

export function BrandTrans({ i18nKey, className }: BrandTransProps) {
  return (
    <Trans
      i18nKey={i18nKey}
      className={className}
      components={brandTransComponents}
    />
  );
}
