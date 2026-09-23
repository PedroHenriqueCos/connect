package br.uerj.connect.model

import jakarta.persistence.*

@Entity
@Table(name = "tb_cardapio_ru")
data class CardapioRu(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false, unique = true)
    val diaSemana: String, // 'Segunda-feira', 'Terça-feira', etc.

    @Column(nullable = false)
    val ordemDia: Int, // 1 para Segunda, 2 para Terça...

    // Almoço
    @Column(nullable = false)
    val almocoPratoPrincipal: String,
    @Column(nullable = false)
    val almocoOpcaoVegana: String,
    @Column(nullable = false)
    val almocoGuarnicao: String,
    @Column(nullable = false)
    val almocoAcompanhamentos: String,
    @Column(nullable = false)
    val almocoSalada: String,
    @Column(nullable = false)
    val almocoSobremesa: String,

    // Jantar
    @Column(nullable = false)
    val jantarPratoPrincipal: String,
    @Column(nullable = false)
    val jantarOpcaoVegana: String,
    @Column(nullable = false)
    val jantarGuarnicao: String,
    @Column(nullable = false)
    val jantarAcompanhamentos: String,
    @Column(nullable = false)
    val jantarSalada: String,
    @Column(nullable = false)
    val jantarSobremesa: String,

    // Metadados
    @Column(nullable = false)
    val auditadoPor: String = "Moderação UERJ-ZO",

    @Column(nullable = false)
    val auditadoEm: String = "Hoje às 11:00",

    @Column(nullable = false)
    val confirmacoes: Int = 0,

    @Column(nullable = false)
    val statusFila: String = "Moderada (~15 min)"
)