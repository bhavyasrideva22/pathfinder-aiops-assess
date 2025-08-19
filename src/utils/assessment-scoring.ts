import { UserResponse, AssessmentResults } from '@/types/assessment';
import { psychometricQuestions, technicalQuestions, wiscarQuestions } from '@/data/questions';

export const calculateAssessmentResults = (responses: UserResponse[]): AssessmentResults => {
  const psychometricResponses = responses.filter(r => 
    psychometricQuestions.find(q => q.id === r.questionId)
  );
  
  const technicalResponses = responses.filter(r => 
    technicalQuestions.find(q => q.id === r.questionId)
  );
  
  const wiscarResponses = responses.filter(r => 
    wiscarQuestions.find(q => q.id === r.questionId)
  );

  // Calculate psychometric score (0-100)
  const psychometricScore = calculatePsychometricScore(psychometricResponses);
  
  // Calculate technical score (0-100)
  const technicalScore = calculateTechnicalScore(technicalResponses);
  
  // Calculate WISCAR scores (0-100 each)
  const wiscarScores = calculateWiscarScores(wiscarResponses);
  
  // Overall score
  const overallScore = (psychometricScore * 0.3 + technicalScore * 0.4 + 
    Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6 * 0.3);

  // Generate recommendation
  const recommendation = getRecommendation(overallScore, technicalScore, psychometricScore);
  
  // Generate insights
  const { strengths, improvements, nextSteps, careerPaths } = generateInsights(
    psychometricScore, technicalScore, wiscarScores, recommendation
  );

  return {
    psychometricScore: Math.round(psychometricScore),
    technicalScore: Math.round(technicalScore),
    wiscarScores: {
      will: Math.round(wiscarScores.will),
      interest: Math.round(wiscarScores.interest),
      skill: Math.round(wiscarScores.skill),
      cognitive: Math.round(wiscarScores.cognitive),
      ability: Math.round(wiscarScores.ability),
      realWorld: Math.round(wiscarScores.realWorld)
    },
    overallScore: Math.round(overallScore),
    recommendation,
    strengths,
    improvements,
    nextSteps,
    careerPaths
  };
};

const calculatePsychometricScore = (responses: UserResponse[]): number => {
  if (responses.length === 0) return 0;
  
  let totalScore = 0;
  let maxScore = 0;
  
  responses.forEach(response => {
    const question = psychometricQuestions.find(q => q.id === response.questionId);
    if (question) {
      if (question.type === 'likert') {
        totalScore += typeof response.answer === 'number' ? response.answer : parseInt(response.answer as string);
        maxScore += question.scale || 5;
      } else {
        // For multiple choice, assign points based on "quality" of answer
        totalScore += 3; // Average score for choice questions
        maxScore += 5;
      }
    }
  });
  
  return (totalScore / maxScore) * 100;
};

const calculateTechnicalScore = (responses: UserResponse[]): number => {
  if (responses.length === 0) return 0;
  
  let correctAnswers = 0;
  let totalQuestions = 0;
  
  responses.forEach(response => {
    const question = technicalQuestions.find(q => q.id === response.questionId);
    if (question && question.correctAnswer) {
      totalQuestions++;
      if (response.answer === question.correctAnswer) {
        correctAnswers++;
      }
    }
  });
  
  return totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
};

const calculateWiscarScores = (responses: UserResponse[]) => {
  const scores = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0
  };
  
  const counts = {
    will: 0,
    interest: 0,
    skill: 0,
    cognitive: 0,
    ability: 0,
    realWorld: 0
  };

  responses.forEach(response => {
    const question = wiscarQuestions.find(q => q.id === response.questionId);
    if (question && question.subCategory) {
      const category = question.subCategory as keyof typeof scores;
      if (scores[category] !== undefined) {
        if (question.type === 'likert') {
          scores[category] += typeof response.answer === 'number' ? response.answer : parseInt(response.answer as string);
          counts[category] += question.scale || 5;
        } else {
          scores[category] += 3; // Average for choice questions
          counts[category] += 5;
        }
      }
    }
  });

  // Normalize to 0-100 scale
  Object.keys(scores).forEach(key => {
    const category = key as keyof typeof scores;
    scores[category] = counts[category] > 0 ? (scores[category] / counts[category]) * 100 : 50;
  });

  return scores;
};

const getRecommendation = (
  overallScore: number, 
  technicalScore: number, 
  psychometricScore: number
): 'yes' | 'maybe' | 'no' => {
  if (overallScore >= 75 && technicalScore >= 70 && psychometricScore >= 65) {
    return 'yes';
  } else if (overallScore >= 60 && (technicalScore >= 50 || psychometricScore >= 60)) {
    return 'maybe';
  } else {
    return 'no';
  }
};

const generateInsights = (
  psychometricScore: number,
  technicalScore: number,
  wiscarScores: any,
  recommendation: 'yes' | 'maybe' | 'no'
) => {
  const strengths: string[] = [];
  const improvements: string[] = [];
  const nextSteps: string[] = [];
  const careerPaths: string[] = [];

  // Identify strengths
  if (psychometricScore >= 75) strengths.push("Strong personality fit for AI Ops role");
  if (technicalScore >= 75) strengths.push("Excellent technical foundation");
  if (wiscarScores.will >= 75) strengths.push("High motivation and drive");
  if (wiscarScores.interest >= 75) strengths.push("Genuine interest in AI Operations");

  // Identify improvements
  if (technicalScore < 60) improvements.push("Strengthen technical knowledge in MLOps and infrastructure");
  if (psychometricScore < 60) improvements.push("Develop patience and systematic thinking skills");
  if (wiscarScores.skill < 60) improvements.push("Build hands-on experience with AI/ML tools");

  // Generate next steps based on recommendation
  if (recommendation === 'yes') {
    nextSteps.push("Start applying for AI Ops Engineer positions");
    nextSteps.push("Build a portfolio of MLOps projects");
    nextSteps.push("Get certified in cloud platforms (AWS, GCP, Azure)");
    careerPaths.push("AI Ops Engineer", "MLOps Engineer", "ML Platform Engineer");
  } else if (recommendation === 'maybe') {
    nextSteps.push("Complete foundational courses in MLOps");
    nextSteps.push("Gain hands-on experience with Docker and Kubernetes");
    nextSteps.push("Build 2-3 end-to-end ML deployment projects");
    careerPaths.push("Junior AI Ops Engineer", "DevOps Engineer", "Data Engineer");
  } else {
    nextSteps.push("Focus on programming fundamentals");
    nextSteps.push("Learn Linux and command-line tools");
    nextSteps.push("Consider starting with DevOps or Data Engineering");
    careerPaths.push("DevOps Engineer", "Data Engineer", "Software Developer");
  }

  return { strengths, improvements, nextSteps, careerPaths };
};