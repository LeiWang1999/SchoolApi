'use strict';

const Service = require('egg').Service;
const grade_url = "http://jwgl.njtech.edu.cn/cjcx/cjcx_cxDgXscj.html?doType=query&gnmkdm=N305005"

class CourseService extends Service {
    async post_grade_data(year, term, session) {
        // 校验
        if (!parseInt(year) || parseInt(year) > (new Date().getFullYear())) {
            return {
                success: false,
                message: "请求课程年份出错"
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
            '_search': 'false',
            'nd': this.service.common.get_time(),
            'queryModel.currentPage': '1',
            'queryModel.showCount': '15',
            'queryModel.sortName': '',
            'queryModel.sortOrder': 'asc',
            'time': '0',
            'xnm': year,
            'xqm': form_term
        }
        let headers = {
            'Host': 'jwgl.njtech.edu.cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0',
            'Accept': 'text/html, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Referer': this.service.common.get_time(),
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
        const result = await ctx.curl(grade_url, options);
        const response_data = JSON.parse(result.data.toString());
        const courseitems = response_data.items;
        const grade = courseitems.map(currentValue => {
            return {
                name: currentValue.kcmc,
                grade: currentValue.bfzcj,
                point: currentValue.jd,
                teacher: currentValue.jsxm
            }
        })

        return {
            success: true,
            message: "请求课程成绩成功",
            grade: grade
        };
    }
}

module.exports = CourseService;
