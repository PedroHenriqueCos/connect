package br.uerj.connect.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import java.time.LocalDateTime

data class CriarComentarioRequest(
    @field:NotBlank(message = "O conteúdo do comentário não pode ser vazio")
    val conteudo: String,

    @field:NotNull(message = "O ID do autor é obrigatório")
    val usuarioId: Long
)

data class ComentarioResponse(
    val id: Long,
    val conteudo: String,
    val dataCriacao: LocalDateTime,
    val topicoId: Long,
    val autorId: Long,
    val autorNome: String,
    val autorCurso: String
)