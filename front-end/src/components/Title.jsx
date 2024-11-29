/* eslint-disable react/prop-types */
function Title(props) {
    return (
        <h1
            {...props}
            className="m-2 text-slate-100 text-4xl font-bold text-center"
        >
            {props.children}
        </h1>
    );
}

export default Title;
