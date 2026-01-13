
import React from 'react';

interface LoaderProps {
  isThinking?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isThinking }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        {isThinking && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-ping"></div>
          </div>
        )}
      </div>
      <p className="mt-4 text-slate-600 font-medium animate-pulse">
        {isThinking ? "Thinking deeply for better results..." : "Generating recruitment materials..."}
      </p>
      <p className="text-xs text-slate-400 mt-1">This might take a moment as we perfect the JD.</p>
    </div>
  );
};

export default Loader;
