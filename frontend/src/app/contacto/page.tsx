export const metadata = {
  title: "Contacto",
  description: "Canales de contacto de Puntadas para consultas sobre productos textiles y deco home."
};

export default function ContactPage() {
  return <InfoPage title="Contacto" body="Seccion demo para datos publicos de contacto del negocio." />;
}

function InfoPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-4xl font-semibold text-[#211d19]">{title}</h1>
      <p className="mt-4 leading-8 text-[#62594f]">{body}</p>
    </div>
  );
}
