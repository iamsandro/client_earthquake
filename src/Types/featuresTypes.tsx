export interface IComment {
    id: string;
    body: string;
    created_at: string;
    feature_id: string;
}
export interface IFeature {
    id: string;
    type: string;
    attributes: {
        external_id: string;
        magnitude: number;
        place: string;
        time: string;
        tsunami: Boolean;
        mag_type: string;
        title: string;
        coordinates: {
            longitude: number;
            latitude: number;
        };
    };
    links: {
        external_url: string;
    };
    comments: IComment[];
}

export interface IFeatureCard extends IFeature {
    updateFeatures: (Comment: IComment) => any;
}

export interface IFeatureResponse {
    data: IFeature[];
    pagination: {
        current_page: number;
        total: number;
        per_page: number;
    };
}
export interface IPagination {
    pages: number;
    page: number;
    total: number;
}

export interface IFeaturesLayoutProps {
    status: "loading" | "error" | null;
    features: any[];
    pagination: IPagination;
    getFeatures: (page?: number, mag_type?: string[] | string) => any;
}

export interface IFeaturesScreenState {
    status: "loading" | "error" | null;
    features: any[];
    per_page: number;
    pages: number;
    page: number;
    total: number;
    mag_type: string;
}

export interface IFeaturesSreenProps {}
