"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEmployeeInteractor = void 0;
class GetEmployeeInteractor {
    constructor(employeeReposotory) {
        this.employeeReposotory = employeeReposotory;
    }
    execute(payload) {
        return this.employeeReposotory.findEmployee(payload);
    }
}
exports.GetEmployeeInteractor = GetEmployeeInteractor;
