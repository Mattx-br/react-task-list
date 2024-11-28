import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";
// import Test from "./components/Test";

function App() {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("tasks")) || []
    );

    useEffect(() => {
        // alterando o localStorage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        // console.log("Task foi alterado");
    }, [tasks]);

    useEffect(() => {
        const fetchTasks = async () => {
            // chamando API
            const response = await fetch(
                "https://jsonplaceholder.typicode.com/todos?_limit=10",
                { method: "GET" }
            );
            // Pegar os dados da api e colocando num json
            const data = await response.json();

            // Salvar os dados puxados no state
            setTasks(data);
            console.log(data);
        };
        // Chamando a função que chama a API para importar as tasks
        // fetchTasks();
    }, []);

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
    function deleteTaskClick(taskId) {
        const newTasks = tasks.filter((task) => task.id !== taskId);
        return setTasks(newTasks);
    }

    function addTaskClick(title, description) {
        const newTask = {
            id: v4(),
            title,
            description,
            idCompleted: false,
        };
        setTasks([...tasks, newTask]);
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
                />
            </div>
        </div>
    );
}

export default App;
