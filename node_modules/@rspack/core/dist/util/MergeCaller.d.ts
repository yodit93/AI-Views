type CallFn<D> = (args: D[]) => void;
export default class MergeCaller<D> {
    private timer;
    private callArgs;
    private debounceTime;
    private callFn;
    constructor(fn: CallFn<D>, debounceTime: number);
    private finalCall;
    push(...data: D[]): void;
}
export {};
