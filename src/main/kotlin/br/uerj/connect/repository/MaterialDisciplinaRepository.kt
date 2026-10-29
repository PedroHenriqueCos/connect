package br.uerj.connect.repository

import br.uerj.connect.model.MaterialDisciplina
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface MaterialDisciplinaRepository : JpaRepository<MaterialDisciplina, Long> {
    fun findByCodigoDisciplinaOrderByDataCriacaoDesc(codigoDisciplina: String): List<MaterialDisciplina>
}