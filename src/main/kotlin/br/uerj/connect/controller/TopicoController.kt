package br.uerj.connect.controller

import br.uerj.connect.dto.CriarTopicoRequest
import br.uerj.connect.dto.TopicoResponse
import br.uerj.connect.service.TopicoService
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/topicos")
@CrossOrigin(origins = ["*"])
class TopicoController(
    private val topicoService: TopicoService
) {

    @GetMapping
    fun listar(): ResponseEntity<List<TopicoResponse>> {
        val topicos = topicoService.listarTodos()
        return ResponseEntity.ok(topicos)
    }

    @PostMapping
    fun criar(@Valid @RequestBody request: CriarTopicoRequest): ResponseEntity<TopicoResponse> {
        val novoTopico = topicoService.criar(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(novoTopico)
    }

    @PatchMapping("/{id}/votar")
    fun votar(
        @PathVariable id: Long,
        @RequestParam(defaultValue = "1") valor: Int
    ): ResponseEntity<TopicoResponse> {
        val topicoAtualizado = topicoService.votar(id, valor)
        return ResponseEntity.ok(topicoAtualizado)
    }

    @DeleteMapping("/{id}")
    fun deletarTopico(@PathVariable id: Long): ResponseEntity<Void> {
        topicoService.deletarTopico(id)
        return ResponseEntity.noContent().build()
    }
}