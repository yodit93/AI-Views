import type * as binding from "@rspack/binding";
import * as liteTapable from "@rspack/lite-tapable";
import type { ResolveData, ResourceDataWithData } from "./Module";
export type NormalModuleCreateData = binding.JsNormalModuleFactoryCreateModuleArgs & {
    settings: {};
};
export declare class NormalModuleFactory {
    hooks: {
        resolveForScheme: liteTapable.HookMap<liteTapable.AsyncSeriesBailHook<[ResourceDataWithData], true | void>>;
        beforeResolve: liteTapable.AsyncSeriesBailHook<[ResolveData], false | void>;
        factorize: liteTapable.AsyncSeriesBailHook<[ResolveData], void>;
        resolve: liteTapable.AsyncSeriesBailHook<[ResolveData], void>;
        afterResolve: liteTapable.AsyncSeriesBailHook<[ResolveData], false | void>;
        createModule: liteTapable.AsyncSeriesBailHook<[
            NormalModuleCreateData,
            {}
        ], void>;
    };
    constructor();
}
