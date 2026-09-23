package br.uerj.connect.controller

import br.uerj.connect.dto.AtualizarRefeicaoRequest
import br.uerj.connect.dto.CardapioRuResponse
import br.uerj.connect.service.CardapioRuService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@Tag(name = "Restaurante Universitário (RU)", description = "Endpoints para consulta e moderação do cardápio")
@RestController
@RequestMapping("/api/ru")
@CrossOrigin(origins = ["*"])
class CardapioRuController(
    private val service: CardapioRuService
) {

    @Operation(summary = "Listar cardápio de toda a semana")
    @GetMapping("/semana")
    fun listarSemana(): ResponseEntity<List<CardapioRuResponse>> {
        return ResponseEntity.ok(service.listarSemana())
    }

    @Operation(summary = "Confirmar veracidade do cardápio de um dia")
    @PatchMapping("/{id}/confirmar")
    fun confirmarCardapio(@PathVariable id: Long): ResponseEntity<CardapioRuResponse> {
        return ResponseEntity.ok(service.confirmarCardapio(id))
    }

    @Operation(summary = "Atualizar itens de uma refeição (Moderador)")
    @PutMapping("/{id}/refeicao")
    fun atualizarRefeicao(
        @PathVariable id: Long,
        @RequestBody request: AtualizarRefeicaoRequest
    ): ResponseEntity<CardapioRuResponse> {
        return ResponseEntity.ok(service.atualizarRefeicao(id, request))
    }
}