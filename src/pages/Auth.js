import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  passowrd: "",
  confirmPassword: "",
};

const Auth = ({ setActive }) => {
  const [state, setState] = useState(initialState);
  const [signUp, setSignUp] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = state;
  const navigate = useNavigate();

  // Handle input change events
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // Handle form submission events
  const handleAuth = async (e) => {
    e.preventDefault();

    if (!signUp) {
    } else {
      // SignUp

      // Check if passwwords match
      if (password !== confirmPassword) {
        return toast.error("Passwords do not match");
      }

      // Check if all fields are provided
      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return toast.error("Please fill in all fields");
      } else {
        // Get created user
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Update user profile after signup
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });

        // Set home as active
        setActive("home");
        console.log(user);
      }
    }
    // navigate user after signup to homepage
    navigate("/");
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
        <form className="mt-10" onSubmit={handleAuth}>
          {signUp && (
            <div className="flex justify-between items-center">
              <div className="w-1/2 mr-2">
                <input
                  type="firstName"
                  name="firstName"
                  value={firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                  className="mb-4 py-4 px-3 rounded-md border focus:outline-cyan-600 w-full"
                />
              </div>
              <div className="w-1/2 ml-2">
                <input
                  type="lastName"
                  name="lastName"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                  className="mb-4 py-4 px-3 rounded-md border focus:outline-cyan-600 w-full"
                />
              </div>
            </div>
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
