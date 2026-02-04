import { Solution } from '../types';

export const solutionsData: Solution[] = [
  {
    id: 1,
    industry: 'Healthcare',
    description: 'Comprehensive digital solutions designed to improve patient care, streamline operations, and ensure regulatory compliance in healthcare organizations.',
    challenges: [
      'Managing patient data securely',
      'Ensuring HIPAA compliance',
      'Improving patient engagement',
      'Coordinating care across multiple providers'
    ],
    approach: [
      'Electronic Health Record (EHR) integration',
      'Secure patient portal development',
      'Telemedicine platform implementation',
      'Healthcare analytics and reporting',
      'HIPAA-compliant infrastructure'
    ]
  },
  {
    id: 2,
    industry: 'Retail & E-Commerce',
    description: 'End-to-end solutions that enhance customer experience, optimize inventory management, and drive sales growth in the retail sector.',
    challenges: [
      'Managing omnichannel customer experiences',
      'Inventory optimization',
      'Increasing online conversion rates',
      'Competing with market leaders'
    ],
    approach: [
      'Custom e-commerce platform development',
      'Point of Sale (POS) system integration',
      'Inventory management systems',
      'Customer relationship management (CRM)',
      'Marketing automation tools'
    ]
  },
  {
    id: 3,
    industry: 'Financial Services',
    description: 'Secure and compliant technology solutions for banks, insurance companies, and fintech startups.',
    challenges: [
      'Regulatory compliance (PCI-DSS, SOX)',
      'Preventing fraud and security breaches',
      'Legacy system modernization',
      'Meeting customer expectations for digital services'
    ],
    approach: [
      'Secure payment processing systems',
      'Fraud detection and prevention',
      'Mobile banking applications',
      'Blockchain and cryptocurrency solutions',
      'Compliance monitoring and reporting'
    ]
  },
  {
    id: 4,
    industry: 'Manufacturing',
    description: 'Digital transformation solutions that optimize production, improve supply chain efficiency, and enable Industry 4.0 initiatives.',
    challenges: [
      'Production line optimization',
      'Supply chain visibility',
      'Equipment maintenance and downtime',
      'Quality control and compliance'
    ],
    approach: [
      'IoT sensor integration and monitoring',
      'Predictive maintenance systems',
      'Supply chain management platforms',
      'Manufacturing execution systems (MES)',
      'Quality management systems'
    ]
  }
];
