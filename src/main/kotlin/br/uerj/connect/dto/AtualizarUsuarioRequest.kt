package br.uerj.connect.dto

import jakarta.validation.constraints.NotBlank

data class AtualizarUsuarioRequest(
    @field:NotBlank(message = "O nome é obrigatório")
    val nome: String,

    @field:NotBlank(message = "O curso é obrigatório")
    val curso: String
)