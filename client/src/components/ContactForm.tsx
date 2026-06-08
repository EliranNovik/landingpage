import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CountryCode } from "libphonenumber-js/min";
import { dialCodeForCountry } from "@/data/countryCallingCodes";
import { PhoneCountrySelect } from "@/components/PhoneCountrySelect";
import { combinePhoneNumber } from "@/lib/phone";
import { apiUrl } from "@/lib/api";
import { getSourceCodeForSubmit } from "@/lib/sourceCode";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  countryIso: CountryCode;
  phone: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  email: "",
  countryIso: "IL",
  phone: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const minimalInputClass =
  "h-11 rounded-xl border border-cream-dark/80 bg-white px-4 shadow-sm focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25";

const minimalSelectClass =
  "h-11 w-[7.5rem] shrink-0 rounded-xl border border-cream-dark/80 bg-white px-3 shadow-sm focus:ring-2 focus:ring-accent/25";

const minimalMessageClass =
  "min-h-[120px] resize-none rounded-xl border border-cream-dark/80 bg-white px-4 py-3 shadow-sm focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/25";

interface ContactFormProps {
  className?: string;
  variant?: "default" | "minimal";
}

export function ContactForm({
  className,
  variant = "default",
}: ContactFormProps) {
  const { t, i18n } = useTranslation();
  const isEnglish = !i18n.language.startsWith("he");
  const isRtl = !isEnglish;
  const isMinimal = variant === "minimal";
  const labelClass = cn(
    "block w-full text-xs font-medium tracking-wide text-muted uppercase",
    isRtl ? "text-right" : "text-left"
  );
  const fieldAlignClass = isRtl
    ? "w-full text-right placeholder:text-right"
    : "w-full";
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const validate = (): string | null => {
    if (!form.name.trim()) return t("contact.errors.name");
    if (!form.email.trim()) return t("contact.errors.email");
    if (!emailPattern.test(form.email.trim()))
      return t("contact.errors.emailInvalid");
    if (!form.phone.trim()) return t("contact.errors.phone");
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: combinePhoneNumber(
            dialCodeForCountry(form.countryIso),
            form.phone
          ),
          facts: form.message.trim(),
          source_code: getSourceCodeForSubmit(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || t("contact.errors.submitFailed"));
      }

      setSubmittedName(form.name.trim());
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t("contact.errors.submitFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = isMinimal ? minimalInputClass : undefined;

  const header = (
    <div className={cn(isMinimal ? "mb-10" : "", isRtl && "text-right")}>
      <h2
        className={cn(
          "font-serif text-charcoal",
          isMinimal
            ? cn(
                "tracking-tight",
                isEnglish
                  ? "text-3xl leading-[1.2] sm:text-[2.125rem]"
                  : "text-3xl"
              )
            : cn("text-2xl", isEnglish && "sm:text-3xl")
        )}
      >
        {t("contact.title")}
      </h2>
      <p
        className={cn(
          "mt-2 leading-relaxed text-muted",
          isMinimal
            ? isEnglish
              ? "text-sm sm:text-base"
              : "text-sm"
            : isEnglish
              ? "text-base"
              : "text-sm"
        )}
      >
        {t(isMinimal ? "contact.subtitleMinimal" : "contact.subtitleDefault")}
      </p>
    </div>
  );

  const formBody = (
    <>
      {success ? (
        <div
          role="status"
          className={cn(
            "rounded-2xl border border-cream-dark/80 bg-white p-6 shadow-sm sm:p-8",
            isRtl && "text-right"
          )}
        >
          <div
            className={cn(
              "flex gap-4",
              isRtl ? "flex-row-reverse text-right" : "text-left"
            )}
          >
            <CheckCircle2
              className="h-10 w-10 shrink-0 text-accent sm:h-11 sm:w-11"
              strokeWidth={1.5}
              aria-hidden
            />
            <div className="min-w-0">
              <h3 className="font-serif text-2xl leading-tight text-charcoal sm:text-[1.65rem]">
                {t("contact.success.title", { name: submittedName })}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-charcoal/85">
                {t("contact.success.message")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t("contact.success.note")}
              </p>
            </div>
          </div>
          <div className={cn("mt-6", isRtl ? "flex justify-start" : undefined)}>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => {
                setSuccess(false);
                setSubmittedName("");
              }}
            >
              {t("contact.submitAnother")}
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          dir={isRtl ? "rtl" : "ltr"}
          className={cn(
            "w-full",
            isMinimal ? "space-y-8" : "space-y-4",
            isRtl && "text-right"
          )}
          noValidate
        >
          <input
            type="hidden"
            name="source_code"
            value={getSourceCodeForSubmit()}
            readOnly
            tabIndex={-1}
          />

          <div className="space-y-2">
            <Label htmlFor="name" className={labelClass}>
              {t("contact.fullName")}
            </Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              placeholder={t("contact.placeholders.name")}
              className={cn(fieldClass, fieldAlignClass)}
              value={form.name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, name: e.target.value }))
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={labelClass}>
              {t("contact.email")}
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t("contact.placeholders.email")}
              className={cn(fieldClass, fieldAlignClass)}
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className={labelClass}>
              {t("contact.phone")}
            </Label>
            <div className="flex gap-4">
              <PhoneCountrySelect
                value={form.countryIso}
                onChange={(countryIso) =>
                  setForm((prev) => ({ ...prev, countryIso }))
                }
                disabled={loading}
                isRtl={isRtl}
                isMinimal={isMinimal}
                triggerClassName={isMinimal ? minimalSelectClass : undefined}
              />
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                placeholder={t("contact.placeholders.phone")}
                className={cn("flex-1", fieldClass, fieldAlignClass)}
                value={form.phone}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, phone: e.target.value }))
                }
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className={labelClass}>
              {t("contact.message")}
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t("contact.placeholders.message")}
              className={cn(
                isMinimal ? minimalMessageClass : fieldClass,
                fieldAlignClass
              )}
              value={form.message}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              disabled={loading}
            />
          </div>

          {error && (
            <p role="alert" className={cn("text-sm text-red-700", isRtl && "text-right")}>
              {error}
            </p>
          )}

          <div className={cn(isRtl ? "flex justify-start" : undefined)}>
          <Button
            type="submit"
            size="lg"
            className="w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("contact.submitting")}
              </>
            ) : (
              t("contact.submit")
            )}
          </Button>
          </div>
        </form>
      )}

    </>
  );

  if (isMinimal) {
    return (
      <div
        id="contact-form"
        dir={isRtl ? "rtl" : "ltr"}
        className={cn("w-full", className, isRtl && "text-right")}
      >
        {header}
        {formBody}
      </div>
    );
  }

  return (
    <Card
      id="contact-form"
      className={cn("border-cream-dark/90 bg-white shadow-md", className)}
    >
      <CardHeader className="pb-4">{header}</CardHeader>
      <CardContent>{formBody}</CardContent>
    </Card>
  );
}
