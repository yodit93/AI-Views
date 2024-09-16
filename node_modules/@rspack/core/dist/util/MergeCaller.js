"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MergeCaller {
    constructor(fn, debounceTime) {
        this.timer = null;
        this.callArgs = [];
        this.finalCall = () => {
            this.timer = null;
            const args = this.callArgs;
            this.callArgs = [];
            this.callFn(args);
        };
        this.debounceTime = debounceTime;
        this.callFn = fn;
    }
    push(...data) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.callArgs.push(...data);
        this.timer = setTimeout(this.finalCall, this.debounceTime);
    }
}
exports.default = MergeCaller;
