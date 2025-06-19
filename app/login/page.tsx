import React from 'react';

const LoginForm = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Pane */}
      <div className="flex-1 bg-gradient-to-br from-[#311944] to-[#10b981] flex items-center justify-center">
        {/* You can add a logo or graphic here */}
      </div>

      {/* Right Pane */}
      <div className="flex-1 bg-white p-20 flex flex-col justify-center shadow-md rounded-md">
        <h1 className="font-poppins text-3xl md:text-4xl font-medium mb-10 text-gray-800">
          Welcome to<br />
          <span className="text-4xl md:text-5xl font-extrabold text-[#10b981]">
            Real Estate Agent: Shop1
          </span>
        </h1>

        <form className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="userId" className="text-xs text-gray-800 mb-1 font-poppins">
              User ID
            </label>
            <input
              type="email"
              id="userId"
              placeholder="example@gmail.com"
              className="h-12 px-3 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-xs text-gray-800 mb-1 font-poppins">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="***********"
              className="h-12 px-3 border border-gray-300 rounded-md text-base"
            />
          </div>

          <div className="flex justify-between items-center text-sm font-poppins">
            <label className="flex items-center gap-2 text-gray-800">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#" className="text-[#10b981] hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="h-12 bg-[#10b981] text-white rounded-md text-base font-semibold font-poppins hover:bg-[#5548c7] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
