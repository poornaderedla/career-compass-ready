
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, ArrowLeft, RefreshCw, Users, Code, Puzzle, TrendingUp, BookOpen, Award, ExternalLink } from "lucide-react";
import { AssessmentData } from "@/pages/Index";

interface CareerGuidanceSectionProps {
  assessmentData: AssessmentData;
  onPrevious: () => void;
}

const CareerGuidanceSection: React.FC<CareerGuidanceSectionProps> = ({
  assessmentData,
  onPrevious
}) => {

  const salesforceRoles = [
    {
      title: "Salesforce Admin",
      icon: Users,
      description: "Configure and maintain orgs, automate processes",
      skills: ["CRM Logic", "Flow Automation", "Process Analysis"],
      fit: assessmentData.overallScore >= 70 ? "Excellent" : assessmentData.overallScore >= 50 ? "Good" : "Consider Development"
    },
    {
      title: "Salesforce Developer",
      icon: Code,
      description: "Build custom logic via Apex & Lightning",
      skills: ["Apex Fundamentals", "Lightning Components", "API Integration"],
      fit: assessmentData.technicalScore >= 70 ? "Excellent" : assessmentData.technicalScore >= 50 ? "Good" : "Consider Development"
    },
    {
      title: "Solutions Architect",
      icon: Puzzle,
      description: "Design end-to-end enterprise solutions",
      skills: ["System Design", "Integration Patterns", "Business Analysis"],
      fit: assessmentData.wiscarScores.cognitive >= 75 ? "Excellent" : assessmentData.wiscarScores.cognitive >= 60 ? "Good" : "Consider Development"
    },
    {
      title: "Business Analyst",
      icon: TrendingUp,
      description: "Translate business needs into Salesforce solutions",
      skills: ["Requirements Gathering", "Process Mapping", "Stakeholder Communication"],
      fit: assessmentData.wiscarScores.interest >= 70 ? "Excellent" : assessmentData.wiscarScores.interest >= 50 ? "Good" : "Consider Development"
    }
  ];

  const skillMapping = [
    { area: "CRM Logic", providedScore: Math.round((assessmentData.technicalScore + assessmentData.wiscarScores.cognitive) / 2), requiredLevel: 85 },
    { area: "Flow Automation", providedScore: Math.round((assessmentData.wiscarScores.skill + assessmentData.technicalScore) / 2), requiredLevel: 80 },
    { area: "Apex Fundamentals", providedScore: assessmentData.technicalScore, requiredLevel: 70 },
    { area: "Process Analysis", providedScore: Math.round((assessmentData.wiscarScores.cognitive + assessmentData.psychometricScore) / 2), requiredLevel: 75 }
  ];

  const getGapLevel = (provided: number, required: number) => {
    const gap = required - provided;
    if (gap <= 0) return { level: "None", color: "green" };
    if (gap <= 15) return { level: "Low", color: "yellow" };
    if (gap <= 30) return { level: "Moderate", color: "orange" };
    return { level: "High", color: "red" };
  };

  const learningPath = {
    YES: [
      "Platform Basics: CRM objects, declarative config",
      "Automation Tools: Flows, Workflow rules", 
      "UI Customization: Lightning app builder",
      "Developer Tools: Apex, LWC fundamentals",
      "Integration & APIs: Basic REST approaches",
      "Certification Path: Admin → Platform Dev I → Dev II"
    ],
    MAYBE: [
      "Strengthen foundational CRM concepts",
      "Practice with declarative automation tools",
      "Improve structured thinking and problem-solving",
      "Gain hands-on experience with Salesforce Trailhead",
      "Consider starting with Admin track before development",
      "Focus on areas identified as needing development"
    ],
    NO: [
      "Explore front-end low-code tools (PowerApps, Mendix)",
      "Consider project management roles with JIRA",
      "Look into data analysis with Excel or Power BI", 
      "Investigate web development (React, Python)",
      "Consider business analyst roles in other platforms",
      "Reassess interests and strengths for better alignment"
    ]
  };

  const alternativePaths = [
    { title: "PowerApps Development", description: "Microsoft's low-code platform" },
    { title: "Project Management", description: "Using tools like JIRA, Asana" },
    { title: "Data Analysis", description: "Excel, Power BI, Tableau" },
    { title: "Web Development", description: "React, Angular, Python" }
  ];

  const getFitColor = (fit: string) => {
    switch (fit) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-yellow-100 text-yellow-800";
      default: return "bg-red-100 text-red-800";
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <MapPin className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Career & Learning Guidance</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Personalized recommendations based on your assessment results to guide your Salesforce journey.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Salesforce Career Paths */}
        <Card className="border-blue-200 mb-8">
          <CardHeader>
            <CardTitle className="text-blue-800">🌐 Top Salesforce Career Paths</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {salesforceRoles.map((role, index) => {
                const RoleIcon = role.icon;
                return (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <RoleIcon className="h-6 w-6 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{role.title}</h4>
                        <p className="text-gray-600 text-sm">{role.description}</p>
                      </div>
                      <Badge className={getFitColor(role.fit)}>
                        {role.fit}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {role.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Skill Mapping */}
        <Card className="border-purple-200 mb-8">
          <CardHeader>
            <CardTitle className="text-purple-800">🛠️ Skill Gap Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillMapping.map((skill, index) => {
                const gap = getGapLevel(skill.providedScore, skill.requiredLevel);
                return (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.area}</span>
                      <Badge className={`bg-${gap.color}-100 text-${gap.color}-800`}>
                        {gap.level} Gap
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Your Score: </span>
                        <span className="font-semibold">{skill.providedScore}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Required: </span>
                        <span className="font-semibold">{skill.requiredLevel}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Gap: </span>
                        <span className="font-semibold">{Math.max(0, skill.requiredLevel - skill.providedScore)}</span>
                      </div>
                    </div>
                    <Progress 
                      value={(skill.providedScore / skill.requiredLevel) * 100} 
                      className="mt-2 h-2" 
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Learning Path */}
        <Card className="border-green-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <BookOpen className="h-5 w-5" />
              📈 Recommended Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {learningPath[assessmentData.recommendation].map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-green-800">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alternative Paths (if not YES) */}
        {assessmentData.recommendation !== 'YES' && (
          <Card className="border-orange-200 mb-8">
            <CardHeader>
              <CardTitle className="text-orange-800">🔄 Alternative Career Paths</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {alternativePaths.map((path, index) => (
                  <div key={index} className="p-4 border border-orange-200 rounded-lg">
                    <h4 className="font-semibold text-orange-900">{path.title}</h4>
                    <p className="text-orange-700 text-sm">{path.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-8">
          <Button 
            onClick={onPrevious}
            variant="outline"
            className="px-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="space-x-4">
            <Button 
              onClick={handleRestart}
              variant="outline"
              className="px-6"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Restart Assessment
            </Button>
            
            <Button 
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6"
              onClick={() => window.open('https://trailhead.salesforce.com', '_blank')}
            >
              Start Learning on Trailhead
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerGuidanceSection;
