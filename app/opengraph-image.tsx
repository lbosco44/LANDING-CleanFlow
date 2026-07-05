import { ImageResponse } from "next/og";

// OG image generata (anteprima quando il link viene condiviso su WhatsApp,
// Facebook, LinkedIn…). Brand "Sala di Controllo": navy + teal.
export const alt = "CleanFlow — il gestionale per imprese di pulizie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Carica un font da Google Fonts per Satori. Fallback silenzioso al font di
// default se la rete non risponde: l'immagine si genera comunque.
async function loadGoogleFont(family: string, weight: number) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
        { headers: { "User-Agent": "Mozilla/5.0" } }
      )
    ).text();
    const src = css.match(/src: url\((.+?)\) format/)?.[1];
    if (!src) return null;
    return await (await fetch(src)).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [display, body] = await Promise.all([
    loadGoogleFont("Bricolage+Grotesque", 700),
    loadGoogleFont("Hanken+Grotesk", 500),
  ]);

  const fonts: {
    name: string;
    data: ArrayBuffer;
    weight: 500 | 700;
    style: "normal";
  }[] = [];
  if (display)
    fonts.push({ name: "Bricolage", data: display, weight: 700, style: "normal" });
  if (body)
    fonts.push({ name: "Hanken", data: body, weight: 500, style: "normal" });

  const displayFF = display ? "Bricolage" : "sans-serif";
  const bodyFF = body ? "Hanken" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#001a52",
          backgroundImage:
            "radial-gradient(1000px 520px at 88% -12%, rgba(0,180,180,0.38), transparent 60%), radial-gradient(760px 520px at -5% 118%, rgba(0,36,108,0.65), transparent 62%)",
          color: "#eaf0ff",
          fontFamily: bodyFF,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 13,
              backgroundColor: "#00b4b4",
              display: "flex",
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: displayFF,
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            <span style={{ color: "#ffffff" }}>Clean</span>
            <span style={{ color: "#00b4b4" }}>Flow</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              color: "#5ee0e0",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            Gestionale per imprese di pulizie
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: displayFF,
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 920,
              color: "#ffffff",
            }}
          >
            La tua impresa di pulizie, finalmente sotto controllo.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", color: "#a7b0ce", fontSize: 26 }}>
            Entrate · Clienti · Strutture · Operatori
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#00b4b4",
              color: "#00246c",
              fontWeight: 700,
              fontSize: 24,
              padding: "12px 26px",
              borderRadius: 999,
            }}
          >
            cleanflowapp.it
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
