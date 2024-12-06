import { useState } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const signInWithGoogle = async () => {
    setAuthing(true);
    setError('');
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      console.log(response.user.uid);
      navigate('/'); // Asosiy sahifaga yo'naltirish
    } catch (error) {
      console.error(error);
      setError('Failed to sign in with Google');
    } finally {
      setAuthing(false);
    }
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError('');
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response.user.uid);
      navigate('/');
    } catch (error: any) {
      console.error(error);
      setError('Failed to sign in: ' + error.message);
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
            <h3 className="text-4xl font-bold mb-2">Login</h3>
            <p className="text-lg mb-4">Welcome back! Please enter your details</p>
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
          </div>

          <div className="w-full flex flex-col mb-4">
            <button
              className="w-full bg-transparent border border-white text-white my-2 font-semibold rounded-md py-2 hover:bg-white hover:text-black transition duration-300"
              onClick={signInWithEmail}
              disabled={authing}
            >
              Log In With Email and Password
            </button>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="w-full flex items-center justify-center relative py-4">
            <div className="w-full h-[1px] bg-gray-500"></div>
            <p className="text-lg absolute text-gray-500 bg-[#1a1a1a] px-2">OR</p>
          </div>

          <button
            className="w-full bg-white text-black font-semibold rounded-md p-4 text-center flex items-center justify-center mt-8"
            onClick={signInWithGoogle}
            disabled={authing}
          >
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
            ></svg>
            Log In With Google
          </button>
        </div>

        <div className="w-full flex items-center justify-center mt-10">
          <p className="text-sm font-normal text-gray-400">
            Don't have an account? <span className="text-semibold text-blue-500 cursor-pointer"><Link to='/signup'>Register</Link></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
