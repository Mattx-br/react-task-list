import Title from "../components/Title";
import { ArrowLeft } from "lucide-react";
import Input from "../components/Input";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
function EditTaskPage() {
    const [searchParams] = useSearchParams();

    const [title, setTitle] = useState(searchParams.get("title") || "");
    const [description, setDescription] = useState(
        searchParams.get("description") || ""
    );
    const id = searchParams.get("id");
    const navigate = useNavigate();

    function onBackIndex() {
        navigate(-1);
    }

    async function submitUpdate(title, description, id) {
        console.log(title);
        console.log(description);
        console.log(id);
        await api.put(`/task/${id}`, {
            title: title,
            description: description,
            isCompleted: false,
        });
        onBackIndex();
    }

    return (
        <div className="w-screen h-screen bg-slate-500 p-6 flex justify-center">
            <div className="w-[500px] space-y-4">
                {/* div header */}
                <div className="flex justify-center relative">
                    {/* Botão para voltar para home */}
                    <button
                        onClick={() => onBackIndex()}
                        className="text-white bg-slate-400 absolute rounded-md p-2 left-0 mb-0"
                    >
                        <ArrowLeft />
                    </button>
                    <Title>Edit task</Title>
                </div>
                <div className="bg-slate-200 rounded-md p-6 flex flex-col space-y-2">
                    {/* botão título */}
                    <Input
                        type="text"
                        name="title"
                        value={title}
                        placeholder="type the task title"
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    {/* Botão descrição */}
                    <Input
                        type="text"
                        name="description"
                        value={description}
                        placeholder="type the task description"
                        onChange={(event) => setDescription(event.target.value)}
                    />

                    {/* botão submit */}
                    <button
                        onClick={() => {
                            if (!title.trim() || !description.trim()) {
                                return alert("type something");
                            }
                            submitUpdate(title, description, id);
                            // setTitle("");
                            // setDescription("");
                        }}
                        className="bg-slate-700 text-white font-medium rounded-md p-3"
                    >
                        Edit
                    </button>
                </div>
                {/* div content */}
            </div>
        </div>
    );
}

export default EditTaskPage;
