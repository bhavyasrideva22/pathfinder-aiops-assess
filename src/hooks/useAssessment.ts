import { useState, useCallback } from 'react';
import { AssessmentState, UserResponse, AssessmentResults } from '@/types/assessment';
import { psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/questions';
import { calculateAssessmentResults } from '@/utils/assessment-scoring';

const initialState: AssessmentState = {
  currentSection: 'intro',
  currentQuestionIndex: 0,
  responses: [],
  startTime: 0,
  sectionStartTime: 0
};

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>(initialState);
  const [results, setResults] = useState<AssessmentResults | null>(null);

  const startAssessment = useCallback(() => {
    setState({
      ...initialState,
      currentSection: 'psychometric',
      startTime: Date.now(),
      sectionStartTime: Date.now()
    });
  }, []);

  const getCurrentQuestions = useCallback(() => {
    switch (state.currentSection) {
      case 'psychometric': return psychometricQuestions;
      case 'technical': return technicalQuestions;
      case 'wiscar': return wiscarQuestions;
      default: return [];
    }
  }, [state.currentSection]);

  const getCurrentQuestion = useCallback(() => {
    const questions = getCurrentQuestions();
    return questions[state.currentQuestionIndex] || null;
  }, [getCurrentQuestions, state.currentQuestionIndex]);

  const submitAnswer = useCallback((response: UserResponse) => {
    setState(prevState => {
      const newResponses = [...prevState.responses, response];
      const questions = getCurrentQuestions();
      const nextQuestionIndex = prevState.currentQuestionIndex + 1;

      // Check if we've completed the current section
      if (nextQuestionIndex >= questions.length) {
        // Move to next section
        let nextSection: AssessmentState['currentSection'];
        
        switch (prevState.currentSection) {
          case 'psychometric':
            nextSection = 'technical';
            break;
          case 'technical':
            nextSection = 'wiscar';
            break;
          case 'wiscar':
            nextSection = 'results';
            // Calculate and set results
            setTimeout(() => {
              const assessmentResults = calculateAssessmentResults(newResponses);
              setResults(assessmentResults);
            }, 100);
            break;
          default:
            nextSection = 'results';
        }

        return {
          ...prevState,
          responses: newResponses,
          currentSection: nextSection,
          currentQuestionIndex: 0,
          sectionStartTime: Date.now()
        };
      }

      // Continue with next question in current section
      return {
        ...prevState,
        responses: newResponses,
        currentQuestionIndex: nextQuestionIndex
      };
    });
  }, [getCurrentQuestions]);

  const resetAssessment = useCallback(() => {
    setState(initialState);
    setResults(null);
  }, []);

  const getTotalProgress = useCallback(() => {
    const totalQuestions = psychometricQuestions.length + technicalQuestions.length + wiscarQuestions.length;
    return (state.responses.length / totalQuestions) * 100;
  }, [state.responses.length]);

  const getSectionProgress = useCallback(() => {
    const questions = getCurrentQuestions();
    if (questions.length === 0) return 100;
    return ((state.currentQuestionIndex + 1) / questions.length) * 100;
  }, [getCurrentQuestions, state.currentQuestionIndex]);

  return {
    state,
    results,
    startAssessment,
    getCurrentQuestion,
    getCurrentQuestions,
    submitAnswer,
    resetAssessment,
    getTotalProgress,
    getSectionProgress
  };
};