import type { AssessmentResults } from "@/types/assessment";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Briefcase,
  Download,
  Share2
} from "lucide-react";

interface AssessmentResultsProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export const AssessmentResultsComponent = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return <CheckCircle className="w-6 h-6 text-success" />;
      case 'maybe': return <AlertCircle className="w-6 h-6 text-warning" />;
      case 'no': return <XCircle className="w-6 h-6 text-destructive" />;
      default: return <AlertCircle className="w-6 h-6" />;
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return "Ready for AI Ops Role";
      case 'maybe': return "Potential with Development";
      case 'no': return "Consider Alternative Paths";
      default: return "Assessment Complete";
    }
  };

  const getRecommendationDescription = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return "You demonstrate strong alignment with AI Ops Engineering. You're ready to pursue opportunities in this field.";
      case 'maybe': return "You show potential for AI Ops Engineering but would benefit from skill development in key areas.";
      case 'no': return "While AI Ops might not be the ideal fit right now, there are related career paths that align better with your current profile.";
      default: return "";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (score: number) => {
    if (score >= 75) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-12 px-4">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            {getRecommendationIcon(results.recommendation)}
            <h1 className="text-4xl font-bold">Assessment Complete</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Your AI Ops Engineer Career Assessment Results
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="bg-gradient-card border-0 shadow-strong mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              {getRecommendationIcon(results.recommendation)}
              {getRecommendationText(results.recommendation)}
            </CardTitle>
            <CardDescription className="text-lg">
              {getRecommendationDescription(results.recommendation)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-6xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent">
                {results.overallScore}%
              </div>
              <p className="text-muted-foreground">Overall Readiness Score</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Score Breakdown */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Psychometric Fit</span>
                  <span className={`font-bold ${getScoreColor(results.psychometricScore)}`}>
                    {results.psychometricScore}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(results.psychometricScore)}`}
                    style={{ width: `${results.psychometricScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Technical Readiness</span>
                  <span className={`font-bold ${getScoreColor(results.technicalScore)}`}>
                    {results.technicalScore}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-1000 ${getProgressColor(results.technicalScore)}`}
                    style={{ width: `${results.technicalScore}%` }}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  WISCAR Framework
                </h4>
                {Object.entries(results.wiscarScores).map(([key, score]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm capitalize">{key}</span>
                      <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-1000 ${getProgressColor(score)}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Strengths & Areas for Improvement */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Key Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold text-success mb-3">Strengths</h4>
                <div className="space-y-2">
                  {results.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {results.improvements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-warning mb-3">Areas to Improve</h4>
                  <div className="space-y-2">
                    {results.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Next Steps */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                Recommended Next Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">{index + 1}</span>
                    </div>
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Paths */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Suggested Career Paths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.careerPaths.map((path, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {path}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Button variant="gradient" size="lg" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
          <Button variant="secondary" size="lg" onClick={onRestart}>
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};