'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

type LegalType = 'tyc' | 'privacidad' | null

const tycSections: [string, string][] = [
  ['1. Identificación del titular', 'STRUCT9 DESIGN es una agencia de servicios digitales con inteligencia artificial, con domicilio en España. Contacto: hola@struct9design.com. En adelante, "STRUCT9" o "la Agencia".'],
  ['2. Objeto y ámbito de aplicación', 'Estos Términos y Condiciones regulan la contratación de los servicios de STRUCT9 DESIGN, incluyendo el diseño y desarrollo web a medida, y los asistentes de inteligencia artificial (chatbot de WhatsApp y asistente de voz para llamadas). La aceptación del presupuesto implica la aceptación íntegra de estas condiciones.'],
  ['3. Proceso de contratación', 'El cliente solicita información a través del formulario web o por email. STRUCT9 elabora una propuesta personalizada y presupuesto detallado. La contratación se formaliza mediante aceptación expresa del presupuesto por email o firma digital. Los trabajos comienzan tras la recepción del pago inicial acordado.'],
  ['4. Precios y formas de pago', 'El precio final queda reflejado en el presupuesto personalizado enviado al cliente. La contratación se formaliza mediante la aceptación expresa de dicho presupuesto. El pago se realiza mediante efectivo, Bizum o a través de pasarela de pago segura (Stripe). Para proyectos web: 50% al inicio y 50% a la entrega. Para los asistentes de IA: cuota de setup inicial + cuota mensual facturada por adelantado el primer día de cada periodo. Los presupuestos tienen una validez de 24 horas desde su emisión, salvo indicación contraria expresa en el propio documento. Transcurrido dicho plazo, STRUCT9 se reserva el derecho a revisar las condiciones económicas ofertadas.'],
  ['5. Plazos de entrega', 'Los plazos indicados en la web son estimaciones basadas en proyectos tipo. STRUCT9 se compromete a cumplirlos siempre que el cliente facilite la información, accesos y aprobaciones necesarias en tiempo y forma. Los retrasos causados por falta de respuesta del cliente (superior a 48 horas hábiles) no son imputables a STRUCT9 y podrán trasladar la fecha de entrega en consecuencia.'],
  ['6. Revisiones y modificaciones de alcance', 'Cada servicio incluye hasta 2 rondas de revisiones sobre el entregable acordado en el briefing inicial. Las modificaciones adicionales, cambios de alcance o funcionalidades no contempladas en el presupuesto original se presupuestarán por separado y requerirán aprobación expresa antes de ejecutarse.'],
  ['7. Propiedad intelectual', 'Una vez abonado el 100% del importe del proyecto, el cliente adquiere los derechos de uso y explotación sobre el resultado final entregado. STRUCT9 se reserva el derecho de incluir el trabajo realizado en su portfolio y materiales de comunicación, salvo que exista un acuerdo de confidencialidad expreso. Las herramientas propietarias, metodologías, plantillas y procesos internos de STRUCT9 DESIGN son de exclusiva propiedad de la Agencia y no forman parte del entregable.'],
  ['8. Confidencialidad', 'Ambas partes se comprometen a mantener la más estricta confidencialidad respecto a la información intercambiada durante la prestación del servicio. Esta obligación se extiende por un periodo de 2 años tras la finalización del contrato, salvo acuerdo expreso que establezca un plazo mayor.'],
  ['9. Limitación de responsabilidad', 'STRUCT9 no se hace responsable de: caídas de rendimiento derivadas de cambios en algoritmos de terceros (Google, Meta, etc.); resultados de negocio vinculados al uso de las herramientas entregadas; daños indirectos, pérdida de beneficios o pérdida de datos del cliente por causas ajenas a la Agencia. La responsabilidad máxima de STRUCT9 ante cualquier reclamación fundada no superará el importe total abonado por el servicio contratado.'],
  ['10. Cancelaciones y política de devoluciones', 'El cliente puede cancelar el encargo antes del inicio efectivo del trabajo con derecho a reembolso total. Una vez iniciados los trabajos web, el pago inicial (50%) no es reembolsable, dado que cubre los recursos ya asignados al proyecto. La cuota mensual de los asistentes de IA puede cancelarse con 15 días naturales de preaviso antes del siguiente periodo de facturación; las cuotas ya abonadas no son reembolsables.'],
  ['11. Protección de datos personales', 'En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), los datos personales recabados a través de los formularios de contacto se tratan con la finalidad exclusiva de gestionar la relación comercial y responder a las solicitudes recibidas. No se ceden a terceros salvo obligación legal. El interesado puede ejercer sus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación escribiendo a hola@struct9design.com con copia de su documento de identidad.'],
  ['12. Legislación aplicable y jurisdicción', 'Estos Términos y Condiciones se rigen por la legislación española vigente. Para la resolución de cualquier controversia derivada de su interpretación o ejecución, ambas partes, con renuncia expresa a cualquier otro fuero, se someten a los Juzgados y Tribunales de España.'],
]

const privSections: [string, string][] = [
  ['Responsable del tratamiento', 'STRUCT9 DESIGN · hola@struct9design.com · España.'],
  ['Finalidades y base legitimadora', 'Gestión de consultas y solicitudes de información (base: consentimiento del interesado). Gestión comercial, facturación y prestación del servicio contratado (base: ejecución del contrato). Envío de comunicaciones comerciales sobre servicios propios (base: consentimiento expreso, revocable en cualquier momento sin efecto retroactivo).'],
  ['Datos recabados', 'Nombre completo, dirección de correo electrónico, teléfono (opcional) y cualquier otra información que el usuario facilite voluntariamente a través de los formularios de contacto o en el desarrollo de la relación comercial.'],
  ['Plazo de conservación', 'Los datos se conservan durante el tiempo necesario para la prestación del servicio y, una vez finalizado, durante los plazos de prescripción establecidos por la legislación española (mínimo 5 años para datos de facturación según la normativa tributaria vigente).'],
  ['Destinatarios', 'No se ceden datos personales a terceros, salvo obligación legal o a proveedores tecnológicos (alojamiento web, herramientas de email) que actúan como encargados del tratamiento bajo contrato con las garantías exigidas por el RGPD.'],
  ['Derechos del interesado', 'Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, portabilidad y limitación del tratamiento enviando un email a hola@struct9design.com con copia de tu DNI. Puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).'],
  ['Cookies y tecnologías de seguimiento', 'Esta web puede utilizar cookies técnicas estrictamente necesarias para su correcto funcionamiento. No se utilizan cookies de rastreo o publicidad comportamental sin consentimiento previo e informado del usuario.'],
]

export default function Footer() {
  const [legal, setLegal] = useState<LegalType>(null)

  function openLegal(type: LegalType) {
    setLegal(type)
    document.body.style.overflow = 'hidden'
  }

  function closeLegal() {
    setLegal(null)
    document.body.style.overflow = ''
  }

  const sections = legal === 'tyc' ? tycSections : privSections
  const title = legal === 'tyc'
    ? 'Términos y Condiciones Generales de Contratación'
    : 'Política de Privacidad y Protección de Datos'

  return (
    <>
      <footer className="border-t border-white/[0.05] bg-grafito">
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center gap-1 mb-4">
                <span className="text-lg font-bold tracking-tight text-nieve">STRUCT</span>
                <span className="text-lg font-bold tracking-tight text-oro">9</span>
                <span className="ml-1.5 text-[10px] font-semibold tracking-[0.35em] text-nieve/25 uppercase">Design</span>
              </Link>
              <p className="text-sm text-nieve/25 max-w-[220px] leading-relaxed">
                Agencia digital con IA para PYMEs españolas. Entregamos en horas lo que las agencias tardan semanas en darte.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-nieve/30 mb-5">Navegación</p>
              <nav className="flex flex-col gap-3">
                <Link href="/servicios" className="text-sm text-nieve/40 hover:text-oro transition-colors duration-200">Servicios</Link>
                <Link href="/#proceso" className="text-sm text-nieve/40 hover:text-oro transition-colors duration-200">Proceso</Link>
                <Link href="/blog" className="text-sm text-nieve/40 hover:text-oro transition-colors duration-200">Blog</Link>
                <Link href="/contacto" className="text-sm text-nieve/40 hover:text-oro transition-colors duration-200">Contacto</Link>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-nieve/30 mb-5">Contacto</p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:hola@struct9design.com"
                  className="text-sm text-nieve/40 hover:text-oro transition-colors duration-200"
                >
                  hola@struct9design.com
                </a>
                <span className="text-sm text-nieve/40">España</span>
                <Link
                  href="/contacto"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-oro hover:opacity-75 transition-opacity duration-200"
                >
                  Presupuesto gratuito
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
            <p className="text-xs text-nieve/20">
              © {new Date().getFullYear()} STRUCT9 Design. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <button
                id="footer-btn-tyc"
                onClick={() => openLegal('tyc')}
                className="text-[11px] text-nieve/25 hover:text-oro transition-colors duration-200 bg-transparent border-0 p-0 cursor-pointer"
              >
                Términos y Condiciones
              </button>
              <span className="text-nieve/10 select-none">·</span>
              <button
                id="footer-btn-privacidad"
                onClick={() => openLegal('privacidad')}
                className="text-[11px] text-nieve/25 hover:text-oro transition-colors duration-200 bg-transparent border-0 p-0 cursor-pointer"
              >
                Política de Privacidad
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal modal */}
      {legal && (
        <>
          <div className="fixed inset-0 z-50 bg-grafito/80 backdrop-blur-sm" onClick={closeLegal} />

          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xl bg-pizarra border-l border-white/[0.06] overflow-y-auto flex flex-col">

            {/* Sticky header */}
            <div className="sticky top-0 bg-pizarra/95 backdrop-blur-sm border-b border-white/[0.05] px-8 py-5 flex items-center justify-between shrink-0">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-nieve/30">Información legal</p>
              <button
                onClick={closeLegal}
                className="text-nieve/30 hover:text-nieve transition-colors p-1"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-8 flex-1">
              <h2 className="text-xl font-bold text-nieve leading-snug mb-2">{title}</h2>
              <p className="text-xs text-nieve/25 mb-8">Última actualización: abril 2026</p>

              <div>
                {sections.map(([heading, body]) => (
                  <div key={heading} className="mb-6 pb-6 border-b border-white/[0.04] last:border-0">
                    <p className="text-[10px] font-bold tracking-[0.14em] uppercase text-oro mb-2.5">{heading}</p>
                    <p className="text-sm leading-relaxed text-nieve/50">{body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4">
                <p className="text-xs text-nieve/25">
                  ¿Dudas? Escríbenos a{' '}
                  <a href="mailto:hola@struct9design.com" className="text-oro underline">
                    hola@struct9design.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
