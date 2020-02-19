'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        const time = await this.service.common.get_time();
        const loginInfo = await this.service.user.login(username, password, time);
        ctx.body = {
            success: loginInfo.success,
            message: loginInfo.message
        }
    }
    async grade() {
        const { ctx } = this;
        const { username, password, year, term } = ctx.request.body;
        const time = await this.service.common.get_time();
        const loginInfo = await this.service.user.login(username, password, time);
        if (loginInfo.success) {
            const gradeInfo = await this.service.course.post_grade_data(year, term, loginInfo.session)
            ctx.body = gradeInfo
        } else {
            ctx.body = {
                success: false,
                message: loginInfo.message
            }
        }
    }
}

module.exports = UserController;
