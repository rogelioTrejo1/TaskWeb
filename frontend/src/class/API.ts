class Api {
    private URI: string;
    private headers: Headers;

    constructor() {
        this.URI = process.env.NODE_ENV as string == "development" ? "http://localhost:3000/api" : "http://api.taskweb.com/api"
        this.headers = new Headers({
            'Content-Type': 'application/json'
        });
    }

    /**
     * Retorna todas las Tareas de la Base de datos
     */
    public async getTasks(): Promise<ApiResponce | Error> {
        try {
            const resp: Response = await fetch(`${this.URI}/tasks`);
            const tasks: ApiResponce = await resp.json();
            return tasks;
        } catch (error) {
            return new Error(error);
        }
    }

    /**
     * Retorna una Tarea en espesifico de la base de datos
     * @param {number} idTask: id de la Tarea en la base de datos 
     */
    public async getTask(idTask: number | string): Promise<ApiResponce | Error> {
        try {
            const resp: Response = await fetch(`${this.URI}/task/${idTask}`);
            const task: ApiResponce = await resp.json();
            return task;
        } catch (error) {
            return new Error(error);
        }
    }

    /**
     * Inserta una nueva tarea en la base de datos
     * @param {Task} newTask: Nueva tarea que se desea insertar 
     */
    public async postTask(newTask: Task): Promise<ApiResponce | Error> {
        try {
            const resp = await fetch(`${this.URI}/tasks`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(newTask)
            });
            const postTask = await resp.json();
            return postTask;
        } catch (error) {
            return new Error(error);
        }
    }

    /**
     * Actualiza una tarea en la base de datos
     * @param {Task} newTask: Nueva tarea que se actualizara
     */
    public async putTask(newTask: Task): Promise<ApiResponce | Error> {
        try {
            const resp = await fetch(`${this.URI}/tasks`, {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify(newTask)
            });
            const putTask = await resp.json();
            return putTask;
        } catch (error) {
            return new Error(error);
        }
    }

    /**
     * Elimina una rarea en espesifico de la base de datos
     * @param {number} idTask: id de la tarea  
     */
    public async deleteTask(idTask: number | string): Promise<ApiResponce | Error> {
        try {
            const resp = await fetch(`${this.URI}/task/${idTask}`, {
                method: "DELETE",
                headers: this.headers
            });
            const deleteTask = await resp.json();
            return deleteTask;
        } catch (error) {
            return new Error(error);
        }
    }

    /**
     * Actualiza el estado de realización en la base de datos
     * @param {Task} task: Tarea de la base de datos que cambiara su estado. 
     */
    public async putDone(task: Task): Promise<ApiResponce | Error> {
        try {
            const resp = await fetch(`${this.URI}/putDone`, {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify(task)
            });
            const deleteTask = await resp.json();
            return deleteTask;
        } catch (error) {
            return new Error(error);
        }
    }

    /**
     * Busca todas las tarea que contenga las iniciales introducidas
     * @param {string} task: nombre de la tarea que se buscara 
     */
    public async searchTask(task: string): Promise<ApiResponce | Error> {
        try {
            const resp = await fetch(`${this.URI}/searchTask/${task}`);
            const tasks = await resp.json();
            return tasks;
        } catch (error) {
            return new Error(error);
        }
    }
}

//Modelos
export interface Task {
    Id?: string | number;
    task?: string;
    description?: string;
    delivery_Date?: Date | string;
    done?: boolean | string | number;
}

export interface ApiResponce {
    status?: number;
    resp?: boolean;
    message?: string;
    body?: any;
}

//Exportacion del modulo
export default Api;