const rows = [
  ["1 plaza", "90 x 190 cm", "Ideal para cama individual"],
  ["2 plazas", "140 x 190 cm", "Medida comun para dormitorio principal"],
  ["Queen", "160 x 200 cm", "Para camas amplias"],
  ["King", "180 x 200 cm", "Para camas de mayor tamano"]
];

export const metadata = {
  title: "Guía de medidas",
  description: "Guía de medidas de Puntadas para elegir productos textiles según el tamaño de cama o ambiente."
};

export default function SizeGuidePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <p className="text-sm text-[#7a7066]">Inicio / Guia de medidas</p>
      <h1 className="mt-3 text-4xl font-semibold text-[#211d19]">Guia de medidas</h1>
      <p className="mt-4 max-w-2xl leading-8 text-[#62594f]">
        Referencia demo para orientar la eleccion de productos textiles. Las medidas finales se
        confirmaran con informacion real autorizada por el negocio.
      </p>

      <div className="mt-8 overflow-hidden rounded-md border border-[#eee5d8]">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-[#f5efe7] text-[#2f2a25]">
            <tr>
              <th className="p-4 font-semibold">Tipo</th>
              <th className="p-4 font-semibold">Medida</th>
              <th className="p-4 font-semibold">Uso sugerido</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-t border-[#eee5d8]">
                {row.map((cell) => (
                  <td key={cell} className="p-4 text-[#4b443c]">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
