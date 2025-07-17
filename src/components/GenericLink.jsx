import { Link } from "react-router-dom";

function GenericLink({ to, state, text }) {
    return (
        <Link
            to={to}
            state={state}
            className='p-3 basis-2xs bg-white border border-gray-300 rounded text-center shadow hover:bg-gray-100 transition'
        > 
            {text}
        </Link>
    )
}

export default GenericLink;