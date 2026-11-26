import { useCallback, useEffect, useState } from 'react'
import './splash.css'

interface Props {
  onDone: () => void
}

export default function SplashScreen({ onDone }: Props) {
  const [saliendo, setSaliendo] = useState(false)

  const salir = useCallback(() => {
    if (saliendo) return
    setSaliendo(true)
    setTimeout(onDone, 480)
  }, [saliendo, onDone])

  useEffect(() => {
    const t1 = setTimeout(() => setSaliendo(true), 3400)
    const t2 = setTimeout(onDone, 3900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [onDone])

  return (
    <div
      className={`splash${saliendo ? ' splash--saliendo' : ''}`}
      onClick={salir}
      onKeyDown={e => e.key === 'Enter' && salir()}
      role="presentation"
      aria-label="Pantalla de bienvenida. Toca para continuar."
    >
      <div className="splash-escena">
        <div className="splash-float">
          <div className="splash-tarjeta">

            {/* Cabecera: logo + NFC */}
            <div className="card-top">
              <div className="card-logo">
                <span className="card-logo-icono">f</span>
                <span className="card-logo-nombre">food tag</span>
              </div>
              <div className="card-nfc" aria-label="NFC">))</div>
            </div>

            {/* Chip EMV */}
            <div className="card-chip" aria-hidden="true" />

            {/* Pie: mesa + instrucción */}
            <div className="card-bottom">
              <div className="card-mesa">
                <span className="mesa-label">MESA</span>
                <span className="mesa-num">04</span>
              </div>
              <span className="card-instruccion">
                Acerca tu celular<br />para pedir
              </span>
            </div>

          </div>

          {/* Sombra sincronizada con el float */}
          <div className="splash-sombra" aria-hidden="true" />
        </div>
      </div>

      {/* Texto con typewriter */}
      <div className="splash-frase-wrap" aria-live="polite">
        <span className="splash-frase">BUEN PROVECHO</span>
      </div>

      {/* Marca */}
      <div className="splash-brand" aria-hidden="true">
        <span className="logo-icono">f</span>
        <span className="splash-brand-nombre">Food<b>Tag</b></span>
      </div>

      <span className="splash-hint">Toca para continuar</span>
    </div>
  )
}
