import type { Callback } from "@rspack/lite-tapable";
import type { Compiler } from ".";
import { Stats } from ".";
import type { WatchOptions } from "./config";
import type { Watcher } from "./util/fs";
export declare class Watching {
    #private;
    watcher?: Watcher;
    pausedWatcher?: Watcher;
    compiler: Compiler;
    handler: Callback<Error, Stats>;
    callbacks: Callback<Error, void>[];
    watchOptions: WatchOptions;
    lastWatcherStartTime: number;
    running: boolean;
    blocked: boolean;
    isBlocked: () => boolean;
    onChange: () => void;
    onInvalid: () => void;
    invalid: boolean;
    startTime?: number;
    suspended: boolean;
    constructor(compiler: Compiler, watchOptions: WatchOptions, handler: Callback<Error, Stats>);
    watch(files: Iterable<string>, dirs: Iterable<string>, missing: Iterable<string>): void;
    close(callback?: () => void): void;
    invalidate(callback?: Callback<Error, void>): void;
    lazyCompilationInvalidate(files: Set<string>): void;
    /**
     * The reason why this is _done instead of #done, is that in Webpack,
     * it will rewrite this function to another function
     */
    private _done;
    suspend(): void;
    resume(): void;
}
