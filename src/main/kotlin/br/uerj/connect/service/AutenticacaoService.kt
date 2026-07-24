package br.uerj.connect.service

import br.uerj.connect.dto.CadastroUsuarioRequest
import br.uerj.connect.dto.UsuarioResponse
import br.uerj.connect.model.Usuario
import br.uerj.connect.repository.UsuarioRepository
import org.springframework.stereotype.Service

@Service
class AutenticacaoService(private val usuarioRepository: UsuarioRepository) {

    fun cadastrar(request: CadastroUsuarioRequest): UsuarioResponse {
        if (usuarioRepository.existsByEmailOrMatricula(request.email, request.matricula)) {
            throw IllegalArgumentException("E-mail ou Matrícula já cadastrados no sistema.")
        }

        val novoUsuario = Usuario(
            nome = request.nome,
            email = request.email,
            matricula = request.matricula,
            senhaHash = request.senha, // Na fase final do TCC adicionaremos criptografia BCrypt
            curso = request.curso
        )

        val salvo = usuarioRepository.save(novoUsuario)
        return UsuarioResponse(salvo.id, salvo.nome, salvo.email, salvo.matricula, salvo.curso)
    }
}