import { useCallback, useEffect, useState } from 'react'
import './foodtag.css'
import { desarrolladores, documentos, enlaces } from './data'
import SplashScreen from './SplashScreen'

const BASE = import.meta.env.BASE_URL

/* ── Tema ── */
function useTema() {
  const [tema, setTema] = useState<'light' | 'dark'>(() => {
    try { return (localStorage.getItem('tema') as 'dark' | 'light') ?? 'dark' } catch { return 'dark' }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = tema === 'dark' ? 'dark' : ''
    try { localStorage.setItem('tema', tema) } catch {}
  }, [tema])
  return { tema, toggleTema: () => setTema(t => t === 'dark' ? 'light' : 'dark') }
}

/* ── Visor PDF ── */
interface VisorProps { titulo: string; src: string; onCerrar: () => void }
function VisorPDF({ titulo, src, onCerrar }: VisorProps) {
  const cerrar = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onCerrar()
  }, [onCerrar])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onCerrar() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onCerrar])

  return (
    <div className="pdf-fondo" onClick={cerrar} role="dialog" aria-modal="true" aria-label={titulo}>
      <div className="pdf-modal">
        <div className="pdf-cabecera">
          <span className="pdf-titulo">{titulo}</span>
          <button className="pdf-cerrar" onClick={onCerrar} aria-label="Cerrar visor">×</button>
        </div>
        <iframe className="pdf-iframe" src={src} title={titulo} />
      </div>
    </div>
  )
}

/* ── Modal Desarrolladores ── */
function ModalDevs({ onCerrar }: { onCerrar: () => void }) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onCerrar() }
    document.addEventListener('keydown', fn)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = '' }
  }, [onCerrar])

  return (
    <div className="devs-fondo" onClick={e => { if (e.target === e.currentTarget) onCerrar() }} role="dialog" aria-modal="true" aria-label="Equipo de desarrollo">
      <div className="devs-modal">
        <div className="devs-modal-cabecera">
          <span className="ceja">✳ &nbsp;Equipo</span>
          <button className="pdf-cerrar" onClick={onCerrar} aria-label="Cerrar">×</button>
        </div>
        <div className="devs-modal-lista">
          {desarrolladores.map((dev, i) => (
            <div
              key={dev.id}
              className="dev-modal-card"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="dev-modal-avatar" aria-hidden="true">
                {/* Iniciales: siempre visibles como fallback */}
                <span className="dev-avatar-iniciales">{dev.iniciales}</span>
                {/* Foto: aparece encima cuando carga */}
                {dev.foto && (
                  <img
                    src={`${BASE}${dev.foto}`}
                    alt=""
                    className="dev-avatar-foto"
                    onLoad={e => (e.currentTarget.style.opacity = '1')}
                  />
                )}
              </div>
              <div>
                <div className="dev-nombre">{dev.nombre}</div>
                <div className="dev-rol" data-rol={dev.rol}>{dev.rol}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── App ── */
export default function App() {
  const { tema, toggleTema } = useTema()
  const [splashListo, setSplashListo] = useState(false)
  const [pdfAbierto, setPdfAbierto] = useState<{ titulo: string; src: string } | null>(null)
  const [modalDevs, setModalDevs] = useState(false)

  const abrirPdf = (titulo: string, archivo: string) =>
    setPdfAbierto({ titulo, src: `${BASE}${archivo}` })

  return (
    <>
      {!splashListo && <SplashScreen onDone={() => setSplashListo(true)} />}

      {pdfAbierto && (
        <VisorPDF
          titulo={pdfAbierto.titulo}
          src={pdfAbierto.src}
          onCerrar={() => setPdfAbierto(null)}
        />
      )}

      {/* Fondo animado — cero red, aparece después del contenido */}
      <div className="fondo-animado" aria-hidden="true">
        <div className="orbe orbe-1" />
        <div className="orbe orbe-2" />
        <div className="orbe orbe-3" />
        <div className="orbe orbe-4" />
        <div className="orbe orbe-5" />
        <div className="burbuja burbuja-1">f</div>
        <div className="burbuja burbuja-2">f</div>
        <div className="burbuja burbuja-3">f</div>
        <div className="burbuja burbuja-4">f</div>
        <div className="burbuja burbuja-5">f</div>
        <div className="burbuja burbuja-6">f</div>
        <div className="burbuja burbuja-7">f</div>
      </div>

      {/* Barra superior */}
      <header className="barra-superior">
        <a href="#inicio" className="logo-wrap">
          <span className="logo-icono">f</span>
          <span className="logo-texto">Food<b>Tag</b></span>
        </a>
        <button
          className="btn-tema"
          onClick={toggleTema}
          aria-label={tema === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        />
      </header>

      <main>
        <div className="contenedor" id="inicio">

          {/* Banner */}
          <section className="banner animar">
            <span className="pill"><span>✳</span> RECURSOS</span>
            <h1>Sistema de<br />enlaces</h1>
            <p>Accede a los <strong>documentos y herramientas</strong> del proyecto FoodTag desde un solo lugar.</p>
          </section>

          {/* ── Sección: enlaces ── */}
          <section>
            <div className="seccion-titulo">
              <span className="ceja">✳ &nbsp;Enlaces</span>
            </div>
            <div className="grid-2">
              {enlaces.map((e, i) => (
                <a
                  key={e.id}
                  href={e.url}
                  className="tarjeta-enlace animar"
                  style={{ animationDelay: `${0.05 + i * 0.07}s` }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="icono" aria-hidden="true">{e.icono}</span>
                  <h3>{e.titulo}</h3>
                  <p>{e.descripcion}</p>
                  <span className="flecha" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>

          {/* ── Sección: documentos ── */}
          <section>
            <div className="seccion-titulo">
              <span className="ceja">✳ &nbsp;Documentos</span>
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {documentos.map((doc, i) => (
                <div
                  key={doc.id}
                  className="tarjeta-doc animar"
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  <span
                    className="doc-icono"
                    aria-hidden="true"
                    style={doc.color ? { background: `${doc.color}22`, fontSize: '22px' } : undefined}
                  >
                    {doc.icono}
                  </span>
                  <div className="doc-info">
                    <h3>{doc.titulo}</h3>
                    <p>{doc.descripcion}</p>
                    {(doc.paginas || doc.tamanio) && (
                      <p style={{ fontSize: '12px', color: 'var(--texto-3)', marginBottom: '10px' }}>
                        {doc.paginas && `${doc.paginas} páginas`}
                        {doc.paginas && doc.tamanio && ' · '}
                        {doc.tamanio}
                      </p>
                    )}
                    <div className="doc-acciones">
                      <button
                        className="btn"
                        style={{ fontSize: '13px', minHeight: '40px', padding: '0 16px' }}
                        onClick={() => abrirPdf(doc.titulo, doc.archivo)}
                      >
                        Ver PDF
                      </button>
                      <a
                        href={`${BASE}${doc.archivo}`}
                        download
                        className="btn-sec"
                      >
                        ↓ Descargar
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Sección: desarrolladores ── */}
          <section>
            <div className="btn-devs-wrap">
              <button
                className="btn-sec"
                style={{ minHeight: '44px', padding: '0 24px', gap: '8px', display: 'flex', alignItems: 'center' }}
                onClick={() => setModalDevs(true)}
              >
                <span aria-hidden="true">👥</span>
                Ver desarrolladores
              </button>
            </div>
          </section>

        </div>
      </main>

      {/* Modal desarrolladores */}
      {modalDevs && (
        <ModalDevs onCerrar={() => setModalDevs(false)} />
      )}

      <footer className="pie">
        <p>Hecho con <span>♥</span> para <span>FoodTag</span> · {new Date().getFullYear()}</p>
        <div className="pie-universidad">
          <span className="pie-uni-nombre">Universidad Popular del Cesar</span>
          <span className="pie-uni-sub">Proyecto de Programación Web — FoodTag</span>
        </div>
      </footer>
    </>
  )
}
