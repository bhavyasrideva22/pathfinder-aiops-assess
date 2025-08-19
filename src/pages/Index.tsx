import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { AssessmentResultsComponent } from "@/components/assessment/AssessmentResults";
import { useAssessment } from "@/hooks/useAssessment";

const Index = () => {
  const {
    state,
    results,
    startAssessment,
    getCurrentQuestion,
    getCurrentQuestions,
    submitAnswer,
    resetAssessment,
    getSectionProgress
  } = useAssessment();

  if (state.currentSection === 'intro') {
    return <AssessmentIntro onStartAssessment={startAssessment} />;
  }

  if (state.currentSection === 'results' && results) {
    return <AssessmentResultsComponent results={results} onRestart={resetAssessment} />;
  }

  const currentQuestion = getCurrentQuestion();
  const currentQuestions = getCurrentQuestions();

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading assessment...</h2>
        </div>
      </div>
    );
  }

  return (
    <QuestionCard
      question={currentQuestion}
      currentIndex={state.currentQuestionIndex}
      totalQuestions={currentQuestions.length}
      onAnswer={submitAnswer}
      section={state.currentSection}
    />
  );
};

export default Index;
