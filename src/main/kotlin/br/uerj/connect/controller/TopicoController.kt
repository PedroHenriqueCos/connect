package br.uerj.connect.controller

import br.uerj.connect.dto.CriarTopicoRequest
import br.uerj.connect.dto.TopicoResponse
import br.uerj.connect.model.Topico
import br.uerj.connect.repository.TopicoRepository
import jakarta.validation.Valid
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/topicos")
@CrossOrigin(origins = ["*"]) // Libera o acesso para o Frontend HTML/JS rodando no Live Server
class TopicoController(
    private val topicoRepository: TopicoRepository
) {

    // Rota GET: Retorna a lista de todos os tópicos
    @GetMapping
    fun listarTodos(): ResponseEntity<List<TopicoResponse>> {
        val topicos = topicoRepository.findAll().map { topico ->
            TopicoResponse(
                id = topico.id,
                titulo = topico.titulo,
                conteudo = topico.conteudo
            )
        }
        return ResponseEntity.ok(topicos)
    }

    // Rota POST: Recebe um JSON do Frontend e salva um novo tópico no banco
    @PostMapping
    fun criar(@Valid @RequestBody request: CriarTopicoRequest): ResponseEntity<TopicoResponse> {
        val novoTopico = Topico(
            titulo = request.titulo,
            conteudo = request.conteudo
        )
        
        val topicoSalvo = topicoRepository.save(novoTopico)

        val response = TopicoResponse(
            id = topicoSalvo.id,
            titulo = topicoSalvo.titulo,
            conteudo = topicoSalvo.conteudo
        )

        return ResponseEntity.status(HttpStatus.CREATED).body(response)
    }
}