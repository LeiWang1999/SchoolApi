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

### 校车班次查询