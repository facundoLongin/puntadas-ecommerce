export function Footer() {
  return (
    <footer className="border-t border-[#eee5d8] bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-[#5d554c] sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-semibold uppercase tracking-[0.18em] text-[#2d2924]">Puntadas</p>
          <p className="mt-3 max-w-sm">
            Textil y deco home. Datos demo para desarrollo y portfolio.
          </p>
        </div>
        <div>
          <p className="font-semibold text-[#2d2924]">Atencion</p>
          <p className="mt-3">Consultas, medidas y pedidos personalizados.</p>
        </div>
        <div>
          <p className="font-semibold text-[#2d2924]">Privacidad</p>
          <p className="mt-3">El repo publico no contiene datos reales del negocio.</p>
        </div>
      </div>
    </footer>
  );
}
