export const roadmapConfig = {
  pageTitle: "Research Roadmap",
  
  // List of available programs for the dropdown selector
  programs: [
    { id: "company", name: "Company Roadmap", description: "Overall organization roadmap" },
    { id: "insight", name: "Insight Program", description: "Visual processing research program" },
    { id: "mhlp", name: "Mental Health Labeling Platform", description: "Mental health data analysis platform", comingSoon: true }
  ],
  
  // Company-wide roadmap
  company: {
    title: "ENI Organization Roadmap",
    description: "Our overall company direction and funding strategy focuses on advancing neuroscience research through open-source technologies and collaborative approaches. We aim to secure sustainable funding for our research programs while maintaining our commitment to open science and accessible research tools.",
    timeline: {
      title: "Company Timeline",
      milestones: [
        {
          id: "founding-2023q3",
          date: "2023-Q3",
          title: "Organization Founding",
          description: "Establishment of the Expression Neuroscience Initiative as a nonprofit research organization.",
          status: "completed"
        },
        {
          id: "initial-funding-2023q4",
          date: "2023-Q4",
          title: "Initial Funding Secured",
          description: "Secured seed funding to launch our first research program and establish organizational infrastructure.",
          status: "completed"
        },
        {
          id: "insight-launch-2024q1",
          date: "2024-Q1",
          title: "Insight Program Launch",
          description: "Official launch of our flagship Insight Program focused on visual processing research.",
          status: "completed"
        },
        {
          id: "grant-applications-2024q2",
          date: "2024-Q2",
          title: "Major Grant Applications",
          description: "Submission of multiple research grant applications to expand our programs.",
          status: "in-progress"
        },
        {
          id: "mhlp-development-2024q3",
          date: "2024-Q3",
          title: "MHLP Development Start",
          description: "Begin development of the Mental Health Labeling Platform.",
          status: "planned"
        },
        {
          id: "strategic-partnerships-2024q4",
          date: "2024-Q4",
          title: "Strategic Partnership Development",
          description: "Establish partnerships with academic institutions and healthcare organizations.",
          status: "planned"
        }
      ]
    },
    futureResearch: {
      title: "Future Research Directions",
      cards: [
        {
          title: "Multi-Program Integration",
          text: "Creating integrated research platforms that connect findings across our different programs."
        },
        {
          title: "International Expansion",
          text: "Expanding our research collaborations across international boundaries to address global health challenges."
        }
      ]
    }
  },
  
  // Program-specific roadmaps
  currentPrograms: {
    title: "Current Programs",
    insight: {
      title: "Insight Program",
      text: `Our flagship research program focusing on Binocular Vision Dysfunction (BVD)
        and how this underdiagnosed condition can lead to broad neurological and visual impairments. This program combines behavioral studies,
        neuroimaging, and machine learning approaches to better understand and
        treat BVD.`,
      links: [
        { text: "View Datasets", href: "/data" },
        { text: "Read Papers", href: "/papers" }
      ],
      timeline: {
        title: "Insight Program Timeline",
        milestones: [
          {
            id: "kickoff-2023q4",
            date: "2023-Q4",
            title: "Project Kickoff & Initial Research",
            description: "Established project goals, assembled the core team, and conducted preliminary literature reviews on BVD.",
            status: "completed"
          },
          {
            id: "protocol-2024q1",
            date: "2024-Q1",
            title: "Data Collection Protocol Finalized",
            description: "Developed and finalized protocols for behavioral data collection and neuroimaging studies.",
            status: "completed"
          },
          {
            id: "pilot-recruit-2024q2",
            date: "2024-Q2",
            title: "Begin Pilot Study Recruitment",
            description: "Started recruitment for the initial pilot study to test data collection methods.",
            status: "in-progress"
          },
          {
            id: "neuroimaging-start-2024q3",
            date: "2024-Q3",
            title: "Neuroimaging Data Acquisition Begins",
            description: "Commence fMRI and EEG data collection for the pilot study participants.",
            status: "planned"
          },
          {
            id: "pilot-analysis-2024q4",
            date: "2024-Q4",
            title: "Pilot Data Analysis & First Draft",
            description: "Analyze initial data from the pilot study and begin drafting preliminary findings.",
            status: "planned"
          }
        ]
      },
      futureResearch: {
        title: "Future Insight Research",
        cards: [
          {
            title: "Neural Plasticity Studies",
            text: "Investigating the brain's ability to adapt and reorganize in response to visual training interventions."
          },
          {
            title: "AI-Assisted Diagnosis",
            text: "Developing machine learning models to improve early detection and diagnosis of visual processing disorders."
          }
        ]
      }
    },
    mhlp: {
      title: "Mental Health Labeling Platform",
      text: `Our research platform for analyzing and understanding mental health data patterns. Currently in development.`,
      links: [],
      timeline: {
        title: "MHLP Timeline",
        milestones: [
          {
            id: "mhlp-planning-2024q2",
            date: "2024-Q2",
            title: "Platform Planning & Design",
            description: "Initial planning and architecture design for the Mental Health Labeling Platform.",
            status: "in-progress"
          },
          {
            id: "mhlp-development-2024q3",
            date: "2024-Q3",
            title: "Development Phase",
            description: "Begin development of the platform's core functionality and data infrastructure.",
            status: "planned"
          },
          {
            id: "mhlp-beta-2024q4",
            date: "2024-Q4",
            title: "Beta Testing",
            description: "Launch beta version for initial testing with research partners.",
            status: "planned"
          }
        ]
      },
      futureResearch: {
        title: "Future MHLP Research",
        cards: [
          {
            title: "Pattern Recognition Algorithms",
            text: "Developing advanced algorithms to identify patterns in mental health data."
          },
          {
            title: "Multimodal Data Integration",
            text: "Integrating diverse data types to create more comprehensive mental health assessments."
          }
        ]
      }
    }
  },
  
  // Default timeline (keep for backward compatibility)
  timeline: {
    title: "Timeline",
    milestones: [
      {
        id: "kickoff-2023q4",
        date: "2023-Q4",
        title: "Project Kickoff & Initial Research",
        description: "Established project goals, assembled the core team, and conducted preliminary literature reviews on BVD.",
        status: "completed"
      },
      {
        id: "protocol-2024q1",
        date: "2024-Q1",
        title: "Data Collection Protocol Finalized",
        description: "Developed and finalized protocols for behavioral data collection and neuroimaging studies.",
        status: "completed"
      },
      {
        id: "pilot-recruit-2024q2",
        date: "2024-Q2",
        title: "Begin Pilot Study Recruitment",
        description: "Started recruitment for the initial pilot study to test data collection methods.",
        status: "in-progress"
      },
      {
        id: "neuroimaging-start-2024q3",
        date: "2024-Q3",
        title: "Neuroimaging Data Acquisition Begins",
        description: "Commence fMRI and EEG data collection for the pilot study participants.",
        status: "planned"
      },
      {
        id: "pilot-analysis-2024q4",
        date: "2024-Q4",
        title: "Pilot Data Analysis & First Draft",
        description: "Analyze initial data from the pilot study and begin drafting preliminary findings.",
        status: "planned"
      }
    ]
  },
  
  // Default future research (keep for backward compatibility)
  futureResearch: {
    title: "Future Research",
    cards: [
      {
        title: "Neural Plasticity Studies",
        text: "Investigating the brain's ability to adapt and reorganize in response to visual training interventions."
      },
      {
        title: "AI-Assisted Diagnosis",
        text: "Developing machine learning models to improve early detection and diagnosis of visual processing disorders."
      }
    ]
  }
}; 