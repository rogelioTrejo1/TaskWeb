import React, { useState } from "react";

const Task = (propTask: PropsTask) => {

    const [task,] = useState(propTask.task);
    const [done,] = useState(propTask.done)
    const [delivery_Date,] = useState(propTask.delivery_Date)
    const [id,] = useState(propTask.id)

    return (
        <div className="col-4 mb-2">
            <div className="card">
                <div className="card-header bg-dark" style={{
                    height: "4.4rem"
                }}>
                    <p className="h4 text-center center-y text-white">{task}</p>
                </div>
                <div className="card-body">
                    <p>Delevery Date: {delivery_Date}</p>
                    <div className="custom-control custom-switch">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            checked={done}
                            id={`check-${id}`}
                            onChange={() => console.log("change!!!")}
                        />
                        <label
                            className="custom-control-label"
                            htmlFor={`check-${id}`}
                        ></label>
                    </div>
                    <div className="row mt-3">
                        <div className="col-6">
                            <button
                                className="btn btn-outline-info btn-sm update w-100"
                            >Update</button>
                        </div>
                        <div className="col-6">
                            <button
                                className="btn btn-outline-danger btn-sm delete w-100"
                            >Delete</button>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-outline-primary btn-block btn-sm mt-2"
                    >GET MORE</button>
                </div>
            </div>
        </div>
    );
};

interface PropsTask {
    id: number;
    task: string;
    delivery_Date: Date;
    done: boolean;
}

export default Task;