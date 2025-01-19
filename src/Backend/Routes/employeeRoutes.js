import express from "express";
import Employee from "../Models/Employee";

const router = express.Router();
let employeeIdCounter = 1;

// Criar funcionário
router.post("/", async (req, res) => {
  try {
    const newEmployee = new Employee({
      ...req.body,
      id: `F-${String(employeeIdCounter++).padStart(5, "0")}`,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: "Erro ao criar funcionário" });
  }
});

// Obter todos os funcionários
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(400).json({ message: "Erro ao buscar funcionários" });
  }
});

// Atualizar funcionário
router.put("/:id", async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: "Erro ao atualizar funcionário" });
  }
});

// Deletar funcionário
router.delete("/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Funcionário deletado com sucesso!" });
  } catch (err) {
    res.status(400).json({ message: "Erro ao deletar funcionário" });
  }
});

export default router;
