package br.uerj.connect.dto

data class RefeicaoDto(
    val mainDish: String,
    val veganOption: String,
    val garnish: String,
    val sideDishes: String,
    val salad: String,
    val dessert: String
)

data class CardapioRuResponse(
    val id: Long,
    val day: String,
    val order: Int,
    val lunch: RefeicaoDto,
    val dinner: RefeicaoDto,
    val lastUpdatedBy: String,
    val lastUpdatedAt: String,
    val confirmations: Int,
    val queueStatus: String
)

data class AtualizarRefeicaoRequest(
    val mealType: String, // "lunch" ou "dinner"
    val mainDish: String,
    val veganOption: String,
    val garnish: String,
    val dessert: String,
    val updatedBy: String
)