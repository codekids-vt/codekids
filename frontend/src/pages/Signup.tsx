import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AccountType, AuthService } from "../api";
import Background from "../components/Background";

const Signup = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [accountType, setAccountType] = useState<AccountType>(
    AccountType.STUDENT,
  );
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    AuthService.signupSignupPost({
      email: email,
      password: password,
      username: username,
      account_type: accountType,
    })
      .then((response) => {
        login(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Background />
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="p-2 text-center text-2xl font-bold leading-9 tracking-tight text-primary-green">
            CodeKids Signup
          </h2>
        </div>

        <div className="p-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div
            className="bg-white px-6 py-6 shadow-lg rounded-xl sm:px-12 border-2 border-primary-green"
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  className="p-2 block w-full rounded-xl border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  className="p-2 block w-full rounded-xl border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="p-2">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (password !== e.target.value) {
                      setError("Passwords do not match");
                    } else {
                      setError(null);
                    }
                  }}
                  className="p-2 block w-full rounded-xl border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
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
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(null);
                  }}
                  className="p-2 block w-full rounded-xl border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-green sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="account_type"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Account Type
              </label>
            </div>
            <div className="flex flex-row justify-between p-2">
              <button
                className={`p-2 w-full rounded-xl border-primary-green border-2 text-center ${accountType === AccountType.STUDENT ? "bg-primary-green text-white" : "bg-white"}`}
                onClick={() => setAccountType(AccountType.STUDENT)}
              >
                Student
              </button>
              <div className="p-2"></div>
              <button
                className={`p-2 w-full rounded-xl bg-primary-green border-primary-green border-2 text-center ${accountType === AccountType.TEACHER ? "bg-primary-green text-white" : "bg-white"}`}
                onClick={() => setAccountType(AccountType.TEACHER)}
              >
                Teacher
              </button>
            </div>

            {error && (
              <div className="p-2">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <div className="p-2">
              <button
                type="submit"
                onClick={handleSignup}
                className="flex w-full justify-center rounded-xl bg-primary-green px-4 py-2 text-sm font-medium leading-6 text-white shadow-md hover:bg-primary-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
              >
                Sign up
              </button>
            </div>
          </div>

          <p className="p-2 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary-green hover:underline"
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
