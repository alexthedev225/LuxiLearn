"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        window.location.href = "/admin"; // redirection automatique
      } else {
        const data = await res.json();
        setError(data.error || "Erreur inconnue");
      }
    } catch {
      setError("Erreur serveur");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded p-6 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Connexion Admin</h1>

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Nom d'utilisateur"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Mot de passe"
          className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition"
        >
          Se connecter
        </button>

        {error && <p className="text-red-600 mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}
