# O que e indexedDB

- banco de dados nao relacional
- permite armazenamento de objetos no browser do usuário
- nos permite armazenar objetos javascript, arquivos, blobs
- suporta transacoes
- la podemos definir multiplos indices para realizar consultas

## Bibliotecas que facilitam o uso de indexedDB

- IndexedDB

### Banco de dados

### Object Store

- Possui o comportamento similar ao comportamento de tabelas.
- O armazena objetos organizados por tipos, não são os tipos padrões javaScript mas tipos que definimos durante a construcão de nosso banco

### Index

- O indice é um tipo criado para organizar nossa Object Store, por uma propriedade individual
- Um timpo de informação que podemos armazenar para consulta.

### Transactions

- Um transação é um pacote que um grupo de operações para manter a integridade do banco de dados
- Se uma operação dentro de uma transação falhar, toda a transação será cancelada
- Todas operações de leitura e escrita precisam fazer parte de uma transação
