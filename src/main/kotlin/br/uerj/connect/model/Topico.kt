package br.uerj.connect.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "topicos")
data class Topico(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val titulo: String,
    val conteudo: String,
    val dataCriacao: LocalDateTime = LocalDateTime.now(),

    @ManyToOne
    val autor: Usuario? = null,

    @ManyToOne
    val categoria: Categoria? = null
)