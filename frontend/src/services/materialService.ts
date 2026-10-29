export interface MaterialDisciplina {
  id: number;
  titulo: string;
  url: string;
  descricao?: string;
  codigoDisciplina: string;
  tipo: 'LINK' | 'IMAGEM' | 'DOCUMENTO';
  autorId: number;
  nomeAutor: string;
  dataCriacao: string;
}

export interface CriarMaterialPayload {
  titulo: string;
  url: string;
  descricao?: string;
  codigoDisciplina: string;
  tipo: 'LINK' | 'IMAGEM' | 'DOCUMENTO';
  usuarioId: number;
}

const API_MATERIAIS_URL = 'http://localhost:8080/api/materiais';
const API_UPLOADS_URL = 'http://localhost:8080/api/uploads';

export const materialService = {
  async listarPorDisciplina(codigoDisciplina: string): Promise<MaterialDisciplina[]> {
    const response = await fetch(`${API_MATERIAIS_URL}?disciplina=${encodeURIComponent(codigoDisciplina)}`);
    if (!response.ok) {
      throw new Error('Falha ao carregar materiais da disciplina.');
    }
    return response.json();
  },

  async criarMaterial(payload: CriarMaterialPayload): Promise<MaterialDisciplina> {
    const response = await fetch(API_MATERIAIS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Falha ao publicar material.');
    }
    return response.json();
  },

  async excluirMaterial(materialId: number, usuarioId: number): Promise<void> {
    const response = await fetch(`${API_MATERIAIS_URL}/${materialId}?usuarioId=${usuarioId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Falha ao eliminar material ou sem permissão.');
    }
  },

  async fazerUploadArquivo(arquivo: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', arquivo);

    const response = await fetch(API_UPLOADS_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Falha ao enviar ficheiro para o servidor.');
    }

    const data = await response.json();
    return data.url;
  },
};