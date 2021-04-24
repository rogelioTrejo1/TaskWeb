//Dependencias
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";

// Models
import { Task } from "./Task";

@Entity('users')
export class User {
    @PrimaryColumn({ type: "char", length: 40 })
    id: string;

    @Column({ type: "varchar", length: 30 })
    username: string;

    @Column({ type: "varchar", length: 100 })
    password: string;

    @Column({ type: "varchar", length: 50 })
    email: string;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[]
}
