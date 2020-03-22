'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
    async grade() {
        const { ctx } = this;
        const { username, password, year, term } = ctx.request.body;
        const time = await this.service.common.get_time();
        const loginInfo = await this.service.login.login(username, password, time);
        if (loginInfo.success) {
            const gradeInfo = await this.service.grade.post_grade_data(year, term, loginInfo.session)
            ctx.body = gradeInfo
        } else {
            ctx.body = {
                success: false,
                message: loginInfo.message
            }
        }
    }
    async curriculum() {
        const { ctx } = this;
        const { username, password, year, term } = ctx.request.body;
        console.log(ctx.request.body)

        const time = await this.service.common.get_time();
        const loginInfo = await this.service.login.login(username, password, time);
        if (loginInfo.success) {
            const curriculumInfo = await this.service.curriculum.post_curriculum_data(year, term, loginInfo.session)
            ctx.body = curriculumInfo
        } else {
            ctx.body = {
                success: false,
                message: loginInfo.message
            }
        }
    }
    async schoolroom_empty() {
        const { ctx } = this;
        const { username, password, year, term, week, day, period, seatsmin, seatsmax } = ctx.request.body;
        const time = await this.service.common.get_time();
        const loginInfo = await this.service.login.login(username, password, time);
        if (loginInfo.success) {
            const emptySchoolRoomInfo = await this.service.schoolroom.post_empty_data(
                year,
                term,
                week,
                day,
                period,
                seatsmin,
                seatsmax,
                loginInfo.session
            )
            ctx.body = emptySchoolRoomInfo;
        } else {
            ctx.body = {
                success: false,
                message: loginInfo.message
            }
        }
    }
}

module.exports = ApiController;
