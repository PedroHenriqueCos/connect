package br.uerj.connect.model

import jakarta.persistence.*

@Entity
@Table(name = "tb_categorias")
data class Categoria(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, unique = true)
    val nome: String,

    @Column(nullable = false)
    val descricao: String
)