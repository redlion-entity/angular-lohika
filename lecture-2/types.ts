export type Owner = {
    login: string
};

export type Repo = {
    name: string,
    full_name: string,
    owner: Owner
};

export type Repos = {
    items: Array<Repo>
};

export type Branch = {
    name: string
};

export type Branches = Array<Branch>;

export type SearchResult = {
    repos?: Array<Repo>,
    branches?: Branches,
    error?: boolean,
    message?: string
};