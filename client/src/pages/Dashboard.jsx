import { LoaderCircleIcon, UploadCloud, XIcon } from 'lucide-react'
import React, { useState } from 'react'
import api from '../config/api'

const Dashboard = () => {
  const [showUpload, setShowUpload] = useState(false)
  const [pdf, setPdf] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])

  const uploadPDF = async (event) => {
    event.preventDefault()

    if (!pdf) {
      alert("Please select a PDF")
      return
    }

    try {
      setIsLoading(true)

      const formData = new FormData()
      formData.append("pdf", pdf)

      const response = await api.post("/verify", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      setResults(response.data.results)
      setShowUpload(false)

    } catch (error) {

      console.log(error)
      alert("Verification failed")

    } finally {

      setIsLoading(false)

    }

  }

  return (

    <div className='min-h-screen bg-slate-50'>

      {/* Header */}

      <div className='border-b bg-white'>
        <div className='max-w-7xl mx-auto px-4 py-5 flex items-center justify-between'>

          <div>
            <h1 className='text-2xl font-bold text-slate-800'>AI Fact Checker</h1>
            <p className='text-sm text-slate-500 mt-1'>Upload PDFs and verify claims with AI-powered analysis</p>
          </div>

          <button
            onClick={() => setShowUpload(true)}
            className='bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2'
          >
            <UploadCloud className='size-5' />
            Upload PDF
          </button>

        </div>
      </div>

      {/* Main */}

      <div className='max-w-6xl mx-auto px-4 py-10'>

        {results.length === 0 && (

          <div className='bg-white border border-dashed border-slate-300 rounded-2xl py-24 flex flex-col items-center justify-center text-center'>
            <button onClick={() => setShowUpload(true)} >
            <UploadCloud className='size-16 text-slate-400 mb-4' />
          </button>

            <h2 className='text-2xl font-semibold text-slate-700'>
              Upload a PDF to Start Fact Checking
            </h2>

            <p className='text-slate-500 mt-3 max-w-md'>
              Detect fake statistics, outdated claims, and inaccurate information instantly.
            </p>

          </div>

        )}

        {/* Results */}

        <div className='grid gap-6'>

          {results.map((item, index) => (

            <div key={index} className='bg-white p-6 rounded-2xl shadow-sm border'>

              <h2 className='text-lg font-semibold text-slate-800'>
                {item.claim}
              </h2>

              <div className='flex items-center gap-3 mt-4 flex-wrap'>

                <span
                  className={`px-3 py-1 rounded-full text-sm text-white ${
                    item.status === "Verified"
                      ? "bg-green-500"
                      : item.status === "Inaccurate"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {item.status}
                </span>

                <span className='text-sm text-slate-500'>
                  Confidence: {item.confidence}
                </span>

              </div>

              <div className='mt-5'>
                <p className='text-sm font-semibold text-slate-700'>Correct Fact</p>
                <p className='text-slate-600 mt-1 leading-relaxed'>{item.correctFact}</p>
              </div>

              <div className='mt-5'>
                <p className='text-sm font-semibold text-slate-700'>Reason</p>
                <p className='text-slate-600 mt-1 leading-relaxed'>{item.reason}</p>
              </div>

              <a
                href={item.evidence}
                target='_blank'
                rel='noreferrer'
                className='inline-block mt-5 text-green-600 hover:text-green-700 text-sm font-medium'
              >
                View Source →
              </a>

            </div>

          ))}

        </div>

      </div>

      {/* Upload Modal */}

      {showUpload && (

        <form
          onSubmit={uploadPDF}
          onClick={() => setShowUpload(false)}
          className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4'
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className='relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6'
          >

            <h2 className='text-2xl font-bold text-slate-800'>Upload PDF</h2>

            <p className='text-slate-500 text-sm mt-1'>
              Upload a PDF to verify claims and statistics.
            </p>

            <label
              htmlFor='pdf-input'
              className='mt-6 border-2 border-dashed border-slate-300 rounded-xl py-12 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-all'
            >

              {pdf ? (
                <>
                  <UploadCloud className='size-12 text-green-600' />
                  <p className='mt-3 text-green-700 font-medium'>{pdf.name}</p>
                </>
              ) : (
                <>
                  <UploadCloud className='size-12 text-slate-400' />
                  <p className='mt-3 text-slate-600'>Click to Upload PDF</p>
                </>
              )}

            </label>

            <input
              type='file'
              accept='.pdf'
              id='pdf-input'
              hidden
              onChange={(e) => setPdf(e.target.files[0])}
            />

            <button
              disabled={isLoading}
              className='mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-all flex items-center justify-center gap-2'
            >

              {isLoading && <LoaderCircleIcon className='animate-spin size-5' />}

              {isLoading ? "Analyzing Claims..." : "Verify PDF"}

            </button>

            <XIcon
              onClick={() => setShowUpload(false)}
              className='absolute top-5 right-5 size-5 text-slate-400 hover:text-slate-700 cursor-pointer'
            />

          </div>

        </form>

      )}

    </div>

  )

}

export default Dashboard