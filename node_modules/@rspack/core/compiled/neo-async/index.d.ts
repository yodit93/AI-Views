interface Dictionary<T> {
    [key: string]: T;
}
type IterableCollection<T> = T[] | IterableIterator<T> | Dictionary<T>;

interface ErrorCallback<E = Error> {
    (err?: E | null): void;
}
interface AsyncBooleanResultCallback<E = Error> {
    (err?: E | null, truthValue?: boolean): void;
}
interface AsyncResultCallback<T, E = Error> {
    (err?: E | null, result?: T): void;
}
interface AsyncResultArrayCallback<T, E = Error> {
    (err?: E | null, results?: Array<T | undefined>): void;
}
interface AsyncResultObjectCallback<T, E = Error> {
    (err: E | undefined, results: Dictionary<T | undefined>): void;
}

interface AsyncFunction<T, E = Error> {
    (callback: (err?: E | null, result?: T) => void): void;
}
interface AsyncFunctionEx<T, E = Error> {
    (callback: (err?: E | null, ...results: T[]) => void): void;
}
interface AsyncIterator<T, E = Error> {
    (item: T, callback: ErrorCallback<E>): void;
}
interface AsyncForEachOfIterator<T, E = Error> {
    (item: T, key: number | string, callback: ErrorCallback<E>): void;
}
interface AsyncResultIterator<T, R, E = Error> {
    (item: T, callback: AsyncResultCallback<R, E>): void;
}
interface AsyncMemoIterator<T, R, E = Error> {
    (memo: R | undefined, item: T, callback: AsyncResultCallback<R, E>): void;
}
interface AsyncBooleanIterator<T, E = Error> {
    (item: T, callback: AsyncBooleanResultCallback<E>): void;
}

interface AsyncWorker<T, E = Error> {
    (task: T, callback: ErrorCallback<E>): void;
}
interface AsyncVoidFunction<E = Error> {
    (callback: ErrorCallback<E>): void;
}

type AsyncAutoTasks<R extends Dictionary<any>, E> = { [K in keyof R]: AsyncAutoTask<R[K], R, E> };
type AsyncAutoTask<R1, R extends Dictionary<any>, E> =
    | AsyncAutoTaskFunctionWithoutDependencies<R1, E>
    | Array<keyof R | AsyncAutoTaskFunction<R1, R, E>>;
interface AsyncAutoTaskFunctionWithoutDependencies<R1, E = Error> {
    (cb: AsyncResultCallback<R1, E> | ErrorCallback<E>): void;
}
interface AsyncAutoTaskFunction<R1, R extends Dictionary<any>, E = Error> {
    (results: R, cb: AsyncResultCallback<R1, E> | ErrorCallback<E>): void;
}

interface DataContainer<T> {
    data: T;
    priority: number;
}

interface CallbackContainer {
    // eslint-disable-next-line @typescript-eslint/ban-types
    callback: Function;
}

interface PriorityContainer {
    priority: number;
}

interface QueueObject<T> {
    /**
     * Returns the number of items waiting to be processed.
     */
    length(): number;

    /**
     * Indicates whether or not any items have been pushed and processed by the queue.
     */
    started: boolean;

    /**
     * Returns the number of items currently being processed.
     */
    running(): number;

    /**
     * Returns an array of items currently being processed.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    workersList<TWorker extends DataContainer<T>, CallbackContainer>(): TWorker[];

    /**
     * Returns false if there are items waiting or being processed, or true if not.
     */
    idle(): boolean;

    /**
     * An integer for determining how many worker functions should be run in parallel.
     * This property can be changed after a queue is created to alter the concurrency on-the-fly.
     */
    concurrency: number;

    /**
     * An integer that specifies how many items are passed to the worker function at a time.
     * Only applies if this is a cargo object
     */
    payload: number;

    /**
     * Add a new task to the queue. Calls `callback` once the worker has finished
     * processing the task.
     *
     * Instead of a single task, a tasks array can be submitted.
     * The respective callback is used for every task in the list.
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    push<R>(task: T | T[]): Promise<R>;
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    push<R, E = Error>(task: T | T[], callback: AsyncResultCallback<R, E>): void;

    /**
     * Add a new task to the front of the queue
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    unshift<R>(task: T | T[]): Promise<R>;
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    unshift<R, E = Error>(task: T | T[], callback: AsyncResultCallback<R, E>): void;

    /**
     * The same as `q.push`, except this returns a promise that rejects if an error occurs.
     * The `callback` arg is ignored
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    pushAsync<R>(task: T | T[]): Promise<R>;

    /**
     * The same as `q.unshift`, except this returns a promise that rejects if an error occurs.
     * The `callback` arg is ignored
     */
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    unshiftAsync<R>(task: T | T[]): Promise<R>;

    /**
     * Remove items from the queue that match a test function.
     * The test function will be passed an object with a `data` property,
     * and a `priority` property, if this is a `priorityQueue` object.
     */
    remove(filter: (node: DataContainer<T>) => boolean): void;

    /**
     * A function that sets a callback that is called when the number of
     * running workers hits the `concurrency` limit, and further tasks will be
     * queued.
     *
     * If the callback is omitted, `q.saturated()` returns a promise
     * for the next occurrence.
     */
    saturated(): Promise<void>;
    saturated(handler: () => void): void;

    /**
     * A function that sets a callback that is called when the number
     * of running workers is less than the `concurrency` & `buffer` limits,
     * and further tasks will not be queued
     *
     * If the callback is omitted, `q.unsaturated()` returns a promise
     * for the next occurrence.
     */
    unsaturated(): Promise<void>;
    unsaturated(handler: () => void): void;

    /**
     * A minimum threshold buffer in order to say that the `queue` is `unsaturated`.
     */
    buffer: number;

    /**
     * A function that sets a callback that is called when the last item from the `queue`
     * is given to a `worker`.
     *
     * If the callback is omitted, `q.empty()` returns a promise for the next occurrence.
     */
    empty(): Promise<void>;
    empty(handler: () => void): void;

    /**
     * A function that sets a callback that is called when the last item from
     * the `queue` has returned from the `worker`.
     *
     * If the callback is omitted, `q.drain()` returns a promise for the next occurrence.
     */
    drain(): Promise<void>;
    drain(handler: () => void): void;

    /**
     * A function that sets a callback that is called when a task errors.
     *
     * If the callback is omitted, `q.error()` returns a promise that rejects on the next error.
     */
    error(): Promise<never>;
    error(handler: (error: Error, task: T) => void): void;

    /**
     * A boolean for determining whether the queue is in a paused state.
     */
    paused: boolean;

    /**
     * A function that pauses the processing of tasks until `q.resume()` is called.
     */
    pause(): void;

    /**
     * A function that resumes the processing of queued tasks when the queue
     * is paused.
     */
    resume(): void;

    /**
     * A function that removes the drain callback and empties remaining tasks
     * from the queue forcing it to go idle. No more tasks should be pushed to
     * the queue after calling this function.
     */
    kill(): void;
}

/**
 * A priorityQueue object to manage the tasks.
 *
 * There are two differences between queue and priorityQueue objects:
 * - `push(task, priority, [callback])` — priority should be a number. If an array of tasks is given, all tasks will be assigned the same priority.
 * - The `unshift` method was removed.
 */
// FIXME: can not use Omit due to ts version restriction. Replace Pick with Omit, when ts 3.5+ will be allowed
interface AsyncPriorityQueue<T> extends Pick<QueueObject<T>, Exclude<keyof QueueObject<T>, "push" | "unshift">> {
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    push<R>(task: T | T[], priority?: number): Promise<R>;
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    push<R, E = Error>(task: T | T[], priority: number, callback: AsyncResultCallback<R, E>): void;
}

/**
 * @deprecated this is a type that left here for backward compatibility.
 * Please use QueueObject instead
 */
type AsyncQueue<T> = QueueObject<T>;

/**
 * @deprecated this is a type that left here for backward compatibility.
 * Please use QueueObject instead
 */
type AsyncCargoQueue<T = any> = QueueObject<T>;

// Collections
declare function each<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncIterator<T, E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function each<T, E = Error>(arr: IterableCollection<T>, iterator: AsyncIterator<T, E>): Promise<void>;
declare const eachSeries: typeof each;
declare function eachLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncIterator<T, E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function eachLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncIterator<T, E>,
): Promise<void>;
declare const forEach: typeof each;
declare const forEachSeries: typeof each;
declare const forEachLimit: typeof eachLimit;
declare function forEachOf<T, E = Error>(
    obj: IterableCollection<T>,
    iterator: AsyncForEachOfIterator<T, E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function forEachOf<T, E = Error>(
    obj: IterableCollection<T>,
    iterator: AsyncForEachOfIterator<T, E>,
): Promise<void>;
declare const forEachOfSeries: typeof forEachOf;
declare function forEachOfLimit<T, E = Error>(
    obj: IterableCollection<T>,
    limit: number,
    iterator: AsyncForEachOfIterator<T, E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function forEachOfLimit<T, E = Error>(
    obj: IterableCollection<T>,
    limit: number,
    iterator: AsyncForEachOfIterator<T, E>,
): Promise<void>;
declare const eachOf: typeof forEachOf;
declare const eachOfSeries: typeof forEachOf;
declare const eachOfLimit: typeof forEachOfLimit;
declare function map<T, R, E = Error>(
    arr: T[] | IterableIterator<T> | Dictionary<T>,
    iterator: AsyncResultIterator<T, R, E>,
    callback: AsyncResultArrayCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function map<T, R, E = Error>(
    arr: T[] | IterableIterator<T> | Dictionary<T>,
    iterator: AsyncResultIterator<T, R, E>,
): Promise<R[]>;
declare const mapSeries: typeof map;
declare function mapLimit<T, R, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncResultIterator<T, R, E>,
    callback: AsyncResultArrayCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function mapLimit<T, R, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncResultIterator<T, R, E>,
): Promise<R[]>;

declare function mapValuesLimit<T, R, E = Error>(
    obj: Dictionary<T>,
    limit: number,
    iteratee: (value: T, key: string, callback: AsyncResultCallback<R, E>) => void,
    callback: AsyncResultObjectCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function mapValuesLimit<T, R, E = Error>(
    obj: Dictionary<T>,
    limit: number,
    iteratee: (value: T, key: string, callback: AsyncResultCallback<R, E>) => void,
): Promise<R>;

declare function mapValues<T, R, E = Error>(
    obj: Dictionary<T>,
    iteratee: (value: T, key: string, callback: AsyncResultCallback<R, E>) => void,
    callback: AsyncResultObjectCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function mapValues<T, R, E = Error>(
    obj: Dictionary<T>,
    iteratee: (value: T, key: string, callback: AsyncResultCallback<R, E>) => void,
): Promise<R>;
declare const mapValuesSeries: typeof mapValues;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function filter<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncBooleanIterator<T, E>,
    callback: AsyncResultArrayCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function filter<T, E = Error>(arr: IterableCollection<T>, iterator: AsyncBooleanIterator<T, E>): Promise<T[]>;
declare const filterSeries: typeof filter;
declare function filterLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
    callback: AsyncResultArrayCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function filterLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
): Promise<T[]>;
declare const select: typeof filter;
declare const selectSeries: typeof filter;
declare const selectLimit: typeof filterLimit;
declare const reject: typeof filter;
declare const rejectSeries: typeof filter;
declare const rejectLimit: typeof filterLimit;
declare function reduce<T, R, E = Error>(
    arr: T[] | IterableIterator<T>,
    memo: R,
    iterator: AsyncMemoIterator<T, R, E>,
    callback?: AsyncResultCallback<R, E>,
): void;
declare const inject: typeof reduce;
declare const foldl: typeof reduce;
declare const reduceRight: typeof reduce;
declare const foldr: typeof reduce;
declare function detect<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncResultCallback<T, E>,
): void;
declare const detectSeries: typeof detect;
declare function detectLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncResultCallback<T, E>,
): void;
declare const find: typeof detect;
declare const findSeries: typeof detect;
declare const findLimit: typeof detectLimit;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function sortBy<T, V, E = Error>(
    arr: T[] | IterableIterator<T>,
    iterator: AsyncResultIterator<T, V, E>,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
declare function some<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncBooleanResultCallback<E>,
): void;
declare const someSeries: typeof some;
declare function someLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncBooleanResultCallback<E>,
): void;
declare const any: typeof some;
declare const anySeries: typeof someSeries;
declare const anyLimit: typeof someLimit;
declare function every<T, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncBooleanResultCallback<E>,
): void;
declare const everySeries: typeof every;
declare function everyLimit<T, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncBooleanIterator<T, E>,
    callback?: AsyncBooleanResultCallback<E>,
): void;
declare const all: typeof every;
declare const allSeries: typeof every;
declare const allLimit: typeof everyLimit;

declare function concat<T, R, E = Error>(
    arr: IterableCollection<T>,
    iterator: AsyncResultIterator<T, R[], E>,
    callback?: AsyncResultArrayCallback<R, E>,
): void;
declare function concatLimit<T, R, E = Error>(
    arr: IterableCollection<T>,
    limit: number,
    iterator: AsyncResultIterator<T, R[], E>,
    callback?: AsyncResultArrayCallback<R, E>,
): void;
declare const concatSeries: typeof concat;

// Control Flow
declare function series<T, E = Error>(
    tasks: Array<AsyncFunction<T, E>>,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
declare function series<T, E = Error>(
    tasks: Dictionary<AsyncFunction<T, E>>,
    callback?: AsyncResultObjectCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function series<T, R, E = Error>(
    tasks: Array<AsyncFunction<T, E>> | Dictionary<AsyncFunction<T, E>>,
): Promise<R>;
declare function parallel<T, E = Error>(
    tasks: Array<AsyncFunction<T, E>>,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
declare function parallel<T, E = Error>(
    tasks: Dictionary<AsyncFunction<T, E>>,
    callback?: AsyncResultObjectCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function parallel<T, R, E = Error>(
    tasks: Array<AsyncFunction<T, E>> | Dictionary<AsyncFunction<T, E>>,
): Promise<R>;
declare function parallelLimit<T, E = Error>(
    tasks: Array<AsyncFunction<T, E>>,
    limit: number,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
declare function parallelLimit<T, E = Error>(
    tasks: Dictionary<AsyncFunction<T, E>>,
    limit: number,
    callback?: AsyncResultObjectCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function parallelLimit<T, R, E = Error>(
    tasks: Array<AsyncFunction<T, E>> | Dictionary<AsyncFunction<T, E>>,
    limit: number,
): Promise<R>;
declare function whilst<E = Error>(
    test: (cb: (err: any, truth: boolean) => boolean) => boolean,
    fn: AsyncVoidFunction<E>,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function whilst<R, E = Error>(
    test: (cb: (err: any, truth: boolean) => boolean) => boolean,
    fn: AsyncVoidFunction<E>,
): Promise<R>;
declare function doWhilst<T, E = Error>(
    fn: AsyncFunctionEx<T, E>,
    test: (...results: T[]) => boolean,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function doWhilst<T, R, E = Error>(fn: AsyncFunctionEx<T, E>, test: (...results: T[]) => boolean): Promise<R>;
declare function until<E = Error>(test: () => boolean, fn: AsyncVoidFunction<E>, callback: ErrorCallback<E>): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function until<R, E = Error>(test: () => boolean, fn: AsyncVoidFunction<E>): Promise<R>;
declare function doUntil<T, E = Error>(
    fn: AsyncFunctionEx<T, E>,
    test: (...results: T[]) => boolean,
    callback: ErrorCallback<E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function doUntil<T, R, E = Error>(fn: AsyncFunctionEx<T, E>, test: (...results: T[]) => boolean): Promise<R>;
declare function during<E = Error>(
    test: (testCallback: AsyncBooleanResultCallback<E>) => void,
    fn: AsyncVoidFunction<E>,
    callback: ErrorCallback<E>,
): void;
declare function doDuring<E = Error>(
    fn: AsyncVoidFunction<E>,
    test: (testCallback: AsyncBooleanResultCallback<E>) => void,
    callback: ErrorCallback<E>,
): void;
declare function forever<E = Error>(next: (next: ErrorCallback<E>) => void, errBack: ErrorCallback<E>): void;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function waterfall<T, E = Error>(tasks: Function[], callback?: AsyncResultCallback<T, E>): void; // eslint-disable-line @definitelytyped/no-unnecessary-generics
// eslint-disable-next-line @typescript-eslint/ban-types
declare function compose(...fns: Function[]): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function seq(...fns: Function[]): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function applyEach(fns: Function[], ...argsAndCallback: any[]): void; // applyEach(fns, args..., callback). TS does not support ... for a middle argument. Callback is optional.
// eslint-disable-next-line @typescript-eslint/ban-types
declare function applyEachSeries(fns: Function[], ...argsAndCallback: any[]): void; // applyEachSeries(fns, args..., callback). TS does not support ... for a middle argument. Callback is optional.
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function queue<T, E = Error>(worker: AsyncWorker<T, E>, concurrency?: number): QueueObject<T>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function queue<T, R, E = Error>(worker: AsyncResultIterator<T, R, E>, concurrency?: number): QueueObject<T>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function priorityQueue<T, E = Error>(worker: AsyncWorker<T, E>, concurrency?: number): AsyncPriorityQueue<T>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function cargo<T, E = Error>(worker: AsyncWorker<T[], E>, payload?: number): QueueObject<T>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function cargoQueue<T, E = Error>(
    // eslint-disable-next-line @definitelytyped/no-unnecessary-generics
    worker: AsyncWorker<T[], E>,
    concurrency?: number,
    payload?: number,
): QueueObject<T>;
declare function auto<R extends Dictionary<any>, E = Error>(
    tasks: AsyncAutoTasks<R, E>,
    concurrency?: number,
    callback?: AsyncResultCallback<R, E>,
): void;
declare function auto<R extends Dictionary<any>, E = Error>(
    tasks: AsyncAutoTasks<R, E>,
    callback?: AsyncResultCallback<R, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function autoInject<E = Error>(tasks: any, callback?: AsyncResultCallback<any, E>): void;

interface RetryOptions {
    times?: number;
    interval?: number | ((retryCount: number) => number);
    errorFilter?: (error: Error) => boolean;
}
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function retry<T, E = Error>(
    opts?: number | RetryOptions,
    task?: (callback: AsyncResultCallback<T, E>, results: any) => void,
): Promise<void>;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function retry<T, E = Error>(
    opts?: number | RetryOptions,
    task?: (callback: AsyncResultCallback<T, E>, results: any) => void,
    callback?: AsyncResultCallback<any, E>,
): void;

declare function retryable<T, E = Error>(task: AsyncFunction<T, E>): AsyncFunction<T, E>;
declare function retryable<T, E = Error>(
    opts: number | (RetryOptions & { arity?: number }),
    task: AsyncFunction<T, E>,
): AsyncFunction<T, E>;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function apply<E = Error>(fn: Function, ...args: any[]): AsyncFunction<any, E>; // eslint-disable-line @definitelytyped/no-unnecessary-generics
// eslint-disable-next-line @typescript-eslint/ban-types
declare function nextTick(callback: Function, ...args: any[]): void;
declare const setImmediate: typeof nextTick;

declare function reflect<T, E = Error>(
    fn: AsyncFunction<T, E>,
): (callback: (err: null, result: { error?: E; value?: T }) => void) => void;
declare function reflectAll<T, E = Error>(
    tasks: Array<AsyncFunction<T, E>>,
): Array<(callback: (err: null, result: { error?: E; value?: T }) => void) => void>;

declare function timeout<T, E = Error>(fn: AsyncFunction<T, E>, milliseconds: number, info?: any): AsyncFunction<T, E>;
declare function timeout<T, R, E = Error>(
    fn: AsyncResultIterator<T, R, E>,
    milliseconds: number,
    info?: any,
): AsyncResultIterator<T, R, E>;

declare function times<T, E = Error>(
    n: number,
    iterator: AsyncResultIterator<number, T, E>,
    callback: AsyncResultArrayCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function times<T, E = Error>(n: number, iterator: AsyncResultIterator<number, T, E>): Promise<T>;
declare const timesSeries: typeof times;
declare function timesLimit<T, E = Error>(
    n: number,
    limit: number,
    iterator: AsyncResultIterator<number, T, E>,
    callback: AsyncResultArrayCallback<T, E>,
): void;
// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function timesLimit<T, E = Error>(
    n: number,
    limit: number,
    iterator: AsyncResultIterator<number, T, E>,
): Promise<T>;

// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function transform<T, R, E = Error>(
    arr: T[],
    iteratee: (acc: R[], item: T, key: number, callback: (error?: E) => void) => void,
    callback?: AsyncResultArrayCallback<T, E>,
): void;
declare function transform<T, R, E = Error>(
    arr: T[],
    acc: R[],
    iteratee: (acc: R[], item: T, key: number, callback: (error?: E) => void) => void,
    callback?: AsyncResultArrayCallback<T, E>,
): void;

// eslint-disable-next-line @definitelytyped/no-unnecessary-generics
declare function transform<T, R, E = Error>(
    arr: { [key: string]: T },
    iteratee: (acc: { [key: string]: R }, item: T, key: string, callback: (error?: E) => void) => void,
    callback?: AsyncResultObjectCallback<T, E>,
): void;

declare function transform<T, R, E = Error>(
    arr: { [key: string]: T },
    acc: { [key: string]: R },
    iteratee: (acc: { [key: string]: R }, item: T, key: string, callback: (error?: E) => void) => void,
    callback?: AsyncResultObjectCallback<T, E>,
): void;

declare function race<T, E = Error>(tasks: Array<AsyncFunction<T, E>>, callback: AsyncResultCallback<T, E>): void;

// Utils
// eslint-disable-next-line @typescript-eslint/ban-types
declare function memoize(fn: Function, hasher?: Function): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function unmemoize(fn: Function): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function ensureAsync(fn: (...argsAndCallback: any[]) => void): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function constant(...values: any[]): AsyncFunction<any>;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function asyncify(fn: Function): (...args: any[]) => any;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function wrapSync(fn: Function): Function;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function log(fn: Function, ...args: any[]): void;
// eslint-disable-next-line @typescript-eslint/ban-types
declare function dir(fn: Function, ...args: any[]): void;

export { type AsyncAutoTask, type AsyncAutoTaskFunction, type AsyncAutoTaskFunctionWithoutDependencies, type AsyncAutoTasks, type AsyncBooleanIterator, type AsyncBooleanResultCallback, type AsyncCargoQueue, type AsyncForEachOfIterator, type AsyncFunction, type AsyncFunctionEx, type AsyncIterator, type AsyncMemoIterator, type AsyncPriorityQueue, type AsyncQueue, type AsyncResultArrayCallback, type AsyncResultCallback, type AsyncResultIterator, type AsyncResultObjectCallback, type AsyncVoidFunction, type AsyncWorker, type CallbackContainer, type DataContainer, type Dictionary, type ErrorCallback, type IterableCollection, type PriorityContainer, type QueueObject, type RetryOptions, all, allLimit, allSeries, any, anyLimit, anySeries, apply, applyEach, applyEachSeries, asyncify, auto, autoInject, cargo, cargoQueue, compose, concat, concatLimit, concatSeries, constant, detect, detectLimit, detectSeries, dir, doDuring, doUntil, doWhilst, during, each, eachLimit, eachOf, eachOfLimit, eachOfSeries, eachSeries, ensureAsync, every, everyLimit, everySeries, filter, filterLimit, filterSeries, find, findLimit, findSeries, foldl, foldr, forEach, forEachLimit, forEachOf, forEachOfLimit, forEachOfSeries, forEachSeries, forever, inject, log, map, mapLimit, mapSeries, mapValues, mapValuesLimit, mapValuesSeries, memoize, nextTick, parallel, parallelLimit, priorityQueue, queue, race, reduce, reduceRight, reflect, reflectAll, reject, rejectLimit, rejectSeries, retry, retryable, select, selectLimit, selectSeries, seq, series, setImmediate, some, someLimit, someSeries, sortBy, timeout, times, timesLimit, timesSeries, transform, unmemoize, until, waterfall, whilst, wrapSync };
