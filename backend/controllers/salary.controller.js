import * as fs from "fs";

const salaryClassification = async (req, res) => {
  try {
    const { salary } = req.body;
    if (!salary) {
      return res.status(400).json({ message: "Salary is required" });
    }
    if (isNaN(salary)) {
      return res.status(400).json({ message: "Salary must be a number" });
    }
    if (salary <= 0) {
      return res.status(400).json({ message: "Salary must be greater than 0" });
    }
  

    const userSalary = makeSalaryComparasion(salary);

    res.status(200).json({
      message: "Salary classification",
      data: userSalary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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
  return {
    class: socioEconomicClass,
    references: dataSalaries.salarios_referencia,
    comparative: salaryComparasion,
  };
}

export default salaryClassification;
