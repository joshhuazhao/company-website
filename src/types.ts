import { ReactNode } from 'react';

export interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    featured: boolean;
    description: string;
    features: string[];
}

export interface Service {
    id: number;
    title: string;
    icon: ReactNode;
    description: string;
    offerings: string[];
    benefits: string[];
}

export interface Solution {
    id: number;
    industry: string;
    description: string;
    challenges: string[];
    approach: string[];
}
