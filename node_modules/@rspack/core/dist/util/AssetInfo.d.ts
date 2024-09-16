import type { JsAssetInfo as JsAssetInfoBinding } from "@rspack/binding";
export type AssetInfo = Partial<Omit<JsAssetInfoBinding, "extras">> & Record<string, any>;
declare class JsAssetInfo {
    static __from_binding(jsAssetInfo: JsAssetInfoBinding): AssetInfo;
    static __to_binding(assetInfo?: AssetInfo): JsAssetInfoBinding;
}
export { JsAssetInfo };
