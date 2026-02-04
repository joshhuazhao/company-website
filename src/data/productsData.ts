import { Product } from '../types';

export const productsData: Product[] = [
  {
    id: 1,
    name: 'Enterprise Suite',
    category: 'Software',
    price: '$999/mo',
    featured: true,
    description: 'Comprehensive business management solution for large organizations.',
    features: [
      'Advanced analytics and reporting',
      'Multi-user collaboration',
      'Cloud-based infrastructure',
      '24/7 premium support',
      'Custom integrations'
    ]
  },
  {
    id: 2,
    name: 'Pro Platform',
    category: 'Software',
    price: '$499/mo',
    featured: true,
    description: 'Professional-grade platform for growing businesses.',
    features: [
      'Real-time data synchronization',
      'API access',
      'Advanced security features',
      'Mobile app included',
      'Email support'
    ]
  },
  {
    id: 3,
    name: 'Starter Pack',
    category: 'Software',
    price: '$99/mo',
    featured: false,
    description: 'Perfect solution for startups and small teams.',
    features: [
      'Core features included',
      'Up to 10 users',
      'Basic reporting',
      'Community support',
      'Monthly updates'
    ]
  },
  {
    id: 4,
    name: 'Analytics Dashboard',
    category: 'Analytics',
    price: '$299/mo',
    featured: false,
    description: 'Powerful analytics and visualization tools for data-driven decisions.',
    features: [
      'Real-time data visualization',
      'Custom dashboards',
      'Export capabilities',
      'Predictive analytics',
      'Integration ready'
    ]
  },
  {
    id: 5,
    name: 'Security Shield',
    category: 'Security',
    price: '$399/mo',
    featured: true,
    description: 'Enterprise-grade security solution to protect your business.',
    features: [
      'Advanced threat detection',
      'Real-time monitoring',
      'Automated backups',
      'Compliance management',
      'Security audits'
    ]
  },
  {
    id: 6,
    name: 'Cloud Storage Pro',
    category: 'Storage',
    price: '$149/mo',
    featured: false,
    description: 'Secure and scalable cloud storage solution.',
    features: [
      '5TB storage space',
      'File versioning',
      'Team collaboration',
      'Advanced encryption',
      'Cross-platform access'
    ]
  }
];
