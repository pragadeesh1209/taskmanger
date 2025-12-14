import { useState } from "react";

export default function Signup({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    if (!username || !password) {
      alert("All fields required");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ username, password })
    );

    alert("Signup successful! Please login.");
    setPage("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Sign Up
        </h1>

        <input
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

       <button
  onClick={signup}
  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 w-full rounded hover:opacity-90 transition"
>
  Sign Up
</button>


        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <button
            onClick={() => setPage("login")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
