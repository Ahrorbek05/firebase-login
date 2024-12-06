import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authing, setAuthing] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setAuthing(true);
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setAuthing(false);
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created:", response.user.uid);
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    } finally {
      setAuthing(false);
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="w-1/2 h-full flex flex-col bg-[#282c34] items-center justify-center"></div>

      <div className="w-1/2 h-full flex flex-col bg-[#282c28] items-center justify-center">
        <div className="w-full flex flex-col max-w-[450px] mx-auto">
          <div className="w-full flex flex-col mb-10 text-white">
            <h3 className="text-4xl font-bold mb-2">Sign Up</h3>
            <p className="text-lg mb-4">Create a new account</p>
          </div>

          <div className="w-full flex flex-col mb-6">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-blue-500"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex flex-col mb-4">
            <button
              className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md py-2 hover:bg-white hover:text-black transition duration-300"
              onClick={handleSignUp}
              disabled={authing}
            >
              Sign Up
            </button>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="w-full flex items-center justify-center mt-10">
            <p className="text-sm font-normal text-gray-400">
              Already have an account? <span className="text-semibold text-blue-500 cursor-pointer"><Link to='/login'>SignIn</Link></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
