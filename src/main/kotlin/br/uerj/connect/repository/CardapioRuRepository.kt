package br.uerj.connect.repository

import br.uerj.connect.model.CardapioRu
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface CardapioRuRepository : JpaRepository<CardapioRu, Long> {
    fun findAllByOrderByOrdemDiaAsc(): List<CardapioRu>
    fun findByDiaSemana(diaSemana: String): Optional<CardapioRu>
}