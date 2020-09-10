//DEpendencias
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

//Creación de la entidad t exportación del mismo
@Entity()
export class Task implements ITask {
    @PrimaryGeneratedColumn({type: "int"})
    Id: number;

    @Column({type: "varchar"})
    task: string;

    @Column({type: "text"})
    description: string;

    @Column({type: "datetime"})
    delivery_Date: Date;

    @Column({type: "tinyint", default: false})
    done: number;
}

//Interface de la entidad
export interface ITask {
    Id: number;
    task: string;
    description: string;
    delivery_Date: Date;
    done: number;
}