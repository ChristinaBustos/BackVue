"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeStorageGateway = void 0;
const dbconfig_1 = require("../../../utils/dbconfig");
class EmployeeStorageGateway {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield dbconfig_1.pool.query('SELECT * FROM employees');
                const employees = response.rows;
                return employees;
            }
            catch (error) {
                console.error(error, 'holaa');
                throw new Error;
            }
        });
    }
    findEmployee(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = payload;
                const response = yield dbconfig_1.pool.query('SELECT * FROM employees WHERE id = $1;', [id]);
                const employee = response.rows[0];
                return employee;
            }
            catch (error) {
                console.error(error);
                throw new Error;
            }
        });
    }
    saveEmployee(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, surname, lastname } = payload;
                console.log(payload);
                const response = yield dbconfig_1.pool.query('INSERT INTO employees(name, surname, lastname) VALUES ($1, $2, $3) RETURNING *;', [name, surname, lastname]);
                const createdUser = response.rows[0];
                return createdUser;
            }
            catch (error) {
                throw new Error;
            }
        });
    }
    updateEmployee(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, surname, lastname } = payload;
                const response = yield dbconfig_1.pool.query("UPDATE employees SET name = $2, surname = $3, lastname = $4 WHERE id = $1 RETURNING *;", [id, name, surname, lastname]);
                const updatedEmployee = response.rows[0];
                return updatedEmployee;
            }
            catch (error) {
                throw new Error;
            }
        });
    }
    deleteEmployee(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = payload;
                const response = yield dbconfig_1.pool.query('DELETE FROM employees WHERE id = $1 RETURNING *;', [id]);
                const deletedEmployee = response.rows[0];
                return deletedEmployee;
            }
            catch (error) {
                console.error(error);
                throw new Error;
            }
        });
    }
}
exports.EmployeeStorageGateway = EmployeeStorageGateway;
