import { Request, Response } from 'express';

import { loginSuccessHandler, successHandler } from '../lib/handler/httpSuccessHandler';
import ErrorHandler from '../lib/handler/httpErrorHandler';

import SignUpDTO from '../dto/signup.dto';
import UserService from '../service/user.service';
import User from '../entity/user';
import LoginDTO from 'src/dto/login.dto';

export default class UserController {
    private readonly userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getUsers = async(req: Request, res: Response) => {
        try {
            const users: User[] = await this.userService.getUsers();
            successHandler(res, 200, '유저 전채 불러오기 성공', users);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    getUser = async(req: Request, res: Response) => {
        try {
            const { userId } = req;
            const users: User = await this.userService.getUser(userId);
            successHandler(res, 200, ' 내정보 불러오기 성공', users);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    login = async (req: Request, res:Response) => {
        try {
            const loginRequest: LoginDTO = new LoginDTO(req.body);
            await loginRequest.validate();

            const token: string | undefined = await this.userService.login(loginRequest);
            loginSuccessHandler(res, 200, '로그인 성공', token);
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    signUp = async(req: Request, res: Response) => {
        try {
            const signupRequest: SignUpDTO = new SignUpDTO(req.body);
            await signupRequest.validate();
            
            await this.userService.signUp(signupRequest);
            successHandler(res, 200, '회원가입 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    updateName = async(req: Request, res: Response) => {
        try {
            const { userId } = req;
            const { name } = req.body;

            await this.userService.updateName(userId, name);

            successHandler(res, 200, '이름수정 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }

    delete = async(req: Request, res: Response) => {
        try {
            const { userId } = req;
            await this.userService.delete(userId);
            successHandler(res, 200, '계정삭제 성공');
        } catch (err) {
            ErrorHandler(res, err);
        }
    }
}