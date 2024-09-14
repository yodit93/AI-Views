import { FederationRuntimePlugin } from '../type/plugin';
interface FetchWithRetryOptions {
    url: string;
    options?: RequestInit;
    retryTimes?: number;
    fallbackUrl?: string;
}
declare const RetryPlugin: (params?: Omit<FetchWithRetryOptions, 'url'>) => FederationRuntimePlugin;
export default RetryPlugin;
