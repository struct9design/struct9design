"use client";

import Link from "next/link";
import { useActionState, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { sendContact } from "@/app/actions/contact";
import { areaOptions, defaultPlaceholder, type ContactArea } from "@/content/contact";
import {
  contactSchema,
  flattenErrors,
  formDataToObject,
  HONEYPOT_FIELD,
  type ContactErrors,
  type ContactField,
  type ContactState,
} from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

/** Para preseleccionar otra área al cambiar de servicio, monta el formulario con `key={area}`. */
type Props = {
  /** embedded: dentro de la sección oscura (home y servicios) · page: página de contacto */
  variant?: "embedded" | "page";
  defaultArea?: ContactArea;
  placeholder?: string;
};

const inputClass =
  "w-full rounded-[9px] border border-niebla bg-white px-3.5 py-3 text-[15px] text-grafito transition-[border-color,box-shadow] duration-[250ms] placeholder:text-pizarra/75 focus:border-senal focus:shadow-[0_0_0_3px_rgba(47,107,255,.14)] focus:outline-none aria-[invalid=true]:border-error";

const FIELDS: ContactField[] = ["nombre", "negocio", "email", "telefono", "area", "mensaje", "privacidad"];

export function ContactForm({ variant = "embedded", defaultArea = "nolose", placeholder = defaultPlaceholder }: Props) {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(sendContact, {});
  const [clientErrors, setClientErrors] = useState<ContactErrors | null>(null);
  const [area, setArea] = useState<ContactArea>(defaultArea);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();

  const errors = clientErrors ?? state.errors ?? {};
  const values = state.values ?? {};

  useEffect(() => {
    if (state.errors) focusFirstError(formRef.current, state.errors);
  }, [state]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const parsed = contactSchema.safeParse(formDataToObject(new FormData(e.currentTarget)));
    if (!parsed.success) {
      e.preventDefault();
      const errs = flattenErrors(parsed.error);
      setClientErrors(errs);
      focusFirstError(e.currentTarget, errs);
      return;
    }
    setClientErrors(null);
  };

  // Al corregir un campo, su error desaparece
  const clearError = (name: ContactField) => {
    if (errors[name]) setClientErrors({ ...errors, [name]: undefined });
  };

  const fieldProps = (name: ContactField) => ({
    id: `${uid}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
    onInput: () => clearError(name),
  });

  const isPage = variant === "page";

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "relative grid gap-4 bg-white text-grafito",
        isPage
          ? "rounded-[18px] border border-niebla p-[clamp(24px,3vw,36px)] shadow-[0_24px_60px_rgba(19,41,75,.08)]"
          : "rounded-2xl p-[clamp(24px,3vw,34px)] shadow-[0_24px_60px_rgba(0,0,0,.22)]",
      )}
    >
      {isPage && <p className="font-display text-[1.15rem] font-bold text-tinta">Pide tu presupuesto</p>}

      {state.message && (
        <div role="alert" className="rounded-[10px] border border-error bg-nieve px-5 py-4 text-[14.5px] leading-[1.6] text-grafito">
          {state.message}
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-4">
        <Field label="Nombre y apellidos" htmlFor={`${uid}-nombre`} error={errors.nombre} errorId={`${uid}-nombre-error`}>
          <input {...fieldProps("nombre")} type="text" autoComplete="name" placeholder="María García" required defaultValue={values.nombre} className={inputClass} />
        </Field>
        <Field label="Negocio" htmlFor={`${uid}-negocio`} error={errors.negocio} errorId={`${uid}-negocio-error`}>
          <input {...fieldProps("negocio")} type="text" autoComplete="organization" placeholder="Nombre de tu empresa" required defaultValue={values.negocio} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-4">
        <Field label="Correo electrónico" htmlFor={`${uid}-email`} error={errors.email} errorId={`${uid}-email-error`}>
          <input {...fieldProps("email")} type="email" autoComplete="email" placeholder="maria@tunegocio.es" required defaultValue={values.email} className={inputClass} />
        </Field>
        <Field
          label={
            <>
              Teléfono <span className="font-normal text-pizarra">(opcional)</span>
            </>
          }
          htmlFor={`${uid}-telefono`}
          error={errors.telefono}
          errorId={`${uid}-telefono-error`}
        >
          <input {...fieldProps("telefono")} type="tel" autoComplete="tel" placeholder="600 000 000" defaultValue={values.telefono} className={inputClass} />
        </Field>
      </div>

      <Field label="¿Qué te interesa?" htmlFor={`${uid}-area`} error={errors.area} errorId={`${uid}-area-error`}>
        <select
          {...fieldProps("area")}
          required
          value={area}
          onChange={(e) => {
            setArea(e.target.value as ContactArea);
            clearError("area");
          }}
          className={cn(inputClass, "appearance-none bg-[url(/select-arrow.svg)] bg-[length:12px] bg-[right_14px_center] bg-no-repeat pr-10")}
        >
          {areaOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Cuéntanos brevemente tu situación" htmlFor={`${uid}-mensaje`} error={errors.mensaje} errorId={`${uid}-mensaje-error`}>
        <textarea
          {...fieldProps("mensaje")}
          rows={isPage ? 5 : 4}
          required
          placeholder={placeholder}
          defaultValue={values.mensaje}
          className={cn(inputClass, "resize-y font-sans")}
        />
      </Field>

      {/* Honeypot: oculto para personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          No rellenes este campo
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-[11px]">
          <input
            {...fieldProps("privacidad")}
            type="checkbox"
            required
            defaultChecked={values.privacidad === "on"}
            onChange={() => clearError("privacidad")}
            className="mt-[3px] size-[17px] flex-none accent-senal"
          />
          <span className="text-[13px] leading-[1.55] text-pizarra">
            He leído y acepto la <Link href="/privacidad">política de privacidad</Link>. Usaremos tus datos solo
            para responderte.
          </span>
        </label>
        {errors.privacidad && <ErrorText id={`${uid}-privacidad-error`}>{errors.privacidad}</ErrorText>}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-[10px] border-0 bg-senal px-[22px] py-[15px] text-[15.5px] font-semibold text-white shadow-[0_10px_24px_rgba(47,107,255,.26)] transition-[transform,background-color,box-shadow] duration-[250ms] hover:-translate-y-0.5 hover:bg-tinta hover:shadow-[0_14px_30px_rgba(19,41,75,.3)] disabled:cursor-wait disabled:opacity-80"
      >
        {pending ? "Enviando…" : isPage ? "Enviar y pedir presupuesto" : "Pide tu presupuesto"}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  children,
}: {
  label: ReactNode;
  htmlFor: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div className="grid content-start gap-[7px]">
      <label htmlFor={htmlFor} className="text-[13.5px] font-semibold text-tinta">
        {label}
      </label>
      {children}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-0.5 text-[13px] leading-[1.45] font-medium text-error">
      {children}
    </p>
  );
}

function focusFirstError(form: HTMLFormElement | null, errors: ContactErrors) {
  const first = FIELDS.find((f) => errors[f]);
  if (first && form) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
}
