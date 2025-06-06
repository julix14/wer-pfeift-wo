import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum | Wer pfeift wo",
  description: "Impressum und rechtliche Informationen",
}

export default function ImpressumPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Impressum</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">Angaben gemäß § 5 TMG</h2>
          <p>Julian Becker</p>
          <p>Betreiber der Website &quot;Wer pfeift wo&quot;</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Kontakt</h2>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Julius Becker</p>
          <p>Westfälische Straße 39</p>
          <p>10711 Berlin</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">Haftungsausschluss</h2>
          <h3 className="text-lg font-medium mb-2">Haftung für Inhalte</h3>
          <p className="mb-4">
            Diese Seite ist ein Hobbyprojekt und wird nicht für kommerzielle Zwecke genutzt und steht in keinem Zusammenhang mit dem &quot;DFB&quot; oder &quot;Fussball.de&quot;.
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          </p>
          
          <h3 className="text-lg font-medium mb-2">Haftung für Links</h3>
          <p className="mb-4">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          </p>
        </section>
      </div>
    </div>
  )
} 