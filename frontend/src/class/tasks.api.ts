import axios, { AxiosResponse } from "axios";
import { ApiResponce } from "./login.api";

class TaskApi {
    private uri: string;
    private token: string | null = localStorage.getItem("token");
    private headers: any;

    constructor() {
        // Set settings about Api REST
        this.uri = "http://localhost:4000/api";
        this.headers = {
            "Content-Type": "application/json",
            "Authorization": this.token
        };
    }

    // Methosds

    /**
     * 
     * @returns 
     */
    public async getTasks(): Promise<AxiosResponse<ApiResponce>> {
        try {
            const response = await axios.get(`${this.uri}/tasks`, {
                headers: this.headers
            });

            return response;
        } catch (error) {
            return error.response;
        }
    }

    /**
     * 
     * @param id 
     * @returns 
     */
    public async getTask(id: string | number): Promise<AxiosResponse<ApiResponce>> {
        try {
            const response = await axios.get(`${this.uri}/task/${id}`, {
                headers: this.headers
            });

            return response;
        } catch (error) {
            return error.response;
        }
    }

    /**
     * 
     * @param task 
     * @returns 
     */
    public async postTask(task: Task): Promise<AxiosResponse<ApiResponce>> {
        try {
            const response = await axios.post(`${this.uri}/tasks`, task, {
                headers: this.headers
            });

            return response;
        } catch (error) {
            return error.response;
        }
    }

    /**
     * 
     * @param task 
     * @returns 
     */
    public async putTask(task: Task): Promise<AxiosResponse<ApiResponce>> {
        try {
            const response = await axios.put(`${this.uri}/task/${task.id}`, task, {
                headers: this.headers
            });

            return response;
        } catch (error) {
            return error.response;
        }
    }
}

export interface Task {
    id?: number;
    task: string;
    description: string;
    delivery_Date: Date;
    done?: boolean;
}

export default TaskApi;