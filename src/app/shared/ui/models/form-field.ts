export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'email' | 'password';
    required?: boolean;
    placeholder?: string;
}