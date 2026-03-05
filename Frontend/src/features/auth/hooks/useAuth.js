import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, getMe, logout } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, loading, setUser, setLoading } = context;

  async function handleRegister({ email, password, username }) {
    setLoading(true);
    const data = await register({ email, password, username });
    setUser(data.user);
    setLoading(false);
  }

  async function handleLogin({ email, password, username }) {
    setLoading(true);
    const data = await login({ email, password, username });
    setUser(data.user);
    setLoading(false);
  }

  async function handleGetme() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  }
  async function handleLogout() {
    setLoading(true);
    const data = await logout();
    setUser(data.user);
    setLoading(false);
  }

  useEffect(() => {
    handleGetme();
  }, []);

  return {
    setUser,
    setLoading,
    handleGetme,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};
