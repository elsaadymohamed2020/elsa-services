import { useEffect, useState } from "react";
import { content } from "./content.js";
import { WHATSAPP_NUMBER, EMAIL, EXAMPLE_URL } from "./config.js";
import Icon from "./Icon.jsx";

const problemIcons = ["phone", "moon", "list", "search"];
const serviceIcons = ["chat", "dashboard", "globe"];
const whoIcons = ["scissors", "pulse", "store"];
const stepIcons = ["chat", "eye", "zap"];
const trustIcons = ["clock", "globe", "calendar"];

function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "ar" || saved === "en") return saved;
  } catch (e) {}
  return "ar";
}

function PhoneMockup({ t }) {
  return (
    <div className="phone" aria-hidden="true">
      <div className="phone-notch" />
      <div className="chat-head">
        <span className="avatar">E</span>
        <div>
          <b>{t.chat.shop}</b>
          <small>{t.chat.online}</small>
        </div>
      </div>
      <div className="chat-body">
        {t.chat.messages.map((m, i) => (
          <div key={i} className={"msg " + m.from}>{m.text}</div>
        ))}
      </div>
      <div className="chat-note">{t.chat.sample}</div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setLang(lang === "ar" ? "en" : "ar");
  const year = new Date().getFullYear();

  return (
    <>
      <header className={scrolled ? "top scrolled" : "top"}>
        <div className="wrap bar">
          <a className="brand" href="#top"><span className="logo">E</span>Elsa</a>
          <nav>
            <a href="#services">{t.nav.services}</a>
            <a href="#how">{t.nav.how}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>
          <button className="lang" type="button" onClick={toggle} aria-label="Language">
            <Icon name="globe" size={16} />{t.langButton}
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-text">
              <h1>{t.hero.h1}</h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="cta">
                <a className="btn primary" href={waLink} target="_blank" rel="noopener noreferrer">
                  <Icon name="chat" size={20} />{t.hero.cta}
                </a>
                <a className="btn ghost-light" href="#services">{t.hero.secondary}</a>
              </div>
              <p className="for">{t.hero.for}</p>
            </div>
            <div className="hero-visual"><PhoneMockup t={t} /></div>
          </div>
        </section>

        <section className="trust">
          <div className="wrap trust-row">
            {t.trust.map((item, i) => (
              <div className="trust-item" key={item}>
                <Icon name={trustIcons[i]} size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="problem">
          <div className="wrap">
            <h2>{t.problem.title}</h2>
            <div className="pain-grid">
              {t.problem.items.map((item, i) => (
                <div className="pain" key={item}>
                  <span className="ico-box warm"><Icon name={problemIcons[i]} /></span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="services">
          <div className="wrap">
            <h2>{t.services.title}</h2>
            <div className="cards">
              {t.services.cards.map((card, i) => (
                <article key={card.title} className={card.featured ? "card featured" : "card"}>
                  {card.featured && <span className="tag">{t.services.popular}</span>}
                  <span className="ico-box"><Icon name={serviceIcons[i]} size={26} /></span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <ul>
                    {card.bullets.map((b) => (
                      <li key={b}><Icon name="check" size={16} className="tick" />{b}</li>
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
              {t.who.items.map((item, i) => (
                <div className="pill" key={item.name}>
                  <span className="ico-box"><Icon name={whoIcons[i]} /></span>
                  <div><b>{item.name}</b><span>{item.text}</span></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="how">
          <div className="wrap">
            <h2>{t.how.title}</h2>
            <ol className="steps">
              {t.how.steps.map((s, i) => (
                <li key={s.name}>
                  <span className="step-top">
                    <span className="num">{i + 1}</span>
                    <span className="ico-box"><Icon name={stepIcons[i]} /></span>
                  </span>
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
            <a className="btn ghost-light" href={EXAMPLE_URL} target="_blank" rel="noopener noreferrer">
              {t.example.button}<Icon name="arrow" size={18} className="flip" />
            </a>
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap">
            <h2>{t.contact.title}</h2>
            <p>{t.contact.text}</p>
            <div className="cta center">
              <a className="btn primary" href={waLink} target="_blank" rel="noopener noreferrer">
                <Icon name="chat" size={20} />{t.contact.whatsapp}
              </a>
              <a className="btn ghost-light" href={`mailto:${EMAIL}`}>
                <Icon name="mail" size={20} />{EMAIL}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot-grid">
          <div>
            <a className="brand" href="#top"><span className="logo">E</span>Elsa</a>
            <p>{t.footer.tagline}</p>
          </div>
          <div>
            <h4>{t.footer.links}</h4>
            <a href="#services">{t.nav.services}</a>
            <a href="#how">{t.nav.how}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div>
            <h4>{t.footer.contact}</h4>
            <a href={waLink} target="_blank" rel="noopener noreferrer">{t.contact.whatsapp}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
        <div className="wrap rights">Elsa &copy; {year}. {t.footer.rights}.</div>
      </footer>
    </>
  );
}
