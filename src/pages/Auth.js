import React from "react";
import { useState } from "react";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  passowrd: "",
  confirmPassword: "",
};

const Auth = () => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = state;

  const handleChange = (e) => {
    e.preventDefault();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-[600px] mx-auto">
      <div className="mt-16 bg-white border rounded-md p-5">
        {!signUp ? (
          <h1 className="text-center font-semibold text-xl md:text-2xl">
            Sign In
          </h1>
        ) : (
          <h1 className="text-center font-semibold text-xl md:text-2xl">
            Sign Up
          </h1>
        )}
        <form className="mt-10">
          {signUp && (
            <>
              <div>
                <input
                  type="firstName"
                  name="firstName"
                  value={firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                  className="mb-4 py-4 px-3 rounded-md border w-full focus:outline-cyan-600"
                />
              </div>
              <div>
                <input
                  type="lastName"
                  name="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="mb-4 py-4 px-3 rounded-md border w-full focus:outline-cyan-600"
                />
              </div>
            </>
          )}
          <div>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
              className="mb-4 py-4 px-3 rounded-md border w-full focus:outline-cyan-600"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleChange}
              className="mb-4 py-4 px-3 rounded-md border w-full focus:outline-cyan-600"
            />
          </div>
          {signUp && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                className="mb-4 py-4 px-3 rounded-md border w-full focus:outline-cyan-600"
              />
            </div>
          )}
          <div>
            <button
              type="submit"
              className="py-3 rounded-md bg-cyan-500 w-full text-white uppercase hover:bg-cyan-700"
            >
              {!signUp ? "Signin" : "Signup"}
            </button>
          </div>
        </form>
        <div>
          {!signUp ? (
            <>
              <div className="text-center mt-8">
                <p>
                  Don't have an account?{" "}
                  <span
                    className="text-orange-500 cursor-pointer"
                    onClick={() => setSignUp(true)}
                  >
                    Sign Up
                  </span>{" "}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mt-8">
                <p>
                  Already have an account?{" "}
                  <span
                    className="text-cyan-500 cursor-pointer"
                    onClick={() => setSignUp(false)}
                  >
                    Sign In
                  </span>{" "}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
