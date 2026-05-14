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
    microneedleEeg: {
      title: string;
      text: string;
      timeline: Timeline;
      futureResearch: FutureResearch;
      links: Link[];
    };
  };
} = {
  pageTitle: 'Research Roadmap',

  programs: [
    { id: 'company', name: 'Organization', description: 'Overall organization roadmap' },
    {
      id: 'microneedle-eeg',
      name: 'Microneedle Array EEG',
      description: 'Open-source, gel-free EEG headset — designed in public',
      status: 'early-research' as StatusTagType,
    },
  ],

  company: {
    title: 'ENI organization roadmap',
    description:
      "How we're building the sustainable, public-benefit research org that the microneedle EEG project lives inside.",
    timeline: {
      title: 'Organization timeline',
      milestones: [
        {
          id: 'founding-a142025',
          date: 'April 14, 2025',
          title: 'Organization founded',
          description:
            'Expression Neuroscience Institute is incorporated as a nonprofit public-benefit research organization.',
          status: 'completed' as StatusTagType,
        },
        {
          id: 'submit-501c3-a162025',
          date: 'April 16, 2025',
          title: '501(c)(3) application submitted',
          description: 'Submitted the 1023-EZ to the IRS for public-benefit recognition.',
          status: 'completed' as StatusTagType,
        },
        {
          id: 'board-meeting-a262025',
          date: 'April 26, 2025',
          title: 'First board meeting',
          description:
            'Discussed organizational direction and committed to working fully in the open.',
          status: 'completed' as StatusTagType,
        },
        {
          id: 'website-launch-may62025',
          date: 'May 6, 2025',
          title: 'Website launched',
          description: 'A public home for our research, lab notes, and governance.',
          status: 'completed' as StatusTagType,
        },
        {
          id: 'ftb-form-3500-submission-2025q2',
          date: '2025-Q2',
          title: 'FTB Form 3500',
          description:
            'File the FTB Form 3500 (Exemption Application) with the California Franchise Tax Board.',
          status: 'waiting-on-something' as StatusTagType,
        },
        {
          id: 'form-ct1-submission-2025q2',
          date: '2025-Q2',
          title: 'Form CT-1 registration',
          description: 'Initial Registration Form filed with the CA Office of the Attorney General.',
          status: 'waiting-on-something' as StatusTagType,
        },
        {
          id: '501c3-approval-2025q3',
          date: '2025-Q3',
          title: '501(c)(3) approval',
          description:
            'Received IRS determination — we can now receive tax-deductible donations.',
          status: 'completed' as StatusTagType,
        },
        {
          id: 'site-refresh-2026q1',
          date: '2026-Q2',
          title: 'Site refresh + microneedle-EEG focus',
          description:
            'Refocused the site, hardened security, and made microneedle-array EEG the public research focus.',
          status: 'in-progress' as StatusTagType,
        },
        {
          id: 'irb-formation-2026q2',
          date: '2026-Q2',
          title: 'IRB formation',
          description:
            'Set up an Institutional Review Board so any future human-subject testing of microneedle electrodes is properly overseen.',
          status: 'speculative' as StatusTagType,
        },
        {
          id: 'research-partnerships-2026q1',
          date: '2026-Q1',
          title: 'Research partnerships',
          description:
            'Build collaborations with university labs and open-hardware communities working on dry electrodes.',
          status: 'speculative' as StatusTagType,
        },
      ],
    },
  },

  currentPrograms: {
    title: 'Current research program',
    microneedleEeg: {
      title: 'Microneedle Array EEG',
      text: "Our entire research focus right now: an open-source, gel-free EEG headset built on microneedle electrodes. The program is unfunded; the goal is to publish a credible, well-documented design path that anyone can pick up, criticize, and improve.",
      timeline: {
        title: 'Microneedle EEG timeline',
        milestones: [
          {
            id: 'mneeg-literature-2025q4',
            date: '2025-Q4',
            title: 'Literature review',
            description:
              'Survey published microneedle geometries, materials, and impedance results. Publish a plain-language summary.',
            status: 'in-progress' as StatusTagType,
          },
          {
            id: 'mneeg-cad-2026q1',
            date: '2026-Q1',
            title: 'Open headband CAD v0',
            description:
              'Release a first 4-channel headband CAD with swappable electrode modules under a permissive license.',
            status: 'planned' as StatusTagType,
          },
          {
            id: 'mneeg-bench-2026q2',
            date: '2026-Q2',
            title: 'Bench characterization',
            description:
              'Saline-phantom impedance and noise testing vs. conventional wet Ag/AgCl electrodes.',
            status: 'planned' as StatusTagType,
          },
          {
            id: 'mneeg-irb-2026q3',
            date: '2026-Q3',
            title: 'IRB + funding',
            description:
              'Secure ethical funding and IRB approval before any human-subject pilot work.',
            status: 'speculative' as StatusTagType,
          },
          {
            id: 'mneeg-pilot-2026q4',
            date: '2026-Q4',
            title: 'Small in-lab pilot',
            description:
              'With consenting participants, gather comfort and signal-quality data and publish the dataset.',
            status: 'speculative' as StatusTagType,
          },
        ],
      },
      futureResearch: {
        title: 'Open questions we want to chase',
        cards: [
          {
            title: 'Manufacturable geometries',
            text: 'Which microneedle shapes deliver the lowest impedance while being printable / moldable in a hobbyist-friendly process?',
          },
          {
            title: 'Comfort for ND wearers',
            text: 'Sensory feedback from neurodivergent users on real wear time — materials, fit, weight, and pressure.',
          },
          {
            title: 'On-device signal processing',
            text: 'Open algorithms that run locally on a microcontroller — no cloud, no opaque pipelines, no surprises.',
          },
          {
            title: 'Consent-first data governance',
            text: 'Public, machine-readable consent records so participants always know where their data is and can pull it back.',
          },
        ],
      },
      links: [
        { text: 'Read the program brief', href: '/programs/microneedle-eeg' },
        { text: 'Browse on GitHub', href: 'https://github.com/expressionneuroscienceinstitute' },
      ],
    },
  },
}
