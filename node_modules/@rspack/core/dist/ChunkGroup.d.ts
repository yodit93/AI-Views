import { type JsChunkGroup, type JsChunkGroupOrigin, type JsCompilation } from "@rspack/binding";
import { Chunk } from "./Chunk";
export declare class ChunkGroup {
    #private;
    static __from_binding(chunk: JsChunkGroup, compilation: JsCompilation): ChunkGroup;
    protected constructor(inner: JsChunkGroup, compilation: JsCompilation);
    getFiles(): ReadonlyArray<string>;
    getParents(): ReadonlyArray<ChunkGroup>;
    isInitial(): boolean;
    get chunks(): ReadonlyArray<Chunk>;
    get index(): Readonly<number | undefined>;
    get name(): Readonly<string | undefined>;
    get origins(): ReadonlyArray<JsChunkGroupOrigin>;
    /**
     * Note: This is not a webpack public API, maybe removed in future.
     *
     * @internal
     */
    __internal__innerUkey(): number;
    /**
     * Note: This is not a webpack public API, maybe removed in future.
     *
     * @internal
     */
    __internal__innerCompilation(): JsCompilation;
}
