
import { useUserContext } from "../context/UserContext";

const Logout = () => {
  const { logout } = useUserContext();

  return (
  <div className="text-center mt-6">
  <button
    onClick={() => logout()}
    className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
  >
    Logout
  </button>
</div>

  );
  };
  export default Logout;