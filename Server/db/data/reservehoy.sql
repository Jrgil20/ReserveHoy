-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-07-2024 a las 06:26:49
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

--
-- Volcado de datos para la tabla `cliente`

INSERT INTO `cliente` (`NombreApellido`, `correo`, `password`, `telefono`) VALUES
('Cliente1', 'cliente1@gmail.com', '1234', '1111111111'),
('Cliente2', 'cliente2@gmail.com', '1234', '2222222222'),
('Cliente3', 'cliente3@gmail.com', '1234', '3333333333'),
('Cliente4', 'cliente4@gmail.com', '1234', '4444444444'),
('Cliente5', 'cliente5@gmail.com', '1234', '5555555555'),
('Cliente6', 'cliente6@gmail.com', '1234', '6666666666'),
('Cliente7', 'cliente7@gmail.com', '1234', '7777777777'),
('Cliente8', 'cliente8@gmail.com', '1234', '8888888888');


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
(1, 4, 1, 'subway@gmail.com', 3),
(1, 2, 2, 'wendys@gmail.com', 4),
(1, 6, 3, 'burgerking@gmail.com', 5),
(1, 3, 4, 'subway@gmail.com', 6),
(1, 2, 5, 'wendys@gmail.com', 7),
(1, 4, 6, 'burgerking@gmail.com', 8),
(1, 3, 7, 'subway@gmail.com', 9),
(1, 2, 8, 'wendys@gmail.com', 10),
(1, 4, 9, 'burgerking@gmail.com', 11),
(1, 3, 10, 'subway@gmail.com', 12);


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
(4, 'Frosty', 'Frio', 10, 'Helado jugoso', 'wendys@gmail.com'),
(19, 'Carne y Queso', 'Caliente', 10, 'Sandwich de 15', 'subway@gmail.com'),
(25, 'Whooper', 'Caliente', 2, 'Hamburguesa', 'burgerking@gmail.com'),
(27, 'Alas', 'Caliente', 10, 'Alas de pollo', 'polloarturos@gmail.com'),
(28, 'Frosty', 'Frio', 10, 'Helado', 'burgerking@gmail.com'),
(72, 'Aros de cebolla', 'Caliente', 10, 'aros', 'wendys@gmail.com'),
(74, 'Nuggets', 'Caliente', 34, 'Nuggets de pollo 10 piezas', 'burgerking@gmail.com'),
(91, 'Costillas', 'Frio', 10, 'Costillas', 'burgerking@gmail.com'),
(99, 'Chicken Tenders', 'Caliente', 10, 'Pollo', 'wendys@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `idReserva` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` int(11) NOT NULL,
  `numeroPersona` int(11) NOT NULL,
  `correoCli` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idMesa` int(11) NOT NULL,
  `correoRes` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `estado` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`idReserva`, `fecha`, `hora`, `numeroPersona`, `correoCli`, `idMesa`, `correoRes`, `estado`) VALUES
(124, '2024-07-06', 14, 2, 'andresguilartelamuno@gmail.com', 2, 'subway@gmail.com', 1),
(197, '2024-07-05', 14, 2, 'andresguilartelamuno@gmail.com', 2, 'subway@gmail.com', 1);
(200, '2024-07-07', 12, 4, 'andresguilartelamuno@gmail.com', 3, 'subway@gmail.com', 1),
(201, '2024-07-08', 18, 3, 'reyguilarte@gmail.com', 4, 'wendys@gmail.com', 1),
(202, '2024-07-09', 20, 2, 'andresguilartelamuno@gmail.com', 5, 'burgerking@gmail.com', 1),
(203, '2024-07-10', 14, 5, 'andresguilartelamuno@gmail.com', 6, 'subway@gmail.com', 1),
(204, '2024-07-11', 16, 2, 'reyguilarte@gmail.com', 7, 'wendys@gmail.com', 1),
(205, '2024-07-12', 19, 3, 'andresguilartelamuno@gmail.com', 8, 'burgerking@gmail.com', 1),
(206, '2024-07-13', 13, 4, 'andresguilartelamuno@gmail.com', 9, 'subway@gmail.com', 1),
(207, '2024-07-14', 15, 2, 'reyguilarte@gmail.com', 10, 'wendys@gmail.com', 1),
(208, '2024-07-15', 17, 3, 'andresguilartelamuno@gmail.com', 11, 'burgerking@gmail.com', 1),
(209, '2024-07-16', 21, 2, 'andresguilartelamuno@gmail.com', 12, 'subway@gmail.com', 1);

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
('Burger King', '', '02129908763', '1234', 'burgerking@gmail.com', '', '', ''),
('Pollo Arturo´s', 'El Tolon', '021299867432', '1234', 'polloarturos@gmail.com', 'Local de Comida Rapida', '10:00 - 23:00', '12:30 - 22:30'),
('Subay', 'El Tolon', '02129908767', '1234567', 'subway@gmail.com', 'Local de Comida Rapida', '09:00 - 22:00', '11:00 - 23:00'),
('Wendys', '', '02129908765', '1234', 'wendys@gmail.com', '', '', '');
('Restaurante1', 'Dirección1', '1111111111', '1234', 'restaurante1@gmail.com', 'Descripción1', '10:00 - 18:00', '10:00 - 16:00'),
('Restaurante2', 'Dirección2', '2222222222', '1234', 'restaurante2@gmail.com', 'Descripción2', '09:00 - 17:00', '09:00 - 15:00'),
('Restaurante3', 'Dirección3', '3333333333', '1234', 'restaurante3@gmail.com', 'Descripción3', '08:00 - 16:00', '08:00 - 14:00'),
('Restaurante4', 'Dirección4', '4444444444', '1234', 'restaurante4@gmail.com', 'Descripción4', '07:00 - 15:00', '07:00 - 13:00'),
('Restaurante5', 'Dirección5', '5555555555', '1234', 'restaurante5@gmail.com', 'Descripción5', '06:00 - 14:00', '06:00 - 12:00'),
('Restaurante6', 'Dirección6', '6666666666', '1234', 'restaurante6@gmail.com', 'Descripción6', '10:00 - 18:00', '10:00 - 16:00'),
('Restaurante7', 'Dirección7', '7777777777', '1234', 'restaurante7@gmail.com', 'Descripción7', '09:00 - 17:00', '09:00 - 15:00'),
('Restaurante8', 'Dirección8', '8888888888', '1234', 'restaurante8@gmail.com', 'Descripción8', '08:00 - 16:00', '08:00 - 14:00'),
('Restaurante9', 'Dirección9', '9999999999', '1234', 'restaurante9@gmail.com', 'Descripción9', '07:00 - 15:00', '07:00 - 13:00'),
('Restaurante10', 'Dirección10', '1010101010', '1234', 'restaurante10@gmail.com', 'Descripción10', '06:00 - 14:00', '06:00 - 12:00');


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
