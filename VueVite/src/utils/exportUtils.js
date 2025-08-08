// Export utilities for generating PDF, CSV, and JSON reports

export async function exportToPDF(assessmentData, role) {
  if (!window.jsPDF) {
    throw new Error('jsPDF library not loaded')
  }

  const { jsPDF } = window.jsPDF
  const doc = new jsPDF()
  
  // PDF styling
  const pageWidth = doc.internal.pageSize.width
  const margin = 20
  let yPosition = margin

  // Helper function to add text with word wrapping
  function addWrappedText(text, x, y, maxWidth, fontSize = 12) {
    doc.setFontSize(fontSize)
    const lines = doc.splitTextToSize(text, maxWidth)
    lines.forEach((line, index) => {
      doc.text(line, x, y + (index * fontSize * 0.5))
    })
    return y + (lines.length * fontSize * 0.5)
  }

  // Title
  doc.setFontSize(20)
  doc.setFont(undefined, 'bold')
  doc.text('Change Readiness Assessment Report', margin, yPosition)
  yPosition += 15

  // Role and date
  doc.setFontSize(12)
  doc.setFont(undefined, 'normal')
  doc.text(`Role: ${role}`, margin, yPosition)
  yPosition += 8
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition)
  yPosition += 15

  // Context Section
  if (assessmentData.context && Object.keys(assessmentData.context).length > 0) {
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Assessment Context', margin, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')

    Object.entries(assessmentData.context).forEach(([key, value]) => {
      if (value && typeof value === 'string') {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
        yPosition = addWrappedText(`${label}: ${value}`, margin, yPosition, pageWidth - 2 * margin, 10)
        yPosition += 5
      }
    })
    yPosition += 10
  }

  // Reflection Section
  if (assessmentData.reflection && Object.keys(assessmentData.reflection).length > 0) {
    if (yPosition > 250) {
      doc.addPage()
      yPosition = margin
    }

    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Key Reflections', margin, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')

    Object.entries(assessmentData.reflection).forEach(([key, value]) => {
      if (value && typeof value === 'string') {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
        yPosition = addWrappedText(`${label}:`, margin, yPosition, pageWidth - 2 * margin, 10)
        yPosition += 3
        yPosition = addWrappedText(value, margin + 5, yPosition, pageWidth - 2 * margin - 5, 9)
        yPosition += 8
      }
    })
  }

  // Planning Section
  if (assessmentData.planning && Object.keys(assessmentData.planning).length > 0) {
    if (yPosition > 200) {
      doc.addPage()
      yPosition = margin
    }

    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text('Action Plan', margin, yPosition)
    yPosition += 10

    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')

    Object.entries(assessmentData.planning).forEach(([key, value]) => {
      if (value && typeof value === 'string') {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
        yPosition = addWrappedText(`${label}:`, margin, yPosition, pageWidth - 2 * margin, 10)
        yPosition += 3
        yPosition = addWrappedText(value, margin + 5, yPosition, pageWidth - 2 * margin - 5, 9)
        yPosition += 8
      }
    })
  }

  // Save the PDF
  const fileName = `change-readiness-assessment-${role}-${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

export function exportToCSV(assessmentData, role) {
  if (!window.Papa) {
    throw new Error('PapaParse library not loaded')
  }

  const csvData = []
  
  // Add metadata
  csvData.push(['Section', 'Question', 'Answer'])
  csvData.push(['Metadata', 'Role', role])
  csvData.push(['Metadata', 'Export Date', new Date().toISOString()])
  
  // Add assessment data
  Object.entries(assessmentData).forEach(([section, sectionData]) => {
    if (typeof sectionData === 'object' && sectionData !== null) {
      Object.entries(sectionData).forEach(([question, answer]) => {
        if (typeof answer === 'string' || typeof answer === 'number') {
          csvData.push([
            section.charAt(0).toUpperCase() + section.slice(1),
            question.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()),
            answer
          ])
        }
      })
    }
  })

  const csv = window.Papa.unparse(csvData)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `change-readiness-assessment-${role}-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export function exportToJSON(assessmentData, role) {
  const exportData = {
    metadata: {
      role,
      exportDate: new Date().toISOString(),
      version: '1.0'
    },
    assessmentData
  }

  const jsonString = JSON.stringify(exportData, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `change-readiness-assessment-${role}-${new Date().toISOString().split('T')[0]}.json`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
