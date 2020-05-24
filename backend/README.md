# Teste Salvus Backend

## Principais Bibliotecas Utilizadas:
- **Express** - servidor
- **Bcryptjs** - gerar hash da senha
- **JsonWebToken** - validar sessions
- **Sequelize** - ORM Postgresql

## Tabela de Rotas e suas funcionalidades

|MÉTODO|ROTA|PARAMERTOS|FUNCIONALIDADE
|----------------|-------------------------------|-----------------------------|--------
|POST|/users|Informar um Body com `name`, `email`, `password`, `birthday`, `phone`, `role`, `specialty`, `experience`, `city`, `state` e `displacement` | Cria um usuário
|POST|/sessions||Cria um Token e Inicia uma session com o usuário
|GET|/users||Retorna todos os usuários cadastrados
|PUT|/users| Mesmos do **`POST`**|Atualiza o usuário logado na aplicação
|DELETE|/users||Deleta o usuário logado na aplicação
|POST|/files|Informar um Body com string de base64 referente à imagem |Faz o upload de uma imagem
|GET|/files||Retorna as imagens pertencentes ao usuário logado 
