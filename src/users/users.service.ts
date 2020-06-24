import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }
    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async createUser(user: User | any): Promise<User> {
        return await this.usersRepository.save(user);
    }

    async findMuiltUserByIds(
        uids: number[] | string[]
    ): Promise<User[]> {
        return await this.usersRepository.findByIds(uids);
    }

    async findOneUserById(uid: number): Promise<User> {
        return await this.usersRepository.findOne(uid);
    }

    async updateUserById(uid: number, newValues: User) {
        const user = this.findOneUserById(uid);
        if (user) {
            await this.usersRepository.update(uid, newValues);
            return await this.usersRepository.findOne(uid);
        }
        return null;
    }

    async removeUserById(uid: number) {
        const user = this.findOneUserById(uid);
        if (user) {
            await this.usersRepository.delete(uid);
            return true;
        }
        return false;
    }

    async queryMuiltUser(
        userCondition: FindConditions<User>,
        fields: any | null = undefined
    ): Promise<User[]> {
        if (fields) {
            return await this.usersRepository.find({
                select: fields,
                where: userCondition,
            });
        } else {
            return await this.usersRepository.find(userCondition);
        }
    }

    async queryOneUser(
        userCondition: object,
        fields?: any
    ): Promise<User> {
        if (fields) {
            return await this.usersRepository.findOne({
                select: fields,
                where: userCondition,
            });
        } else {
            return await this.usersRepository.findOne(
                userCondition
            );
        }
    }
}