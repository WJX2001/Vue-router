# 项目简介

- 功能描述

  - 支持登陆功能，通过验证帐号，密码，邮箱来登陆，通过前后端互联实现图片的上传，学生信息的上传。
- 技术描述

  - 基于vue2.0进行搭建，通过vue-router进行不同页面的跳转，通过axios进行对后端数据请求
  - 使用nodejs搭建后端服务，并且连接数据库进行处理前端的请求
  - 并且对网站装了promethus的监控，对网站健康状态进行统计
  - 使用nginx对网站做负载均衡，让打包好的web容器项目去分摊用户的访问压力
  - 使用Ansible自动部署nginx＋keepalived高可用负载均衡
  - 对项目进行容器化的封装，使用docker技术将其封装为dockerfile,便于后续的容器化部署
- 项目地址：
  - 后端部分：https://github.com/WJX2001/Nodejs-koa
  - 前端部分：https://github.com/WJX2001/Vue-router
- 部署地址： [wjx.chrisjx.cn]()