package br.uerj.connect.controller

import org.springframework.beans.factory.annotation.Value
import org.springframework.core.io.Resource
import org.springframework.core.io.UrlResource
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.nio.file.StandardCopyOption
import java.util.UUID

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin(origins = ["*"])
class FileUploadController(
    @Value("\${app.upload.dir:uploads}") private val uploadDir: String
) {

    init {
        val pasta = File(uploadDir)
        if (!pasta.exists()) {
            pasta.mkdirs()
        }
    }

    @PostMapping(consumes = [MediaType.MULTIPART_FORM_DATA_VALUE])
    fun fazerUpload(@RequestParam("file") file: MultipartFile): ResponseEntity> {
        if (file.isEmpty) {
            return ResponseEntity.badRequest().body(mapOf("error" to "Arquivo vazio."))
        }

        // Gera um nome único para o arquivo para evitar sobrescritas
        val extensaoOriginal = file.originalFilename?.substringAfterLast(".", "") ?: ""
        val nomeUnico = "${UUID.randomUUID()}.${if (extensaoOriginal.isNotEmpty()) extensaoOriginal else "bin"}"
        val destino = Paths.get(uploadDir).resolve(nomeUnico)

        Files.copy(file.inputStream, destino, StandardCopyOption.REPLACE_EXISTING)

        // URL pública para baixar/visualizar esse arquivo no backend
        val urlPublica = "http://localhost:8080/api/uploads/files/$nomeUnico"

        return ResponseEntity.ok(mapOf("url" to urlPublica))
    }

    @GetMapping("/files/{fileName:.+}")
    fun obterArquivo(@PathVariable fileName: String): ResponseEntity<Resource> {
        val caminho = Paths.get(uploadDir).resolve(fileName)
        val resource = UrlResource(caminho.toUri())

        if (!resource.exists() || !resource.isReadable) {
            return ResponseEntity.notFound().build()
        }

        val tipoMime = Files.probeContentType(caminho) ?: "application/octet-stream"

        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(tipoMime))
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"${resource.filename}\"")
            .body(resource)
    }
}