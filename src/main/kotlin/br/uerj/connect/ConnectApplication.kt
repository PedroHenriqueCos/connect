package br.uerj.connect

import io.github.cdimascio.dotenv.Dotenv
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ConnectApplication

fun main(args: Array<String>) {
    // Carrega o arquivo .env se ele existir localmente
    val dotenv = Dotenv.configure().ignoreIfMissing().load()
    dotenv.entries().forEach { entry ->
        System.setProperty(entry.key, entry.value)
    }

    runApplication<ConnectApplication>(*args)
}
