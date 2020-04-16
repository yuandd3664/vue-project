import Mock from 'mockjs'
import User from "./user"

Mock.mock(/\/list$/, 'post', User.getTaskList);
Mock.mock(/\/api\/task\/detail/, 'get', User.getTaskDetail);