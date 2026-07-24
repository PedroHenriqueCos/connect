package br.uerj.connect.controller

import br.uerj.connect.dto.CadastroUsuarioRequest
import br.uerj.connect.dto.UsuarioResponse
import br.uerj.connect.service.AutenticacaoService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(name = "Autenticação", description = "Endpoints para cadastro e gerenciamento de alunos")
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = ["*"])
class AutenticacaoController(private val authService: AutenticacaoService) {

    @Operation(summary = "Cadastrar um novo aluno no Connect UERJ")
    @PostMapping("/cadastrar")
    fun cadastrar(@Valid @RequestBody request: CadastroUsuarioRequest): ResponseEntity<UsuarioResponse> {
        val novoUsuario = authService.cadastrar(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(novoUsuario)
    }
}