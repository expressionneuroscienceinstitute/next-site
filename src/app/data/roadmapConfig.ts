export const roadmapConfig = {
  pageTitle: "Research Roadmap",
  
  // List of available programs for the dropdown selector
  programs: [
    { id: "company", name: "Company Roadmap", description: "Overall organization roadmap" },
    { id: "insight", name: "Insight Program", description: "Visual processing research program" },
    { id: "ceEEG", name: "Continuous Embedded Electroencephalogram", description: "Mental health data analysis platform", comingSoon: true }
  ],
  
  // Company-wide roadmap
  company: {
    title: "ENI Organization Roadmap",
    description: "Our overall company direction and funding strategy focuses on advancing neuroscience research through open-source technologies and collaborative approaches. We aim to secure sustainable funding for our research programs while maintaining our commitment to open science and accessible research tools.",
    timeline: {
      title: "Company Timeline",
      milestones: [
        {
          id: "founding-a142025",
          date: "April 14, 2025",
          title: "Organization Founding",
          description: "Incorporation of the Expression Neuroscience Initiative as a nonprofit public-benefit research organization.",
          status: "completed"
        },
        {
          id: "submit-501c3-a162025",
          date: "April 16, 2025",
          title: "501(c)(3) Application Submitted",
          description: "Submission of the 1023-EZ 501(c)(3) application to be recognized as a public-benefit research organization by the IRS.",
          status: "completed"
        },
        {
          id: "insight-launch-2025q4",
          date: "2025-Q4",
          title: "Insight Program Launch",
          description: "Official launch of the Insight Research Program.",
          status: "in-progress"
        },
        {
          id: "mna-research-2026q3",
          date: "2026-Q3",
          title: "Microneedle Array Research Begins",
          description: "Research on Conductive Microneedle Arrays as a technology for the creating of a new generation of EEG devices.",
          status: "planned"
        },
        {
          id: "mna-patent-2026q4",
          date: "2026-Q4",
          title: "Conductive Microneedle Array Patent Filing",
          description: "Filing of a provisional patent for the Conductive Microneedle Array.",
          status: "speculative"
        }
      ]
    },
    // futureResearch: {
    //   title: "Future Research Directions",
    //   cards: [
    //     {
    //       title: "Binocular Vision Dysfunction Dataset",
    //       text: "Creating and publishing a dataset of Binocular Vision Dysfunction (BVD) cases to advance research and diagnosis."
    //     },
    //     {
    //       title: "Vision Therapy Research",
    //       text: "Expanding the Insight Diagnostic Platform to include vision therapy interventions."
    //     }
    //   ]
    // }
  },
  
  // Program-specific roadmaps
  currentPrograms: {
    title: "Current Programs",
    insight: {
      title: "Insight Program",
      text: `Our flagship research program focusing on Binocular Vision Dysfunction (BVD)
        and how this underdiagnosed condition can lead to broad neurological and visual impairments. This program combines behavioral studies,
        neuroimaging, and Virtual Reality (VR) to better understand and treat BVD.`,
      links: [
        {
          text: "Insight Design Document",
          href: "https://raw.githubusercontent.com/expressionneuroscienceinstitute/next-site/e5a8cbe0aeb7a51795f9516b5b0b0a1d0645f9df/Insight_Design_Document.pdf"
        }
      ],
      timeline: {
        title: "Insight Program Timeline",
        milestones: [
          {
            id: "kickoff-2024q2",
            date: "2024-Q2",
            title: "Project Kickoff & Initial Research",
            description: "Established project goals and conducted preliminary research on BVD.",
            status: "completed"
          },{
            id: "unity-development-2024q3",
            date: "2024-Q3",
            title: "Begin Unity Development",
            description: "Begin development of the Insight Diagnostic Platform in Unity.",
            status: "completed"
          },
          {
            id: "unity-pre-alpha-2025q1",
            date: "2025-Q1",
            title: "Proof of Concept Testing",
            description: "Begin proof of concept testing of the Insight Diagnostic Platform.",
            status: "completed"
          },
          {
            id: "capstone-2025q1",
            date: "2025-Q1",
            title: "Capstone Project",
            description: "The Insight Diagnostic Platform becomes the capstone project for Dylan (Anki) Carney's undergraduate degree.",
            status: "completed"
          },
          {
            id: "design-2025q1",
            date: "2025-Q2",
            title: "Design Document",
            description: "Create the design document for the Insight Diagnostic Platform.",
            status: "completed"
          },
          {
            id: "capstone-completion-2025q4",
            date: "2025-Q4",
            title: "Capstone Completion",
            description: "Anki completes his undergraduate degree with the Insight Diagnostic Platform pre-alpha as his capstone project.",
            status: "in-progress"
          },
          {
            id: "program-handoff-2025q4",
            date: "2025-Q2",
            title: "Program Handoff",
            description: "The Insight Diagnostic Platform is handed off to ENI to continue development.",
            status: "planned"
          }
        ]
      },
      futureResearch: {
        title: "Future Insight Research",
        cards: [
          {
            title: "Binocular Vision Dysfunction Dataset",
            text: "Creating and publishing a dataset of Binocular Vision Dysfunction (BVD) cases to advance research and diagnosis."
          },
          {
            title: "Vision Therapy Research",
            text: "Expanding the Insight Diagnostic Platform to include vision therapy interventions."
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