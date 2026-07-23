package br.uerj.connect.repository

import br.uerj.connect.model.Topico
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TopicoRepository : JpaRepository<Topico, Long> {
    // O Spring Data JPA já cria automaticamente métodos como findAll(), save(), findById(), deleteById()
}