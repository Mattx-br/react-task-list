import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
// import { v4 } from "uuid";
import Title from "./components/Title";
import api from "./services/api";

function App() {
    const [tasks, setTasks] = useState([]);

    // RESEARCH
    async function getTasks_fromDB() {
        const tasks_fromDB = await api.get("/task");
        setTasks(tasks_fromDB.data);
        // console.log(tasks);
    }

    useEffect(() => {
        getTasks_fromDB();
    }, []);

    // UPDATE
    function onTaskClick(taskId) {
        const newTasks = tasks.map((task) => {
            // Preciso atualizar essa tarefa
            if (task.id === taskId) {
                return { ...task, isCompleted: !task.isCompleted };
            }

            // Não Preciso atualizar essa tarefa
            return task;
        });
        setTasks(newTasks);
    }

    // DELETE
    async function deleteTaskClick(taskId) {
        await api.delete(`/task/${taskId}`);
        // const newTasks = tasks.filter((task) => task.id !== taskId);
        // return setTasks(newTasks);
        getTasks_fromDB();
    }

    // UPDATE
    async function updateTaskClick(taskId, title, description) {
        await api.put(`/task/${taskId}`, {
            where: {
                id: taskId,
            },
            data: {
                title: title,
                description: description,
                isCompleted: false,
            },
        });
        console.log(taskId);
        console.log(title);
        console.log(description);
    }

    // CREATE
    async function addTaskClick(title, description) {
        console.log(title);
        console.log(description);

        await api.post("/task", {
            title: title,
            description: description,
            isCompleted: false,
        });
        // const newTask = {
        //     // id: v4(),
        //     title,
        //     description,
        //     isCompleted: false,
        // };
        // setTasks([...tasks, newTask]);
        getTasks_fromDB();
    }

    return (
        <div className="w-screen h-screen flex justify-center bg-slate-500 p-6">
            <div className="w-[500px] space-y-2">
                {/* <Test /> */}
                <Title>Task Manager</Title>
                <AddTask addTaskClick={addTaskClick} />
                <Tasks
                    tasks={tasks}
                    onTaskClick={onTaskClick}
                    deleteTaskClick={deleteTaskClick}
                    updateTaskClick={updateTaskClick}
                />
            </div>
        </div>
    );
}

export default App;
