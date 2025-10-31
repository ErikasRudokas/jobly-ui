export interface Category {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryCreateRequest {
    name: string;
    description: string;
}

export interface CategoryUpdateRequest {
    name: string;
    description: string;
}

export interface GetAllCategoriesResponse {
    total: number;
    categories: Category[];
}

