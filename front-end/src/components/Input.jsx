// function Input(props) {
//     return (
//         <input
//             className="border outline-slate-400 text-slate-700 rounded-md p-3"
//             {...props}
//         />
//     );
// }

// export default Input;

// function Input(props) {
//     return (
//         <input
//             className="border outline-slate-400 text-slate-700 rounded-md p-3"
//             {...props}
//         />
//     );
// }

// // Adicionando o display name explicitamente
// Input.displayName = "Input";

// export default Input;

import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    return (
        <input
            className="border outline-slate-400 text-slate-700 rounded-md p-3"
            ref={ref}
            {...props}
        />
    );
});
// Adicionando o display name (opcional, mas recomendado)
Input.displayName = "Input";

export default Input;
