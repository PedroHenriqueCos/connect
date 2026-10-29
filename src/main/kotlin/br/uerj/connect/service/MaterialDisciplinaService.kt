package br.uerj.connect.service

import br.uerj.connect.dto.CriarMaterialRequest
import br.uerj.connect.dto.MaterialResponse
import br.uerj.connect.dto.toResponse
import br.uerj.connect.model.MaterialDisciplina
import br.uerj.connect.model.Usuario
import br.uerj.connect.repository.MaterialDisciplinaRepository
import br.uerj.connect.repository.UsuarioRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class MaterialDisciplinaService(
    private val materialRepository: MaterialDisciplinaRepository,
    private val usuarioRepository: UsuarioRepository
) {

    fun listarPorDisciplina(codigoDisciplina: String): List<MaterialResponse> {
        return materialRepository.findByCodigoDisciplinaOrderByDataCriacaoDesc(codigoDisciplina)
            .map { it.toResponse() }
    }

    @Transactional
    fun criarMaterial(req: CriarMaterialRequest): MaterialResponse {
        val autor = usuarioRepository.findById(req.usuarioId)
            .orElseThrow { IllegalArgumentException("Utilizador não encontrado.") }

        val novoMaterial = MaterialDisciplina(
            titulo = req.titulo,
            url = req.url,
            descricao = req.descricao,
            codigoDisciplina = req.codigoDisciplina,
            tipo = req.tipo,
            autor = autor
        )

        return materialRepository.save(novoMaterial).toResponse()
    }

    @Transactional
    fun excluirMaterial(materialId: Long, solicitanteId: Long) {
        val material = materialRepository.findById(materialId)
            .orElseThrow { IllegalArgumentException("Material não encontrado.") }

        val solicitante = usuarioRepository.findById(solicitanteId)
            .orElseThrow { IllegalArgumentException("Utilizador solicitante não encontrado.") }

        val isAutor = material.autor.id == solicitante.id
        val isModerador = solicitante.role.equals("MODERADOR", ignoreCase = true) || 
                          solicitante.role.equals("ADMIN", ignoreCase = true)

        if (!isAutor && !isModerador) {
            throw IllegalStateException("Apenas o autor ou moderador podem eliminar este material.")
        }

        materialRepository.delete(material)
    }
}