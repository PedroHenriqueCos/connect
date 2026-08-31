package br.uerj.connect.repository

import br.uerj.connect.model.Comentario
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ComentarioRepository : JpaRepository<Comentario, Long> {
    fun findByTopicoIdOrderByDataCriacaoAsc(topicoId: Long): List<Comentario>
    fun countByTopicoId(topicoId: Long): Long
}