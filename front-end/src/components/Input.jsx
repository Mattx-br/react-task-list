// function Input(props) {
//     return (
//         <input
//             className="border outline-slate-400 text-slate-700 rounded-md p-3"
//             {...props}
//         />
//     );
// }

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

export default Input;
