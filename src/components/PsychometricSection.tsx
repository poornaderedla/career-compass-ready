
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, ArrowLeft } from "lucide-react";
import { AssessmentData } from "@/pages/Index";

interface PsychometricSectionProps {
  assessmentData: AssessmentData;
  updateAssessmentData: (data: Partial<AssessmentData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PsychometricSection: React.FC<PsychometricSectionProps> = ({
  assessmentData,
  updateAssessmentData,
  onNext,
  onPrevious
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = [
    "I enjoy building structured process flows and systematic approaches to problems.",
    "I thrive when solving real business problems that impact customers and organizations.",
    "I prefer tools that guide me step-by-step rather than completely open-ended frameworks.",
    "I find satisfaction in automating repetitive tasks and improving efficiency.",
    "I'm comfortable learning new software platforms and adapting to technology changes.",
    "I enjoy helping others understand and use technology effectively.",
    "I like to see the bigger picture of how systems connect and work together.",
    "I'm motivated by continuous learning and professional development opportunities.",
    "I work well with deadlines and can manage multiple projects simultaneously.",
    "I'm interested in understanding how businesses operate and can be improved.",
    "I enjoy troubleshooting and finding solutions to technical problems.",
    "I'm comfortable presenting ideas and solutions to both technical and non-technical audiences.",
    "I prefer collaborative environments where I can work with diverse teams.",
    "I'm excited by the prospect of earning industry certifications and credentials.",
    "I'm willing to invest significant time learning a specialized platform like Salesforce."
  ];

  const handleAnswer = (questionIndex: number, value: number) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate psychometric score
      const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
      const maxScore = questions.length * 5;
      const psychometricScore = Math.round((totalScore / maxScore) * 100);
      
      updateAssessmentData({ psychometricScore });
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPrevious();
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = answers[currentQuestion] !== undefined;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Brain className="h-16 w-16 mx-auto mb-4 text-purple-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Psychometric Assessment</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Gauge intrinsic motivation, personality strengths, and cognitive preferences using validated frameworks.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="text-lg text-purple-800">
              Rate how much you agree with this statement:
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <p className="text-lg font-medium text-gray-900 leading-relaxed">
                {questions[currentQuestion]}
              </p>

              <RadioGroup
                value={answers[currentQuestion]?.toString() || ""}
                onValueChange={(value) => handleAnswer(currentQuestion, parseInt(value))}
                className="space-y-3"
              >
                {[
                  { value: "1", label: "Strongly Disagree" },
                  { value: "2", label: "Disagree" },
                  { value: "3", label: "Neutral" },
                  { value: "4", label: "Agree" },
                  { value: "5", label: "Strongly Agree" }
                ].map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer font-medium">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between pt-6">
          <Button 
            onClick={handlePrevious}
            variant="outline"
            className="px-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Section' : 'Next Question'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PsychometricSection;
