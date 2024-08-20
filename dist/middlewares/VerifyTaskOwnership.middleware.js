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
exports.VerifyTaskOwnership = void 0;
const prisma_1 = require("../database/prisma");
const app_errors_1 = require("../errors/app.errors");
class VerifyTaskOwnership {
    static execute(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskId = Number(req.params.id);
            const userId = res.locals.decode.id;
            const task = yield prisma_1.prisma.task.findFirst({
                where: { id: taskId, userId: userId },
            });
            if (!task) {
                throw new app_errors_1.AppError("Task does not belong to the user", 403);
            }
            next();
        });
    }
}
exports.VerifyTaskOwnership = VerifyTaskOwnership;
