package br.uerj.connect.dto

import br.uerj.connect.model.MaterialDisciplina
import br.uerj.connect.model.TipoMaterial
import java.time.LocalDateTime

data class CriarMaterialRequest(
    val titulo: String,
    val url: String,
    val descricao: String?,
    val codigoDisciplina: String,
    val tipo: TipoMaterial = TipoMaterial.LINK,
    val usuarioId: Long
)

data class MaterialResponse(
    val id: Long,
    val titulo: String,
    val url: String,
    val descricao: String?,
    val codigoDisciplina: String,
    val tipo: TipoMaterial,
    val autorId: Long,
    val nomeAutor: String,
    val dataCriacao: LocalDateTime
)

fun MaterialDisciplina.toResponse() = MaterialResponse(
    id = this.id,
    titulo = this.titulo,
    url = this.url,
    descricao = this.descricao,
    codigoDisciplina = this.codigoDisciplina,
    tipo = this.tipo,
    autorId = this.autor.id,
    nomeAutor = this.autor.nome,
    dataCriacao = this.dataCriacao
)