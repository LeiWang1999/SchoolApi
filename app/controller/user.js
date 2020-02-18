'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx } = this.ctx
        const { username, password } = ctx.request.body;
        ctx.body = {
            username,
            password
        }
    }
}

module.exports = UserController;
