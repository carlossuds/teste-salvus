# ToDo Backend

## Principais Bibliotecas Utilizadas:
- **Express** - servidor
- **Bcryptjs** - gerar hash da senha
- **JsonWebToken** - validar sessions
- **Mongoose** - para lidar com MongoDB

## Tabela de Rotas e suas funcionalidades

|MÉTODO|ROTA|PARAMERTOS|FUNCIONALIDADE
|----------------|-------------------------------|-----------------------------|--------
|POST|/users|Informar um Body com `name`, `email` e `password`| Cria um usuário
|POST|/sessions||Cria um Token e Inicia uma session com o usuário
|GET|/users||Retorna todos os usuários cadastrados
|PUT|/users|Informar um Body com `name`, `email`, `oldPassword`,`password` e `confirmPassword`|Atualiza o usuário logado na aplicação
|DELETE|/users||Deleta o usuário logado na aplicação
|POST|/todos|Informar um Body com `title`|Cria um ToDo
|GET|/todos||Retorna todos os ToDos do usuário logado
|DELETE|/todos/```_id```|```_id```: ID do ToDo| Deleta o ToDo **se** o usuário logado for o autor
