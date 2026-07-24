package br.uerj.connect.dto

import jakarta.validation.constraints.Email
import jakarta.validation.constraints.NotBlank

data class CadastroUsuarioRequest(
    @field:NotBlank val nome: String,
    @field:Email @field:NotBlank val email: String,
    @field:NotBlank val matricula: String,
    @field:NotBlank val senha: String,
    @field:NotBlank val curso: String
)

data class LoginRequest(
    @field:Email @field:NotBlank val email: String,
    @field:NotBlank val senha: String
)

data class UsuarioResponse(
    val id: Long,
    val nome: String,
    val email: String,
    val matricula: String,
    val curso: String
)