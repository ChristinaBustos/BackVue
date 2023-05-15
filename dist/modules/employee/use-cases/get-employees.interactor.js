"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEmployeesInteractor = void 0;
class GetEmployeesInteractor {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    execute() {
        return this.employeeRepository.findAll();
    }
}
exports.GetEmployeesInteractor = GetEmployeesInteractor;
