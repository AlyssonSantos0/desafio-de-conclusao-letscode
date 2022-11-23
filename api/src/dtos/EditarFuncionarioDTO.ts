import { Cargo, Funcionario } from "../entities/Funcionario";

export default interface EditarFuncionarioDTO {
    id: number;
    nome: string;
    cargo: Cargo;
    gerente?: Funcionario;
}