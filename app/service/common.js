'use strict';

const Service = require('egg').Service;
// 解析crsf_token用的
const cheerio = require('cheerio');
const NodeRSA = require('node-rsa');



class CommonService extends Service {

  async get_time() {
    return Math.floor(Date.now() / 1000);
  }
  async get_public_key(key_url, session, time) {
    const ctx = this.ctx;
    let headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
      'Cookie': session,
    }
    const options = {
      headers,
    }
    const res = await ctx.curl(key_url + time, options);
    const result = JSON.parse(res.data);

    return {
      modulus: result.modulus,
      exponent: result.exponent,
    }
  }
  async get_csrf_token(url, time) {
    const ctx = this.ctx;
    const res = await ctx.curl(url + time);
    const resultHtml = (res.data.toString());
    const cheerioModel = cheerio.load(resultHtml);
    const csrf_token = cheerioModel('#csrftoken')[0].attribs.value;
    let session = res.headers['set-cookie'];
    session = session[0].split(';')[0]
    return { token: csrf_token, session }
  }
  async process_public(password, modulus, exponent) {
    let rsaKey = new NodeRSA();
    const modulsHex = Buffer.from(modulus, 'base64').toString('hex');
    const exponentHex = Buffer.from(exponent, 'base64').toString('hex');
    rsaKey.importKey({
      n: Buffer.from(modulsHex, 'hex'),
      e: Buffer.from(exponentHex, 'hex')
    })
    const enPasswordHexBuffer = rsaKey.encrypt(password, 'hex')
    const enPassword = Buffer.from(enPasswordHexBuffer, 'hex').toString('base64')
    return enPassword
  }

}

module.exports = CommonService;
