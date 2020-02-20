'use strict';

const Service = require('egg').Service;



class LoginService extends Service {
  async login(username, password, time) {
    let { modulus, exponent, session } = await this.service.common.get_public_key(time);
    let { token } = await this.service.common.get_csrf_token(session, time);
    let enpassword = await this.service.common.process_public(password, modulus, exponent);
    let data = {
      'csrftoken': token,
      'mm': enpassword,
      'yhm': username
    };
    const url = await this.service.common.get_login_url();
    let headers = {
      'Host': 'jwgl.njtech.edu.cn',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
      'Accept': 'text/html, */*; q=0.01',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Referer': url + time,
      'Upgrade-Insecure-Requests': '1',
      'Cookie': session,
      'Connection': 'keep-alive',
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    }

    const options = {
      method: 'POST',
      headers,
      data,
    }
    const ctx = this.ctx;
    const result = await ctx.curl(url, options);
    const regValue = '用户名或密码不正确'
    if (result.data.toString().indexOf(regValue) > 0) {
      return {
        success: false,
        message: regValue
      }
    }
    else {
      return {
        success: true,
        message: '登陆成功',
        session: result.headers['set-cookie']
      }
    }
  }
}

module.exports = LoginService;
