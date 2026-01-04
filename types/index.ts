// Type definitions for Portfolio CMS

export interface Project {
  id?: string;
  title: string;
  subtitle: string;
  imgSrc: string;
  url: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Experience {
  id?: string;
  company: string;
  position: string;
  period: string;
  order: number;
}

export interface AboutData {
  id?: string;
  name: string;
  role: string;
  description: string;
  experiences: Experience[];
  updatedAt?: Date;
}

export interface HeroData {
  id?: string;
  name: string;
  role: string;
  description: string;
  availableStatus: boolean;
  updatedAt?: Date;
}

export interface ContactLink {
  id?: string;
  type: 'cv' | 'linkedin' | 'email';
  label: string;
  url: string;
  order: number;
}

export interface ContactData {
  id?: string;
  links: ContactLink[];
  updatedAt?: Date;
}

