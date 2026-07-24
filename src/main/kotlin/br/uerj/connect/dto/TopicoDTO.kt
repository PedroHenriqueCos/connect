package br.uerj.connect.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.NotNull
import jakarta.validation.constraints.Size
import java.time.LocalDateTime

data class CriarTopicoRequest(
    @field:NotBlank(message = "O título não pode estar em branco")
    @field:Size(min = 5, max = 120, message = "O título deve ter entre 5 e 120 caracteres")
    val titulo: String,

    @field:NotBlank(message = "O conteúdo não pode ser vazio")
    val conteudo: String,

    @field:NotNull(message = "O ID do autor é obrigatório")
    val usuarioId: Long,

    @field:NotNull(message = "O ID da categoria é obrigatório")
    val categoriaId: Long
)

data class TopicoResponse(
    val id: Long,
    val titulo: String,
    val conteudo: String,
    val dataCriacao: LocalDateTime,
    val votos: Int,
    val nomeAutor: String,
    val nomeCategoria: String
)