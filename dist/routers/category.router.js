"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_schemas_1 = require("../schemas/category.schemas");
const category_controller_1 = require("../controllers/category.controller");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const tsyringe_1 = require("tsyringe");
exports.categoryRouter = (0, express_1.Router)();
tsyringe_1.container.registerSingleton("CategoryServices", services_1.CategoryServices);
const categoryControllers = tsyringe_1.container.resolve(category_controller_1.CategoryControllers);
exports.categoryRouter.post("/", middlewares_1.VerifyToken.execute, middlewares_1.ValidateBody.execute(category_schemas_1.categoryCreateSchema), (req, res) => categoryControllers.create(req, res));
exports.categoryRouter.delete("/:id", middlewares_1.VerifyToken.execute, middlewares_1.IsCategoryIdValid.execute, middlewares_1.IsCategoryBelongsToUser.execute, (req, res) => categoryControllers.delete(req, res));
