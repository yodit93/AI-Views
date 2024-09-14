'use strict';

function _extends() {
    _extends = Object.assign || function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source){
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}
const defaultRetries = 3;
async function fetchWithRetry({ url, options = {}, retryTimes = defaultRetries, fallbackUrl = '' }) {
    try {
        const response = await fetch(url, options);
        // To prevent the response object from being read multiple times and causing errors, clone it
        const responseClone = response.clone();
        // Network error
        if (!response.ok) {
            throw new Error(`Server error：${response.status}`);
        }
        // parse json error
        await responseClone.json().catch((error)=>{
            throw new Error(`Json parse error: ${error}, url is: ${url}`);
        });
        return response;
    } catch (error) {
        if (retryTimes <= 0) {
            console.log(`>>>>>>>>> retry failed after ${defaultRetries} times for url: ${url}, now will try fallbackUrl url: ${fallbackUrl} <<<<<<<<<`);
            if (fallbackUrl && fallbackUrl !== url) {
                return fetchWithRetry({
                    url: fallbackUrl,
                    options,
                    retryTimes: 1,
                    fallbackUrl
                });
            }
            throw new Error('The request failed three times and has now been abandoned');
        }
        // If there are remaining times, delay 1 second and try again
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        console.log(`Trying again. Number of retries available：${retryTimes - 1}`);
        return await fetchWithRetry({
            url,
            options,
            retryTimes: retryTimes - 1,
            fallbackUrl
        });
    }
}
const RetryPlugin = (params)=>({
        name: 'retry-plugin',
        async fetch (url, options) {
            return fetchWithRetry({
                url,
                options: _extends({}, options, params == null ? void 0 : params.options),
                retryTimes: params == null ? void 0 : params.retryTimes,
                fallbackUrl: params == null ? void 0 : params.fallbackUrl
            });
        }
    });

module.exports = RetryPlugin;
