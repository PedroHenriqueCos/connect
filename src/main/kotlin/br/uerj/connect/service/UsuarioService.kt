package br.uerj.connect.service

import br.uerj.connect.dto.AtualizarUsuarioRequest
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

        // O primeiro usuário cadastrado no banco se torna MODERADOR automaticamente; os demais entram como ALUNO
        val roleAtribuida = if (usuarioRepository.count() == 0L) "MODERADOR" else "ALUNO"

        val novoUsuario = Usuario(
            nome = request.nome,
            email = request.email,
            matricula = request.matricula,
            senhaHash = request.senha,
            curso = request.curso,
            role = roleAtribuida
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

    @Transactional
    fun atualizarPerfil(id: Long, request: AtualizarUsuarioRequest): UsuarioResponse {
        val usuario = usuarioRepository.findById(id).orElseThrow {
            IllegalArgumentException("Usuário não encontrado com o ID: $id")
        }

        val usuarioAtualizado = usuario.copy(
            nome = request.nome.trim(),
            curso = request.curso.trim()
        )

        val salvo = usuarioRepository.save(usuarioAtualizado)
        return toResponse(salvo)
    }

    @Transactional
    fun concederModerador(moderadorId: Long, alvoId: Long): UsuarioResponse {
        val moderador = usuarioRepository.findById(moderadorId).orElseThrow {
            IllegalArgumentException("Moderador solicitante não encontrado.")
        }

        if (moderador.role != "MODERADOR" && moderador.role != "ADMIN") {
            throw IllegalStateException("Apenas moderadores podem conceder permissão de moderação.")
        }

        val alvo = usuarioRepository.findById(alvoId).orElseThrow {
            IllegalArgumentException("Usuário alvo não encontrado.")
        }

        val alvoAtualizado = alvo.copy(role = "MODERADOR")
        val salvo = usuarioRepository.save(alvoAtualizado)
        return toResponse(salvo)
    }

    private fun toResponse(usuario: Usuario) = UsuarioResponse(
        id = usuario.id,
        nome = usuario.nome,
        email = usuario.email,
        matricula = usuario.matricula,
        curso = usuario.curso,
        role = usuario.role
    )
}