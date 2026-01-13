
export interface JobDetails {
  jobDescription: string;
  interviewGuide: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface RecruitmentState {
  rawNotes: string;
  jobDetails: JobDetails | null;
  isLoading: boolean;
  isThinking: boolean;
  error: string | null;
}
