import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-9xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/login">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
          Go to Home
        </button>
      </Link>
      <div className="mt-10">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 illustration"
          className="w-64 md:w-96 mx-auto"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
