package br.uerj.connect.model

import jakarta.persistence.*
import java.time.LocalDateTime

enum class TipoMaterial {
    LINK,
    IMAGEM,
    DOCUMENTO
}

@Entity
@Table(name = "tb_materiais_disciplina")
data class MaterialDisciplina(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    val titulo: String,

    @Column(nullable = false, length = 1000)
    val url: String,

    @Column(columnDefinition = "TEXT")
    val descricao: String? = null,

    @Column(nullable = false)
    val codigoDisciplina: String,

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val tipo: TipoMaterial = TipoMaterial.LINK,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    val autor: Usuario,

    @Column(nullable = false)
    val dataCriacao: LocalDateTime = LocalDateTime.now()
)