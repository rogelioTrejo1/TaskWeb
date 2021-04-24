//Dependencias
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

// Models
import { User } from "./User";

//Creación de la entidad t exportación del mismo
@Entity('tasks')
export class Task {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar" })
    task: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "datetime" })
    delivery_Date: Date;

    @Column({ type: "tinyint", default: false })
    done: boolean;

    @ManyToOne(() => User, user => user.tasks)
    user: User
}