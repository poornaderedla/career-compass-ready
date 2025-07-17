
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Target, ArrowRight, ArrowLeft, Heart, Lightbulb, Cog, Brain, BookOpen, Briefcase } from "lucide-react";
import { AssessmentData } from "@/pages/Index";

interface WiscarSectionProps {
  assessmentData: AssessmentData;
  updateAssessmentData: (data: Partial<AssessmentData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const WiscarSection: React.FC<WiscarSectionProps> = ({
  assessmentData,
  updateAssessmentData,
  onNext,
  onPrevious
}) => {
  const [scores, setScores] = useState({
    will: 50,
    interest: 50,
    skill: 50,
    cognitive: 50,
    ability: 50,
    realWorld: 50
  });

  const dimensions = [
    {
      key: 'will' as keyof typeof scores,
      title: 'Will',
      icon: Heart,
      description: 'Determination and perseverance to follow through with learning goals',
      statement: 'I consistently follow through with learning goals and commitments.',
      color: 'red'
    },
    {
      key: 'interest' as keyof typeof scores,
      title: 'Interest', 
      icon: Lightbulb,
      description: 'Genuine fascination with customer-facing tools and business processes',
      statement: 'I find customer-facing business tools and processes genuinely fascinating.',
      color: 'yellow'
    },
    {
      key: 'skill' as keyof typeof scores,
      title: 'Skill',
      icon: Cog,
      description: 'Current familiarity with platforms, logic, and GUI tools',
      statement: 'I have strong familiarity with software platforms and logical thinking.',
      color: 'blue'
    },
    {
      key: 'cognitive' as keyof typeof scores,
      title: 'Cognitive',
      icon: Brain,
      description: 'Pattern recognition and systematic process design abilities',
      statement: 'I excel at recognizing patterns and designing systematic processes.',
      color: 'purple'
    },
    {
      key: 'ability' as keyof typeof scores,
      title: 'Ability to Learn',
      icon: BookOpen,
      description: 'Openness to feedback and comfort with iterative growth',
      statement: 'I am highly receptive to feedback and thrive on continuous learning.',
      color: 'green'
    },
    {
      key: 'realWorld' as keyof typeof scores,
      title: 'Real-World Fit',
      icon: Briefcase,
      description: 'Genuine desire for Salesforce-based career opportunities',
      statement: 'I have a strong desire to pursue Salesforce-based career opportunities.',
      color: 'orange'
    }
  ];

  const handleScoreChange = (dimension: keyof typeof scores, value: number[]) => {
    setScores(prev => ({
      ...prev,
      [dimension]: value[0]
    }));
  };

  const handleNext = () => {
    updateAssessmentData({
      wiscarScores: scores
    });
    onNext();
  };

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'border-red-200 bg-red-50',
      yellow: 'border-yellow-200 bg-yellow-50',
      blue: 'border-blue-200 bg-blue-50',
      purple: 'border-purple-200 bg-purple-50',
      green: 'border-green-200 bg-green-50',
      orange: 'border-orange-200 bg-orange-50'
    };
    return colors[color as keyof typeof colors] || 'border-gray-200 bg-gray-50';
  };

  const getIconColor = (color: string) => {
    const colors = {
      red: 'text-red-600',
      yellow: 'text-yellow-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      green: 'text-green-600',
      orange: 'text-orange-600'
    };
    return colors[color as keyof typeof colors] || 'text-gray-600';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Target className="h-16 w-16 mx-auto mb-4 text-indigo-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">WISCAR Framework Analysis</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Examine holistic readiness via six key dimensions that predict success in Salesforce careers.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="border-indigo-200 mb-8">
          <CardHeader>
            <CardTitle className="text-indigo-800 text-center">
              Rate yourself on each dimension (0-100)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 mb-6">
              Move the sliders to indicate how well each statement describes you.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          {dimensions.map((dimension) => {
            const Icon = dimension.icon;
            return (
              <Card key={dimension.key} className={`${getColorClasses(dimension.color)} hover:shadow-lg transition-shadow`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${getIconColor(dimension.color)}`} />
                    <div>
                      <span className="text-lg">{dimension.title}</span>
                      <p className="text-sm font-normal text-gray-600 mt-1">
                        {dimension.description}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="font-medium text-gray-800">
                      "{dimension.statement}"
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Strongly Disagree</span>
                        <span className="font-semibold">{scores[dimension.key]}/100</span>
                        <span>Strongly Agree</span>
                      </div>
                      
                      <Slider
                        value={[scores[dimension.key]]}
                        onValueChange={(value) => handleScoreChange(dimension.key, value)}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

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
            onClick={handleNext}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6"
          >
            Complete Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WiscarSection;
