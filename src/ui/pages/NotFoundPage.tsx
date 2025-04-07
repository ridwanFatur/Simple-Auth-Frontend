import { Link } from "react-router-dom";
import Button from "../global_components/base/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="mt-4 text-3xl font-bold text-gray-800">
          Page Not Found
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-10">
          <Link to="/">
            <Button variant="primary">Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
