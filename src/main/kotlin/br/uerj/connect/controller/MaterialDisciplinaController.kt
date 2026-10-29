package br.uerj.connect.controller

import br.uerj.connect.dto.CriarMaterialRequest
import br.uerj.connect.dto.MaterialResponse
import br.uerj.connect.service.MaterialDisciplinaService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/materiais")
@CrossOrigin(origins = ["*"])
class MaterialDisciplinaController(
    private val materialService: MaterialDisciplinaService
) {

    @GetMapping
    fun listarPorDisciplina(@RequestParam disciplina: String): ResponseEntity<List<MaterialResponse>> {
        return ResponseEntity.ok(materialService.listarPorDisciplina(disciplina))
    }

    @PostMapping
    fun criarMaterial(@RequestBody req: CriarMaterialRequest): ResponseEntity<MaterialResponse> {
        return ResponseEntity.status(HttpStatus.CREATED).body(materialService.criarMaterial(req))
    }

    @DeleteMapping("/{id}")
    fun excluirMaterial(
        @PathVariable id: Long,
        @RequestParam usuarioId: Long
    ): ResponseEntity<Void> {
        materialService.excluirMaterial(id, usuarioId)
        return ResponseEntity.noContent().build()
    }
}