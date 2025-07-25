import { Link } from "react-router-dom";

const PageNotFound = () => {


    return (
        <>
        <h1>Page Not Found</h1>
        <Link to="/login"><button>Click to go Home Page</button></Link>
        </>

    );
}
export default PageNotFound