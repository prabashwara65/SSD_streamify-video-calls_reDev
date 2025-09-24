import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";

const useLogout = () => {
  const queryClient = useQueryClient();

  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      console.log("Logout successful, clearing cache and navigating...");
      // Clear all cached queries to ensure clean logout state
      queryClient.clear();
      // Invalidate the specific authUser query to force re-fetch
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      // Set authUser data to null immediately
      queryClient.setQueryData(["authUser"], null);
      // Immediately navigate to login page using window.location for guaranteed navigation
      console.log("Navigating to login page...");
      window.location.replace("/login");
      // Optionally, you can also clear localStorage if you store any auth data there
      // localStorage.removeItem('authData');
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Even if logout fails on server, clear client state and navigate
      queryClient.clear();
      queryClient.setQueryData(["authUser"], null);
      window.location.replace("/login");
    },
  });

  return { logoutMutation, isPending, error };
};
export default useLogout;
