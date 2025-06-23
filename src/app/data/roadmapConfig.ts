export const roadmapConfig = {
  pageTitle: "Research Roadmap",
  
  programs: [
    { id: "company", name: "Company Roadmap", description: "Overall organization roadmap" },
    { id: "insight", name: "Insight Program", description: "Visual processing research program" },
    { id: "ceEEG", name: "Continuous Embedded Electroencephalogram", description: "Mental health data analysis platform", comingSoon: true }
  ],
  
  /* Organization Roadmap */
  company: {
    title: "ENI Organization Roadmap",
    description: "Our plan for building a sustainable nonprofit research organization focused on open neuroscience research. We're working on getting our legal status sorted out and building the infrastructure to support our research programs.",
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
          title: "501(c)(3) Application",
          description: "Submission of the 1023-EZ 501(c)(3) application to be recognized as a public-benefit research organization by the IRS.",
          status: "completed"
        },
        {
          id: "website-launch-may62025",
          date: "May 6, 2025",
          title: "Website Launch",
          description: "Launch of the ENI website to provide a platform for our research and initiatives.",
          status: "completed"
        },
        {
          id: "board-meeting-a262025",
          date: "April 26, 2025",
          title: "Board Meeting",
          description: "First board meeting to discuss the future of ENI and the direction of the organization.",
          status: "completed"
        },
        {
          id: "ftb-form-3500-submission-2025q2",
          date: "2025-Q2",
          title: "FTB Form 3500 Submission",
          description: "File the FTB Form 3500, Exemption Application, with the Franchise Tax Board (FTB) to be recognized as a public-benefit research organization.",
          status: "in-progress"
        },
        {
          id: "form-ct1-submission-2025q2",
          date: "2025-Q2",
          title: "Form CT1 Submission",
          description: "Submit the Form CT1, Initial Registration Form to the Office of the Attorney General",
          status: "in-progress"
        },
        {
          id:"accept-donations-2025q2",
          date: "2025-Q2",
          title: "Accept Donations",
          description: "Start accepting donations from the public to support our research programs. Fixing the website to accept donations.",
          status: "completed"
        }
      ]
    }
  },
  
  /* Research Program Roadmaps */
  currentPrograms: {
    title: "Current Programs",
    insight: {
      title: "Insight Program",
      text: `We're building VR tools to study binocular vision dysfunction (BVD) - a condition where your eyes don't work together properly. This can cause headaches, reading problems, and other life-altering issues that get missed by regular eye exams. We think VR could make testing for this much easier and cheaper for everyone.`,
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
            status: "in-progress"
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
      text: `A platform for researchers to analyze mental health datasets and find patterns. We want to make these kinds of tools accessible to researchers who don't have big tech company budgets or machine learning expertise.`,
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
            title: "Open Mental Health Datasets",
            text: "Creating standardized, anonymized datasets for mental health research."
          },
          {
            title: "Pattern Recognition Tools",
            text: "Developing accessible tools for identifying patterns in large amounts of mental health data."
          }
        ]
      }
    }
  },

  /* Legacy Timeline Data */
  timeline: {
    title: "Timeline",
    milestones: [
    ]
  },

  /* Legacy Future Research Data */
  futureResearch: {
    title: "Future Research",
    cards: [
    ]
  }
}; 