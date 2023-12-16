# Projeto de Gerenciamento de Academias e Check-ins de Usuários

Bem-vindo ao repositório do projeto de gerenciamento de academias! Este projeto visa implementar uma aplicação back-end robusta para a administração eficiente de academias, com foco especial na gestão de check-ins dos usuários.

## Objetivo Principal

O principal objetivo desta iniciativa é aplicar e demonstrar práticas avançadas de arquitetura e design de software. O projeto adota a arquitetura hexagonal para garantir uma estrutura de código modular e escalável.

Em outros projetos iremos utilizar também clean architecture, para explorarmos as principais diferenças entre esses dois tipos de arquitetura/design.

## Tecnologias Utilizadas

Estamos utilizando diversas tecnologias modernas para construir uma base sólida e eficiente para nossa aplicação. Algumas das principais tecnologias incluem:

- **TypeScript:** Garantindo tipagem estática para um desenvolvimento mais seguro e produtivo.
- **Fastify:** Um framework web leve e eficiente para construção de APIs rápidas e escaláveis.
- **API de Geolocalização:** Integrando recursos de geolocalização para aprimorar a experiência do usuário.
- **Prisma ORM:** Facilitando a interação com o banco de dados PostgreSQL, garantindo eficiência e segurança.
- **PostgreSQL:** Banco de dados utilizado para armazenar e gerenciar dados de forma robusta.
- **Docker:** Utilizado para facilitar a configuração e o gerenciamento de ambientes de desenvolvimento e produção.
- **Vitest:** Utilizado para realição do testes na aplicação, passando pelos testes unitário, testes de integração e testes end-to-end

## Metodoligias Utilizadas

- **TDD:** O projeto foi criado utilizando a metodoligia do TDD e seguindo os passos de red, green and refactor. Trazendo uma maior segurança para criação dos nossos casos de uso.

## Destaques do Projeto

- **Arquitetura Flexível:** Implementação de uma arquitetura hexagonal que promove a separação clara de responsabilidades e facilita a manutenção.
- **Testes Abrangentes:** Utilização da pirâmide de testes para garantir que os componentes e use cases estejam fortemente testados, assegurando a funcionalidade total da aplicação.
- **Desenvolvimento Orientado por Testes (TDD):** A construção do projeto foi guiada por técnicas de TDD, garantindo uma abordagem test-first para o desenvolvimento.
- **Baixo Acoplamento:** Componentes e use cases foram desenvolvidos com baixo acoplamento, permitindo flexibilidade e facilitando a integração de novas funcionalidades.

Estamos entusiasmados em apresentar esse projeto que não apenas resolve desafios práticos de gerenciamento de academias, mas também demonstra nossa experiência em tecnologias modernas e boas práticas de desenvolvimento. Sinta-se à vontade para explorar o código-fonte e contribuir para o crescimento deste projeto inovador!

## Requisios funcionais

Requisitos Funcionais - Aplicação Estilo Gympass

## Módulo de Cadastro e Autenticação

1. **Cadastro de Usuários:**
   - Os usuários podem se cadastrar na aplicação fornecendo informações básicas como e-mail e senha.

2. **Autenticação:**
   - O sistema deve permitir que os usuários autentiquem-se utilizando suas credenciais cadastradas.

## Módulo de Gerenciamento de Academias

3. **Cadastro de Academias:**
   - Os administradores podem cadastrar academias, incluindo informações como nome, endereço e horários de funcionamento.

4. **Visualização de Academias Próximas:**
   - Usuários podem visualizar academias próximas com base em sua localização ou por uma área específica.

5. **Detalhes da Academia:**
   - Os usuários podem visualizar detalhes específicos de cada academia, incluindo avaliações, serviços oferecidos e horários de pico.

## Módulo de Agendamento e Check-ins

6. **Agendamento de Atividades:**
   - Usuários podem agendar atividades específicas em uma academia, como aulas ou uso de equipamentos.

7. **Check-in:**
   - O sistema deve permitir que os usuários realizem check-ins nas academias quando estiverem com menos de 100 metros de distância da academia.

8. **Histórico de Atividades:**
   - Os usuários podem visualizar um histórico de suas atividades anteriores, incluindo check-ins e agendamentos.

## Módulo de Pagamentos

9. **Planos de Assinatura:**
   - Os usuários podem escolher entre diferentes planos de assinatura, oferecendo variedade de serviços e períodos de contrato.

10. **Pagamento Online:**
    - Implementar um sistema seguro de pagamento online para processar as transações relacionadas às assinaturas.

## Módulo de Avaliações e Feedback

11. **Avaliação de Academias:**
    - Usuários podem avaliar e deixar feedback sobre as academias frequentadas.

12. **Acompanhamento de Desempenho:**
    - Administradores podem acompanhar e analisar avaliações e feedback para melhorar a qualidade dos serviços oferecidos.

