import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    uid: number;

    @Column({
        length: 64,
        nullable: false,
    })
    username: string;

    @Column({
        length: 64,
        nullable: false,
    })
    email: string;

    @Column({
        length: 64,
        nullable: false,
    })
    password: string;

    @Column({
        type: "datetime",
        nullable: false,
    })
    regTime: Date;

    @Column({
        type: "datetime",
        nullable: true,
        default: null,
    })
    lastLoginTime: Date;
}

export class UserEntity { }
