package br.uerj.connect.config

import io.swagger.v3.oas.models.OpenAPI
import io.swagger.v3.oas.models.info.Info
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwaggerConfig {

    @Bean
    fun customOpenAPI(): OpenAPI {
        return OpenAPI()
            .info(
                Info()
                    .title("Connect UERJ - API")
                    .version("1.0.0")
                    .description("Documentação das APIs do fórum e portal acadêmico Connect UERJ.")
            )
    }
}