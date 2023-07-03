const activeCategory = () => {
  const params = new URLSearchParams(window.location.search);
  const filterValue = params.get("filterVal");

  let category = "";
  if (filterValue == "Mujer") category = "Women’s";
  if (filterValue == "Hombre") category = "Men’s";

  const coleccion = document.querySelectorAll("#filter__controls li");
  for (let index = 0; index < coleccion.length; index++) {
    const element = coleccion[index];

    element.textContent == category
      ? element.classList.add("active")
      : element.classList.remove("active");
  }
};

const handleCategory = (e) => {
  const { target } = e;
  const category = target.textContent;

  console.log(category);
  const params = new URLSearchParams(window.location.search);
  params.delete("page");
  params.delete("filter");
  params.delete("filterVal");

  if (category != "All") {
    params.set("filter", "category");
    category == "Women’s" && params.set("filterVal", "Mujer");
    category == "Men’s" && params.set("filterVal", "Hombre");
  }
  location.replace(`${window.location.pathname}?${params}`);
};

////////////////////////////////////////////////////////////////////////////
// CODIGO AUTO-EJECUTADO EN WINDOW.ONLOAD
////////////////////////////////////////////////////////////////////////////
document
  .querySelector("#filter__controls")
  .addEventListener("click", handleCategory);

activeCategory();