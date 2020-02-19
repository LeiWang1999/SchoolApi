'use strict';

const Service = require('egg').Service;

// 教务系统登录路径
const url = "http://jwgl.njtech.edu.cn/xtgl/login_slogin.html?language=zh_CN&_t="
// 请求PublicKey的URL
const key_url = "http://jwgl.njtech.edu.cn/xtgl/login_getPublicKey.html?time="
// 获取成绩路径
const grade_url = "http://jwgl.njtech.edu.cn/cjcx/cjcx_cxDgXscj.html?doType=query&gnmkdm=N305005"



class UserService extends Service {
  async login(username, password, time) {
    let { token, session } = await this.service.common.get_csrf_token(url, time);
    let { modulus, exponent, sessionKey } = await this.service.common.get_public_key(key_url, session, time);
    let enpassword = await this.service.common.process_public(password, modulus, exponent);
    let data = {
      'csrftoken': token,
      'mm': enpassword,
      'mm': enpassword,
      'yhm': username
    };
    let headers = {
      'Accept': 'text/html, */*; q=0.01',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
      'Connection': 'keep-alive',
      'Referer': url + time,
      'Cookie': session,
      'Upgrade-Insecure-Requests': '1',
    }

    const options = {
      method: 'POST',
      headers,
      data,
    }
    const ctx = this.ctx;
    const result = await ctx.curl(url, options);
    console.log(result);
  }
}

module.exports = UserService;
