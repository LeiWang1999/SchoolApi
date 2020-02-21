# SchoolApi

Njtech 正方教务系统信息 API

Projected By Egg.js

## What We Support ?

### 成绩查询

#### 请求方式：POST

#### 携带参数：

| 参数名   | 类型   | 备注                         |
| -------- | ------ | ---------------------------- |
| username | String | (必须)学号                   |
| password | String | (必须)密码                   |
| year     | String | (必须)年级                   |
| term     | String | (可选)学期，默认查询第一学期 |

### 课表查询

#### 请求方式：POST

#### 携带参数：

| 参数名   | 类型   | 备注                         |
| -------- | ------ | ---------------------------- |
| username | String | (必须)学号                   |
| password | String | (必须)密码                   |
| year     | String | (必须)年级                   |
| term     | String | (可选)学期，默认查询第一学期 |

### 空教室查询

#### 请求方式：POST

#### 携带参数：

| 参数名   | 类型   | 备注                                |
| -------- | ------ | ----------------------------------- |
| username | String | (必须)学号                          |
| password | String | (必须)密码                          |
| year     | String | (必须)学年                          |
| term     | String | (必须)学期                          |
| week     | String | (必须)查询周次ID                    |
| day      | String | (必须)查询星期几 eg:(1,2,3,4,5,6,7) |
| period   | String | (必须)查询第几节课ID 计算法法同week |
| seatsmin | String | (可选)最小座位数                    |
| seatsmax | String | (可选)最大座位数                    |

### 校车班次查询