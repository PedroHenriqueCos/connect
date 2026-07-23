package br.uerj.connect.dto

import jakarta.validation.constraints.NotBlank
import jakarta.validation.constraints.Size

data class CriarTopicoRequest(
    @field:NotBlank(message = "O título não pode estar em branco")
    @field:Size(min = 5, max = 100, message = "O título deve ter entre 5 e 100 caracteres")
    val titulo: String,

    @field:NotBlank(message = "O conteúdo não pode estar em branco")
    val conteudo: String
)

data class TopicoResponse(
    val id: Long?,
    val titulo: String,
    val conteudo: String
)