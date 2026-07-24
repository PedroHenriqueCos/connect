package br.uerj.connect.model

import jakarta.persistence.*

@Entity
@Table(name = "tb_usuarios")
data class Usuario(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val nome: String,

    @Column(nullable = false, unique = true)
    val email: String,

    @Column(nullable = false, unique = true)
    val matricula: String,

    @Column(nullable = false)
    val senhaHash: String,

    @Column(nullable = false)
    val curso: String
)