CREATE DATABASE minhasfinancas

CREATE SCHEMA financas

CREATE TABLE financas.usuario
(
  id bigserial NOT NULL PRIMARY KEY,
  nome character varying(150),
  email character varying(100),
  senha character varying(20),
  data_cadastro date default now()
);

CREATE TABLE financas.lancamento
(
  id bigserial NOT NULL PRIMARY KEY ,
  descricao character varying(100) NOT NULL,
  mes integer NOT NULL,
  ano integer NOT NULL,
  valor numeric(16,2) not null,
  tipo character varying(20) check (tipo in ('RECEITA', 'DESPESA')) NOT NULL,
  status character varying(20) check (status in ('PENDENTE', 'CANCELADO', 'EFETIVADO')) NOT NULL,
  id_usuario bigint REFERENCES financas.usuario (id) NOT NULL,
  data_cadastro date default now()
);

INSERT INTO financas.usuario VALUES (1, 'usuario', 'usuario@email.com', '123456')
INSERT INTO financas.usuario VALUES (2, 'luis', 'luis@email.com', '123456');
INSERT INTO financas.usuario VALUES (3, 'ana', 'ana@email.com', '123456');
INSERT INTO financas.usuario VALUES (4, 'lucas', 'lucas@email.com', '123456');

INSERT INTO financas.lancamento values (1, 'serviço prestado', 08, 2021, 100.00, 'RECEITA', 'EFETIVADO', 1)
INSERT INTO financas.lancamento values (2, 'cortar grama', 06, 2021, 80.00, 'RECEITA', 'CANCELADO', 2);
INSERT INTO financas.lancamento values (3, 'Venda de Produto', 05, 2021, 100.00, 'RECEITA', 'PENDENTE', 3);
INSERT INTO financas.lancamento values (4, 'compra', 02, 2021, 100.00, 'DESPESA', 'EFETIVADO', 4);
INSERT INTO financas.lancamento values (5, 'Escola', 08, 2021, 50.00, 'DESPESA', 'EFETIVADO', 1);

