import { useState } from "react";
import { useUserContext } from "../context/UserContext";

export default function Register() {
  const { register } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({ email, password, isAdmin, name });
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            minLength={5}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            minLength={10}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            minLength={4}
          />
        </div>
        <div>
          <label htmlFor="isAdmin" className="flex items-center text-sm font-medium">
            <input
              type="checkbox"
              id="isAdmin"
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="mr-2"
            />
            Admin
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
