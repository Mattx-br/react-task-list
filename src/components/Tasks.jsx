/* eslint-disable react/prop-types */
// Para rodar o app, digite no terminal
// > npm run dev

import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
function Tasks({ tasks, onTaskClick, deleteTaskClick }) {
    const navigate = useNavigate();

    function onSeeDetailsClick(task) {
        const query = new URLSearchParams();
        query.set("title", task.title);
        query.set("description", task.description);
        navigate(`/task?${query.toString()}`);
    }
    return (
        <ul
            className={`space-y-2 bg-slate-200 p-6 rounded-md shadow ${
                !tasks.length && "hidden"
            }`}
        >
            {tasks.map((task) => (
                <li key={task.id} className="flex gap-2 display-full">
                    <li
                        name="btn_title"
                        onClick={() => onTaskClick(task.id)}
                        className={`bg-slate-700 w-full p-2 rounded-md text-white ${
                            task.isCompleted &&
                            "line-through font-bold font-style: italic"
                        }`}
                    >
                        {task.title}
                    </li>
                    <Button onClick={() => onSeeDetailsClick(task)}>
                        <ChevronRightIcon />
                    </Button>
                    <Button onClick={() => deleteTaskClick(task.id)}>
                        <TrashIcon />
                    </Button>
                </li>
            ))}
        </ul>
    );
}

export default Tasks;
