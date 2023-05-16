"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employees_controller_1 = __importDefault(require("./modules/employee/adapters/employees.controller"));
const app = (0, express_1.default)();
// middlewares
// app.use(cors())
app.use(express_1.default.json());
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    next();
});
// Routes
app.get('/ping', (_req, res) => {
    console.log('Pinged');
    res.send('pong');
});
app.use('/user', employees_controller_1.default);
app.listen(3000);
console.log('Server on port', 3000);
