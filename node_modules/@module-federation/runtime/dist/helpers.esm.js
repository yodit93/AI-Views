import { q as getRegisteredShare, A as getGlobalShareScope, G as Global, K as nativeGlobal, L as resetFederationGlobalInfo, F as getGlobalFederationInstance, I as setGlobalFederationInstance, H as getGlobalFederationConstructor, E as setGlobalFederationConstructor, n as getInfoWithoutType, x as getGlobalSnapshot, M as getTargetSnapshotInfoByModuleInfo, t as getGlobalSnapshotInfoByModuleInfo, v as setGlobalSnapshotInfoByModuleInfo, u as addGlobalSnapshot, c as getRemoteEntryExports, J as registerGlobalPlugins, g as getGlobalHostPlugins, o as getPreloaded, p as setPreloaded } from './share.esm.js';

const ShareUtils = {
    getRegisteredShare,
    getGlobalShareScope
};
const GlobalUtils = {
    Global,
    nativeGlobal,
    resetFederationGlobalInfo,
    getGlobalFederationInstance,
    setGlobalFederationInstance,
    getGlobalFederationConstructor,
    setGlobalFederationConstructor,
    getInfoWithoutType,
    getGlobalSnapshot,
    getTargetSnapshotInfoByModuleInfo,
    getGlobalSnapshotInfoByModuleInfo,
    setGlobalSnapshotInfoByModuleInfo,
    addGlobalSnapshot,
    getRemoteEntryExports,
    registerGlobalPlugins,
    getGlobalHostPlugins,
    getPreloaded,
    setPreloaded
};
var helpers = {
    global: GlobalUtils,
    share: ShareUtils
};

export { helpers as default };
