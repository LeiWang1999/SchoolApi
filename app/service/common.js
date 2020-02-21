'use strict';

const Service = require('egg').Service;
// 解析crsf_token用的
const cheerio = require('cheerio');
const getenPassword = require('../utils/rsa')

// 教务系统登录路径
const login_url = "https://jwgl.njtech.edu.cn/xtgl/login_slogin.html?language=zh_CN&_t="
// 请求PublicKey的URL
const key_url = "https://jwgl.njtech.edu.cn/xtgl/login_getPublicKey.html?time="
// 请求成绩的地址
const grade_url = "https://jwgl.njtech.edu.cn/cjcx/cjcx_cxDgXscj.html?doType=query&gnmkdm=N305005"
// 请求课程表地址
const curriculum_url = "https://jwgl.njtech.edu.cn/kbcx/xskbcx_cxXsKb.html?gnmkdm=N2151"
// 请求空教室地址
const schoolroom_empty_url = "https://jwgl.njtech.edu.cn/cdjy/cdjy_cxKxcdlb.html?doType=query&gnmkdm=N2155"

class CommonService extends Service {

  async get_time() {
    return Math.floor(Date.now() / 1000);
  }
  async get_login_url() {
    return login_url
  }
  async get_key_url() {
    return key_url
  }
  async get_grade_url() {
    return grade_url
  }
  async get_curriculum_url() {
    return curriculum_url
  }
  async get_schoolroom_empty_url() {
    return schoolroom_empty_url
  }
  async get_public_key(time) {
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
    const url = await this.service.common.get_key_url();
    const res = await ctx.curl(url + time, options);
    const result = JSON.parse(res.data);
    let session = res.headers['set-cookie'];
    session = session[0].split(';')[0]
    return {
      modulus: result.modulus,
      exponent: result.exponent,
      session: session
    }
  }
  async get_csrf_token(session, time) {
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
    const url = await this.service.common.get_login_url();
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
