
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, ArrowRight, ArrowLeft, TrendingUp, TrendingDown, Minus, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { AssessmentData } from "@/pages/Index";

interface ResultsSectionProps {
  assessmentData: AssessmentData;
  updateAssessmentData: (data: Partial<AssessmentData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({
  assessmentData,
  updateAssessmentData,
  onNext,
  onPrevious
}) => {
  
  useEffect(() => {
    // Calculate overall score and recommendation
    const wiscarAverage = Object.values(assessmentData.wiscarScores).reduce((sum, score) => sum + score, 0) / 6;
    const overallScore = Math.round((assessmentData.psychometricScore + assessmentData.technicalScore + wiscarAverage) / 3);
    
    let recommendation: 'YES' | 'MAYBE' | 'NO' = 'NO';
    if (overallScore >= 75) recommendation = 'YES';
    else if (overallScore >= 55) recommendation = 'MAYBE';
    
    updateAssessmentData({ overallScore, recommendation });
  }, [assessmentData.psychometricScore, assessmentData.technicalScore, assessmentData.wiscarScores]);

  const getRecommendationConfig = (recommendation: string) => {
    switch (recommendation) {
      case 'YES':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Excellent Fit!',
          message: 'You show strong alignment with Salesforce career requirements.'
        };
      case 'MAYBE':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: 'Potential Fit',
          message: 'With some development, you could succeed in Salesforce.'
        };
      default:
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Consider Alternatives',
          message: 'Other career paths might be a better fit for your profile.'
        };
    }
  };

  const recommendation = getRecommendationConfig(assessmentData.recommendation);
  const RecommendationIcon = recommendation.icon;

  const wiscarDimensions = [
    { key: 'will', name: 'Will', score: assessmentData.wiscarScores.will },
    { key: 'interest', name: 'Interest', score: assessmentData.wiscarScores.interest },
    { key: 'skill', name: 'Skill', score: assessmentData.wiscarScores.skill },
    { key: 'cognitive', name: 'Cognitive', score: assessmentData.wiscarScores.cognitive },
    { key: 'ability', name: 'Ability to Learn', score: assessmentData.wiscarScores.ability },
    { key: 'realWorld', name: 'Real-World Fit', score: assessmentData.wiscarScores.realWorld }
  ];

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 50) return <Minus className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  const getScoreBadge = (score: number) => {
    if (score >= 75) return <Badge className="bg-green-100 text-green-800">Strong</Badge>;
    if (score >= 50) return <Badge className="bg-yellow-100 text-yellow-800">Moderate</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Development</Badge>;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <BarChart3 className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Assessment Results</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Based on your responses across all assessment areas, here's your comprehensive Salesforce readiness profile.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Overall Score Card */}
        <Card className={`${recommendation.bgColor} ${recommendation.borderColor} border-2 mb-8`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-center justify-center">
              <RecommendationIcon className={`h-8 w-8 ${recommendation.color}`} />
              <div>
                <div className="text-2xl">{recommendation.title}</div>
                <div className="text-4xl font-bold mt-2">{assessmentData.overallScore}/100</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg font-medium mb-4">
              {recommendation.message}
            </p>
            <Progress value={assessmentData.overallScore} className="h-4" />
          </CardContent>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-purple-800 flex items-center gap-2">
                Psychometric
                {getScoreIcon(assessmentData.psychometricScore)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{assessmentData.psychometricScore}/100</div>
              <Progress value={assessmentData.psychometricScore} className="mb-2" />
              {getScoreBadge(assessmentData.psychometricScore)}
              <p className="text-sm text-gray-600 mt-2">
                Personality alignment with Salesforce careers
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                Technical
                {getScoreIcon(assessmentData.technicalScore)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{assessmentData.technicalScore}/100</div>
              <Progress value={assessmentData.technicalScore} className="mb-2" />
              {getScoreBadge(assessmentData.technicalScore)}
              <p className="text-sm text-gray-600 mt-2">
                Aptitude and platform knowledge
              </p>
            </CardContent>
          </Card>

          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="text-indigo-800 flex items-center gap-2">
                WISCAR Average
                {getScoreIcon(Object.values(assessmentData.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {Math.round(Object.values(assessmentData.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)}/100
              </div>
              <Progress value={Object.values(assessmentData.wiscarScores).reduce((sum, score) => sum + score, 0) / 6} className="mb-2" />
              {getScoreBadge(Object.values(assessmentData.wiscarScores).reduce((sum, score) => sum + score, 0) / 6)}
              <p className="text-sm text-gray-600 mt-2">
                Holistic readiness across six dimensions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Breakdown */}
        <Card className="border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-800">WISCAR Dimension Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {wiscarDimensions.map((dimension) => (
                <div key={dimension.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getScoreIcon(dimension.score)}
                    <span className="font-medium">{dimension.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">{dimension.score}</span>
                    <div className="w-16">
                      <Progress value={dimension.score} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-8">
          <Button 
            onClick={onPrevious}
            variant="outline"
            className="px-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6"
          >
            View Career Guidance
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
