"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeCompilationDependencies = void 0;
const MergeCaller_1 = __importDefault(require("./MergeCaller"));
function createFakeCompilationDependencies(getDeps, addDeps) {
    const addDepsCaller = new MergeCaller_1.default(addDeps, 10);
    return {
        *[Symbol.iterator]() {
            const deps = getDeps();
            for (const dep of deps) {
                yield dep;
            }
        },
        has(dep) {
            return getDeps().includes(dep);
        },
        add: (dep) => {
            addDepsCaller.push(dep);
        },
        addAll: (deps) => {
            addDepsCaller.push(...deps);
        }
    };
}
exports.createFakeCompilationDependencies = createFakeCompilationDependencies;
