/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582039284387_7516';

  // add your middleware config here
  config.middleware = [];

  // Security
  config.security = {
    csrf: false
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // add http_proxy to httpclient
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        // 默认 request 超时时间
        timeout: 3000,
        proxy: process.env.http_proxy,
      },
      enableDNSCache: false,
      // 对同一个域名进行 DNS 查询的最小间隔时间
      dnsCacheLookupInterval: 10000,
      // DNS 同时缓存的最大域名数量，默认 1000
      dnsCacheMaxLength: 1000,

      httpAgent: {
        // 默认开启 http KeepAlive 功能
        keepAlive: true,
        // 空闲的 KeepAlive socket 最长可以存活 4 秒
        freeSocketTimeout: 4000,
        // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
        timeout: 30000,
        // 允许创建的最大 socket 数
        maxSockets: Number.MAX_SAFE_INTEGER,
        // 最大空闲 socket 数
        maxFreeSockets: 256,
      },

      httpsAgent: {
        // 默认开启 https KeepAlive 功能
        keepAlive: true,
        // 空闲的 KeepAlive socket 最长可以存活 4 秒
        freeSocketTimeout: 4000,
        // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
        timeout: 30000,
        // 允许创建的最大 socket 数
        maxSockets: Number.MAX_SAFE_INTEGER,
        // 最大空闲 socket 数
        maxFreeSockets: 256,
      },
    };
  }


  return {
    ...config,
    ...userConfig,
  };
};
