import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AccountType, AuthService } from "../api";

const Signup = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password || !username) {
      return;
    }
    AuthService.signupSignupPost({
      email: email,
      password: password,
      username: username,
      account_type: AccountType.STUDENT,
    })
      .then((response) => {
        login(response.token);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="p-2 text-center text-2xl font-bold leading-9 tracking-tight text-blue-500">
            Sign in to your account
          </h2>
        </div>

        <div className="p-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div
            className="bg-white px-6 py-6 shadow-lg rounded-2xl sm:px-12 border-2 border-blue-500"
            style={{
              boxShadow:
                "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="p-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="p-2">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="p-2">
                <input
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="birthday"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Birthday
              </label>
            </div>

            <div className="p-2">
              <button
                type="submit"
                onClick={handleSignup}
                className="flex w-full justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium leading-6 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </button>
            </div>
          </div>

          <p className="p-2 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
