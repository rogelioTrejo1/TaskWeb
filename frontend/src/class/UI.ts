//Dependencias
import { Task } from "./API";
import moment from "moment";

class UI {
    /**
     * Genera el templete de una Tarea en especifico
     * @param task tarea de la base de datos
     */
    public makeTask(task: Task): string {
        return `
            <div class="col-4 mb-2">
                <div class="card">
                    <div class="card-header bg-dark" style="height: 4.4rem;">
                        <p class="h4 text-center center-y text-white">
                            ${task.done ? "<i><s>"+task.task+"</s></i>": task.task}
                        </p>
                    </div>
                    <div class="card-body">
                        <p>${task.done ? "<i><s>Delivered to: " + moment(task.delivery_Date).format('MMMM Do, h:mm:ss a')+ "</s></i>": "Delivered to: " + moment(task.delivery_Date).format('MMMM Do, h:mm:ss a')}</p>
                        <div class="custom-control custom-switch">
                            <input ${task.done ? "checked " : ""}  type="checkbox" class="custom-control-input doneInput" value="${task.done}" id="${task.Id}">
                            <label class="custom-control-label" for="${task.Id}">
                                ${task.done ? "<i><s>Done</s></i>": "Done"}
                            </label>
                        </div>
                        <div class="row mt-3">
                            <div class="col-6">
                                <button ${task.done ? "disabled": ""} _id="${task.Id}" class="btn btn-outline-info btn-sm update w-100">Update</button>
                            </div>
                            <div class="col-6">
                                <button class="btn btn-outline-danger btn-sm delete w-100" _id="${task.Id}">Delete</button>
                            </div>
                        </div>
                        <button type="button" ${task.done ? "disabled": ""} class="btn btn-outline-primary btn-block btn-sm mt-2" data-toggle="modal"data-target="#Modal-${task.Id}">
                            GET MORE
                        </button>
                    </div>
                </div>
            </div>
        `;
    } 

    /**
     * Genera el modal correspontiente de la tarea insertada
     * @param task tarea de la base de datos
     */
    public makeModal(task: Task): string {
        return `
            <div class="modal fade" id="Modal-${task.Id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">${task.task}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p class="h6">Description:</p>
                            <p>${task.description}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary doneButton" _id="${task.Id}" value="${task.done}" data-dismiss="modal">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
} 

export default UI;
