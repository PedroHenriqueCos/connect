-- Inserir Categorias Padrão do Fórum (Alinhadas com o Front-end)
INSERT INTO tb_categorias (id, nome, descricao) VALUES 
(1, 'Geral', 'Discussões gerais sobre o cotidiano universitário na UERJ-ZO'),
(2, 'Estágios & Vagas', 'Divulgação de vagas de estágio, bolsas de IC, monitoria e extensão'),
(3, 'Restaurante (RU)', 'Avisos, cardápios diários e tempo de fila do RU Campo Grande'),
(4, 'Disciplinas', 'Dúvidas sobre matérias, provas antigas, resumos e grupos de estudo'),
(5, 'Avisos Acadêmicos', 'Comunicados da direção, prazos de matrícula e eventos do campus')
ON CONFLICT (id) DO UPDATE SET nome = EXCLUDED.nome, descricao = EXCLUDED.descricao;

-- Inserir Usuário Inicial de Teste
INSERT INTO tb_usuarios (id, nome, email, matricula, senha_hash, curso) VALUES 
(1, 'Pedro Henrique', 'pedro.andrade@aluno.uerj.br', '20221000001', 'senha123', 'Ciência da Computação')
ON CONFLICT (id) DO NOTHING;