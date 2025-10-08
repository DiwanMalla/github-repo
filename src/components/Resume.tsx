"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle, AlertCircle, X } from "lucide-react";

export default function Resume() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [graduationDate] = useState("October 2025");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        droppedFile.type === "application/msword" ||
        droppedFile.type === "text/plain"
      ) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const reviewCriteria = [
    {
      title: "Content & Structure",
      description: "Relevance, organization, and clarity of information",
      icon: CheckCircle,
    },
    {
      title: "Technical Skills",
      description: "How well skills align with graduate roles",
      icon: CheckCircle,
    },
    {
      title: "Projects & Experience",
      description: "Impact and presentation of achievements",
      icon: CheckCircle,
    },
    {
      title: "Formatting & ATS",
      description: "Professional appearance and system readability",
      icon: CheckCircle,
    },
  ];

  const attachmentMethods = [
    {
      icon: "📎",
      title: "Drag and Drop",
      description: "Simply drag your resume file and drop it in the upload area",
    },
    {
      icon: "📁",
      title: "File Browser",
      description: 'Click the "Choose File" button to browse and select your resume',
    },
    {
      icon: "📋",
      title: "Copy & Paste",
      description: "Copy your resume text and paste it directly (coming soon)",
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/20 dark:bg-muted/10" id="resume">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Resume Review for Graduate Roles
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Get feedback on your resume for graduate/entry-level positions
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Graduation: <span className="font-semibold text-foreground">{graduationDate}</span>
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <div
            className={`border-2 border-dashed rounded-lg p-8 sm:p-12 text-center transition-colors ${
              dragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                : "border-foreground/20 hover:border-foreground/40"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
            />

            {!file ? (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-foreground/5 rounded-full flex items-center justify-center">
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-semibold mb-2">
                    Upload Your Resume
                  </p>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">
                    Drag and drop your resume here, or click to browse
                  </p>
                  <button
                    onClick={handleButtonClick}
                    className="px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                  >
                    Choose File
                  </button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-1">File Attached</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                  </p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={removeFile}
                      className="px-4 py-2 border border-foreground/20 rounded-lg hover:bg-foreground/5 transition-colors font-medium flex items-center gap-2"
                    >
                      <X size={16} />
                      Remove
                    </button>
                    <button
                      onClick={handleButtonClick}
                      className="px-4 py-2 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
                    >
                      Change File
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {file && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-100">
                    Ready for Review!
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Your resume has been attached. I&apos;ll review it based on the criteria below and provide detailed feedback
                    for graduate role applications.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* How to Attach Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">
            How to Attach Your Resume
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {attachmentMethods.map((method, index) => (
              <div
                key={index}
                className="p-6 bg-background border border-foreground/10 rounded-lg hover:border-foreground/20 transition-colors"
              >
                <div className="text-4xl mb-3">{method.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{method.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Review Criteria */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">
            What I&apos;ll Review
          </h3>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {reviewCriteria.map((criteria, index) => (
              <div
                key={index}
                className="p-6 bg-background border border-foreground/10 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <criteria.icon className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-lg mb-2">
                      {criteria.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {criteria.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Tailored for Graduate Roles
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  I&apos;ll provide specific feedback considering you&apos;re completing your bachelor&apos;s degree in October 2025.
                  The review will focus on entry-level positions, highlighting your potential, education, projects,
                  and any relevant experience or skills that employers look for in fresh graduates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
