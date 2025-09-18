import { StatusTagType } from '@/components/StatusTag'

interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  status: StatusTagType;
}

interface Timeline {
  title: string;
  milestones: Milestone[];
}

interface FutureResearchCard {
  title: string;
  text: string;
}

interface FutureResearch {
  title: string;
  cards: FutureResearchCard[];
}

interface Link {
  text: string;
  href: string;
}



interface RoadmapProgram {
  id: string;
  name: string;
  description: string;
  status?: StatusTagType;
}

export const roadmapConfig: {
  pageTitle: string;
  programs: RoadmapProgram[];
  company: {
    title: string;
    description: string;
    timeline: Timeline;
  };
  currentPrograms: {
    title: string;
    insight: {
      title: string;
      text: string;
      timeline: Timeline;
      futureResearch: FutureResearch;
      links: Link[];
    };
    ceEEG: {
      title: string;
      text: string;
      timeline: Timeline;
      futureResearch: FutureResearch;
      links: Link[];
    };
  };
} = {
  pageTitle: "Research Roadmap",
  
  programs: [
    { id: "company", name: "Company Roadmap", description: "Overall organization roadmap" },
    { id: "insight", name: "Insight Program", description: "Visual processing research program", status: "in-development" as StatusTagType },
    { id: "ceEEG", name: "Continuous Embedded Electroencephalogram", description: "Mental health data analysis platform", status: "early-research" as StatusTagType }
  ] as RoadmapProgram[],
  
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
          description: "Incorporation of the Expression Neuroscience Institute as a nonprofit public-benefit research organization.",
          status: "completed" as StatusTagType
        },
        {
          id: "submit-501c3-a162025",
          date: "April 16, 2025",
          title: "501(c)(3) Application",
          description: "Submission of the 1023-EZ 501(c)(3) application to be recognized as a public-benefit research organization by the IRS.",
          status: "completed" as StatusTagType
        },
        {
          id: "website-launch-may62025",
          date: "May 6, 2025",
          title: "Website Launch",
          description: "Launch of the ENI website to provide a platform for our research and initiatives.",
          status: "completed" as StatusTagType
        },
        {
          id: "board-meeting-a262025",
          date: "April 26, 2025",
          title: "Board Meeting",
          description: "First board meeting to discuss the future of ENI and the direction of the organization.",
          status: "completed" as StatusTagType
        },
        {
          id: "ftb-form-3500-submission-2025q2",
          date: "2025-Q2",
          title: "FTB Form 3500 Submission",
          description: "File the FTB Form 3500, Exemption Application, with the Franchise Tax Board (FTB) to be recognized as a public-benefit research organization.",
          status: "waiting-on-something" as StatusTagType
        },
        {
          id: "form-ct1-submission-2025q2",
          date: "2025-Q2",
          title: "Form CT1 Submission",
          description: "Submit the Form CT1, Initial Registration Form to the Office of the Attorney General",
          status: "waiting-on-something" as StatusTagType
        },
        {
          id: "501c3-approval-2025q3",
          date: "2025-Q3",
          title: "501(c)(3) Approval",
          description: "Receive approval from the IRS for 501(c)(3) status, allowing us to accept tax-deductible donations.",
          status: "completed" as StatusTagType
        },
        {
          id: "first-ad-campaign-2025q4",
          date: "2025-Q4",
          title: "First Ad Campaign",
          description: "Launch our first ad campaign (thanks to Google For Nonprofits Grant) to fund raise for our Insight Program.",
          status: "coming-soon" as StatusTagType
        },
        {
          id: "research-partnerships-2026q1",
          date: "2026-Q1",
          title: "Research Partnerships",
          description: "It is almost our first birthday, time to build some partnerships.",
          status: "speculative" as StatusTagType
        },
        {
          id: "irb-formation-2026q2",
          date: "2026-Q2",
          title: "IRB Formation",
          description: "We are wishing (and working) really hard to get ourselves an IRB for our first birthday!",
          status: "speculative" as StatusTagType
        }
      ]
    }
  },
  
  /* Current Programs Section */
  currentPrograms: {
    title: "Current Research Programs",
    insight: {
      title: "Insight Program",
      text: "The Insight Program focuses on developing open-source VR tools for visual processing research and Binocular Vision Dysfunction (BVD) diagnosis. This program aims to create accessible, research-grade tools that can be used by researchers and clinicians worldwide.",
      timeline: {
        title: "Insight Program Timeline",
        milestones: [
          {
            id: "kickoff-2024q2",
            date: "2024-Q2",
            title: "Project Kickoff & Initial Research",
            description: "Established project goals and conducted preliminary research on BVD.",
            status: "completed" as StatusTagType
          },{
            id: "unity-development-2024q3",
            date: "2024-Q3",
            title: "Begin Unity Development",
            description: "Begin development of the Insight Diagnostic Platform in Unity.",
            status: "completed" as StatusTagType
          },
          {
            id: "unity-pre-alpha-2025q1",
            date: "2025-Q1",
            title: "Proof of Concept Testing",
            description: "Begin proof of concept testing of the Insight Diagnostic Platform.",
            status: "completed" as StatusTagType
          },
          {
            id: "capstone-2025q1",
            date: "2025-Q1",
            title: "Capstone Project",
            description: "The Insight Diagnostic Platform becomes the capstone project for Dylan (Anki) Carney's undergraduate degree.",
            status: "completed" as StatusTagType
          },
          {
            id: "design-2025q1",
            date: "2025-Q2",
            title: "Design Document",
            description: "Create the design document for the Insight Diagnostic Platform.",
            status: "completed" as StatusTagType
          },
          {
            id: "capstone-completion-2025q4",
            date: "2025-Q4",
            title: "Capstone Completion",
            description: "Anki completes his undergraduate degree with the Insight Diagnostic Platform pre-alpha as his capstone project.",
            status: "in-progress" as StatusTagType
          },
          {
            id: "alpha-release-2026q1",
            date: "2026-Q1",
            title: "Alpha Release",
            description: "Release the first alpha version of the Insight Diagnostic Platform for testing by researchers and clinicians.",
            status: "planned" as StatusTagType
          },
          {
            id: "clinical-trials-2026q2",
            date: "2026-Q2",
            title: "Clinical Trials",
            description: "Begin clinical trials to validate the effectiveness of the Insight Diagnostic Platform for BVD diagnosis.",
            status: "planned" as StatusTagType
          },
          {
            id: "beta-release-2026q3",
            date: "2026-Q3",
            title: "Beta Release",
            description: "Release the beta version of the Insight Diagnostic Platform with improvements based on clinical trial feedback.",
            status: "planned" as StatusTagType
          },
          {
            id: "public-release-2026q4",
            date: "2026-Q4",
            title: "Public Release",
            description: "Release the first public version of the Insight Diagnostic Platform for widespread use.",
            status: "planned" as StatusTagType
          }
        ]
      },
      futureResearch: {
        title: "Future Research Directions",
        cards: [
          {
            title: "Advanced Visual Processing",
            text: "Develop more sophisticated visual processing algorithms to detect subtle visual abnormalities that may be missed by traditional diagnostic methods."
          },
          {
            title: "Multi-Modal Integration",
            text: "Integrate the Insight Platform with other diagnostic tools to provide a comprehensive assessment of visual and neurological function."
          },
          {
            title: "AI-Powered Analysis",
            text: "Implement machine learning algorithms to improve the accuracy and efficiency of BVD diagnosis and treatment planning."
          },
          {
            title: "Global Accessibility",
            text: "Make the Insight Platform available in multiple languages and optimize it for use in low-resource settings around the world."
          }
        ]
      },
      links: [
        { text: "Learn More About Insight", href: "/programs/insight" },
        { text: "View Research Papers", href: "/research" }
      ]
    },
    ceEEG: {
      title: "Continuous Embedded Electroencephalogram (ceEEG)",
      text: "The ceEEG program focuses on building open-source, non-invasive brain-computer interfaces that work for real people. We believe in transparent, secure, community-driven neurotechnology that puts users in control of their own data.",
      timeline: {
        title: "ceEEG Timeline",
        milestones: [
          {
            id: "ceEEG-community-2025q3",
            date: "2025-Q3",
            title: "Build Open BCI Community",
            description: "Unite researchers, engineers, and people with neurological conditions who believe in open, user-controlled neurotechnology.",
            status: "in-progress" as StatusTagType
          },
          {
            id: "ceEEG-principles-2025q4",
            date: "2025-Q4",
            title: "Publish Open BCI Principles",
            description: "Define community standards for ethical, transparent, and user-controlled brain-computer interfaces.",
            status: "planned" as StatusTagType
          },
          {
            id: "ceEEG-opensource-2026q1",
            date: "2026-Q1",
            title: "Release Open Source Tools",
            description: "Start with software tools for analyzing existing EEG data using transparent, modifiable algorithms.",
            status: "planned" as StatusTagType
          },
          {
            id: "ceEEG-research-2026q2",
            date: "2026-Q2",
            title: "Non-invasive Research Paper",
            description: "Publish findings on extending non-invasive EEG monitoring while maintaining user comfort and data ownership.",
            status: "planned" as StatusTagType
          },
          {
            id: "ceEEG-grants-2026q3",
            date: "2026-Q3",
            title: "Seek Ethical Funding",
            description: "Apply for grants from organizations that support open science and user privacy, not venture capital.",
            status: "planned" as StatusTagType
          },
          {
            id: "ceEEG-partnerships-2026q4",
            date: "2026-Q4",
            title: "Open Hardware Collaboration",
            description: "Partner with makerspaces and open hardware communities to prototype non-invasive monitoring solutions.",
            status: "planned" as StatusTagType
          }
        ]
      },
      futureResearch: {
        title: "Future Research Directions",
        cards: [
          {
            title: "User-Controlled Data",
            text: "Develop systems that allow users to maintain full control over their brain data while still enabling valuable research insights."
          },
          {
            title: "Comfortable Monitoring",
            text: "Create EEG monitoring solutions that can be worn comfortably for extended periods without compromising data quality."
          },
          {
            title: "Open Hardware Standards",
            text: "Establish open hardware standards for brain-computer interfaces that prioritize user privacy and data ownership."
          },
          {
            title: "Community-Driven Development",
            text: "Build a community of researchers, engineers, and users who collaborate on developing ethical neurotechnology solutions."
          }
        ]
      },
      links: [
        { text: "Learn More About ceEEG", href: "/programs/ceEEG" },
        { text: "View Research Papers", href: "/research" }
      ]
    }
  }
} 