const API_BASE_URL = 'http://localhost:8080/api';

export interface TopicoResponse {
  id: number;
  titulo: string;
  conteudo: string;
  dataCriacao: string;
  votos: number;
  nomeAutor: string;
  nomeCategoria: string;
}

export interface CriarTopicoPayload {
  titulo: string;
  conteudo: string;
  usuarioId: number;
  categoriaId: number;
}

export interface ComentarioResponse {
  id: number;
  conteudo: string;
  dataCriacao: string;
  topicoId: number;
  autorId: number;
  autorNome: string;
  autorCurso: string;
}

export interface CriarComentarioPayload {
  conteudo: string;
  usuarioId: number;
}

export const CATEGORY_MAP: Record<string, number> = {
  'Geral': 1,
  'Estágios & Vagas': 2,
  'Restaurante (RU)': 3,
  'Disciplinas': 4,
  'Avisos Acadêmicos': 5,
};

export const api = {
  // Listar todos os tópicos
  async getTopicos(): Promise<TopicoResponse[]> {
    const response = await fetch(`${API_BASE_URL}/topicos`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar tópicos: ${response.statusText}`);
    }
    return response.json();
  },

  // Criar um novo tópico
  async criarTopico(payload: CriarTopicoPayload): Promise<TopicoResponse> {
    const response = await fetch(`${API_BASE_URL}/topicos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar tópico: ${response.statusText}`);
    }
    return response.json();
  },

  // Votar em um tópico (Upvote / Curtida)
  async votarTopico(id: number, valor: number): Promise<TopicoResponse> {
    const response = await fetch(`${API_BASE_URL}/topicos/${id}/votar?valor=${valor}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error(`Erro ao votar no tópico: ${response.statusText}`);
    }
    return response.json();
  },

  // Listar comentários de um tópico
  async getComentarios(topicoId: number): Promise<ComentarioResponse[]> {
    const response = await fetch(`${API_BASE_URL}/topicos/${topicoId}/comentarios`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar comentários: ${response.statusText}`);
    }
    return response.json();
  },

  // Enviar novo comentário
  async criarComentario(topicoId: number, payload: CriarComentarioPayload): Promise<ComentarioResponse> {
    const response = await fetch(`${API_BASE_URL}/topicos/${topicoId}/comentarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar comentário: ${response.statusText}`);
    }
    return response.json();
  },

  // Deletar um tópico
  async deletarTopico(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/topicos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Erro ao deletar tópico: ${response.statusText}`);
    }
  },

  // Deletar um comentário
  async deletarComentario(topicoId: number, comentarioId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/topicos/${topicoId}/comentarios/${comentarioId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Erro ao deletar comentário: ${response.statusText}`);
    }
  }
};

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  curso: string;
}

export interface CadastroData {
  nome: string;
  email: string;
  matricula: string;
  senha: string;
  curso: string;
}

export interface LoginData {
  email: string;
  senha: string;
}

// Funções de Autenticação
export async function cadastrarUsuario(dados: CadastroData): Promise<Usuario> {
  const response = await fetch('http://localhost:8080/api/auth/cadastrar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || 'Erro ao realizar cadastro.');
  }

  return response.json();
}

export async function loginUsuario(dados: LoginData): Promise<Usuario> {
  const response = await fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const errorMsg = await response.text();
    throw new Error(errorMsg || 'E-mail ou senha incorretos.');
  }

  return response.json();
};