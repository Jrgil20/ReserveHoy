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
--

INSERT INTO `cliente` (`NombreApellido`, `correo`, `password`, `telefono`) VALUES
('Andrés Guilarte', 'andresguilartelamuno@gmail.com', '1234', '04241298398'),
('Reinaldo Guilarte', 'reyguilarte@gmail.com', '123', '042432718909');

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
(1, 2, 23, 'subway@gmail.com', 2),
(0, 3, 70, 'subway@gmail.com', 51);

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
