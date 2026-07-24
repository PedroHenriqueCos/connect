package br.uerj.connect.controller

import br.uerj.connect.dto.CriarTopicoRequest
import br.uerj.connect.dto.TopicoResponse
import br.uerj.connect.service.TopicoService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(name = "Tópicos do Fórum", description = "Endpoints para criação, listagem e votação de tópicos (estilo Reddit)")
@RestController
@RequestMapping("/api/topicos")
@CrossOrigin(origins = ["*"])
class TopicoController(private val topicoService: TopicoService) {

    @Operation(summary = "Listar todos os tópicos ordenados por data de criação")
    @GetMapping
    fun listarTodos(): ResponseEntity<List<TopicoResponse>> {
        return ResponseEntity.ok(topicoService.listarTodos())
    }

    @Operation(summary = "Criar um novo tópico no fórum")
    @PostMapping
    fun criar(@Valid @RequestBody request: CriarTopicoRequest): ResponseEntity<TopicoResponse> {
        val topicoCriado = topicoService.criar(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(topicoCriado)
    }

    @Operation(summary = "Votar em um tópico (Upvote = +1 / Downvote = -1)")
    @PatchMapping("/{id}/votar")
    fun votar(
        @PathVariable id: Long,
        @RequestParam valor: Int
    ): ResponseEntity<TopicoResponse> {
        return ResponseEntity.ok(topicoService.votar(id, valor))
    }
}