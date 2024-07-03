-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-07-2024 a las 16:31:25
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`NombreApellido`, `correo`, `password`, `telefono`) VALUES
('angela', 'angela@a', '1', '1'),
('carlos', 'carlos@g', '1', '1'),
('jesus', 'farias223@gmail.com', '1', '4247589999'),
('jesus', 'fariasjr223@gmail.com', '12', 'undefined'),
('gerardo', 'gerardo@correp', '1', '1'),
('jesus', 'jesus@1', '1', '1'),
('manolo', 'manolo@g', '1', ''),
('pepito', 'pepe@d', '1', '47487'),
('ricard', 'ricard@a', '1', '1');

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

--
-- Volcado de datos para la tabla `mesa`
--

INSERT INTO `mesa` (`status`, `capacidad`, `numMesa`, `correoRes`, `id_Mesa`) VALUES
(0, 4, 17, 'Juanchos@g', 9),
(0, 0, 32, 'comida@c', 21),
(0, 4, 63, 'comida@c', 46),
(0, 9, 84, 'comida@c', 51),
(0, 5, 21, 'comida@c', 55),
(0, 12, 10, 'comida@c', 63),
(0, 4, 95, 'bario@gmail.co', 66),
(0, 10, 1, 'comida@c', 71),
(0, 5, 69, 'comida@c', 73),
(0, 5, 98, 'Juanchos@g', 77);

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

--
-- Volcado de datos para la tabla `plato`
--

INSERT INTO `plato` (`idPlato`, `nombrePlato`, `tipo`, `precio`, `descripcion`, `correoRes`) VALUES
(1, 'plato1', 'tipo1', 10.99, 'descripcion1', 'comida@c'),
(2, 'plato2', 'tipo2', 15.99, 'descripcion2', 'comida@c'),
(3, 'plato3', 'tipo3', 12.99, 'descripcion3', 'comida@c'),
(4, 'plato4', 'tipo4', 9.99, 'descripcion4', 'comida@c'),
(5, 'plato5', 'tipo5', 14.99, 'descripcion5', 'comida@c'),
(6, 'plato6', 'tipo6', 11.99, 'descripcion6', 'comida@c'),
(7, 'plato7', 'tipo7', 13.99, 'descripcion7', 'comida@c'),
(8, 'plato8', 'tipo8', 16.99, 'descripcion8', 'comida@c'),
(9, 'plato9', 'tipo9', 10.99, 'descripcion9', 'ccomida@c'),
(10, 'plato10', 'tipo10', 15.99, 'descripcion10', 'comida@c'),
(11, 'plato11', 'tipo11', 12.99, 'descripcion11', 'comida@c'),
(12, 'plato12', 'tipo12', 9.99, 'descripcion12', 'comida@c'),
(13, 'plato13', 'tipo13', 14.99, 'descripcion13', 'comida@c'),
(14, 'plato14', 'tipo14', 11.99, 'descripcion14', 'comida@c'),
(15, 'plato15', 'tipo15', 13.99, 'descripcion15', 'comida@c'),
(16, 'plato16', 'tipo16', 16.99, 'descripcion16', 'comida@c'),
(17, 'plato17', 'tipo17', 10.99, 'descripcion17', 'comida@c'),
(18, 'plato18', 'tipo18', 15.99, 'descripcion18', 'comida@c'),
(19, 'plato19', 'tipo19', 12.99, 'descripcion19', 'comida@c'),
(20, 'plato20', 'tipo20', 9.99, 'descripcion20', 'comida@c');

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

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`idReserva`, `fecha`, `hora`, `numeroPersona`, `correoCli`, `idMesa`, `correoRes`) VALUES
(179, '0000-00-00', '00:00:00', 3, 'fariasjr223@gmail.com', 9, 'Juanchos@g'),
(325, '2024-05-29', '00:00:12', 5, 'fariasjr223@gmail.com', 55, 'comida@c'),
(445, '2024-05-28', '00:00:12', 0, 'fariasjr223@gmail.com', 21, 'comida@c'),
(135, '2024-05-30', '00:00:12', 9, 'fariasjr223@gmail.com', 51, 'comida@c'),
(990, '2024-05-30', '23:59:00', 9, 'fariasjr223@gmail.com', 51, 'comida@c'),
(168, '2024-05-31', '01:09:00', 0, 'fariasjr223@gmail.com', 21, 'comida@c'),
(402, '2024-05-30', '09:17:00', 0, 'fariasjr223@gmail.com', 21, 'comida@c'),
(906, '2024-05-31', '01:18:00', 0, 'fariasjr223@gmail.com', 21, 'comida@c'),
(766, '2024-05-29', '01:21:00', 0, 'fariasjr223@gmail.com', 21, 'comida@c'),
(183, '2024-05-30', '17:30:00', 0, 'fariasjr223@gmail.com', 21, 'comida@c'),
(424, '2024-05-30', '15:53:00', 12, 'fariasjr223@gmail.com', 63, 'comida@c'),
(333, '2024-05-28', '16:55:00', 10, 'fariasjr223@gmail.com', 71, 'comida@c'),
(216, '2024-06-14', '01:58:00', 0, 'fariasjr223@gmail.com', 21, 'comida@c');

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
-- Volcado de datos para la tabla `restaurante`
--

INSERT INTO `restaurante` (`nombre`, `direccion`, `telefono`, `clave`, `correoRes`, `descripcion`, `horLunVier`, `horFinDe`) VALUES
('barIO', '', '424567891', '1', 'bario@gmail.co', '', '', ''),
('Burritos', 'donde venden burritos', '4247589999', '123', 'Burritos@gmail.com', 'vendemos burritos', '08:00 - 14:00', ' - '),
('comida', 'En tu imaginacion', '47487', '12', 'comida@c', 'vendemos comida', '09:45 - 17:15', '10:15 - 17:45'),
('Hamurguesas', '', '4247589999', '1234', 'Hambuerguesas@gmail.com', '', '', ''),
('jesus', '', '12', '12', 'jesus@1', '', '', ''),
('The juancho', '', '12', '1', 'Juanchos@g', '', '', ''),
('la cuarta Bar', '', '424567891', '1', 'LaCuarta@gmail.co', '', '', ''),
('la Primera Bar', '', '424567891', '1', 'LaPrimera@gmail.co', '', '', ''),
('la Segunda Bar', '', '424567891', '1', 'LaSegunda@gmail.co', '', '', ''),
('la Tercera Bar', '', '424567891', '1', 'LaTercera@gmail.co', '', '', ''),
('Macdonaldo', '', '4241234567', '23', 'Macdonaldo@gmail.com', '', '', ''),
('Perritos', 'donde venden perritos', '4247589999', '12', 'perritos@gmail.com', 'vendemos comida', '15:00 - 19:00', '17:00 - 21:00'),
('pollito', 'En tu imaginacion', '212-123213', '1', 'pollito@gmail', 'vendemos comida', '05:50 - 18:50', ' - '),
('subwon', '', '45612', '1', 'subwon@gmail.co', '', '', '');

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
