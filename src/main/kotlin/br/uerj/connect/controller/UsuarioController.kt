package br.uerj.connect.controller

import br.uerj.connect.dto.AtualizarUsuarioRequest
import br.uerj.connect.dto.UsuarioResponse
import br.uerj.connect.service.UsuarioService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(name = "Usuários", description = "Endpoints para gerenciamento do perfil do usuário")
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = ["*"])
class UsuarioController(
    private val usuarioService: UsuarioService
) {

    @Operation(summary = "Atualizar informações do perfil do aluno")
    @PutMapping("/{id}")
    fun atualizarPerfil(
        @PathVariable id: Long,
        @Valid @RequestBody request: AtualizarUsuarioRequest
    ): ResponseEntity<UsuarioResponse> {
        val usuarioAtualizado = usuarioService.atualizarPerfil(id, request)
        return ResponseEntity.ok(usuarioAtualizado)
    }

    @Operation(summary = "Promover aluno a Moderador (Requer ID do moderador solicitante)")
    @PatchMapping("/{id}/promover")
    fun concederModerador(
        @PathVariable id: Long,
        @RequestParam solicitanteId: Long
    ): ResponseEntity<UsuarioResponse> {
        val promovido = usuarioService.concederModerador(solicitanteId, id)
        return ResponseEntity.ok(promovido)
    }
}