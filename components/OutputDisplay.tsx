
import React, { useState } from 'react';
import { JobDetails } from '../types';

interface OutputDisplayProps {
  details: JobDetails;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ details }) => {
  const [activeTab, setActiveTab] = useState<'jd' | 'guide'>('jd');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="flex border-b border-slate-200 bg-slate-50/50">
        <button
          onClick={() => setActiveTab('jd')}
          className={`flex-1 py-4 px-6 text-sm font-semibold transition-all border-b-2 ${
            activeTab === 'jd' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          LinkedIn Job Description
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`flex-1 py-4 px-6 text-sm font-semibold transition-all border-b-2 ${
            activeTab === 'guide' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Interview Guide (10 Questions)
        </button>
      </div>

      <div className="p-6 flex-1 overflow-y-auto relative min-h-[500px]">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => copyToClipboard(activeTab === 'jd' ? details.jobDescription : details.interviewGuide)}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Markdown
              </>
            )}
          </button>
        </div>

        <div className="markdown-content text-slate-700 prose max-w-none">
          {activeTab === 'jd' ? (
            <div dangerouslySetInnerHTML={{ __html: formatMarkdown(details.jobDescription) }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: formatMarkdown(details.interviewGuide) }} />
          )}
        </div>
      </div>
    </div>
  );
};

// Simplified markdown renderer for visualization
function formatMarkdown(text: string) {
  return text
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>')
    .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/\n/g, '<br />');
}

export default OutputDisplay;
