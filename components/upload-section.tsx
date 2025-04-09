"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnalysisResults } from "./analysis-results"

// Hardcoded analysis results
const hardcodedAnalysis = {
  complianceScore: 85,
  grammarIssues: [
    {
      quote: "Owner-Bldr\nOwner-Bldr",
      explanation:
        "Repetition of 'Owner-Bldr' is unnecessary and grammatically awkward. Consider removing the duplication.",
    },
    {
      quote: "Equine Keeping in the City of Lo",
      explanation: "Incomplete word at the of the string. Should be 'Los Angeles' or cut off completely.",
    },
    {
      quote:
        "Combine Plumbg - Wrk. per 91.107.2.1.1.1\nCombine Elec - Wrk. per 91.107.2.1.1.1\nCombine HVAC - Wrk. per 91.107.2.1.1.1",
      explanation:
        "Abbreviations such as 'Plumbg', 'Elec', and 'HVAC' should be spelled out for clarity, such as Plumbing, Electric or Electrical and Heating, Ventilation, and Air Conditioning. Also, 'Wrk.' is an unclear abbreviation.",
    },
    {
      quote: "MERV 13 Filter or Greater Req'd. MERV 13 Filter or Greater Req'd.",
      explanation: "Duplicated statement. Remove one instance for conciseness.",
    },
    {
      quote: "imrove",
      explanation: "Spelling error. Change 'imrove' to 'improve'.",
    },
  ],
  ambiguityIssues: [
    {
      quote: "Pilot - Electronic Plan",
      explanation:
        "Unclear what 'Pilot' refers to. Needs clarification (e.g., Pilot Program, Pilot Project). Is this required or just part of a check list.",
    },
    {
      quote: "Permit Flag - Solar PV Combo",
      explanation:
        "Unclear what 'Permit Flag' indicates. Needs clarification. Is this required or just part of a check list.",
    },
    {
      quote: "Permit Flag - MERV 13 Filter or Greater09/05/",
      explanation:
        "Unclear what 'Permit Flag' indicates and the date '09/05/' lacks context. Needs clarification. Is this required or just part of a check list.",
    },
    {
      quote: "Std. Work Descr - Seismic Gas Shut Off Valve",
      explanation: "Unclear what 'Std. Work Descr' indicates. Standard Work Description?",
    },
    {
      quote: "BMO - Yes",
      explanation: "It is unclear what BMO is, Baseline Mansionization Ordinance.",
    },
  ],
  complianceIssues: [
    {
      quote: "Energy Zone - 9",
      explanation:
        "Confirm that the project complies with the California's energy efficiency requirements for Energy Zone 9. Verify that the design meets the specific standards for that zone.",
    },
    {
      quote: "Amount: $8,800.20",
      explanation:
        "The permit is for an Accessory Dwelling Unit (ADU). All ADU's are required to follow California's energy efficiency requirements.",
    },
  ],
}

export function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile)
      setError(null)
    } else {
      setFile(null)
      setError("Please select a valid PDF file")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    // Simulate loading
    setIsUploading(true)
    setError(null)

    // Simulate processing delay
    setTimeout(() => {
      // Set the hardcoded analysis results
      setAnalysis(hardcodedAnalysis)
      setIsUploading(false)
    }, 1500) // 1.5 second delay for realism
  }

  return (
    <section id="upload" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-navy-900">
              Upload Your Construction Permit
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              Get instant analysis and compliance scoring for your construction permits
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Card className="border-2 border-dashed border-gray-200 bg-white">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-4 py-6">
                  <div className="rounded-full bg-navy-50 p-4">
                    <FileText className="h-8 w-8 text-navy-700" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-lg font-semibold text-navy-900">Upload your PDF</h3>
                    <p className="text-sm text-gray-500">
                      Drag and drop or click to upload your construction permit PDF
                    </p>
                  </div>
                  <div className="w-full max-w-sm">
                    <label
                      htmlFor="pdf-upload"
                      className="flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-8 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-center text-sm text-gray-600">
                        <Upload className="mr-2 h-4 w-4" />
                        <span>Select PDF file</span>
                      </div>
                      <input
                        id="pdf-upload"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  {file && (
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <FileText className="h-4 w-4" />
                      <span>{file.name}</span>
                    </div>
                  )}
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="bg-navy-700 hover:bg-navy-800 text-white"
                    disabled={!file || isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Permit"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {analysis && <AnalysisResults analysis={analysis} />}
        </div>
      </div>
    </section>
  )
}
