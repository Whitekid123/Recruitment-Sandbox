
import React, { useState } from 'react';
import Header from './components/Header';
import RecruitmentInput from './components/RecruitmentInput';
import OutputDisplay from './components/OutputDisplay';
import Loader from './components/Loader';
import ChatWidget from './components/ChatWidget';
import { RecruitmentState } from './types';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<RecruitmentState>({
    rawNotes: '',
    jobDetails: null,
    isLoading: false,
    isThinking: false,
    error: null,
  });

  const handleGenerate = async (notes: string, thinking: boolean) => {
    setState(prev => ({ 
      ...prev, 
      rawNotes: notes, 
      isLoading: true, 
      isThinking: thinking, 
      error: null 
    }));

    try {
      const result = await geminiService.generateRecruitmentMaterials(notes, thinking);
      setState(prev => ({
        ...prev,
        jobDetails: result,
        isLoading: false,
        isThinking: false,
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        isThinking: false,
        error: err.message || "An unexpected error occurred."
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Input and Assistant Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Recruitment Sandbox</h2>
              <p className="text-slate-500">Transform your messy notes into hiring gold.</p>
            </div>
            
            <RecruitmentInput onGenerate={handleGenerate} isLoading={state.isLoading} />
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
              <h3 className="text-indigo-800 font-bold mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Pro Tip
              </h3>
              <p className="text-indigo-700 text-sm leading-relaxed">
                The more detail you provide in your notes (company culture, tech stack nuances, soft skills), 
                the better Gemini can tailor the JD and interview questions. Use **Deep Thinking** for highly technical or executive roles.
              </p>
            </div>
          </div>

          {/* Right Column: Output Display */}
          <div className="lg:col-span-7 flex flex-col">
            {state.error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {state.error}
              </div>
            )}

            {state.isLoading ? (
              <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center min-h-[500px]">
                <Loader isThinking={state.isThinking} />
              </div>
            ) : state.jobDetails ? (
              <OutputDisplay details={state.jobDetails} />
            ) : (
              <div className="flex-1 bg-white rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-12 text-center min-h-[500px]">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-400">Ready to sandbox?</h3>
                <p className="text-slate-400 mt-2 max-w-xs">Enter your role notes on the left to generate your LinkedIn JD and interview strategy.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <ChatWidget />
      
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">&copy; 2024 RecruitMaster Sandbox. Powered by Google Gemini 3 Pro.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">Terms</a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
