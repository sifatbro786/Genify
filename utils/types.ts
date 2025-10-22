export interface Template {
    name: string;
    slug: string;
    icon: string;
    desc: string;
    category: string;
    aiPrompt: string;
    form: Form[];
}

interface Form {
    label: string;
    field: string;
    name: string;
    required: boolean;
}

export interface UsageContextType {
    count: number;
    fetchUsage: () => void;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    subscribed: boolean;
}