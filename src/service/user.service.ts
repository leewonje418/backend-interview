import User from '../entity/user';
import HttpError from '../error/httpError';
import SignUpDTO from '../dto/signup.dto';
import Bcrypt from '../lib/bcrypt/bcrypt';
import UserRepository from '../repository/user.repository';
import { getCustomRepository } from 'typeorm';
import Role from '../enum/Role';
import LoginDTO from 'src/dto/login.dto';
import { createToken } from 'src/lib/token';

export default class UserService {
    getUsers = async (): Promise<User[]> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const users: User[] = await userRepository.find();
        return users;
    }

    getUser = async (id: string): Promise<User> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const user: User | undefined = await userRepository.findUser(id);
        if(user === undefined) {
            throw new HttpError(404, '유저가 존재하지 않습니다.');
        }
        return user;
    }

    getHost = async (id: string): Promise<User> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const host: User | undefined = await userRepository.findByIdAndRole(id);
        return host;
    }

    login = async (loginRequest: LoginDTO): Promise<string | undefined> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        const { id, pw } = loginRequest;

        const bcrypt: Bcrypt = new Bcrypt();

        const user: User | undefined = await userRepository.findOne(id);
        if (user === undefined) {
            throw new HttpError(401, '아이디가 올바르지 않습니다.');
        }

        const compareResult: boolean = await bcrypt.comparePassword(pw, user.password);
        if (compareResult === false) {
            throw new HttpError(401, '비밀번호가 올바르지 않습니다.');
        }

        const token: string = await createToken(id);

        return token;
    }

    signUp = async (signUpRequest : SignUpDTO): Promise<User> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);

        const { id, pw, name } = signUpRequest;
        const { USER } = Role;

        const checkprofile: User | undefined = await userRepository.findOne({ id });
        if(checkprofile) {
            throw new HttpError(409, '아이디 중복');
        }

        const bcrypt: Bcrypt = new Bcrypt();
        const password: string = bcrypt.hashPassword(pw);

        const user: User = new User();
		user.id = id;
        user.name = name;
        user.password = password;
        user.role = USER;

        const newUser: User = await userRepository.save(user)

        return newUser;
    }

    updateName = async (id: string, name: string): Promise<User | undefined> => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);

        const user: User = new User();
		user.id = id;
        user.name = name;

        const updateUser: User = await userRepository.save(user)

        return updateUser;
    }
    
    delete = async (email: string) => {
        const userRepository: UserRepository = getCustomRepository(UserRepository);
        await userRepository.delete(email);
    }
}