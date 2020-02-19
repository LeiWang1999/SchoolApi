'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        const time = await this.service.common.get_time();
        await this.service.user.login(username, password, time);
        ctx.body = {
            username,
            password
        }
    }
    async gradeinfo() {
        const { ctx } = this;
        const { username, password, year, term } = ctx.request.body;

    }
}

module.exports = UserController;
