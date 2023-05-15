import { ResponseApi } from "@/kernel/types"
import { Employee } from "../entities/employee"
import { EmployeeRepository } from "../use-cases/ports/employee.repository"
import { GetEmployeesDto } from "./dto/get-employees"
import { SaveEmployeeDto } from "./dto/save-employee"
import { UpdateEmployeeDto } from "./dto/update-employee"
import { pool } from "../../../utils/dbconfig"

export class EmployeeStorageGateway implements EmployeeRepository {

    async findAll(): Promise<Employee[]> {
        try {
            const response = await pool.query('SELECT * FROM employees')
            const employees: Employee[] = response.rows
            return employees
        } catch (error) {
            console.error(error,'holaa')
            throw new Error
        }
    }
    async findEmployee(payload: number): Promise<Employee> {
        try {
            const id: number = payload
            const response = await pool.query('SELECT * FROM employees WHERE id = $1;', [id])
            const employee: Employee = response.rows[0] as Employee
            return employee
        } catch (error) {
            console.error(error)
            throw new Error
        }
    }
    async saveEmployee(payload: SaveEmployeeDto): Promise<Employee> {
        try {
            const { name, surname, lastname } = payload
            console.log(payload);
            const response = await pool.query('INSERT INTO employees(name, surname, lastname) VALUES ($1, $2, $3) RETURNING *;', [name, surname, lastname])
            const createdUser: Employee = response.rows[0] as Employee
            return createdUser
        } catch (error) {
            throw new Error
        }
    }
    async updateEmployee(payload: UpdateEmployeeDto): Promise<Employee> {
        try {
            const { id, name, surname, lastname } = payload
            const response = await pool.query("UPDATE employees SET name = $2, surname = $3, lastname = $4 WHERE id = $1 RETURNING *;", [id, name, surname, lastname])
            const updatedEmployee: Employee = response.rows[0] as Employee
            return updatedEmployee
        } catch (error) {
            throw new Error
        }
    }
    async deleteEmployee(payload: number): Promise<Employee> {
        try {
            const id: number = payload
            const response = await pool.query('DELETE FROM employees WHERE id = $1 RETURNING *;', [id])
            const deletedEmployee: Employee = response.rows[0] as Employee
            return deletedEmployee
        } catch (error) {
            console.error(error)
            throw new Error
        }
    }
}