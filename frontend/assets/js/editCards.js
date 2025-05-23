// Format the currency to Colombian Pesos
let COPPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

function changeClassificationCard(dataforSalaryClass) {
  const card = document.getElementById("salaryClassCard");

  if (!card) return false;

  const { nombre, min, max, color, descripcion, daySalary } =
    dataforSalaryClass;

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

function generateYourSalaryCard(json) {
  const card = document.getElementById("yourSalaryCard");
  if (!card) return false;
  console.log(json);
  const { nombre, daySalary } = json;

  const elements = {
    title: card.querySelector("span"),
    dailySalary: card.querySelector("strong"),
  };

  elements.title.innerHTML = `Tu salario (${json.nombre})`;
  elements.dailySalary.innerHTML = `${COPPesos.format(json.daySalary)}/día`;
}

function generateComparasionSalaryCards(comparativeArray) {
  const container = document.querySelector(".comparative-container");
  console.log("Comparative Array:", comparativeArray);
  
  // Clear the container first
  container.innerHTML = "";
  
  for (let i = 0; i < comparativeArray.length; i++) {
    const { nombre, salario_diario, veces_salario_usuario } = comparativeArray[i];
    
    // Simple percentage calculation - cap at 100%
    const percentage = Math.min(veces_salario_usuario * 20, 100);
    
    const card = document.createElement("div");
    card.classList.add("mb-3");
    card.innerHTML = `
      <div class="d-flex justify-content-between mb-1">
        <span>${nombre}</span>
        <strong>${COPPesos.format(salario_diario)}/día (${veces_salario_usuario}×)</strong>
      </div>
      <div class="comparative-bar" style="width: ${percentage}%; background-color: #4e73df"></div>
    </div>`;
    container.appendChild(card);
  }
}
