import { useEffect } from "react";
import { useGlobalStore } from "../stores/useGlobalStore";

const severityStyles: Record<string, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
  warning: "bg-yellow-500 text-white",
};

const Snackbar = () => {
  const { snackbar, closeSnackbar } = useGlobalStore();

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        closeSnackbar();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [snackbar.open, closeSnackbar]);

  return (
    <div
      className={`
        fixed z-[9999] bottom-6 right-6
        transition-all duration-300
        ${snackbar.open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
      style={{ minWidth: 280, maxWidth: 400 }}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`
          flex items-center gap-3 px-5 py-3 rounded-lg shadow-lg
          font-medium
          ${severityStyles[snackbar.severity] || "bg-gray-800 text-white"}
        `}
      >
        <span className="flex-1">{snackbar.message}</span>
        <button
          onClick={closeSnackbar}
          className="ml-2 text-white hover:text-gray-200 focus:outline-none"
          aria-label="Cerrar notificación"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 6 6 18M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Snackbar;