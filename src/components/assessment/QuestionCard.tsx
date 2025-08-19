import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question, UserResponse } from "@/types/assessment";
import { Progress } from "@/components/ui/progress";
import { ArrowRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (response: UserResponse) => void;
  section: string;
}

export const QuestionCard = ({ 
  question, 
  currentIndex, 
  totalQuestions, 
  onAnswer, 
  section 
}: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [startTime] = useState(Date.now());

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    const response: UserResponse = {
      questionId: question.id,
      answer: question.type === 'likert' ? parseInt(selectedAnswer) : selectedAnswer,
      timeSpent: Date.now() - startTime
    };
    
    onAnswer(response);
    setSelectedAnswer("");
  };

  const getLikertLabel = (value: string) => {
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    return labels[parseInt(value) - 1];
  };

  const getSectionColor = (section: string) => {
    switch (section) {
      case 'psychometric': return 'bg-primary';
      case 'technical': return 'bg-accent';
      case 'wiscar': return 'bg-success';
      default: return 'bg-primary';
    }
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-secondary/30">
      <div className="w-full max-w-2xl animate-slide-up">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="capitalize">
              {section} Section
            </Badge>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="bg-gradient-card border-0 shadow-strong">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
            {question.subCategory && (
              <Badge variant="secondary" className="w-fit">
                {question.subCategory}
              </Badge>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {question.type === 'likert' && question.scale && (
                <div className="space-y-3">
                  {Array.from({ length: question.scale }, (_, i) => (
                    <div key={i + 1} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value={(i + 1).toString()} id={`option-${i + 1}`} />
                      <Label htmlFor={`option-${i + 1}`} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{i + 1}</span>
                          <span className="text-sm text-muted-foreground">
                            {getLikertLabel((i + 1).toString())}
                          </span>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {(question.type === 'multiple-choice' || question.type === 'forced-choice') && question.options && (
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </RadioGroup>

            <div className="pt-4">
              <Button 
                onClick={handleSubmit} 
                disabled={!selectedAnswer}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                Next Question
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};