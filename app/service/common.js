'use strict';

const Service = require('egg').Service;
// 解析crsf_token用的
const cheerio = require('cheerio');
const NodeRSA = require('node-rsa');
const getenPassword = require('../utils/rsa')



class CommonService extends Service {

  async get_time() {
    return Math.floor(Date.now() / 1000);
  }
  async get_public_key(key_url, time) {
    const ctx = this.ctx;
    let headers = {
      'Host': 'jwgl.njtech.edu.cn',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
      'Accept-Encoding': 'gzip, deflate',
      'Accept': '*/*',
      'Connection': 'keep-alive'
    }
    const options = {
      headers,
    }
    const res = await ctx.curl(key_url + time, options);
    const result = JSON.parse(res.data);
    let session = res.headers['set-cookie'];
    session = session[0].split(';')[0]
    return {
      modulus: result.modulus,
      exponent: result.exponent,
      session: session
    }
  }
  async get_csrf_token(url, session, time) {
    const ctx = this.ctx;
    let headers = {
      'Host': 'jwgl.njtech.edu.cn',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
      'Accept-Encoding': 'gzip, deflate',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Cookie': session
    }
    const options = {
      headers,
    }
    const res = await ctx.curl(url + time, options);
    const resultHtml = (res.data.toString());
    const cheerioModel = cheerio.load(resultHtml);
    const csrf_token = cheerioModel('#csrftoken')[0].attribs.value;

    return { token: csrf_token, session }
  }
  async process_public(password, modulus, exponent) {
    const enPassword = getenPassword(password, modulus, exponent);
    return enPassword
  }
}

module.exports = CommonService;
