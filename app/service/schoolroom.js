'use strict';

const Service = require('egg').Service;

class SchoolroomService extends Service {
    async post_empty_data(year, term, week, day, period, seatsmin, seatsmax, session) {
        //   默认第一学期
        let form_term = '3';
        if (parseInt(term) === 1) {
            form_term = '3'
        } else if (parseInt(term) === 2) {
            form_term = '12'
        }
        const data = {
            'fwzt': 'cx',
            'xqh_id': '1',
            'jyfs': 0,
            'xnm': year,
            'xqm': form_term,
            'qszws': seatsmin,
            'jszws': seatsmax,
            'zcd': week,
            'xqj': day,
            'jcd': period,
            '_search': false,
            'nd': this.service.common.get_time(),
            'queryModel.currentPage': '1',
            'queryModel.showCount': '15',
            'queryModel.sortName': 'cdbh',
            'queryModel.sortOrder': 'asc',
            'time': 0
        }
        const url = await this.service.common.get_schoolroom_empty_url();
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
        console.log(response_data)
        const emptySchoolroomcourseitems = response_data.items;
        const emptySchoolroom = emptySchoolroomcourseitems.map(currentValue => {
            return {
                name: currentValue.cdmc,
                type: currentValue.cdlbmc,
                seats: currentValue.zws,
                seatsforexam: currentValue.kszws1
            }
        })
        return {
            success: true,
            message: "请求课程表成功",
            emptySchoolroom
        };
    }
}

module.exports = SchoolroomService;
