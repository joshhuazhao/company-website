import { Service } from '../types';
export const servicesData: (Omit<Service, 'icon'> & { icon: string })[] = [
  {
    id: 1,
    title: 'Custom Software Development',
    icon: 'FaCode',
    description: 'We build tailored software solutions that perfectly align with your business requirements and goals.',
    offerings: [
      'Web application development',
      'Mobile app development (iOS & Android)',
      'Desktop application development',
      'API development and integration',
      'Legacy system modernization'
    ],
    benefits: [
      'Scalable and maintainable code',
      'Agile development methodology',
      'Ongoing technical support',
      'Quality assurance and testing'
    ]
  },
  {
    id: 2,
    title: 'Cloud Solutions',
    icon: 'FaCloud',
    description: 'Migrate your business to the cloud with our comprehensive cloud infrastructure and migration services.',
    offerings: [
      'Cloud architecture design',
      'Cloud migration services',
      'Multi-cloud management',
      'DevOps and CI/CD implementation',
      'Cloud cost optimization'
    ],
    benefits: [
      'Improved scalability and flexibility',
      'Reduced infrastructure costs',
      'Enhanced security and compliance',
      'Better disaster recovery'
    ]
  },
  {
    id: 3,
    title: 'Cybersecurity Services',
    icon: 'FaShieldAlt',
    description: 'Protect your business from cyber threats with our comprehensive security solutions and services.',
    offerings: [
      'Security audits and assessments',
      'Penetration testing',
      'Security monitoring and incident response',
      'Compliance management (GDPR, HIPAA, etc.)',
      'Employee security training'
    ],
    benefits: [
      'Reduced security risks',
      'Regulatory compliance',
      'Enhanced customer trust',
      '24/7 threat monitoring'
    ]
  },
  {
    id: 4,
    title: 'Business Analytics',
    icon: 'FaChartLine',
    description: 'Transform your data into actionable insights with our advanced analytics and business intelligence services.',
    offerings: [
      'Data warehouse design and implementation',
      'Business intelligence dashboards',
      'Predictive analytics',
      'Data visualization',
      'Big data processing'
    ],
    benefits: [
      'Data-driven decision making',
      'Improved operational efficiency',
      'Better customer understanding',
      'Competitive advantage'
    ]
  }
];
