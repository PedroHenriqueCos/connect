package br.uerj.connect.service

import br.uerj.connect.dto.AtualizarRefeicaoRequest
import br.uerj.connect.dto.CardapioRuResponse
import br.uerj.connect.dto.RefeicaoDto
import br.uerj.connect.model.CardapioRu
import br.uerj.connect.repository.CardapioRuRepository
import jakarta.annotation.PostConstruct
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CardapioRuService(
    private val repository: CardapioRuRepository
) {

    @PostConstruct
    fun initData() {
        if (repository.count() == 0L) {
            val lista = listOf(
                CardapioRu(
                    diaSemana = "Segunda-feira",
                    ordemDia = 1,
                    almocoPratoPrincipal = "Frango Grelhado ao Molho de Ervas",
                    almocoOpcaoVegana = "Proteína de Soja Refogada com Milho e Ervilha",
                    almocoGuarnicao = "Purê de Batata",
                    almocoAcompanhamentos = "Arroz Branco / Integral e Feijão Preto",
                    almocoSalada = "Alface Crespa, Tomate e Cenoura Ralada",
                    almocoSobremesa = "Laranja ou Melancia",
                    jantarPratoPrincipal = "Carne Moída à Bolonhesa",
                    jantarOpcaoVegana = "Lentilha com Legumes ao Curry",
                    jantarGuarnicao = "Macarrão Parafuso",
                    jantarAcompanhamentos = "Arroz Branco e Feijão Carioca",
                    jantarSalada = "Repolho Bicolor e Beterraba Cozida",
                    jantarSobremesa = "Maçã",
                    auditadoPor = "Pedro H. (Moderação Connect UERJ-ZO)",
                    auditadoEm = "Hoje às 11:20",
                    confirmacoes = 24,
                    statusFila = "Moderada (~15 min)"
                ),
                CardapioRu(
                    diaSemana = "Terça-feira",
                    ordemDia = 2,
                    almocoPratoPrincipal = "Isca de Carne Acebolada",
                    almocoOpcaoVegana = "Estrogonofe de Grão-de-Bico com Cogumelos",
                    almocoGuarnicao = "Batata Rústica Assada com Alecrim",
                    almocoAcompanhamentos = "Arroz Branco / Integral e Feijão Carioca",
                    almocoSalada = "Mix de Folhas e Pepino Japonês",
                    almocoSobremesa = "Banana",
                    jantarPratoPrincipal = "Filé de Peito de Frango Empanado no Forno",
                    jantarOpcaoVegana = "Quibe Assado de Abóbora com Quinoa",
                    jantarGuarnicao = "Legumes Salteados na Manteiga de Ervas",
                    jantarAcompanhamentos = "Arroz Branco e Feijão Preto",
                    jantarSalada = "Acelga e Tomate Cereja",
                    jantarSobremesa = "Tangerina",
                    auditadoPor = "Moderação Acadêmica ZO",
                    auditadoEm = "Ontem às 18:00",
                    confirmacoes = 12,
                    statusFila = "Rápida (< 5 min)"
                ),
                CardapioRu(
                    diaSemana = "Quarta-feira",
                    ordemDia = 3,
                    almocoPratoPrincipal = "Feijoada Tradicional UERJ",
                    almocoOpcaoVegana = "Feijoada Vegana (Tofu Defumado e Legumes)",
                    almocoGuarnicao = "Couve Refogada no Alho e Farofa Crocante",
                    almocoAcompanhamentos = "Arroz Branco / Integral e Laranja Fatiada",
                    almocoSalada = "Vinagrete Especial e Rúcula",
                    almocoSobremesa = "Doce de Fruta ou Fruta da Estação",
                    jantarPratoPrincipal = "Sobrecoxa Assada com Ervas Finas",
                    jantarOpcaoVegana = "Almôndegas de Lentilha ao Sugo",
                    jantarGuarnicao = "Polenta Cremosa",
                    jantarAcompanhamentos = "Arroz Branco e Feijão Preto",
                    jantarSalada = "Alface Americana e Cenoura",
                    jantarSobremesa = "Goiaba",
                    auditadoPor = "Moderação Acadêmica ZO",
                    auditadoEm = "Há 2 dias",
                    confirmacoes = 19,
                    statusFila = "Longa (> 25 min)"
                ),
                CardapioRu(
                    diaSemana = "Quinta-feira",
                    ordemDia = 4,
                    almocoPratoPrincipal = "Carne Assada ao Molho Madeira",
                    almocoOpcaoVegana = "Moqueca de Palmito com Banana da Terra",
                    almocoGuarnicao = "Arroz à Piamontese / Arroz Integral",
                    almocoAcompanhamentos = "Feijão Carioca",
                    almocoSalada = "Salada Colorida com Manga",
                    almocoSobremesa = "Melão Fatiado",
                    jantarPratoPrincipal = "Cubos de Frango com Legumes",
                    jantarOpcaoVegana = "Yakisoba de Legumes e Tofu Grelhado",
                    jantarGuarnicao = "Arroz Primavera",
                    jantarAcompanhamentos = "Feijão Preto",
                    jantarSalada = "Chicória e Beterraba Ralada",
                    jantarSobremesa = "Pera",
                    auditadoPor = "Moderação Acadêmica ZO",
                    auditadoEm = "Há 3 dias",
                    confirmacoes = 8,
                    statusFila = "Moderada (~15 min)"
                ),
                CardapioRu(
                    diaSemana = "Sexta-feira",
                    ordemDia = 5,
                    almocoPratoPrincipal = "Peixe Assado com Crosta de Ervas",
                    almocoOpcaoVegana = "Bobó de Cogumelos e Mandioca",
                    almocoGuarnicao = "Pirão de Peixe / Legumes no Vapor",
                    almocoAcompanhamentos = "Arroz Branco / Integral e Feijão Preto",
                    almocoSalada = "Alface, Agrião e Tomate",
                    almocoSobremesa = "Abacaxi",
                    jantarPratoPrincipal = "Iscas de Frango Grelhadas",
                    jantarOpcaoVegana = "Hambúrguer de Grão-de-Bico",
                    jantarGuarnicao = "Batata Doce Assada",
                    jantarAcompanhamentos = "Arroz Branco e Feijão Carioca",
                    jantarSalada = "Salada Verde Especial",
                    jantarSobremesa = "Laranja",
                    auditadoPor = "Moderação Acadêmica ZO",
                    auditadoEm = "Há 4 dias",
                    confirmacoes = 15,
                    statusFila = "Rápida (< 5 min)"
                )
            )
            repository.saveAll(lista)
        }
    }

    fun listarSemana(): List<CardapioRuResponse> {
        return repository.findAllByOrderByOrdemDiaAsc().map { toResponse(it) }
    }

    @Transactional
    fun confirmarCardapio(id: Long): CardapioRuResponse {
        val item = repository.findById(id).orElseThrow {
            IllegalArgumentException("Dia do cardápio não encontrado com ID: $id")
        }
        val atualizado = item.copy(confirmacoes = item.confirmacoes + 1)
        val salvo = repository.save(atualizado)
        return toResponse(salvo)
    }

    @Transactional
    fun atualizarRefeicao(id: Long, request: AtualizarRefeicaoRequest): CardapioRuResponse {
        val item = repository.findById(id).orElseThrow {
            IllegalArgumentException("Dia do cardápio não encontrado com ID: $id")
        }

        val atualizado = if (request.mealType == "lunch") {
            item.copy(
                almocoPratoPrincipal = request.mainDish.trim(),
                almocoOpcaoVegana = request.veganOption.trim(),
                almocoGuarnicao = request.garnish.trim(),
                almocoSobremesa = request.dessert.trim(),
                auditadoPor = request.updatedBy.trim(),
                auditadoEm = "Atualizado agora"
            )
        } else {
            item.copy(
                jantarPratoPrincipal = request.mainDish.trim(),
                jantarOpcaoVegana = request.veganOption.trim(),
                jantarGuarnicao = request.garnish.trim(),
                jantarSobremesa = request.dessert.trim(),
                auditadoPor = request.updatedBy.trim(),
                auditadoEm = "Atualizado agora"
            )
        }

        val salvo = repository.save(atualizado)
        return toResponse(salvo)
    }

    private fun toResponse(entity: CardapioRu) = CardapioRuResponse(
        id = entity.id,
        day = entity.diaSemana,
        order = entity.ordemDia,
        lunch = RefeicaoDto(
            mainDish = entity.almocoPratoPrincipal,
            veganOption = entity.almocoOpcaoVegana,
            garnish = entity.almocoGuarnicao,
            sideDishes = entity.almocoAcompanhamentos,
            salad = entity.almocoSalada,
            dessert = entity.almocoSobremesa
        ),
        dinner = RefeicaoDto(
            mainDish = entity.jantarPratoPrincipal,
            veganOption = entity.jantarOpcaoVegana,
            garnish = entity.jantarGuarnicao,
            sideDishes = entity.jantarAcompanhamentos,
            salad = entity.jantarSalada,
            dessert = entity.jantarSobremesa
        ),
        lastUpdatedBy = entity.auditadoPor,
        lastUpdatedAt = entity.auditadoEm,
        confirmations = entity.confirmacoes,
        queueStatus = entity.statusFila
    )
}