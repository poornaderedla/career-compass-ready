
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Settings, Code, Puzzle, Users, TrendingUp, ArrowRight, Clock } from "lucide-react";

interface IntroductionSectionProps {
  onNext: () => void;
}

const IntroductionSection: React.FC<IntroductionSectionProps> = ({ onNext }) => {
  const coreDomains = [
    { icon: Settings, title: "Admin & Configuration", desc: "Salesflows, Reports" },
    { icon: Code, title: "Developer", desc: "Apex, LWC, APIs" },
    { icon: Puzzle, title: "Automation & Integration", desc: "Workflows, Data Integration" },
    { icon: TrendingUp, title: "Architecture & Solutions", desc: "System Design" }
  ];

  const typicalRoles = [
    "Salesforce Admin",
    "Salesforce Developer", 
    "Salesforce Consultant",
    "Solutions Architect",
    "Marketing Automation Specialist"
  ];

  const requiredTraits = [
    "Analytical thinking",
    "Structure-focused problem solving",
    "Customer-oriented mindset",
    "Adaptability to evolving tech",
    "Process/system design strengths"
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <Target className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Test Introduction</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Help users assess their fit for Salesforce, covering personality alignment, 
          aptitude for ecosystem concepts, and career suitability.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-600" />
              What Is Salesforce?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Salesforce is a powerful CRM and cloud platform used to build business apps, 
              automate processes, and develop with declarative tools and code (Apex/Lightning).
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-600" />
              Assessment Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              This comprehensive assessment takes approximately <strong>25 minutes</strong> to complete.
              Take your time and answer honestly for the most accurate results.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">🛠️ Core Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {coreDomains.map((domain, index) => {
              const Icon = domain.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
                  <Icon className="h-5 w-5 text-purple-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-purple-900">{domain.title}</h4>
                    <p className="text-sm text-purple-700">{domain.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-800">🎯 Typical Roles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {typicalRoles.map((role, index) => (
                <Badge key={index} variant="secondary" className="bg-indigo-100 text-indigo-800 mr-2 mb-2">
                  {role}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800">✅ Required Traits</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {requiredTraits.map((trait, index) => (
                <li key={index} className="flex items-center gap-2 text-orange-700">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  {trait}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-6">
        <Button 
          onClick={onNext}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3"
        >
          Start Assessment
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default IntroductionSection;
