import axios, { AxiosResponse } from "axios";


export interface ApiResponce {
    status: number;
    message: string;
    resp: boolean;
    body: any
}
