import { Chunk } from "./Chunk";
import type { Compilation } from "./Compilation";
import { Module } from "./Module";
export declare class ChunkGraph {
    private compilation;
    constructor(compilation: Compilation);
    getChunkModules(chunk: Chunk): Readonly<Module[]>;
    getChunkModulesIterable(chunk: Chunk): Iterable<Module>;
    getChunkEntryModulesIterable(chunk: Chunk): Iterable<Module>;
    getChunkEntryDependentChunksIterable(chunk: Chunk): Iterable<Chunk>;
    getChunkModulesIterableBySourceType(chunk: Chunk, sourceType: string): Iterable<Module>;
}
