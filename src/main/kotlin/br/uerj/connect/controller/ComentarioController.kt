package br.uerj.connect.controller

import br.uerj.connect.dto.ComentarioResponse
import br.uerj.connect.dto.CriarComentarioRequest
import br.uerj.connect.service.ComentarioService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/topicos/{topicoId}/comentarios")
@CrossOrigin(origins = ["*"])
class ComentarioController(
    private val comentarioService: ComentarioService
) {

    @GetMapping
    fun listarComentarios(@PathVariable topicoId: Long): ResponseEntity<List<ComentarioResponse>> {
        val comentarios = comentarioService.listarPorTopico(topicoId)
        return ResponseEntity.ok(comentarios)
    }

    @PostMapping
    fun criarComentario(
        @PathVariable topicoId: Long,
        @Valid @RequestBody request: CriarComentarioRequest
    ): ResponseEntity<ComentarioResponse> {
        val novoComentario = comentarioService.criarComentario(topicoId, request)
        return ResponseEntity.status(HttpStatus.CREATED).body(novoComentario)
    }

    @DeleteMapping("/{comentarioId}")
    fun deletarComentario(
        @PathVariable topicoId: Long,
        @PathVariable comentarioId: Long
    ): ResponseEntity<Void> {
        comentarioService.deletarComentario(comentarioId)
        return ResponseEntity.noContent().build()
    }
}