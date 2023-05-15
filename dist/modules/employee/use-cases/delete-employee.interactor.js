"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEmployeeInteractor = void 0;
class DeleteEmployeeInteractor {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    execute(payload) {
        return this.employeeRepository.deleteEmployee(payload);
    }
}
exports.DeleteEmployeeInteractor = DeleteEmployeeInteractor;
