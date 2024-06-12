-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2024 a las 22:57:00
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reservehoy`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `NombreApellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesa`
--

CREATE TABLE `mesa` (
  `status` tinyint(1) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `numMesa` int(11) NOT NULL,
  `correoRes` varchar(255) NOT NULL,
  `id_Mesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plato`
--

CREATE TABLE `plato` (
  `idPlato` int(11) NOT NULL,
  `nombrePlato` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `precio` double NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `correoRes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `idReserva` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `numeroPersona` int(11) NOT NULL,
  `correoCli` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idMesa` int(11) NOT NULL,
  `correoRes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurante`
--

CREATE TABLE `restaurante` (
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `correoRes` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `horLunVier` varchar(255) NOT NULL,
  `horFinDe` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`correo`);

--
-- Indices de la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD PRIMARY KEY (`id_Mesa`),
  ADD KEY `fk_Restaurante` (`correoRes`);

--
-- Indices de la tabla `plato`
--
ALTER TABLE `plato`
  ADD PRIMARY KEY (`idPlato`),
  ADD KEY `fk_Restaurant` (`correoRes`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD KEY `fk_Cliente` (`correoCli`),
  ADD KEY `fk_Mesa` (`idMesa`),
  ADD KEY `fk_Res` (`correoRes`);

--
-- Indices de la tabla `restaurante`
--
ALTER TABLE `restaurante`
  ADD PRIMARY KEY (`correoRes`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mesa`
--
ALTER TABLE `mesa`
  ADD CONSTRAINT `fk_Restaurante` FOREIGN KEY (`correoRes`) REFERENCES `restaurante` (`correoRes`);

--
-- Filtros para la tabla `plato`
--
ALTER TABLE `plato`
  ADD CONSTRAINT `fk_Restaurant` FOREIGN KEY (`correoRes`) REFERENCES `restaurante` (`correoRes`);

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `fk_Cliente` FOREIGN KEY (`correoCli`) REFERENCES `cliente` (`correo`),
  ADD CONSTRAINT `fk_Mesa` FOREIGN KEY (`idMesa`) REFERENCES `mesa` (`id_Mesa`),
  ADD CONSTRAINT `fk_Res` FOREIGN KEY (`correoRes`) REFERENCES `restaurante` (`correoRes`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
