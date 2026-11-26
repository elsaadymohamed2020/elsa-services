import { useEffect, useState } from "react";
import { content } from "./content.js";
import { WHATSAPP_NUMBER, EMAIL, EXAMPLE_URL } from "./config.js";

function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "ar" || saved === "en") return saved;
  } catch (e) {}
  return "ar";
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const t = content[lang];
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.waMessage)}`;

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t.title;
    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
  }, [lang, t.title]);

  const toggle = () => setLang(lang === "ar" ? "en" : "ar");

  return (
    <>
      <header className="top">
        <div className="wrap bar">
          <a className="brand" href="#top">Elsa</a>
          <nav>
            <a href="#services">{t.nav.services}</a>
            <a href="#how">{t.nav.how}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <button className="lang" type="button" onClick={toggle} aria-label="Language">
            {t.langButton}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap">
            <h1>{t.hero.h1}</h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="cta">
              <a className="btn primary" href={waLink} target="_blank" rel="noopener noreferrer">{t.hero.cta}</a>
              <a className="btn ghost" href="#services">{t.hero.secondary}</a>
            </div>
            <p className="for">{t.hero.for}</p>
          </div>
        </section>

        <section className="problem">
          <div className="wrap">
            <h2>{t.problem.title}</h2>
            <ul className="ticks">
              {t.problem.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="services" className="services">
          <div className="wrap">
            <h2>{t.services.title}</h2>
            <div className="cards">
              {t.services.cards.map((card) => (
                <article key={card.title} className={card.featured ? "card featured" : "card"}>
                  {card.featured && <span className="tag">{t.services.popular}</span>}
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <ul>
                    {card.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="who">
          <div className="wrap">
            <h2>{t.who.title}</h2>
            <div className="pills">
              {t.who.items.map((item) => (
                <div className="pill" key={item.name}>
                  <b>{item.name}</b>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="how">
          <div className="wrap">
            <h2>{t.how.title}</h2>
            <ol className="steps">
              {t.how.steps.map((s) => (
                <li key={s.name}>
                  <b>{s.name}</b>
                  <span>{s.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="example">
          <div className="wrap box">
            <div>
              <h2>{t.example.title}</h2>
              <p>{t.example.text}</p>
            </div>
            <a className="btn ghost" href={EXAMPLE_URL} target="_blank" rel="noopener noreferrer">{t.example.button}</a>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap">
            <h2>{t.contact.title}</h2>
            <p>{t.contact.text}</p>
            <div className="cta center">
              <a className="btn primary" href={waLink} target="_blank" rel="noopener noreferrer">{t.contact.whatsapp}</a>
              <a className="btn ghost" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>Elsa &copy; 2026</span>
        </div>
      </footer>
    </>
  );
}
