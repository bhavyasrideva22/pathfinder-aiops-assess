import { Question } from '@/types/assessment';

export const psychometricQuestions: Question[] = [
  {
    id: 'psych-1',
    type: 'likert',
    category: 'psychometric',
    subCategory: 'interest',
    question: 'I enjoy creating automated workflows for complex systems.',
    scale: 5
  },
  {
    id: 'psych-2',
    type: 'likert',
    category: 'psychometric',
    subCategory: 'personality',
    question: 'I prefer working on well-defined tasks rather than open-ended exploration.',
    scale: 5
  },
  {
    id: 'psych-3',
    type: 'forced-choice',
    category: 'psychometric',
    subCategory: 'motivation',
    question: 'What motivates you most about AI Ops engineering?',
    options: [
      'Building robust systems that never fail',
      'Being at the cutting edge of AI technology',
      'Solving complex technical challenges',
      'Enabling others to deploy AI solutions'
    ]
  },
  {
    id: 'psych-4',
    type: 'likert',
    category: 'psychometric',
    subCategory: 'persistence',
    question: 'I can work for hours debugging a complex system issue.',
    scale: 5
  },
  {
    id: 'psych-5',
    type: 'likert',
    category: 'psychometric',
    subCategory: 'collaboration',
    question: 'I enjoy explaining technical concepts to non-technical team members.',
    scale: 5
  },
  {
    id: 'psych-6',
    type: 'forced-choice',
    category: 'psychometric',
    subCategory: 'work-style',
    question: 'Which scenario appeals to you more?',
    options: [
      'Optimizing an existing AI pipeline for better performance',
      'Designing a completely new deployment architecture',
      'Troubleshooting production issues under pressure',
      'Researching new tools and technologies'
    ]
  }
];

export const technicalQuestions: Question[] = [
  {
    id: 'tech-1',
    type: 'multiple-choice',
    category: 'technical',
    subCategory: 'mlops',
    question: 'What is the primary purpose of a model registry in AI Ops?',
    options: [
      'To store training data',
      'To version and manage ML models',
      'To monitor model performance',
      'To deploy models to production'
    ],
    correctAnswer: 'To version and manage ML models',
    points: 10
  },
  {
    id: 'tech-2',
    type: 'multiple-choice',
    category: 'technical',
    subCategory: 'containers',
    question: 'Which Kubernetes resource is most appropriate for deploying a stateless ML model API?',
    options: [
      'StatefulSet',
      'DaemonSet',
      'Deployment',
      'Job'
    ],
    correctAnswer: 'Deployment',
    points: 10
  },
  {
    id: 'tech-3',
    type: 'multiple-choice',
    category: 'technical',
    subCategory: 'monitoring',
    question: 'What does "model drift" refer to in AI Ops?',
    options: [
      'The model moving between servers',
      'Changes in model performance over time',
      'The gradual degradation of hardware',
      'Code changes in the model implementation'
    ],
    correctAnswer: 'Changes in model performance over time',
    points: 10
  },
  {
    id: 'tech-4',
    type: 'multiple-choice',
    category: 'technical',
    subCategory: 'cicd',
    question: 'In a CI/CD pipeline for ML models, what should trigger a model redeployment?',
    options: [
      'Every code commit',
      'Model validation passing quality gates',
      'Daily schedule',
      'Manual approval only'
    ],
    correctAnswer: 'Model validation passing quality gates',
    points: 10
  },
  {
    id: 'tech-5',
    type: 'multiple-choice',
    category: 'technical',
    subCategory: 'infrastructure',
    question: 'Which tool is commonly used for monitoring ML model performance in production?',
    options: [
      'Jenkins',
      'Prometheus + Grafana',
      'Git',
      'Jupyter Notebook'
    ],
    correctAnswer: 'Prometheus + Grafana',
    points: 10
  }
];

export const wiscarQuestions: Question[] = [
  {
    id: 'wiscar-will-1',
    type: 'likert',
    category: 'wiscar',
    subCategory: 'will',
    question: 'How many hours per week do you currently spend learning about AI/ML technologies?',
    scale: 5
  },
  {
    id: 'wiscar-interest-1',
    type: 'likert',
    category: 'wiscar',
    subCategory: 'interest',
    question: 'I regularly follow AI Ops blogs, podcasts, or communities.',
    scale: 5
  },
  {
    id: 'wiscar-skill-1',
    type: 'multiple-choice',
    category: 'wiscar',
    subCategory: 'skill',
    question: 'Rate your current skill level with Docker containers:',
    options: [
      'Never used Docker',
      'Basic: Can run existing containers',
      'Intermediate: Can write Dockerfiles',
      'Advanced: Can optimize multi-stage builds',
      'Expert: Can design container architectures'
    ]
  },
  {
    id: 'wiscar-cognitive-1',
    type: 'multiple-choice',
    category: 'wiscar',
    subCategory: 'cognitive',
    question: 'A production ML model starts giving inconsistent results. What\'s your first step?',
    options: [
      'Restart the service',
      'Check recent data changes and model inputs',
      'Rollback to the previous model version',
      'Contact the data science team immediately'
    ]
  },
  {
    id: 'wiscar-ability-1',
    type: 'likert',
    category: 'wiscar',
    subCategory: 'ability',
    question: 'I actively seek feedback on my technical work and use it to improve.',
    scale: 5
  },
  {
    id: 'wiscar-real-1',
    type: 'forced-choice',
    category: 'wiscar',
    subCategory: 'realWorld',
    question: 'Which AI Ops challenge interests you most?',
    options: [
      'Scaling models to handle millions of requests',
      'Ensuring model fairness and bias detection',
      'Optimizing infrastructure costs',
      'Building robust monitoring and alerting systems'
    ]
  }
];

export const allQuestions = [...psychometricQuestions, ...technicalQuestions, ...wiscarQuestions];