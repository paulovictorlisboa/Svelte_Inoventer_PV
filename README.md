# svelte-ivonenter

## Requisitos
1. [Node.js](https://nodejs.org/en/) versão 16.13 ou superior
2. Yarn versão 1.22 ou superior. Basta executar o seguinte comando após ter o Node.js instalado:
`npm install --global yarn`
4. [PostgreSQL](https://www.postgresql.org/) (12 ou superior) e [pgAdmin](https://www.pgadmin.org/download/) (4 ou superior)

## Instruções
1. Tendo os requisitos acima, acesse a pasta raiz do projeto e utilize o Yarn para instalação das dependências
`yarn`
2. Importe o schema do banco de dados do arquivo `database/inoventer_schema_vx.sql` no PostgreSQL. 
3. Configure as informações de acesso ao banco de dados no arquivo `.env`
4. Em uma segunta aba ou janela do terminal, execute os seguintes comandos para compilar e servir a aplicação do cliente
`yarn c-build`
`yarn c-start`
Caso deseje iniciar uma sessão de desenvolvimento, utilize o comando `yarn c-dev`
5. Execute os seguintes comandos para compilar e iniciar o servidor
`yarn s-build`
`yarn s-run`
6. Se tudo ocorreu corretamente, você deve ser capaz de visualizar a aplicação no endereço `localhost:8080`