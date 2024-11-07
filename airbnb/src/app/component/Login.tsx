import { useState } from "react";
import { useUserContext } from "../context/UserContext"; // Keeping the original import
import '../globals.css';  // Adjust the path if needed
export default function Login() {
  const { login } = useUserContext(); // Using login from the context
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState<string | null>(null); // Error state for handling login errors

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error on submit

    try {
      // Call the login function from UserContext with email and password
      await login({ email, password });
    } catch (err: any) {
      // If an error occurs, set the error message
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-semibold mb-6">Login</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          value={email}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          value={password}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  
    {error && <p className="mt-2 text-red-500">{error}</p>}
  </div>
  
  );
}
