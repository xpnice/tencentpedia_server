import { Controller, Get, Param, Body, Put, Post, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service'
import { _response, _errorlog, HTTP_SYMBOLS } from '../config/http.config'
import { User } from './user.entity'
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    /**
     * @description 根据id获取用户信息（过滤密码）
     * @param uid    
    **/
    @Get(':id')
    async getUserById(@Param('id') uid: number) {
        if (!uid) {
            return _response(HTTP_SYMBOLS.ERROR_RESPONSE, _errorlog('传参错误'))
        }
        const user = await this.usersService.findOneUserById(uid)
        if (!user) {
            return _response(HTTP_SYMBOLS.WRONG_RESPONSE, '账户不存在');
        } else {
            delete user.password
            return _response(HTTP_SYMBOLS.OK_RESPONSE, user);
        }
    }
    /**
     * @description 登录
     * @param data User
    **/
    @Post('login')
    async login(@Body("data") data: User) {
        if (!data || !data.email || !data.password) {
            return _response(HTTP_SYMBOLS.ERROR_RESPONSE, _errorlog('传参错误', data))
        }
        const { password, email } = data;
        const user = await this.usersService.queryOneUser({ email })
        if (!user || user.password != password) {
            return _response(HTTP_SYMBOLS.WRONG_RESPONSE, '账号不存在或密码错误');
        } else if (user) {
            user.lastLoginTime = new Date();
            const newuser = await this.usersService.updateUserById(user.uid, user);
            delete newuser.password
            return _response(HTTP_SYMBOLS.OK_RESPONSE, newuser);
        }
        return _response(HTTP_SYMBOLS.ERROR_RESPONSE, _errorlog('未知错误'))
    }
    /**
     * @description 注册
     * @param data    
    **/
    @Post('register')
    async register(@Body("data") data: User) {
        if (!data || !data.email || !data.username || !data.password) {
            return _response(HTTP_SYMBOLS.ERROR_RESPONSE, _errorlog('传参错误', data))
        }
        const { email } = data;
        const user = await this.usersService.queryOneUser({ email });
        if (user) {
            return _response(HTTP_SYMBOLS.WRONG_RESPONSE, '邮箱已被注册');
        } else {
            data.regTime = new Date();
            const newuser = await this.usersService.createUser(data);
            // TODO:加入JWT认证
            return _response(HTTP_SYMBOLS.OK_RESPONSE, newuser);
        }
    }
}
