// Assessment questions and data structures

export function getDiagnosisQuestions(role) {
  const baseQuestions = [
    {
      id: 'leadership',
      title: 'Leadership & Vision',
      description: 'Evaluate leadership commitment and vision clarity',
      questions: [
        {
          id: 'leadership_commitment',
          text: 'How committed is leadership to this change initiative?',
          required: true,
          scale: [
            { value: 1, label: 'Not at all', description: 'Leadership shows no commitment' },
            { value: 2, label: 'Slightly', description: 'Minimal leadership engagement' },
            { value: 3, label: 'Moderately', description: 'Some leadership support' },
            { value: 4, label: 'Very', description: 'Strong leadership commitment' },
            { value: 5, label: 'Extremely', description: 'Complete leadership dedication' }
          ]
        },
        {
          id: 'vision_clarity',
          text: 'How clear and compelling is the vision for change?',
          required: true,
          scale: [
            { value: 1, label: 'Very unclear', description: 'Vision is confusing or absent' },
            { value: 2, label: 'Unclear', description: 'Vision lacks clarity' },
            { value: 3, label: 'Somewhat clear', description: 'Vision is partially defined' },
            { value: 4, label: 'Clear', description: 'Vision is well-defined' },
            { value: 5, label: 'Very clear', description: 'Vision is crystal clear and inspiring' }
          ]
        },
        {
          id: 'communication_effectiveness',
          text: 'How effective is communication about the change?',
          required: true,
          scale: [
            { value: 1, label: 'Very poor', description: 'Communication is ineffective' },
            { value: 2, label: 'Poor', description: 'Limited communication effectiveness' },
            { value: 3, label: 'Average', description: 'Moderate communication quality' },
            { value: 4, label: 'Good', description: 'Effective communication' },
            { value: 5, label: 'Excellent', description: 'Outstanding communication' }
          ]
        }
      ]
    },
    {
      id: 'culture',
      title: 'Organizational Culture',
      description: 'Assess cultural readiness and openness to change',
      questions: [
        {
          id: 'culture_openness',
          text: 'How open is the organizational culture to change?',
          required: true,
          scale: [
            { value: 1, label: 'Very resistant', description: 'Culture strongly resists change' },
            { value: 2, label: 'Resistant', description: 'Culture shows resistance to change' },
            { value: 3, label: 'Neutral', description: 'Culture is neutral about change' },
            { value: 4, label: 'Open', description: 'Culture is receptive to change' },
            { value: 5, label: 'Very open', description: 'Culture embraces change' }
          ]
        },
        {
          id: 'trust_levels',
          text: 'What is the level of trust between management and employees?',
          required: true,
          scale: [
            { value: 1, label: 'Very low', description: 'Minimal trust exists' },
            { value: 2, label: 'Low', description: 'Limited trust' },
            { value: 3, label: 'Moderate', description: 'Average trust levels' },
            { value: 4, label: 'High', description: 'Strong trust relationship' },
            { value: 5, label: 'Very high', description: 'Exceptional trust levels' }
          ]
        },
        {
          id: 'collaboration',
          text: 'How well do teams collaborate across the organization?',
          required: true,
          scale: [
            { value: 1, label: 'Very poor', description: 'Little to no collaboration' },
            { value: 2, label: 'Poor', description: 'Limited collaboration' },
            { value: 3, label: 'Average', description: 'Moderate collaboration' },
            { value: 4, label: 'Good', description: 'Strong collaborative culture' },
            { value: 5, label: 'Excellent', description: 'Outstanding collaboration' }
          ]
        }
      ]
    },
    {
      id: 'capability',
      title: 'Capability & Resources',
      description: 'Evaluate organizational capabilities and resource availability',
      questions: [
        {
          id: 'skill_readiness',
          text: 'How ready are employee skills for the upcoming changes?',
          required: true,
          scale: [
            { value: 1, label: 'Not ready', description: 'Significant skill gaps exist' },
            { value: 2, label: 'Minimally ready', description: 'Major skill development needed' },
            { value: 3, label: 'Moderately ready', description: 'Some skill development required' },
            { value: 4, label: 'Well prepared', description: 'Minor skill adjustments needed' },
            { value: 5, label: 'Fully ready', description: 'Skills are well-aligned' }
          ]
        },
        {
          id: 'resource_availability',
          text: 'How adequate are the resources allocated for change?',
          required: true,
          scale: [
            { value: 1, label: 'Very inadequate', description: 'Severely under-resourced' },
            { value: 2, label: 'Inadequate', description: 'Insufficient resources' },
            { value: 3, label: 'Adequate', description: 'Sufficient resources available' },
            { value: 4, label: 'Good', description: 'Well-resourced initiative' },
            { value: 5, label: 'Excellent', description: 'Abundantly resourced' }
          ]
        },
        {
          id: 'training_support',
          text: 'How effective is the training and support provided?',
          required: true,
          scale: [
            { value: 1, label: 'Very poor', description: 'No effective training/support' },
            { value: 2, label: 'Poor', description: 'Limited training effectiveness' },
            { value: 3, label: 'Average', description: 'Moderate training quality' },
            { value: 4, label: 'Good', description: 'Effective training programs' },
            { value: 5, label: 'Excellent', description: 'Outstanding training and support' }
          ]
        }
      ]
    }
  ]

  // Add role-specific questions
  if (role === 'leadership') {
    baseQuestions.push({
      id: 'strategy',
      title: 'Strategic Alignment',
      description: 'Assess strategic alignment and decision-making processes',
      questions: [
        {
          id: 'strategic_alignment',
          text: 'How well does this change align with organizational strategy?',
          required: true,
          scale: [
            { value: 1, label: 'Not aligned', description: 'No strategic alignment' },
            { value: 2, label: 'Poorly aligned', description: 'Limited strategic connection' },
            { value: 3, label: 'Moderately aligned', description: 'Some strategic alignment' },
            { value: 4, label: 'Well aligned', description: 'Strong strategic fit' },
            { value: 5, label: 'Perfectly aligned', description: 'Complete strategic alignment' }
          ]
        },
        {
          id: 'decision_making',
          text: 'How effective is the decision-making process for change?',
          required: true,
          scale: [
            { value: 1, label: 'Very ineffective', description: 'Poor decision-making' },
            { value: 2, label: 'Ineffective', description: 'Slow or unclear decisions' },
            { value: 3, label: 'Moderately effective', description: 'Average decision-making' },
            { value: 4, label: 'Effective', description: 'Good decision processes' },
            { value: 5, label: 'Very effective', description: 'Excellent decision-making' }
          ]
        }
      ]
    })
  } else if (role === 'employee') {
    baseQuestions.push({
      id: 'personal',
      title: 'Personal Readiness',
      description: 'Assess individual readiness and support needs',
      questions: [
        {
          id: 'personal_readiness',
          text: 'How ready do you feel personally for this change?',
          required: true,
          scale: [
            { value: 1, label: 'Not ready', description: 'I feel unprepared for change' },
            { value: 2, label: 'Minimally ready', description: 'I have concerns about readiness' },
            { value: 3, label: 'Somewhat ready', description: 'I feel moderately prepared' },
            { value: 4, label: 'Ready', description: 'I feel well-prepared' },
            { value: 5, label: 'Very ready', description: 'I am excited and fully prepared' }
          ]
        },
        {
          id: 'support_adequacy',
          text: 'How adequate is the support provided to employees?',
          required: true,
          scale: [
            { value: 1, label: 'Very inadequate', description: 'No meaningful support' },
            { value: 2, label: 'Inadequate', description: 'Insufficient support' },
            { value: 3, label: 'Adequate', description: 'Basic support provided' },
            { value: 4, label: 'Good', description: 'Strong support available' },
            { value: 5, label: 'Excellent', description: 'Outstanding support system' }
          ]
        }
      ]
    })
  } else if (role === 'kvp') {
    baseQuestions.push({
      id: 'process',
      title: 'Process Maturity',
      description: 'Evaluate process improvement maturity and methodology',
      questions: [
        {
          id: 'process_maturity',
          text: 'How mature are the current improvement processes?',
          required: true,
          scale: [
            { value: 1, label: 'Very immature', description: 'No structured processes' },
            { value: 2, label: 'Immature', description: 'Basic processes exist' },
            { value: 3, label: 'Developing', description: 'Processes are developing' },
            { value: 4, label: 'Mature', description: 'Well-established processes' },
            { value: 5, label: 'Very mature', description: 'Highly sophisticated processes' }
          ]
        },
        {
          id: 'measurement_systems',
          text: 'How effective are the measurement and monitoring systems?',
          required: true,
          scale: [
            { value: 1, label: 'Very poor', description: 'No effective measurement' },
            { value: 2, label: 'Poor', description: 'Limited measurement capability' },
            { value: 3, label: 'Average', description: 'Basic measurement systems' },
            { value: 4, label: 'Good', description: 'Strong measurement practices' },
            { value: 5, label: 'Excellent', description: 'Outstanding measurement systems' }
          ]
        }
      ]
    })
  }

  return baseQuestions
}

export const roleDescriptions = {
  leadership: 'Senior management and decision-makers responsible for driving organizational change.',
  employee: 'Team members who will be directly affected by organizational changes.',
  kvp: 'Continuous improvement practitioners and change champions.'
}
