export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'forced-choice' | 'technical';
  category: 'psychometric' | 'technical' | 'wiscar';
  subCategory?: string;
  question: string;
  options?: string[];
  scale?: number;
  correctAnswer?: string;
  points?: number;
}

export interface UserResponse {
  questionId: string;
  answer: string | number;
  timeSpent?: number;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  careerPaths: string[];
}

export interface AssessmentState {
  currentSection: 'intro' | 'psychometric' | 'technical' | 'wiscar' | 'results';
  currentQuestionIndex: number;
  responses: UserResponse[];
  startTime: number;
  sectionStartTime: number;
}