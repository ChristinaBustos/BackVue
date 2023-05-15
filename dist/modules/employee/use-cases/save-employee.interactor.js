"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveEmployeeInteractor = void 0;
class SaveEmployeeInteractor {
    constructor(employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    execute(payload) {
        return this.employeeRepository.saveEmployee(payload);
    }
}
exports.SaveEmployeeInteractor = SaveEmployeeInteractor;
