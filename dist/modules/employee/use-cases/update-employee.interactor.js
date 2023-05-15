"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEmployeeInteractor = void 0;
class UpdateEmployeeInteractor {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    execute(payload) {
        return this.employeeRepository.updateEmployee(payload);
    }
}
exports.UpdateEmployeeInteractor = UpdateEmployeeInteractor;
