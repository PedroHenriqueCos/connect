package br.uerj.connect.repository

import br.uerj.connect.model.Usuario
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface UsuarioRepository : JpaRepository<Usuario, Long> {
    fun findByEmail(email: String): Usuario?
    fun existsByEmailOrMatricula(email: String, matricula: String): Boolean
}