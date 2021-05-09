import React, { FormEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Task as ITask } from "../class/tasks.api";
import Navigation from "../components/Navegation";
import Task from "../components/Task";
import TaskApi from "../class/tasks.api";

const Tasks = () => {
    // States
    
    const [token, setToken] = useState<string>("");
    const [tasks, setTasks] = useState<ITask[]>();
    const [task, setTask] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [delivery_Date, setDeliveryDate] = useState<string>("");
    const history = useHistory();

    

    useEffect(() => {
        const localtoken: string | null = localStorage.getItem("token");

        if (localtoken !== null) {
            setToken(localtoken);
            (async ()=> {
                const apiTasks = new TaskApi();
                const { data } = await apiTasks.getTasks();
                setTasks(data.body);
            })()
        } else
            history.push("/login");



    }, [history]);

    const handleCreateTask = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const apiTasks = new TaskApi();

        const target: HTMLFormElement = e.currentTarget;
        const formDate = new FormData(target);


        setTask(formDate.get("task") as string);
        setDescription(formDate.get("description") as string);
        setDeliveryDate(formDate.get("date") as string);

        await apiTasks.postTask({
            task, 
            description,
            delivery_Date: new Date(delivery_Date)
        });

        (async ()=> {
            const apiTasks = new TaskApi();
            const { data } = await apiTasks.getTasks();
            setTasks(data.body);
        })()
    };

    return (
        <>
            {/* Navegacion!!! */}
            <Navigation
                token={token}
            />

            {/* Tasks */}
            <section className="container-fluid mt-5">
                <div className="row">
                    <div className="col-4">
                        <form className="card card-body" onSubmit={handleCreateTask}>
                            <p className="h2 text-center">New Task</p>
                            <div className="form-group">
                                <input
                                    type="hidden"
                                    id="idTask"
                                    name="idTask"
                                />
                                <input
                                    type="text"
                                    className="form-control border"
                                    placeholder="Task"
                                    name="task"
                                    id="task"
                                    value={task}
                                    onChange={(e:FormEvent<HTMLInputElement>)=>{
                                        const { value } = e.currentTarget;
                                        setTask(value);
                                    }}
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    name="date"
                                    id="date"
                                    value={delivery_Date}
                                    onChange={(e:FormEvent<HTMLInputElement>)=>{
                                        const { value } = e.currentTarget;
                                        setDeliveryDate(value);
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    placeholder="Description"
                                    name="description"
                                    cols={30}
                                    rows={10}
                                    value={description}
                                    onChange={(e:FormEvent<HTMLTextAreaElement>)=>{
                                        const { value } = e.currentTarget;
                                        setDescription(value);
                                    }}
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-block btn-primary btn-"
                            >Save</button>
                        </form>
                    </div>
                    <div className="col-8 row">
                        {
                            tasks?.map(({ delivery_Date, task, done, id })=> (
                                <Task 
                                    key={id}
                                    id={id as number}
                                    delivery_Date={delivery_Date}
                                    done={done as boolean}
                                    task={task}
                                />
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    );
}

export default Tasks;