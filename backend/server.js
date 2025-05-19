const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/salary", (req, res) => {
  console.log("Body received:", req.body);
  let { salary } = req.body;

  const result = makeSalaryComparasion(salary);
  if (result.error) {
    return res.status(400).json(result);
  }
  res.status(200).json(result);
});

function makeSalaryComparasion(userSalary) {
  const dataSalaries = JSON.parse(
    fs.readFileSync("./data/salarios.json", "utf8")
  );

  const daySalary = (userSalary / 30).toFixed(2);
  const dailySalaryWage = dataSalaries.metadata.salario_minimo_mensual / 30;

  let socioEconomicClass = {};

  for (const obj of dataSalaries.clases_sociales) {
    if (userSalary >= obj.min && (obj.max === null || userSalary <= obj.max)) {
      socioEconomicClass = { ...obj, daySalary };
      break;
    }
  }
  const salaryComparasion = dataSalaries.salarios_referencia.map((ref) => {
    const timesMinimumWage = (ref.salario_diario / dailySalaryWage).toFixed(2);
    const timesSalary = (ref.salario_diario / userSalary).toFixed(2);
    return {
      nombre: ref.nombre,
      salario_diario: ref.salario_diario,
      veces_salario_minimo: timesMinimumWage,
      veces_salario_usuario: timesSalary,
      tipo: ref.tipo,
    };
  });
  return (result = {
    class: socioEconomicClass,
    references: dataSalaries.salarios_referencia,
    comparative: salaryComparasion,
  });
}

app.listen(PORT, () =>
  console.log(`API corriendo en http://localhost:${PORT}`)
);
