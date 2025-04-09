import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Issue {
  quote: string
  explanation: string
}

interface AnalysisResultsProps {
  analysis: {
    complianceScore: number
    grammarIssues: Issue[]
    ambiguityIssues: Issue[]
    complianceIssues: Issue[]
  }
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const { complianceScore, grammarIssues, ambiguityIssues, complianceIssues } = analysis

  // Determine score color based on value
  const getScoreColor = () => {
    if (complianceScore >= 80) return "text-green-600 bg-green-50 border-green-200"
    if (complianceScore >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  // Count total issues
  const totalIssues = grammarIssues.length + ambiguityIssues.length + complianceIssues.length

  return (
    <div className="mt-8 space-y-8 animate-in fade-in-50 duration-500">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-navy-900 mb-2">Permit Analysis Results</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We've analyzed your permit document and identified the following issues and compliance score.
        </p>
      </div>

      {/* Score and Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`border ${getScoreColor()} shadow-sm`}>
          <CardHeader className={`${getScoreColor()} border-b pb-3`}>
            <CardTitle className="text-center">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 text-center">
            <div className="text-5xl font-bold mb-2">{complianceScore}</div>
            <div className="text-sm text-gray-500">out of 100</div>
          </CardContent>
        </Card>

        <Card className="border border-navy-100 shadow-sm col-span-1 md:col-span-2">
          <CardHeader className="bg-navy-50 border-b border-navy-100 pb-3">
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-navy-700">{totalIssues}</div>
                <div className="text-sm text-gray-500">Total Issues</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">{ambiguityIssues.length}</div>
                <div className="text-sm text-gray-500">Ambiguities</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{complianceIssues.length}</div>
                <div className="text-sm text-gray-500">Compliance Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Issues Section - Most Important */}
      {complianceIssues.length > 0 && (
        <Card className="border border-red-200 shadow-sm">
          <CardHeader className="bg-red-50 border-b border-red-200 pb-3">
            <CardTitle className="text-red-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Compliance Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-6">
              {complianceIssues.map((issue, index) => (
                <li key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-2 rounded">
                    <p className="font-mono text-sm text-gray-800">{issue.quote}</p>
                  </div>
                  <p className="text-gray-700">{issue.explanation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Ambiguity Issues Section */}
      {ambiguityIssues.length > 0 && (
        <Card className="border border-amber-200 shadow-sm">
          <CardHeader className="bg-amber-50 border-b border-amber-200 pb-3">
            <CardTitle className="text-amber-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              Ambiguity Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-6">
              {ambiguityIssues.map((issue, index) => (
                <li key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-3 mb-2 rounded">
                    <p className="font-mono text-sm text-gray-800">{issue.quote}</p>
                  </div>
                  <p className="text-gray-700">{issue.explanation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Grammar Issues Section */}
      {grammarIssues.length > 0 && (
        <Card className="border border-blue-200 shadow-sm">
          <CardHeader className="bg-blue-50 border-b border-blue-200 pb-3">
            <CardTitle className="text-blue-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                />
              </svg>
              Grammar Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-6">
              {grammarIssues.map((issue, index) => (
                <li key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-2 rounded">
                    <p className="font-mono text-sm text-gray-800">{issue.quote}</p>
                  </div>
                  <p className="text-gray-700">{issue.explanation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations Section */}
      <Card className="border border-navy-100 shadow-sm">
        <CardHeader className="bg-navy-50 border-b border-navy-100 pb-3">
          <CardTitle className="text-navy-700">Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            <p className="text-gray-700">
              Based on our analysis, we recommend addressing the identified issues before submitting your permit
              application. Pay special attention to the compliance issues as they may cause delays or rejection.
            </p>
            <div className="bg-navy-50 p-4 rounded-md border border-navy-100">
              <h4 className="font-medium text-navy-800 mb-2">Next Steps:</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Review and correct all compliance issues</li>
                <li>Clarify ambiguous sections to prevent misinterpretation</li>
                <li>Fix grammar and spelling errors for professionalism</li>
                <li>Consider consulting with a permit specialist for complex issues</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Print/Export Options */}
      <div className="flex justify-center space-x-4">
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Print Report
        </button>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-navy-600 hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PDF
        </button>
      </div>
    </div>
  )
}
