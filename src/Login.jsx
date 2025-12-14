import { useState } from "react";

export default function Login({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("Please sign up first");
      setPage("signup");
      return;
    }

    if (
      username === savedUser.username &&
      password === savedUser.password
    ) {
      setPage("dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Login
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
  onClick={login}
  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 w-full rounded hover:opacity-90 transition"
>
  Login
</button>


        <p className="mt-4 text-sm text-center">
          New user?{" "}
          <button
            onClick={() => setPage("signup")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
