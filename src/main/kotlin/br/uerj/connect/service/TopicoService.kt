package br.uerj.connect.service

import br.uerj.connect.dto.CriarTopicoRequest
import br.uerj.connect.dto.TopicoResponse
import br.uerj.connect.model.Topico
import br.uerj.connect.repository.CategoriaRepository
import br.uerj.connect.repository.TopicoRepository
import br.uerj.connect.repository.UsuarioRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

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

    @Transactional
    fun deletarTopico(id: Long, solicitanteId: Long) {
        val topico = topicoRepository.findById(id).orElseThrow {
            IllegalArgumentException("Tópico não encontrado com ID: $id")
        }

        val solicitante = usuarioRepository.findById(solicitanteId).orElseThrow {
            IllegalArgumentException("Usuário solicitante não encontrado com ID: $solicitanteId")
        }

        // Verifica se o solicitante é o autor do post OU se é Moderador/Admin
        val isAutor = topico.autor.id == solicitante.id
        val isModerador = solicitante.role == "MODERADOR" || solicitante.role == "ADMIN"

        if (!isAutor && !isModerador) {
            throw IllegalStateException("Apenas o autor da postagem ou um moderador podem excluir este tópico.")
        }

        topicoRepository.delete(topico)
    }

    private fun toResponse(topico: Topico) = TopicoResponse(
        id = topico.id,
        titulo = topico.titulo,
        conteudo = topico.conteudo,
        dataCriacao = topico.dataCriacao,
        votos = topico.votos,
        nomeAutor = topico.autor.nome,
        nomeCategoria = topico.categoria.nome,
        autorId = topico.autor.id
    )
}