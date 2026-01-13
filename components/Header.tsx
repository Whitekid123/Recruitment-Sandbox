
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">RecruitMaster <span className="text-indigo-600">Sandbox</span></h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Workspace</a>
            <a href="#" className="text-slate-400 cursor-not-allowed font-medium">Templates</a>
            <a href="#" className="text-slate-400 cursor-not-allowed font-medium">History</a>
          </nav>
          <div className="flex items-center gap-3">
             <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded-full uppercase tracking-wider">Gemini 3 Pro</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
