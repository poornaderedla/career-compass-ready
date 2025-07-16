
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Cog, ArrowRight, ArrowLeft, Code, Database, Workflow } from "lucide-react";
import { AssessmentData } from "@/pages/Index";

interface TechnicalSectionProps {
  assessmentData: AssessmentData;
  updateAssessmentData: (data: Partial<AssessmentData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const TechnicalSection: React.FC<TechnicalSectionProps> = ({
  assessmentData,
  updateAssessmentData,
  onNext,
  onPrevious
}) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const subsections = [
    {
      title: "General Aptitude",
      icon: Code,
      questions: [
        {
          id: "aptitude_1",
          question: "What comes next in this sequence: 2, 4, 8, 16, ?",
          options: ["24", "32", "20", "18"],
          correct: "32"
        },
        {
          id: "aptitude_2", 
          question: "If Process A takes 3 steps and Process B takes 5 steps, and they can run in parallel, what's the minimum total time?",
          options: ["8 steps", "5 steps", "3 steps", "15 steps"],
          correct: "5 steps"
        },
        {
          id: "aptitude_3",
          question: "In a flowchart, what shape typically represents a decision point?",
          options: ["Rectangle", "Circle", "Diamond", "Oval"],
          correct: "Diamond"
        }
      ]
    },
    {
      title: "Basic Tech Concepts",
      icon: Database,
      questions: [
        {
          id: "tech_1",
          question: "In a database, what is a 'record'?",
          options: ["A column of data", "A row of related data", "A table name", "A database backup"],
          correct: "A row of related data"
        },
        {
          id: "tech_2",
          question: "What does GUI stand for in software development?",
          options: ["General User Interface", "Graphical User Interface", "Global User Integration", "Guided User Interaction"],
          correct: "Graphical User Interface"
        },
        {
          id: "tech_3",
          question: "What is an API primarily used for?",
          options: ["Creating user interfaces", "Connecting different software systems", "Writing documentation", "Designing databases"],
          correct: "Connecting different software systems"
        }
      ]
    },
    {
      title: "Salesforce-Specific Knowledge",
      icon: Workflow,
      questions: [
        {
          id: "sf_1",
          question: "In Salesforce CRM, what typically comes before an Opportunity in the sales process?",
          options: ["Account", "Lead", "Contact", "Case"],
          correct: "Lead"
        },
        {
          id: "sf_2",
          question: "What is a Salesforce 'Flow' primarily used for?",
          options: ["Creating reports", "Automating business processes", "Managing user permissions", "Designing page layouts"],
          correct: "Automating business processes"
        },
        {
          id: "sf_3",
          question: "What programming language is primarily used for custom development in Salesforce?",
          options: ["Java", "JavaScript", "Apex", "Python"],
          correct: "Apex"
        }
      ]
    }
  ];

  const currentQuestions = subsections[currentSubsection].questions;
  const totalQuestions = subsections.reduce((total, section) => total + section.questions.length, 0);
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    subsections.forEach(section => {
      section.questions.forEach(question => {
        if (answers[question.id] === question.correct) {
          correctAnswers++;
        }
      });
    });
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const handleNext = () => {
    const currentSectionComplete = currentQuestions.every(q => answers[q.id]);
    
    if (!currentSectionComplete) {
      return;
    }

    if (currentSubsection < subsections.length - 1) {
      setCurrentSubsection(currentSubsection + 1);
    } else {
      const technicalScore = calculateScore();
      updateAssessmentData({ technicalScore });
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentSubsection > 0) {
      setCurrentSubsection(currentSubsection - 1);
    } else {
      onPrevious();
    }
  };

  const currentSection = subsections[currentSubsection];
  const CurrentIcon = currentSection.icon;
  const isSectionComplete = currentQuestions.every(q => answers[q.id]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Cog className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical & Aptitude Assessment</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Evaluate aptitude, process logic, and current platform awareness across three key areas.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Section {currentSubsection + 1} of {subsections.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete Overall
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Section Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {subsections.map((section, index) => {
              const SectionIcon = section.icon;
              const isActive = index === currentSubsection;
              const isCompleted = section.questions.every(q => answers[q.id]);
              
              return (
                <div key={index} className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                  isActive ? 'bg-green-100 border-2 border-green-500' : 
                  isCompleted ? 'bg-green-50 border border-green-200' : 
                  'bg-gray-50 border border-gray-200'
                }`}>
                  <SectionIcon className={`h-6 w-6 mb-2 ${
                    isActive ? 'text-green-600' : 
                    isCompleted ? 'text-green-500' : 
                    'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium ${
                    isActive ? 'text-green-800' : 
                    isCompleted ? 'text-green-700' : 
                    'text-gray-500'
                  }`}>
                    {section.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-800">
              <CurrentIcon className="h-6 w-6" />
              {currentSection.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {currentQuestions.map((question, index) => (
                <div key={question.id} className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {index + 1}. {question.question}
                  </h4>
                  
                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={(value) => handleAnswer(question.id, value)}
                    className="space-y-2"
                  >
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors">
                        <RadioGroupItem value={option} id={`${question.id}_${optionIndex}`} />
                        <Label htmlFor={`${question.id}_${optionIndex}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
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
            disabled={!isSectionComplete}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6"
          >
            {currentSubsection === subsections.length - 1 ? 'Complete Section' : 'Next Section'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSection;
