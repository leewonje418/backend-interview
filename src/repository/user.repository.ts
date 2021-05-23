import { DeleteQueryBuilder, EntityRepository, Repository } from 'typeorm';
import User from '../entity/user';
import Role from '../enum/Role'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
    findByIdAndRole = async (id: string): Promise<User | undefined> => {
        return this.findOne({
            where: {
                id,
                role : Role.HOST
            },
        });
    }
    findUsers = async (id: string): Promise<User[] | undefined> => {
        return this.find({
            where: {
                id
            },
            select: ['id', 'name', 'role']
        });
    }
    findUser = async (id: string): Promise<User | undefined> => {
        return this.findOne({
            where: {
                id
            },
            select: ['id', 'name', 'role']
        });
    }
}