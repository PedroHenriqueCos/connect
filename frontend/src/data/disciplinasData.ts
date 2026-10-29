export interface Disciplina {
  codigo: string;
  nome: string;
  periodo: number;
  categoria?: string;
  driveUrl?: string; // Link para pasta de provas/resumos da matéria
}

export const DISCIPLINAS: Disciplina[] = [
  // 1º Período
  { codigo: 'FCEE01-14886', nome: 'Construção de Algoritmos', periodo: 1 },
  { codigo: 'FCEE01-14887', nome: 'Organização de Computadores', periodo: 1 },
  { codigo: 'FCEE01-14888', nome: 'Fundamentos de Sistema de Informação', periodo: 1 },
  { codigo: 'FCEE01-14889', nome: 'Matemática Básica', periodo: 1 },
  { codigo: 'FCEE01-14890', nome: 'Construção de Páginas Web', periodo: 1 },

  // 2º Período
  { codigo: 'FCEE01-14901', nome: 'Estrutura de Dados I', periodo: 2 },
  { codigo: 'FCEE01-14902', nome: 'Matemática Discreta', periodo: 2 },
  { codigo: 'FCEE01-14903', nome: 'Modelagem de Dados', periodo: 2 },
  { codigo: 'FCEE01-14904', nome: 'Interface Homem Computador', periodo: 2 },
  { codigo: 'FCEE01-14905', nome: 'Estatística Aplicada', periodo: 2 },
  { codigo: 'FCEE01-14906', nome: 'Metodologia da Pesquisa', periodo: 2 },

  // 3º Período
  { codigo: 'FCEE01-14908', nome: 'Estrutura de Dados II', periodo: 3 },
  { codigo: 'FCEE01-14912', nome: 'Programação Orientada a Objetos I', periodo: 3 },
  { codigo: 'FCEE01-14914', nome: 'Engenharia de Software I', periodo: 3 },
  { codigo: 'FCEE01-14917', nome: 'Banco de Dados I', periodo: 3 },
  { codigo: 'FCEE01-14919', nome: 'Sistemas Operacionais', periodo: 3 },
  { codigo: 'FCEE01-15229', nome: 'Estágio Supervisionado', periodo: 3 },

  // 4º Período
  { codigo: 'FCEE01-14920', nome: 'Programação Orientada a Objetos II', periodo: 4 },
  { codigo: 'FCEE01-14921', nome: 'Engenharia de Software II', periodo: 4 },
  { codigo: 'FCEE01-14922', nome: 'Banco de Dados II', periodo: 4 },
  { codigo: 'FCEE01-14923', nome: 'Redes de Computadores', periodo: 4 },
  { codigo: 'FCEE01-14924', nome: 'Programação para Web', periodo: 4 },

  // 5º Período
  { codigo: 'FCEE01-14767', nome: 'Trabalho de Conclusão de Curso I', periodo: 5 },
  { codigo: 'FCEE01-14907', nome: 'Teste e Qualidade de Software', periodo: 5 },
  { codigo: 'FCEE01-14909', nome: 'Administração e Controle de Projetos', periodo: 5 },
  { codigo: 'FCEE01-14910', nome: 'Comunicações Móveis', periodo: 5 },
  { codigo: 'FCEE01-14925', nome: 'Programação Orientada a Objetos III', periodo: 5 },

  // 6º Período
  { codigo: 'FCEE01-14768', nome: 'Trabalho de Conclusão de Curso II', periodo: 6 },
  { codigo: 'FCEE01-14911', nome: 'Programação para Dispositivos Móveis', periodo: 6 },
  { codigo: 'FCEE01-14913', nome: 'Segurança da Informação', periodo: 6 },
  { codigo: 'FCEE01-14915', nome: 'Ética, Legislação, e Responsabilidade Social', periodo: 6 },
  { codigo: 'FCEE01-14916', nome: 'Gestão Empresarial', periodo: 6 },
  { codigo: 'FCEE01-14918', nome: 'Gestão da Tecnologia da Informação', periodo: 6 },
];