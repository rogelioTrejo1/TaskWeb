//Dependencias 
import Api, { ApiResponce ,Task } from "../class/API";
import UI from "../class/UI";

//Instancias y variabels globales
const taskValue: HTMLInputElement = document.querySelector('#task') as HTMLInputElement;
const descriptionValue: HTMLTextAreaElement = document.querySelector('#description') as HTMLTextAreaElement;
const idValue: HTMLInputElement = document.querySelector('#idTask') as HTMLInputElement;
const dateValue: HTMLInputElement = document.querySelector('#date') as HTMLInputElement;
const principalForm: HTMLElement = document.getElementById('principal-form') as HTMLElement;
const formSearch: HTMLInputElement = document.getElementById('form-search') as HTMLInputElement;
const taskBodySeccion: HTMLElement = document.getElementById('task-body') as HTMLElement;
const modalSeccion: HTMLElement = document.getElementById('modals') as HTMLElement;
const messageTask: HTMLElement = document.getElementById('message-task') as HTMLElement;
const api: Api = new Api();
const ui: UI = new UI();
let isCreate: boolean = true;

//Carga de tareas al iniciar la aplicación
document.addEventListener('DOMContentLoaded', () => validTasks());

//Añadir una nueva tarea
principalForm.addEventListener('submit',async (e: Event) => {
    e.preventDefault();
    //obtengo los datos del formulario
    const target: HTMLFormElement = e.target as HTMLFormElement;
    const formData: FormData = new FormData(target);

    //Le doy formato a los datos del formulario
    const task: Task = {
        Id: formData.get('idTask') as string,
        task: formData.get('task') as string,
        description: formData.get('description') as string,
        delivery_Date: formData.get('date') as string
    };

    //Valido que accion desea realizar, Crear o Actualizar
    if (isCreate) {
        //Inserto la nueva tarea
        const { resp }: ApiResponce = await api.postTask(task);
        if (resp)
            validTasks();
    } else {
        //Actualizo la tarea
        const { resp }: ApiResponce = await api.putTask(task);
        if (resp)
            validTasks();
    }
   
    //Reseteo el formulario
    target.reset();
});

//Elimino una tarea 
taskBodySeccion.addEventListener('click', async (e: Event) => {
    const target: HTMLElement = e.target as HTMLElement;

    if (target.classList.contains('delete')) {
        const idTask: string = target.getAttribute('_id') as string;
        console.log(idTask);
        const { resp }: ApiResponce = await api.deleteTask(idTask);
        if (resp) 
            validTasks();
    }
});

//Actualizo la tarea
taskBodySeccion.addEventListener('click', async (e: Event) => {
    const target: HTMLElement = e.target as HTMLElement;

    //Compruebo que el elemento sea para actualizar
    if (target.classList.contains('update')) {
        const idTask: string = target.getAttribute('_id') as string;
        const { resp, body }: ApiResponce = await api.getTask(idTask);

        //Valido la respuesta del servidor
        if (resp) {
            //Obtego los resultados de busqueda y los asigno al formulario
            const { Id, task, description, delivery_Date  }: Task = body;
            taskValue.value = task as string;
            descriptionValue.value = description as string;
            idValue.value = Id as string;
            dateValue.value = delivery_Date as string;

            //Cambio el estado del formulario 
            isCreate = false;
        }
    }
});

//Actualizo el estado de la tarea
taskBodySeccion.addEventListener('change', async (e: Event) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;

    //Compruebo que tenga la clase para actualizar el estado de la tarea
    if (target.classList.contains('doneInput')) {
        //Genero la tarea a actualizar
        const task: Task = {
            Id: target.getAttribute('id') as string,
            done: target.value == "1" ? 0 : 1
        };
 
        // Actualizo la tarea y valido el comportamiento
        const { resp }: ApiResponce = await api.putDone(task);
        if (resp)
            validTasks();
       
    }
});

modalSeccion.addEventListener('click', async (e: Event) => {
    const target: HTMLButtonElement = e.target as HTMLButtonElement;

    //Compruebo que tenga la clase para actualizar el estado de la tarea 
    if (target.classList.contains('doneButton')) {
        //Genero la tarea a actualizar
        const task: Task = {
            Id: target.getAttribute('_id') as string,
            done: target.value == "1" ? 0 : 1
        };
 
        // Actualizo la tarea y valido el comportamiento
        const { resp }: ApiResponce = await api.putDone(task);

        if (resp)
            validTasks();
       
    }
});

//Buscar una tarea
formSearch.addEventListener('keyup', async (e: Event) => {
    //Obtengo el elemento targeteado
    const target: HTMLInputElement = e.target as HTMLInputElement;
    const task: string = target.value;

    //Valido la tarea
    if (task.length > 0) {
        const { resp, body }: ApiResponce = await api.searchTask(task);
        
        if (resp) {
            if ((body as Task[]).length > 0)
                drawTasks(body);
            else    
                validTasks(); 
        }

    } else {
        validTasks();
    }
    
});

//Funciones y Procedimientos

/**
 * Genera o crea la interface de las tareas (Componente UI) y valida el comportamiento
 * @param {Task[]} tasks arreglo de tareas
*/
function drawTasks(tasks: Task[]): void {
    //Declaro las variables locales de la función
    let taskTemplate = "";
    let modalsTemplate = "";

    //LLeno los templates con cada uno de los datos correspondientes de los datos
    tasks.forEach(task => taskTemplate += ui.makeTask(task));
    tasks.forEach(task => modalsTemplate += ui.makeModal(task));

    //Coloco los templates en el lugar donde les corresponde
    taskBodySeccion.innerHTML = taskTemplate;
    modalSeccion.innerHTML = modalsTemplate;
}

/**
 * Valida el comportamiento de las tareas en la interface de usuario
 */
async function validTasks(): Promise<void> {
    try {
        //Ago la peticion HTTP a el Servidor del API
        const { body, resp }: ApiResponce = await api.getTasks();
        if (resp && body.length > 0) {
            messageTask.classList.add('display-visibiliy');
            drawTasks(body);
        } else {
            messageTask.classList.remove('display-visibiliy');
            taskBodySeccion.innerHTML = "";
        }
    } catch(error) {
        console.error(error);
    }
}

