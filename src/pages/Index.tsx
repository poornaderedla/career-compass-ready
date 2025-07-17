import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, Cog, BarChart3, MapPin, BookOpen, ArrowRight, Compass } from "lucide-react";
import IntroductionSection from "@/components/IntroductionSection";
import PsychometricSection from "@/components/PsychometricSection";
import TechnicalSection from "@/components/TechnicalSection";
import WiscarSection from "@/components/WiscarSection";
import ResultsSection from "@/components/ResultsSection";
import CareerGuidanceSection from "@/components/CareerGuidanceSection";

export interface AssessmentData {
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
  recommendation: 'YES' | 'MAYBE' | 'NO';
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    psychometricScore: 0,
    technicalScore: 0,
    wiscarScores: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    },
    overallScore: 0,
    recommendation: 'NO'
  });

  const steps = [
    { title: "Introduction", icon: Compass, component: IntroductionSection },
    { title: "Psychometric", icon: Brain, component: PsychometricSection },
    { title: "Technical", icon: Cog, component: TechnicalSection },
    { title: "WISCAR", icon: Target, component: WiscarSection },
    { title: "Results", icon: BarChart3, component: ResultsSection },
    { title: "Career Path", icon: MapPin, component: CareerGuidanceSection }
  ];

  const currentProgress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateAssessmentData = (newData: Partial<AssessmentData>) => {
    setAssessmentData(prev => ({ ...prev, ...newData }));
  };

  const CurrentComponent = steps[currentStep].component;

  const getComponentProps = () => {
    const baseProps = {
      onNext: handleNext,
      onPrevious: handlePrevious,
    };

    // Only pass assessment data props to components that need them
    if (currentStep === 0) {
      // Introduction section only needs onNext
      return { onNext: handleNext };
    } else if (currentStep === steps.length - 1) {
      // Career guidance section only needs assessment data and navigation
      return {
        ...baseProps,
        assessmentData,
      };
    } else {
      // Other sections need full props
      return {
        ...baseProps,
        assessmentData,
        updateAssessmentData,
        currentStep,
        totalSteps: steps.length,
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl text-white">
              <Compass className="h-8 w-8" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Career Compass
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">Should You Learn Salesforce?</p>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            A data-backed, modular evaluation designed to help learners determine fit, 
            readiness, and career pathways in Salesforce
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(currentProgress)}% Complete
            </span>
          </div>
          <Progress value={currentProgress} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <div className={`p-2 rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : isCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                  }`}>
                    <StepIcon className="h-4 w-4" />
                  </div>
                  <span className={`text-xs mt-2 font-medium ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <CurrentComponent {...getComponentProps()} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
