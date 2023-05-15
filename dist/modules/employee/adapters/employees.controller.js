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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const express_1 = require("express");
const get_employees_interactor_1 = require("../use-cases/get-employees.interactor");
const get_employee_interactor_1 = require("../use-cases/get-employee.interactor");
const save_employee_interactor_1 = require("../use-cases/save-employee.interactor");
const update_employee_interactor_1 = require("../use-cases/update-employee.interactor");
const delete_employee_interactor_1 = require("../use-cases/delete-employee.interactor");
const employees_storage_gateway_1 = require("./employees.storage.gateway");
const router = (0, express_1.Router)();
class EmployeeController {
    static getError() {
        return {
            code: 500,
            error: true,
            message: 'INTERNA_SERVER_ERROR',
        };
    }
}
_a = EmployeeController;
EmployeeController.findAll = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repo = new employees_storage_gateway_1.EmployeeStorageGateway();
        const interactor = new get_employees_interactor_1.GetEmployeesInteractor(repo);
        const employees = yield interactor.execute();
        const body = {
            code: 200,
            error: false,
            message: 'OK',
            count: employees.length,
            entities: employees
        };
        return res.status(body.code).json(body);
    }
    catch (error) {
        return res.status(_a.getError().code).json(_a.getError());
    }
});
EmployeeController.findOneEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const repo = new employees_storage_gateway_1.EmployeeStorageGateway();
        const interactor = new get_employee_interactor_1.GetEmployeeInteractor(repo);
        const employee = yield interactor.execute(id);
        let body = {
            code: 200,
            error: false,
            message: 'OK',
            count: 1,
            entity: employee
        };
        if (!employee)
            body = Object.assign(Object.assign({}, body), { code: 404, message: 'NOT_FOUND', count: undefined });
        return res.status(body.code).json(body);
    }
    catch (error) {
        return res.status(_a.getError().code).json(_a.getError());
    }
});
EmployeeController.saveEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign({}, req.body);
        const repo = new employees_storage_gateway_1.EmployeeStorageGateway();
        const interactor = new save_employee_interactor_1.SaveEmployeeInteractor(repo);
        const createdEmployee = yield interactor.execute(payload);
        const body = {
            code: 201,
            error: false,
            message: 'CREATED',
            count: 1,
            entity: createdEmployee
        };
        return res.status(body.code).json(body);
    }
    catch (error) {
        return res.status(_a.getError().code).json(_a.getError());
    }
});
EmployeeController.updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const payload = Object.assign({ id: id }, req.body);
        const repo = new employees_storage_gateway_1.EmployeeStorageGateway();
        const interactor = new update_employee_interactor_1.UpdateEmployeeInteractor(repo);
        const updatedEmployee = yield interactor.execute(payload);
        let body = {
            code: 200,
            error: false,
            message: 'OK',
            count: 1,
            entity: updatedEmployee
        };
        if (!updatedEmployee)
            body = Object.assign(Object.assign({}, body), { code: 404, message: 'NOT_FOUND', count: undefined });
        return res.status(body.code).json(body);
    }
    catch (error) {
        return res.status(_a.getError().code).json(_a.getError());
    }
});
EmployeeController.deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const repo = new employees_storage_gateway_1.EmployeeStorageGateway();
        const interactor = new delete_employee_interactor_1.DeleteEmployeeInteractor(repo);
        const deletedEmployee = yield interactor.execute(id);
        let body = {
            code: 200,
            error: false,
            message: 'OK',
            count: 1,
            entity: deletedEmployee
        };
        if (!deletedEmployee)
            body = Object.assign(Object.assign({}, body), { code: 404, message: 'NOT_FOUND', count: undefined });
        return res.status(body.code).json(body);
    }
    catch (error) {
        return res.status(_a.getError().code).json(_a.getError());
    }
});
exports.EmployeeController = EmployeeController;
router.get('/', EmployeeController.findAll);
router.get('/:id', EmployeeController.findOneEmployee);
router.post('/', EmployeeController.saveEmployee);
router.put('/:id', EmployeeController.updateEmployee);
router.delete('/:id', EmployeeController.deleteEmployee);
exports.default = router;
