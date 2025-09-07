// Create a file LoaderCircle.js in your components/ui directory
export const LoaderCircle = () => (
    <div className="loader-circle">
      {/* Add your loader circle styling here */}
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8a8 8 0 01-8 8zm2 5.29A7.94 7.94 0 014 12H0a12 12 0 002.93 7.17l1.07-1.48z"
        ></path>
      </svg>
    </div>
  );
  
  // Make sure to import this component in your AddNewInterview component
  