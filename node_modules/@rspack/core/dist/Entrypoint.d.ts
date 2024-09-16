import { type JsChunkGroup, type JsCompilation } from "@rspack/binding";
import { Chunk } from "./Chunk";
import { ChunkGroup } from "./ChunkGroup";
export declare class Entrypoint extends ChunkGroup {
    static __from_binding(chunk: JsChunkGroup, compilation: JsCompilation): Entrypoint;
    protected constructor(inner: JsChunkGroup, compilation: JsCompilation);
    getRuntimeChunk(): Readonly<Chunk | null>;
}
