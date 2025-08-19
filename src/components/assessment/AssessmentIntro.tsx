import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Target, TrendingUp, Users } from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export const AssessmentIntro = ({ onStartAssessment }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 py-12 px-4">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse-glow">
            <Target className="w-4 h-4" />
            AI Ops Career Assessment
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Pathfinder for AI Ops Engineers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover your readiness and suitability to become an AI Operations Engineer. 
            Get personalized insights, career guidance, and actionable next steps.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-strong transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                What is AI Ops Engineering?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                AI Ops Engineers design, implement, and maintain the infrastructure and tools to deploy, 
                monitor, and scale AI/ML models in production environments.
              </p>
              <div className="space-y-2">
                <Badge variant="secondary">MLOps Pipelines</Badge>
                <Badge variant="secondary">CI/CD for AI</Badge>
                <Badge variant="secondary">Model Monitoring</Badge>
                <Badge variant="secondary">Infrastructure Scaling</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft hover:shadow-strong transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                Career Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">AI Ops Engineer</span>
                  <Badge variant="outline">$120k+</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">MLOps Engineer</span>
                  <Badge variant="outline">$130k+</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">ML Platform Engineer</span>
                  <Badge variant="outline">$140k+</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">DevOps Engineer (AI Focus)</span>
                  <Badge variant="outline">$110k+</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-card border-0 shadow-soft mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Assessment Overview
            </CardTitle>
            <CardDescription>
              This comprehensive assessment evaluates your fit across multiple dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Psychometric Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Personality traits, motivation, and cognitive style alignment
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-accent">2</span>
                </div>
                <h3 className="font-semibold mb-2">Technical Aptitude</h3>
                <p className="text-sm text-muted-foreground">
                  MLOps knowledge, infrastructure skills, and problem-solving
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-success">3</span>
                </div>
                <h3 className="font-semibold mb-2">WISCAR Framework</h3>
                <p className="text-sm text-muted-foreground">
                  Will, Interest, Skill, Cognitive readiness, Ability, Real-world fit
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <div className="mb-6">
            <Badge variant="outline" className="mb-2">
              <Clock className="w-3 h-3 mr-1" />
              20-25 minutes
            </Badge>
            <p className="text-sm text-muted-foreground">
              Comprehensive evaluation with instant results
            </p>
          </div>
          <Button 
            variant="hero" 
            size="xl" 
            onClick={onStartAssessment}
            className="animate-pulse-glow"
          >
            Start Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};