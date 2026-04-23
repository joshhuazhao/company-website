import { ReactNode } from 'react';

export interface Product {
    id: number;
    firestoreId?: string;
    name: string;
    category: string;
    price: string;
    featured: boolean;
    description: string;
    features: string[];
}

export interface Service {
    id: number;
    firestoreId?: string;
    title: string;
    icon: ReactNode | string;
    description: string;
    offerings: string[];
    benefits: string[];
}

export interface Solution {
    id: number;
    firestoreId?: string;
    industry: string;
    description: string;
    challenges: string[];
    approach: string[];
}
