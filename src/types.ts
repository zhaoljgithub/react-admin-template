export enum Role {
    user = 'user',
    assistant = 'assistant',
    system = 'system'
}

export interface Message {
    id: string;
    // Formatted by HLJS + misc formatting
    content: string;
    // Raw content from OpenAI
    rawContent: string;
    role: Role;
    isError?: boolean;
    createdAt: string | number;
    updatedAt?: string | number;
    // If this is a user message that uses code selected from the editor
    questionCode?: string;
    // For continuing conversations
    parentMessageId?: string;
    // For streaming responses
    done?: boolean | null;
}

export interface Conversation {
    id: string;
    createdAt: string | number;
    inProgress: boolean;
    messages: Message[];
    title?: string;
    history?: Array<Array<string>>;
    autoscroll?: boolean;
}

export interface queryStreamParams {
    query?: string;
    knowledge_base_name?: string;
    local_doc_url?: boolean;
    top_k?: number;
    history?: Array<{ role: string; content: string }>;
    stream?: boolean;
    prompt?: string;
    messages?: Array<{ role: string; content: string }>;
}

export interface ProviderItem {
    providerHostname: string
    providerId: string
    providerName: string
    providerType: number
    account: string;
    isDefault?: number
}

export interface ProjectItem {
    gitProjectId: string
    projectId: string
    projectName: string
    newestCommitId: string
    syncStatus: number
    checked: boolean;
    vectorStatus: number
    needSync: boolean
    indexStatus: number
}