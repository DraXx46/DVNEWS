-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/12/2024 às 23:38
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `noticias_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `log`
--

CREATE TABLE `log` (
  `idlog` int(11) NOT NULL,
  `datahora` timestamp NOT NULL DEFAULT current_timestamp(),
  `numeroregistros` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Despejando dados para a tabela `log`
--

INSERT INTO `log` (`idlog`, `datahora`, `numeroregistros`) VALUES
(1, '2024-12-04 16:00:41', 20);

-- --------------------------------------------------------

--
-- Estrutura para tabela `noticias`
--

CREATE TABLE `noticias` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text DEFAULT NULL,
  `imagem_url` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `fonte` varchar(100) DEFAULT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `noticias`
--

INSERT INTO `noticias` (`id`, `titulo`, `descricao`, `imagem_url`, `link`, `fonte`, `data_criacao`) VALUES
(47, '', '', '', '', '', '2024-12-04 22:15:21'),
(48, 'Brazil police formally accuse Bolsonaro of alleged coup plot', 'Former President Bolsonaro says he will mount a legal \"fight\" against the accusations.', 'https://ichef.bbci.co.uk/news/1024/branded_news/fc71/live/374fa990-a837-11ef-ac90-330900464644.jpg', 'https://www.bbc.com/news/articles/c98e29yvl88o', 'BBC News', '2024-12-04 22:15:37'),
(49, '', '', '', '', '', '2024-12-04 22:15:52');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`idlog`);

--
-- Índices de tabela `noticias`
--
ALTER TABLE `noticias`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `log`
--
ALTER TABLE `log`
  MODIFY `idlog` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `noticias`
--
ALTER TABLE `noticias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
