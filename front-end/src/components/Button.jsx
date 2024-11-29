/* eslint-disable react/prop-types */
function Button(props) {
    return (
        <button
            className=" bg-slate-700 font-sans text-white p-3 rounded-md"
            {...props}
        >
            {props.children}
        </button>
    );
}

export default Button;
