const questions = [
  "Como elijo la medida correcta?",
  "Los productos tienen cambio?",
  "Como se coordina la entrega?"
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-semibold text-[#211d19]">Preguntas frecuentes</h1>
      <div className="mt-8 grid gap-4">
        {questions.map((question) => (
          <section key={question} className="rounded-md border border-[#eee5d8] bg-white p-5">
            <h2 className="font-semibold text-[#2f2a25]">{question}</h2>
            <p className="mt-2 text-sm leading-7 text-[#62594f]">
              Respuesta demo pendiente de definir con informacion real del negocio.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
