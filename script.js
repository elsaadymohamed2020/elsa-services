// Contact settings. Change the number here (digits only, with country code).
var WHATSAPP_NUMBER = "201092700628";

var WA_MESSAGE = {
  ar: "السلام عليكم، شفت صفحة Elsa وحابب أعرف أكتر عن الخدمات.",
  en: "Hello, I saw the Elsa page and would like to know more about your services."
};

function waLink(lang) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WA_MESSAGE[lang]);
}

function setLang(lang) {
  var html = document.documentElement;
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-ar]").forEach(function (el) {
    el.textContent = el.getAttribute("data-" + lang);
  });
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = waLink(lang);
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.getElementById("lang").textContent = lang === "ar" ? "English" : "العربية";
  document.title = lang === "ar"
    ? "Elsa | حجز وطلبات على واتساب لمحلك"
    : "Elsa | WhatsApp booking and orders for your business";
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

document.getElementById("lang").addEventListener("click", function () {
  setLang(document.documentElement.lang === "ar" ? "en" : "ar");
});

var saved = "ar";
try { saved = localStorage.getItem("lang") || "ar"; } catch (e) {}
setLang(saved);
