-- Inserir Categorias Padrão do Fórum
INSERT INTO tb_categorias (nome, descricao) VALUES 
('Geral', 'Discussões gerais sobre o cotidiano universitário'),
('RU - Bandejão', 'Avisos, cardápios e dúvidas sobre o Restaurante Universitário'),
('Estágios e Oportunidades', 'Divulgação de vagas de estágio, bolsas de IC e extensão'),
('Disciplinas e Monitoria', 'Dúvidas sobre matérias, professores e material de estudo')
ON CONFLICT (nome) DO NOTHING;

-- Inserir Usuário Inicial de Teste
INSERT INTO tb_usuarios (nome, email, matricula, senha_hash, curso) VALUES 
('Pedro Henrique', 'pedro.andrade@aluno.uerj.br', '20221000001', 'senha123', 'Ciência da Computação')
ON CONFLICT (email) DO NOTHING;