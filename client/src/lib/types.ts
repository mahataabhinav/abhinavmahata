export interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    projectUrl?: string | null;
    repoUrl?: string | null;
    featured?: boolean;
    createdAt: Date;
    tags?: string[];
}

export interface InsertMessage {
    name: string;
    email: string;
    message: string;
}

export interface LandingConfig {
    videoUrl?: string;
    showVideo?: boolean;
    heroTitle?: string;
    heroSubtitle?: string;
}
