/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Input from "./Input";

function AddTask({ addTaskClick }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    // const inputTitle = forwardRef();
    // const inputDescription = forwardRef();
    const inputTitle = useRef(null);
    const inputDescription = useRef(null);
    // const inputIsCompleted = useRef();

    return (
        <div className="bg-slate-200 rounded-md p-6 flex flex-col space-y-2">
            <Input
                type="text"
                name="title"
                value={title}
                placeholder="type the task title"
                onChange={(event) => setTitle(event.target.value)}
                ref={inputTitle}
            />
            <Input
                type="text"
                name="description"
                value={description}
                placeholder="type the task description"
                onChange={(event) => setDescription(event.target.value)}
                ref={inputDescription}
            />
            <button
                onClick={() => {
                    if (!title.trim() || !description.trim()) {
                        return alert("type something");
                    }
                    addTaskClick(title, description);
                    setTitle("");
                    setDescription("");
                }}
                className="bg-slate-700 text-white font-medium rounded-md p-3"
            >
                Add
            </button>
        </div>
    );
}

export default AddTask;
