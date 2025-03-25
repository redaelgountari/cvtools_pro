"use client";

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getFromStorage } from '@/Cookiesmv';
import { ReadContext } from './ReadContext';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import dynamic from "next/dynamic";

import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  ChevronDown, 
  FileText, 
  Settings, 
  Loader2, 
  CheckCircle,
  Download,
  FileCode,
  AlertCircle
} from 'lucide-react';
import Analyse from './Analyse';
import AnalyseResults from './AnalyseResults';
import Theme1 from './Themes/Theme1';
import Theme2 from './Themes/Theme2';
import Theme3 from './Themes/Theme3';
import Theme4 from './Themes/Theme4';
import Theme5 from './Themes/Theme5';
import Theme6 from './Themes/Theme6';
import CarouselSize from './Themes';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function Resume() {
    // Types
    interface PersonalInfo {
        fullName: string;
        email: string;
        phone: string;
        location: string;
        linkedin: string;
    }
      
    interface Skills {
        technical: string[];
        soft: string[];
        languages: string[];
    }
      
    interface Experience {
        title: string;
        company: string;
        location: string;
        startDate: string;
        endDate: string;
        responsibilities: string[];
    }
      
    interface Education {
        degree: string;
        institution: string;
        location: string;
        graduationYear: string;
        relevantCourses: string[];
    }
      
    interface Certification {
        name: string;
        issuer: string;
        year: string;
    }
      
    interface Resume {
        personalInfo: PersonalInfo;
        professionalSummary: string;
        skills: Skills;
        experience: Experience[];
        education: Education[];
        certifications: Certification[];
    }
      
    // Context and state
    const { AnlysedCV } = useContext(ReadContext);
    const [resumeData, setResumeData] = useState<Resume | null>(null);
    const [rawResponse, setRawResponse] = useState<string | null>(null);
    const [resumeOutput, setResumeOutput] = useState('');
    const [jobAnnouncement, setJobAnnouncement] = useState('');
    const [lineLimit, setLineLimit] = useState(15);
    const [showLineLimit, setShowLineLimit] = useState(false);
    const [activeTheme, setActiveTheme] = useState('theme2');
    const [showJobDescription, setShowJobDescription] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const [atsOptimized, setAtsOptimized] = useState(true);
    const [isMounted, setIsMounted] = useState(false);

    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [exportLoading, setExportLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('editor');
    
    // Load data from context or storage
    useEffect(() => {
        const loadResumeData = () => {
            try {
                if (AnlysedCV) {
                    console.log("Loading data from context:", AnlysedCV);
                    setRawResponse(AnlysedCV);
                    const parsedData = typeof AnlysedCV === 'string' ? JSON.parse(AnlysedCV) : AnlysedCV;
                    setResumeData(parsedData);
                } else {
                    const storedData = getFromStorage('userData');
                    if (storedData) {
                        console.log("Loading data from storage:", storedData);
                        setRawResponse(JSON.stringify(storedData));
                        setResumeData(storedData as Resume);
                    }
                }
            } catch (error) {
                console.error("Error loading resume data:", error);
                setError("Failed to load resume data. Please try again.");
            }
        };

        loadResumeData();
    }, [AnlysedCV]);

    const PDFViewer = dynamic(() => import("@/app/GenComponents/PDFViewer"), {
        loading: () => (
          <div className="w-full h-[700px] bg-background rounded-lg border border-input p-6 overflow-hidden">
            {/* Header skeleton */}
            <div className="space-y-4 animate-pulse">
              {/* Title bar */}
              <div className="flex items-center justify-between">
                <div className="h-6 bg-muted rounded w-2/5"></div>
                <div className="h-6 bg-muted rounded w-24"></div>
              </div>
              
              {/* Toolbar */}
              <div className="flex space-x-2">
                <div className="h-8 bg-muted rounded w-10"></div>
                <div className="h-8 bg-muted rounded w-10"></div>
                <div className="h-8 bg-muted rounded w-24"></div>
                <div className="h-8 bg-muted rounded w-16"></div>
              </div>
              
              {/* Document body */}
              <div className="pt-4 space-y-3">
                {/* Generate multiple content lines */}
                {Array(15).fill(0).map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded w-full" style={{opacity: 1 - (i * 0.03)}}></div>
                ))}
                
                {/* Document "image" */}
                <div className="h-40 bg-muted rounded w-full mt-6"></div>
                
                {/* More text lines */}
                {Array(8).fill(0).map((_, i) => (
                  <div key={i + 15} className="h-4 bg-muted rounded w-full" style={{opacity: 0.9 - (i * 0.05)}}></div>
                ))}
              </div>
            </div>
            
            {/* Page navigation */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center animate-pulse">
              <div className="h-8 bg-muted rounded w-32"></div>
            </div>
          </div>
        ),
        // ssr: false
      });

    useEffect(() => {
        setIsMounted(true);
      }, []);
    // Generate resume content
    const generateResume = async () => {
        if (!rawResponse) {
            setError('Please provide your CV data first before generating a resume.');
            return;
        }
        if(!jobAnnouncement && resumeData){
            setResumeData(resumeData)
            setShowSuccess(true);
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Create dynamic prompt based on settings
            const prompt = `
            You are a highly skilled professional resume writer specializing in crafting ${
              atsOptimized ? 'ATS-optimized and' : ''
            } modern, professional resumes that maximize job-seeker success.
            
            ### USER DATA:
            ${rawResponse}
            
            ${jobAnnouncement ? `### JOB DESCRIPTION:\n${jobAnnouncement}\n` : ''}
            
            ### INSTRUCTIONS:
            1. **Create a polished, professional, and modern${
              atsOptimized ? ' ATS-optimized' : ''
            } resume** based on the user's provided data.
            2. **Highlight key skills, experiences, and achievements** that best align with the user's career goals.
            3. **Use strong action verbs and quantify achievements** wherever possible to enhance impact.
            4. **Ensure a logical and structured flow**, improving readability and eliminating redundancies.
            5. **Format the resume into clear sections**, ensuring consistency in styling and structure.
            ${jobAnnouncement ? '6. **Tailor the resume to match the provided job description** by emphasizing relevant qualifications.\n' : ''}
            ${showLineLimit ? `7. **Keep each bullet point within approximately ${lineLimit} words** to ensure clarity and conciseness.\n` : ''}
            8. **Deliver the resume in a clean, structured Markdown format** for easy conversion to PDF or Word.
            9. **Make the resume compelling, concise, and results-oriented**, effectively showcasing the candidate’s strengths.
            ${selectedLanguage ? `10. **Write the resume in French.**\n` : ''}
            
            ### SPECIAL HANDLING:
            - **Include only valid and relevant information.**  
            - **Remove placeholders or irrelevant entries** such as "[Your LinkedIn Profile URL]", "N/A", "null", or "Not Provided."  
            - **If a section (e.g., Certifications, Portfolio) has no valid data, omit it entirely** rather than leaving it blank.  
            
            ### OUTPUT FORMAT:
            Ensure the resume follows this structured JSON format for alignment with the job offer:  
            \`\`\`json
            ${JSON.stringify(resumeData, null, 2)}
            \`\`\`
            `;
            
        

            const { data } = await axios.post("/api/gemini", { userData: prompt });
            const cleanedData = data.text
            .replace(/```json|```/g, '') 
            .trim(); 
            console.log("Cleaned data:", cleanedData);
        
            setResumeOutput(cleanedData);
            setResumeData(JSON.parse(cleanedData))
            console.log("clean data :",cleanedData)
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setActiveTab('preview'); 
            }, 1500);
        } catch (error) {
            console.error('Error generating resume:', error);
            setError(error instanceof Error ? error.message : 'Failed to generate resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle export
    const handleExport = async (format) => {
        if (!resumeOutput) {
            setError('No resume content to export.');
            return;
        }

        setExportLoading(true);
        try {
            // This would be connected to actual export functionality
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (format === 'pdf') {
                console.log('Exporting as PDF...');
                // Implementation for PDF export
            } else if (format === 'docx') {
                console.log('Exporting as Word...');
                // Implementation for Word export
            }
            
            // Success notification
            setError('');
            // Could show a success message here
        } catch (error) {
            setError('Export failed. Please try again.');
        } finally {
            setExportLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold tracking-tight">Resume Builder</h1>
                <p className="text-muted-foreground mt-2">Create professional, ATS-optimized resumes tailored to your target jobs</p>
            </div>
            
            <Tabs defaultValue="editor" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="editor">Editor</TabsTrigger>
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="editor" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Your Data */}
                        <Card className="shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <FileText className="h-5 w-5 mr-2" />
                                    Your Resume Data
                                </CardTitle>
                                <CardDescription>
                                    Review the information extracted from your CV
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="max-h-[500px] overflow-y-auto">
                                    {resumeData ? (
                                        <AnalyseResults />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-md p-4">
                                            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
                                            <p className="text-center text-muted-foreground">
                                                No CV data found. Please upload and analyze your CV first.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                        
                        {/* Right Column - Job Description */}
                        <Card className="shadow-md">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <div>
                                    <CardTitle className="text-lg">Target Job Description</CardTitle>
                                    <CardDescription>
                                        Add job details to tailor your resume for specific positions
                                    </CardDescription>
                                    
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch 
                                        id="job-desc-toggle" 
                                        checked={showJobDescription}
                                        onCheckedChange={setShowJobDescription}
                                    />
                                    <Label htmlFor="job-desc-toggle">Enable</Label>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {showJobDescription ? (
                                    <div className="space-y-4">
                                        <Textarea 
                                            placeholder="Paste the job description here to tailor your resume..." 
                                            className="min-h-[200px]"
                                            value={jobAnnouncement}
                                            onChange={(e) => setJobAnnouncement(e.target.value)}
                                        />
                                        <div className="text-sm text-muted-foreground">
                                            Adding a job description helps optimize your resume for ATS systems and highlights relevant skills.
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[200px] border-2 border-dashed rounded-md p-4">
                                        <p className="text-center text-muted-foreground mb-2">
                                            Enable job description targeting to create a tailored resume
                                        </p>
                                        <Button 
                                            variant="outline" 
                                            onClick={() => setShowJobDescription(true)}
                                        >
                                            Add Job Description
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                    
                    {/* Generate Button and Options */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-center">
                            <Button 
                                className="w-full md:w-1/2 h-12" 
                                onClick={generateResume} 
                                disabled={loading || !resumeData}
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Generating Resume...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <FileText className="mr-2 h-5 w-5" />
                                        Generate Resume
                                    </span>
                                )}
                            </Button>
                        </div>
                        
                        {showSuccess && (
                            <div className="flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-md">
                                <CheckCircle className="mr-2 h-5 w-5" />
                                Resume successfully generated! Switching to Preview tab...
                            </div>
                        )}
                        
                        {error && (
                            <div className="p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                                <AlertCircle className="h-5 w-5 mr-2" />
                                {error}
                            </div>
                        )}
                    </div>

                </TabsContent>
                
                <TabsContent value="preview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Column - Resume Theme Selection */}
                        <div className="lg:col-span-4 space-y-4">
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Resume Template</CardTitle>
                                    <CardDescription>
                                        Choose a professional template for your resume
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                    {isMounted ? (
                                <Carousel
                                    opts={{
                                    align: "start",
                                    }}
                                    className="w-full max-w-sm"
                                >
                                    <CarouselContent>
                                        {[
                                            { id: 'theme1', name: 'Modern' },
                                            { id: 'theme2', name: 'Professional' },
                                            { id: 'theme3', name: 'Classic' },
                                            { id: 'theme4', name: 'Creative' },
                                            { id: 'theme5', name: 'Minimal' },
                                            { id: 'theme6', name: 'New' },
                                        ].map((theme, index) => (
                                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1">
                                                <Card 
                                                className={`cursor-pointer transition-all ${activeTheme === theme.id ? 'ring-2 ring-primary' : ''}`}
                                                onClick={() => setActiveTheme(theme.id)}
                                                >
                                                <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                                                    <span className="text-3xl font-semibold mb-2">{index + 1}</span>
                                                    <span className="text-sm font-medium">{theme.name}</span>
                                                </CardContent>
                                                </Card>
                                            </div>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                                ) : (
                                <div className="w-full h-48 flex items-center justify-center bg-muted rounded-md">
                                    <Loader2 className="h-8 w-8 animate-spin opacity-50" />
                                </div>
                                )}

                                {isMounted && resumeOutput || resumeData ? (
                                <div className="overflow-hidden rounded-lg border bg-background">
                                    {
                                        typeof window !== 'undefined' && ( 
                                            <PDFViewer width="100%" height="700px">
                                        {activeTheme === 'theme1' ? (
                                            <Theme1 userdata={resumeData} />
                                        ) : activeTheme === 'theme2' ? (
                                            <Theme2 userdata={resumeData} />
                                        ) : activeTheme === 'theme3' ? (
                                            <Theme3 userdata={resumeData} />
                                        ) : activeTheme === 'theme4' ? (
                                            <Theme4 userdata={resumeData} />
                                        ) : activeTheme === 'theme5' ? (
                                            <Theme5 userdata={resumeData} />
                                        ) : (
                                            <Theme6 userdata={resumeData} />
                                        )}
                                        </PDFViewer>
                                        )}
                                    
                                    
                                </div>
                                ) : (
                                <div className="flex flex-col items-center justify-center h-[500px] border-2 border-dashed rounded-md p-4">
                                    <p className="text-center text-muted-foreground mb-4">
                                    {resumeData ? 
                                        "No resume generated yet. Go to the Editor tab to create your resume." :
                                        "No resume data available. Please upload and analyze your CV first."
                                    }
                                    </p>
                                    {resumeData && (
                                    <Button 
                                        variant="outline" 
                                        onClick={() => setActiveTab('editor')}
                                    >
                                        Go to Editor
                                    </Button>
                                    )}
                                </div>
                                )}

                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <Button 
                                                variant={activeTheme === 'theme1' ? 'default' : 'outline'} 
                                                className="w-full"
                                                onClick={() => setActiveTheme('theme1')}
                                            >
                                                Modern
                                            </Button>
                                            <Button 
                                                variant={activeTheme === 'theme2' ? 'default' : 'outline'} 
                                                className="w-full"
                                                onClick={() => setActiveTheme('theme2')}
                                            >
                                                Professional
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Export Options</CardTitle>
                                    <CardDescription>
                                        Download your resume in different formats
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col space-y-3">
                                        <Button 
                                            className="w-full justify-start" 
                                            onClick={() => handleExport('pdf')} 
                                            disabled={!resumeOutput || exportLoading}
                                        >
                                            <Download className="mr-2 h-5 w-5" />
                                            {exportLoading ? 'Exporting...' : 'Export as PDF'}
                                        </Button>
                                        <Button 
                                            className="w-full justify-start" 
                                            variant="outline" 
                                            onClick={() => handleExport('docx')} 
                                            disabled={!resumeOutput || exportLoading}
                                        >
                                            <FileCode className="mr-2 h-5 w-5" />
                                            {exportLoading ? 'Exporting...' : 'Export as Word'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        {/* Right Column - Resume Preview */}
                        <div className="lg:col-span-8">
                            <Card className="shadow-md">
                                <CardHeader>
                                    <CardTitle>Resume Preview</CardTitle>
                                    <CardDescription>
                                        See how your resume will look when exported
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {resumeOutput || resumeData ? (
                                        <div className="overflow-hidden rounded-lg border bg-background">
                                           { typeof window !== 'undefined' && ( 
                                            <PDFViewer width="100%" height="700px">
                                            {activeTheme === 'theme1' ? (
                                                <Theme1 userdata={resumeData} />
                                            ) : activeTheme === 'theme2' ? (
                                                <Theme2 userdata={resumeData} />
                                            ) : activeTheme === 'theme3' ? (
                                                <Theme3 userdata={resumeData} />
                                            ) : activeTheme === 'theme4' ? (
                                                <Theme4 userdata={resumeData} />
                                            ) : activeTheme === 'theme5' ? (
                                                <Theme5 userdata={resumeData} />
                                            ) : (
                                                <Theme6 userdata={resumeData} />
                                            )}
                                            </PDFViewer>)}
                                            
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-[500px] border-2 border-dashed rounded-md p-4">
                                            <p className="text-center text-muted-foreground mb-4">
                                                {resumeData ? 
                                                    "No resume generated yet. Go to the Editor tab to create your resume." :
                                                    "No resume data available. Please upload and analyze your CV first."
                                                }
                                            </p>
                                            {resumeData && (
                                                <Button 
                                                    variant="outline" 
                                                    onClick={() => setActiveTab('editor')}
                                                >
                                                    Go to Editor
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-6">
                    <Card className="shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Settings className="h-5 w-5 mr-2" />
                                Resume Settings
                            </CardTitle>
                            <CardDescription>
                                Customize how your resume is generated
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="font-medium">Content Settings</h3>
                                    
                                    <div className="flex items-center space-x-2">
                                        <Switch 
                                            id="line-limit-toggle" 
                                            checked={showLineLimit}
                                            onCheckedChange={setShowLineLimit}
                                        />
                                        <Label htmlFor="line-limit-toggle">Enable Bullet Point Word Limit</Label>
                                    </div>
                                    
                                    {showLineLimit && (
                                        <div className="flex items-center space-x-4 ml-6">
                                            <Label htmlFor="lineLimitInput">Maximum words per bullet:</Label>
                                            <Input
                                                id="lineLimitInput"
                                                type="number" 
                                                value={lineLimit} 
                                                onChange={(e) => setLineLimit(Number(e.target.value))} 
                                                className="w-24" 
                                                min="1"
                                                max="50"
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                <div className="border-t pt-4">
                                    <h3 className="font-medium mb-2">ATS Optimization</h3>
                                    <div className="flex items-center space-x-2">
                                        <Switch 
                                            id="ats-toggle" 
                                            checked={atsOptimized}
                                            onCheckedChange={setAtsOptimized}
                                        />
                                        <Label htmlFor="ats-toggle">Optimize for Applicant Tracking Systems</Label>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        Ensures your resume can be properly parsed by automated recruiting systems
                                    </p>
                                </div>
                                
                                <div className="border-t pt-4">
                                    <h3 className="font-medium mb-2">Language Settings</h3>
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="language-select">Resume Language</Label>
                                        <div className="relative">
                                            <select 
                                                id="language-select"
                                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                                value={selectedLanguage}
                                                onChange={(e) => setSelectedLanguage(e.target.value)}
                                            >
                                                <option value="english">English</option>
                                                <option value="french">French</option>
                                                <option value="spanish">Spanish</option>
                                                <option value="german">German</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 opacity-50" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            
            {/* Success Alert Dialog */}
            <AlertDialog open={showSuccess} onOpenChange={setShowSuccess}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                            Resume Generated Successfully!
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Your resume has been created according to your specifications. You can now preview and export it.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setActiveTab('preview')}>
                            View Resume
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}