package br.uerj.connect.model

import jakarta.persistence.*

@Entity
@Table(name = "categorias")
data class Categoria(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val nome: String,
    val descricao: String
)