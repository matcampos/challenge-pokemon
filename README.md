# Pokemon Challenge

Site: [Desafio Pokemon](http://challenge-pokemon.s3-website-us-east-1.amazonaws.com) 

## Informações de arquitetura do projeto

* Diretório raiz do projeto: `/`

  
**Desafio Pokemon:**  

1. Todos itens do styleguide foram criados usando classes CSS para facilitar seu reuso.  
2. Dentro da pasta src/app/utils foram criados alguns arquivos para auxiliar no desenvolvimento, sendo eles:  
    - [event-emmiter-helper](src/app/utils/event-emmiter-helper.ts) - Este arquivo exporta uma classe que armazena eventos dentro de uma variável estática do tipo object, ela é utilizada para realizar o broadcasting dentro da aplicação para que componentes que não estejam diretamente ligados possam se conversar por eventos.
    - [get-browser-language](src/app/utils/get-browser-language.ts) - Este arquivo exporta uma função que pega a linguagem do navegador, armazena a mesma no local storare e devolve como retorno da função, ela é utilizada para o controle da internacionalização dentro do site.
    - [http-loader-factory](rc/app/utils/http-loader-factory.ts) - classe destinada a uso da internacionalização, serve como factory para o módulo de Tradução.
3. Dentro da pasta src/app/models estão as models mapeadas do backend.
8. O arquivo [app.interceptor.ts](src/app/app.interceptor.ts) intercepta todas as requisições http que partem da aplicação angular e tenta realizá-las novamente 2 vezes caso retorne algum status de erro

### Pré-requisitos

* [nodeJS](https://nodejs.org/en/download/) - Plataforma de backend node js, é necessária pois o angular utiliza o seu gerenciador de pacotes.
* [Angular](https://angular.io/) - Framework utilizado para a construção do SPA (Single Page Applucation).

Ter uma IDE instalada que suporte NodeJS, Angular e git para clonar o repositório

``` 

    git clone https://github.com/matcampos/challenge-pokemon
```

### Instalação

 Execute o comando abaixo na pasta `/` para baixar os pacotes necessários para realizar o build do projeto

``` 

    npm i
```

Para executar o servidor local a fim de utilizar o projeto execute o comando:

``` 

    ng serve
```

### Build

Para rodar o build execute o comando:

``` 

    ng build
```

Para rodar o build apontando para produção execute o comando:

    

``` 

    ng build --prod
```

Para rodar o build apontando para um ambiente customizado basta rodar o comando:

``` 

    ng build --configuration="ambiente"
```

ex:

``` 

    ng build --configuration=homolog
```

Obs: Ele irá buscar as variáveis de ambiente no arquivo environment.["ambiente no qual você gerou o build"].

Segue um link da documentação onde é explicado como se configura ambientes customizados:

* [Angular build guide](https://angular.io/guide/build)

### Variáveis de ambiente

As variáveis de ambiente estão localizadas nos arquivos localizados dentro do diretório: `src/environments` .

**Parâmetros dos arquivos:**

* `production` - Quando true ele não exibe logs da aplicacão que não sejam de erro, além de realizar um build mais otimizado.
* `API_URL` - Url da api, atualizar conforme for necessário.

* O arquivo [environment](src/environments/environment.ts) possui as configurações de desenvolvimento do projeto.

``` json
{
    "production": false,
    "API_URL": "https://api.pokemontcg.io/v2"
}
```

* O [environment.prod](src/environments/environment.prod.ts) possuí as configurações de produção do projeto.

``` json
{
    "production": false,
    "API_URL": "https://api.pokemontcg.io/v2"
}
```

Para altera alguma variavel de ambiente do projeto basta alterar nestes arquivos citados acima.

### Scripts da aplicação

No arquivo [package.json](package.json) estão há a chave "scripts" que é um objeto contendo todos os script que você pode rodar na aplicação, ao rodar um script é como se você estivesse rodando ele no terminal de seu computador.

Para rodar um script basta rodar o comando `npm run "nome do script"`

Exemplo: `npm run build` , este comando irá executar a instrucão no seu terminal `ng build --prod` , ela irá gerar um build da aplicação apontando para o ambiente de produção.

**Scripts Utilizados:**

* `npm start` ( `ng serve` ) - Roda o projeto localmente, utilizado para fins de desenvolvimento.
* `npm run build` ( `ng build` ) - Gera um build da aplicação apontando para o ambiente de desenvolvimento.
* `npm run build:prod` ( `ng build --prod` ) - Gera um build da aplicação apontando para o ambiente de produção.
* `npm run test` (`ng test`) - Executa os testes unitários da aplicação.
* `npm run lint` (`ng lint`) - Aponta os erros de formatação da aplicação.
* `npm run e2e` (`ng e2e`) - Executa os teste end-to-end da aplicação.

### Estilos

Tudo foi pensado para ser o mais puro de CSS possível, para não comprometer o desempenho do projeto, a escolha da utilização do Bulma e não Bootstrap, é que ele ja possui classes pré-definidas que auxiliam e muito no desenvolvimento.

Exemplo de colunas, você pode informar o tamanho específico, ou simplesmente colocar uma coluna, que é adaptado corretamente, assim como informar através de classes em qual dispositivo essa coluna ira aparecer, [link](https://bulma.io/documentation/columns/basics/) para ter mais informações.

Além das diversas classes de auxílio, chamadas "helpers" para adaptar o que deseja esconder, alinhar, coloração, etc, [link](https://bulma.io/documentation/modifiers/syntax/) para mais informações.

Segue [link](https://www.codeinwp.com/blog/bootstrap-vs-foundation-vs-bulma-vs-semantic-vs-uikit/) de um comparativo dos maiores frameworks de CSS existentes hoje, o Bulma sempre se destaca por ser o mais leve e sem nenhuma dependencia em javascript.

## Criado com

* [Angular CLI 8.3.9](https://www.npmjs.com/package/@angular/cli/v/8.3.9) - Framework utilizado para criação do SPA
* [NodeJS 12.16.1](https://nodejs.org/en/) - NodeJS para instação dos pacotes e suas dependencias
* [Bulma](https://bulma.io) - Framework CSS puro para facilitar a criação do design
* [ngx-infinite-scroll](https://www.npmjs.com/package/ngx-infinite-scroll) - Biblioteca para utilizar funcionalidade de infinite-scroll no angular.
* [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core) - Biblioteca utilizada para internacionalização do site.
* [@ngx-translate/http-loader](https://www.npmjs.com/package/@ngx-translate/http-loader) - Dependência do `@ngx-translate/core`.
* [ngx-slick-carousel](https://www.npmjs.com/package/ngx-slick-carousel) - Biblioteca para utilização do carousel no layout mobile da página principal.
* [jquery](https://www.npmjs.com/package/jquery) - Dependência do `ngx-slick-carousel`.
* [slick-carousel](https://www.npmjs.com/package/slick-carousel) - Dependência do `ngx-slick-carousel`.

## Autores

* **Matheus Campos** - *Desenvolvedor Full-Stack* - [Github](https://github.com/matcampos).
