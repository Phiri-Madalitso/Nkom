const liste = document.getElementById("dagbok-innlegg");
const maanedKnapper = document.querySelectorAll(".dagbok-maaned");

let valgtMaaned = "2026-08";

function escapeHtml(tekst) {
  return String(tekst)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formaterKortDato(isoDato) {
  const deler = isoDato.split("-");
  return deler[2] + "." + deler[1] + "." + deler[0].slice(2);
}

function visInnlegg() {
  const innlegg = DAGBOK_INNLEGG.filter(function (side) {
    return side.dato.indexOf(valgtMaaned) === 0;
  }).sort(function (a, b) {
    return a.dato.localeCompare(b.dato);
  });

  if (innlegg.length === 0) {
    liste.innerHTML = "<p class=\"dagbok-tom\">Ingen innlegg i denne måneden ennå.</p>";
    return;
  }

  liste.innerHTML = innlegg
    .map(function (side) {
      const brodtekst = [side.jobbetMed, side.refleksjoner, side.laerdom]
        .filter(Boolean)
        .join(" ");
      return (
        "<article class=\"dagbok-kort\">" +
        "<p class=\"dagbok-kort-dato\">" +
        escapeHtml(formaterKortDato(side.dato)) +
        "</p>" +
        "<p class=\"dagbok-kort-tekst\">" +
        escapeHtml(brodtekst) +
        "</p>" +
        "</article>"
      );
    })
    .join("");
}

maanedKnapper.forEach(function (knapp) {
  knapp.addEventListener("click", function () {
    valgtMaaned = knapp.getAttribute("data-maaned");
    maanedKnapper.forEach(function (k) {
      k.classList.remove("is-aktiv");
      k.setAttribute("aria-selected", "false");
    });
    knapp.classList.add("is-aktiv");
    knapp.setAttribute("aria-selected", "true");
    visInnlegg();
  });
});

visInnlegg();
