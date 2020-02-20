'use strict';

const Service = require('egg').Service;

class CurriculumService extends Service {
    async post_curriculum_data(year, term, session) {
        if (!parseInt(year) || parseInt(year) > (new Date().getFullYear())) {
            return {
                success: false,
                message: "请求课程表年份出错"
            }
        }
        //   默认第一学期
        let form_term = '3';
        if (term === '1') {
            form_term = '3'
        } else if (term === '2') {
            form_term = '12'
        }
        const data = {
            'xnm': year,
            'xqm': form_term
        }
        const url = await this.service.common.get_curriculum_url();
        let headers = {
            'Host': 'jwgl.njtech.edu.cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
            'Accept': 'text/html, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Referer': url,
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
        const response_data = JSON.parse(result.data.toString());
        const practiceCourseList = response_data.sjkList;
        const courseList = response_data.kbList;
        const parcticeCourse = practiceCourseList.map(currentValue => {
            return {
                info: currentValue.sjkcgs
            }
        })
        const course = courseList.map(currentValue => {
            return {
                name: currentValue.kcmc,
                address: currentValue.cdmc,
                week: currentValue.zcd,
                day: currentValue.xqj,
                period: currentValue.jcor,
                teacher: currentValue.xm,
                credit: currentValue.xf,
                schedule: currentValue.kcxszc
            }
        })
        return {
            success: true,
            message: "请求课程表成功",
            parcticeCourse,
            course
        };
    }
}

module.exports = CurriculumService;
