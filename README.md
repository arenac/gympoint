<p align="center">
  <img src="https://github.com/arenac/gympoint/blob/master/mobile/src/assets/logo.png" />
</p>


# Gympoint
Projeto final, Gympoint, do curso GoStack 2019 da Rocketseat.

O Gympoint é uma solução completa incluindo backend, website and mobile app para gerenciamento de academias. Através do website os administradores da academia podem registrar novos alunos, planos, matrículas e a responderem solcitações de ajuda dos alunos.
Já o aplicativo de ceular é de uso do aluno para realizar checkins e enviar questões em geral relacionadas à academia.
<br />Após o cadastro do aluno na academia e a criação da matricula, o mesmo recebe um email de confirmação e boas vindas com as informações referentes ao plano escolhido e dados do próprio aluno.
<br />**OBS: a aplicação mobile foi desenvolvida e testada somente na plataforma Android 9.0 (API 28)**

## Estrutura do repositório e pré-requisitos

O nome de cada pasta explica o tipo da solução dentro deste repositório, backend, web e mobile. Cada projeto tem uma configuração especifica e serão detalhadas na sequência.

Para rodar o backend será necessário realizar as seguintes instalações e setups:

* Criar uma instância docker para o banco de dados [postgres](https://hub.docker.com/_/postgres?tab=description) versão 11 e redirecionamento para a porta 5432
* Crie um banco de dados dentro do postgres
* Criar uma instância docker para o servidor [redis](https://hub.docker.com/_/redis/) versão alpine com redirecionamento para a porta 6379
* Uma conta na Mailtrap ou similar para simular um servidor de SMTP
* Uma conta na Sentry ou similar para logar exceptions no backend

### Backend

Após clonar o repositório, vá para a pasta backend e instale as dependências do projeto. Dentro da pasta backend crie um arquivo chamado **.env** e dentro deste arquivo cole o conteudo do arquivo **.env.example**. Agora atribua os valores das variáveis DB_HOST, DB_USER, DB_PASS e DB_NAME referentes ao banco de dados postgres.<br />
Para simular envio de email, preencha as variáveis MAIL_HOST, MAIL_PORT, MAIL_USER e MAIL_PASS referentes à credencial SMTP da Sentry.<br />
Por último adicione a URL da Sentry referente a chanve do cliente do projeto criado na sua conta na variável de ambiente SENTRY_DSN.

Crie as tabelas do banco de dados

```yarn sequelize db:migrate```

Popule as tableas

```yarn sequelize db:seed:all```

Na sequência rode o projeto

```yarn dev```

Ao acessar [http://localhost:4444/students/1/checkins](http://localhost:4444/students/1/checkins) o servidor deve retornar status 200 com um response body em formato JSON.

### Website

Dentro da pasta web, instale as dependências e rode o comando ```yarn start``` para emular o site.<br/>
Você pode acessar o site o usuário admin@gympoint.com e senha 123456

### Mobile

Tenha certezar que o [React Native](https://facebook.github.io/react-native/docs/getting-started) esteja configurado. 
Dentro da pasa mobile, instale as dependências e rode no emualdor ou dispositivo físico e rode o comando ```yarn android```

## License

Este projeto usa a licensa MIT - ver o arquivo [LICENSE.md](LICENSE.md) para maiores detalhes.

## Agradecimentos
Obrigado [Rocketseat](https://rocketseat.com.br/) pelo conhecimento adquirido. <br />#BORACODAR