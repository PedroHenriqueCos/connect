package br.uerj.connect.service

import br.uerj.connect.dto.ComentarioResponse
import br.uerj.connect.dto.CriarComentarioRequest
import br.uerj.connect.model.Comentario
import br.uerj.connect.repository.ComentarioRepository
import br.uerj.connect.repository.TopicoRepository
import br.uerj.connect.repository.UsuarioRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ComentarioService(
    private val comentarioRepository: ComentarioRepository,
    private val topicoRepository: TopicoRepository,
    private val usuarioRepository: UsuarioRepository
) {

    fun listarPorTopico(topicoId: Long): List<ComentarioResponse> {
        return comentarioRepository.findByTopicoIdOrderByDataCriacaoAsc(topicoId).map { it.toResponse() }
    }

    @Transactional
    fun criarComentario(topicoId: Long, request: CriarComentarioRequest): ComentarioResponse {
        val topico = topicoRepository.findById(topicoId)
            .orElseThrow { RuntimeException("Tópico não encontrado com ID: $topicoId") }

        val usuario = usuarioRepository.findById(request.usuarioId)
            .orElseThrow { RuntimeException("Usuário não encontrado com ID: ${request.usuarioId}") }

        val comentario = Comentario(
            conteudo = request.conteudo,
            topico = topico,
            usuario = usuario
        )

        val salvo = comentarioRepository.save(comentario)
        return salvo.toResponse()
    }

    @Transactional
    fun deletarComentario(comentarioId: Long) {
        if (!comentarioRepository.existsById(comentarioId)) {
            throw RuntimeException("Comentário não encontrado com ID: $comentarioId")
        }
        comentarioRepository.deleteById(comentarioId)
    }

    private fun Comentario.toResponse() = ComentarioResponse(
        id = this.id,
        conteudo = this.conteudo,
        dataCriacao = this.dataCriacao,
        topicoId = this.topico.id,
        autorId = this.usuario.id,
        autorNome = this.usuario.nome,
        autorCurso = this.usuario.curso
    )
}