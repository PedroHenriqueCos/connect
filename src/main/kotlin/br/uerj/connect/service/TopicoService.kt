package br.uerj.connect.service

import br.uerj.connect.dto.CriarTopicoRequest
import br.uerj.connect.dto.TopicoResponse
import br.uerj.connect.model.Topico
import br.uerj.connect.repository.CategoriaRepository
import br.uerj.connect.repository.TopicoRepository
import br.uerj.connect.repository.UsuarioRepository
import org.springframework.stereotype.Service

@Service
class TopicoService(
    private val topicoRepository: TopicoRepository,
    private val usuarioRepository: UsuarioRepository,
    private val categoriaRepository: CategoriaRepository
) {

    fun listarTodos(): List<TopicoResponse> {
        return topicoRepository.findAllByOrderByDataCriacaoDesc().map { toResponse(it) }
    }

    fun criar(request: CriarTopicoRequest): TopicoResponse {
        val autor = usuarioRepository.findById(request.usuarioId)
            .orElseThrow { IllegalArgumentException("Usuário não encontrado.") }

        val categoria = categoriaRepository.findById(request.categoriaId)
            .orElseThrow { IllegalArgumentException("Categoria não encontrada.") }

        val novoTopico = Topico(
            titulo = request.titulo,
            conteudo = request.conteudo,
            autor = autor,
            categoria = categoria
        )

        val salvo = topicoRepository.save(novoTopico)
        return toResponse(salvo)
    }

    fun votar(id: Long, valor: Int): TopicoResponse {
        val topico = topicoRepository.findById(id)
            .orElseThrow { IllegalArgumentException("Tópico não encontrado.") }

        topico.votos += valor
        val atualizado = topicoRepository.save(topico)
        return toResponse(atualizado)
    }

    private fun toResponse(topico: Topico) = TopicoResponse(
        id = topico.id,
        titulo = topico.titulo,
        conteudo = topico.conteudo,
        dataCriacao = topico.dataCriacao,
        votos = topico.votos,
        nomeAutor = topico.autor.nome,
        nomeCategoria = topico.categoria.nome
    )
}