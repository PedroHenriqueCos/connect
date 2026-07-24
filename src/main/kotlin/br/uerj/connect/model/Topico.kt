package br.uerj.connect.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "tb_topicos")
data class Topico(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val titulo: String,

    @Column(columnDefinition = "TEXT", nullable = false)
    val conteudo: String,

    @Column(nullable = false)
    val dataCriacao: LocalDateTime = LocalDateTime.now(),

    @Column(nullable = false)
    var votos: Int = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    val autor: Usuario,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    val categoria: Categoria
)