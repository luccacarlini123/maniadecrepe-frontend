export interface ClienteShowDTO {
    id: string;
    nome: string;
    email: string;
    cpfOuCnpj: string;
    tipo: string;
    telefones: string[];
    perfis: string[];
}