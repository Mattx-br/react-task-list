import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../components/Title";

function TaskPage() {
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title");
    const description = searchParams.get("description");

    const navigate = useNavigate();

    function onBackIndex() {
        navigate(-1);
    }

    return (
        <div className="w-screen h-screen bg-slate-500 p-6 flex justify-center">
            <div className="w-[500px] space-y-4">
                {/* div header */}
                <div className="flex justify-center relative">
                    <button
                        onClick={() => onBackIndex()}
                        className="text-white bg-slate-400 absolute rounded-md p-2 left-0 mb-0"
                    >
                        <ArrowLeft />
                    </button>
                    <Title>Task Details</Title>
                </div>
                <div className="bg-slate-400 p-4 rounded-md">
                    <h1 className="font-bold text-white text-xl">{title}</h1>
                    <p className=" text-white ">{description}</p>
                </div>
                {/* div content */}
            </div>
        </div>
    );
}
export default TaskPage;
