package br.uerj.connect.service

import br.uerj.connect.dto.CadastroUsuarioRequest
import br.uerj.connect.dto.LoginRequest
import br.uerj.connect.dto.UsuarioResponse
import br.uerj.connect.model.Usuario
import br.uerj.connect.repository.UsuarioRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UsuarioService(
    private val usuarioRepository: UsuarioRepository
) {

    @Transactional
    fun cadastrar(request: CadastroUsuarioRequest): UsuarioResponse {
        if (usuarioRepository.existsByEmail(request.email)) {
            throw IllegalArgumentException("Já existe um usuário cadastrado com este e-mail.")
        }

        if (usuarioRepository.existsByMatricula(request.matricula)) {
            throw IllegalArgumentException("Já existe um usuário cadastrado com esta matrícula.")
        }

        val novoUsuario = Usuario(
            nome = request.nome,
            email = request.email,
            matricula = request.matricula,
            senhaHash = request.senha, // Mantendo compatível com a estrutura atual da entidade
            curso = request.curso
        )

        val salvo = usuarioRepository.save(novoUsuario)
        return toResponse(salvo)
    }

    fun autenticar(request: LoginRequest): UsuarioResponse {
        val usuario = usuarioRepository.findByEmail(request.email)
            .orElseThrow { IllegalArgumentException("Credenciais inválidas: usuário não encontrado.") }

        if (usuario.senhaHash != request.senha) {
            throw IllegalArgumentException("Credenciais inválidas: senha incorreta.")
        }

        return toResponse(usuario)
    }

    fun buscarPorId(id: Long): UsuarioResponse {
        val usuario = usuarioRepository.findById(id)
            .orElseThrow { IllegalArgumentException("Usuário não encontrado com ID: $id") }
        return toResponse(usuario)
    }

    private fun toResponse(usuario: Usuario) = UsuarioResponse(
        id = usuario.id,
        nome = usuario.nome,
        email = usuario.email,
        matricula = usuario.matricula,
        curso = usuario.curso
    )
}