const json = {
  message: "Salary classification",
  data: {
    class: {
      nombre: "Pobreza Extrema",
      min: 0,
      max: 331687,
      color: "#795548",
      descripcion:
        "42% de la población. Subsisten con ayudas estatales o trabajos ocasionales.",
      daySalary: "5000.00",
    },
    references: [
      {
        nombre: "Luis Carlos Sarmiento (Multimillonario)",
        salario_diario: 72320000,
        tipo: "empresario",
      },
      {
        nombre: "CEO de Bancolombia",
        salario_diario: 5000000,
        tipo: "empresario",
      },
      {
        nombre: "Presidente de la República",
        salario_diario: 1333333,
        tipo: "político",
      },
      {
        nombre: "Ministro",
        salario_diario: 833333,
        tipo: "político",
      },
      {
        nombre: "Congresista",
        salario_diario: 633333,
        tipo: "político",
      },
      {
        nombre: "Gerente de Empresa Mediana",
        salario_diario: 333333,
        tipo: "empresario",
      },
      {
        nombre: "Ingeniero Senior",
        salario_diario: 166666,
        tipo: "profesional",
      },
      {
        nombre: "Salario Mínimo 2024",
        salario_diario: 43333,
        tipo: "referencia",
      },
      {
        nombre: "Trabajador Informal",
        salario_diario: 20000,
        tipo: "referencia",
      },
    ],
    comparative: [
      {
        nombre: "Luis Carlos Sarmiento (Multimillonario)",
        salario_diario: 72320000,
        veces_salario_minimo: "1668.92",
        veces_salario_usuario: "482.13",
        tipo: "empresario",
      },
      {
        nombre: "CEO de Bancolombia",
        salario_diario: 5000000,
        veces_salario_minimo: "115.38",
        veces_salario_usuario: "33.33",
        tipo: "empresario",
      },
      {
        nombre: "Presidente de la República",
        salario_diario: 1333333,
        veces_salario_minimo: "30.77",
        veces_salario_usuario: "8.89",
        tipo: "político",
      },
      {
        nombre: "Ministro",
        salario_diario: 833333,
        veces_salario_minimo: "19.23",
        veces_salario_usuario: "5.56",
        tipo: "político",
      },
      {
        nombre: "Congresista",
        salario_diario: 633333,
        veces_salario_minimo: "14.62",
        veces_salario_usuario: "4.22",
        tipo: "político",
      },
      {
        nombre: "Gerente de Empresa Mediana",
        salario_diario: 333333,
        veces_salario_minimo: "7.69",
        veces_salario_usuario: "2.22",
        tipo: "empresario",
      },
      {
        nombre: "Ingeniero Senior",
        salario_diario: 166666,
        veces_salario_minimo: "3.85",
        veces_salario_usuario: "1.11",
        tipo: "profesional",
      },
      {
        nombre: "Salario Mínimo 2024",
        salario_diario: 43333,
        veces_salario_minimo: "1.00",
        veces_salario_usuario: "0.29",
        tipo: "referencia",
      },
      {
        nombre: "Trabajador Informal",
        salario_diario: 20000,
        veces_salario_minimo: "0.46",
        veces_salario_usuario: "0.13",
        tipo: "referencia",
      },
    ],
  },
};
// Format the currency to Colombian Pesos
let COPPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

document.addEventListener("DOMContentLoaded", () => {
  changeClassificationCard(json.data.class);
});

function changeClassificationCard(dataforSalaryClass) {
  const card = document.getElementById("salaryClassCard");
  if (!card) return false;

  const { nombre, min, max, color, descripcion, daySalary } =
    dataforSalaryClass;
  // Guard clause for missing elements

  const elements = {
    title: card.querySelector("h2"),
    max: card.querySelector(".max-salary-card"),
    min: card.querySelector(".min-salary-card"),
    description: card.querySelector(".description-class-card"),
    header: card.querySelector(".card-header"),
    daySalary: card.querySelector(".daily-salary-class-card"),
  };
  for (const key in elements) {
    if (!elements[key]) return;
  }
  card.style.borderLeft = `5px solid ${color}`;
  elements.header.style.backgroundColor = color;
  elements.header.style.color = "white";
  elements.title.textContent = nombre;
  elements.title.style.color = color;
  elements.min.textContent = COPPesos.format(min);
  elements.max.textContent = COPPesos.format(max);
  elements.description.textContent = descripcion;
  elements.daySalary.textContent = COPPesos.format(daySalary);
}
