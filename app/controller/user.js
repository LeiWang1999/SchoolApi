'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        const time = await this.service.common.get_time();
        const loginInfo = await this.service.login.login(username, password, time);
        ctx.body = {
            success: loginInfo.success,
            message: loginInfo.message
        }
    }
}

module.exports = UserController;
