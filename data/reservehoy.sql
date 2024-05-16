-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2024 a las 12:46:50
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
('Andres Guilarte', 'andresguilartelamuno@gmail.com', '12345', 'undefined'),
('Gabriel Castellano', 'gc@gmail.com', '0000', '424356789'),
('Jesus Gil', 'jesusg@gmail.com', '2222', '412345678'),
('Massiel Perozo', 'massi@gmail.com', '5555', '424224566'),
('Maria Perez', 'mperez@gmail.com', '1111', '4123456789'),
('Pepito Perez', 'perez@gmail.com', '4444', '42412345678');

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
(1, 3, 12, 'alasgrill@gmail.com', 1289),
(1, 8, 24, 'hiromi@gmail.com', 2345),
(0, 3, 55, 'morandi@gmail.com', 4611),
(0, 2, 34, 'estancia@gmail.com', 5689),
(0, 5, 67, 'cantina@gmail.com', 7777),
(1, 5, 78, 'cantina@gmail.com', 9090),
(0, 245, 45, 'reydavid@gmail.com', 12345);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plato`
--

CREATE TABLE `plato` (
  `nombrePlato` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `precio` double NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `correoRes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plato`
--

INSERT INTO `plato` (`nombrePlato`, `tipo`, `precio`, `descripcion`, `correoRes`) VALUES
('Bologna', 'pastas', 12, 'Pasta a la bologna', 'reydavid@gmail.com'),
('Carbonara', 'pastas', 10, 'Pasta a la carbonara con tocineta', 'alasgrill@gmail.com'),
('Doble Carne', 'Hamburguesas', 15, 'Deliciosa  hamburguesa doble carne', 'burgerking@gmail.com'),
('Hamburguesa de queso', 'Hamburguesa', 20, 'Hamburguesa de queso con vegetales', 'wendy@gmail.com'),
('Margarita', 'Pizzas', 15, 'Pizza margarita con pepperoni', 'solareste@gmail.com'),
('Nuggets de pollo', 'Entrada', 4, 'Nuggets de pollo', 'mcdonalds@gmail.com'),
('pasticho', 'pastas', 25, 'Pasticho de carne', 'morandi@gmail.com'),
('Ramen', 'Sopa', 25, 'Ramen de cerdo con vegetales', 'cantina@gmail.com'),
('Sopa de Res', 'Sopas', 5, 'Sopa de res con vegetales', 'estancia@gmail.com'),
('Tempura roll', 'Sushi', 13, 'Rolls de sushi tempurizados', 'hiromi@gmail.com');

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
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`idReserva`, `fecha`, `hora`, `numeroPersona`, `correoCli`, `idMesa`, `status`) VALUES
(123, '2024-05-15', '13:55:02', 2, 'andresguilartelamuno@gmail.com', 12345, 0),
(222, '2024-05-17', '00:42:11', 2, 'jesusg@gmail.com', 1289, 1),
(808, '2024-05-24', '20:44:23', 2, 'perez@gmail.com', 9090, 0),
(909, '2024-05-27', '01:43:05', 1, 'perez@gmail.com', 4611, 0),
(1111, '2024-05-24', '20:44:23', 2, 'massi@gmail.com', 2345, 0),
(4444, '2024-05-18', '18:43:45', 3, 'gc@gmail.com', 12345, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `restaurante`
--

CREATE TABLE `restaurante` (
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `clave` varchar(255) NOT NULL,
  `correoRes` varchar(255) NOT NULL,
  `imagen` blob NOT NULL DEFAULT '/public/assets/img/Restaurant.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `restaurante`
--

INSERT INTO `restaurante` (`nombre`, `descripcion`, `direccion`, `telefono`, `clave`, `correoRes`, `imagen`) VALUES
('AlasGrill', '', '', '4120987654', '$2b$08$hM7YHJH/2Gn3zzT9qVJlu.SOCm1Yzu0B2Ve5qlQ1nQu/ZBApiwigm', 'alasgrill@gmail.com', '');
INSERT INTO `restaurante` (`nombre`, `descripcion`, `direccion`, `telefono`, `clave`, `correoRes`, `imagen`) VALUES
('burgerking', 'Burger King, también conocida como BK, es una cadena de establecimientos de comida rápida con sede central en Miami, Florida. Fue fundada el 4 de diciembre de 1954 por James McLamore y David Edgerton1. Es famosa por ser el hogar original del WHOPPER®, una', 'San Bernardino norte', '04123456789', '$2b$08$k0iquCCgE.I5RVCAyBrLy.LGXw6/rS8/Incvkj4lmtQCK0nzM9z8O', 'burgerking@gmail.com', '');
INSERT INTO `restaurante` (`nombre`, `descripcion`, `direccion`, `telefono`, `clave`, `correoRes`, `imagen`) VALUES
('Cantina', '', '', '424123987', '$2b$08$XJqgzpW8hxO74dIrqYyXBO.zDfYUmJUee9hPe/3WKtN5z3VeHcM4q', 'cantina@gmail.com', ''),
('Estancia', '', '', '4123459678', '$2b$08$fwMflTlFFRmXaLCbhvDSq.aRSQpDA.Ld1sq/XAfP9y.f4JCYzFCra', 'estancia@gmail.com', ''),
('Hiromi', '', '', '04241234567', '$2b$08$rZXR2IkGVIuWipKJTK4u.eckr1.4CMrcgBWt6Y4u5efXmMiTk5GCy', 'hiromi@gmail.com', ''),
('McDonalds', '', '', '02129934567', '$2b$08$sYVPS/2xaukA1GMdV/M2FuwMmvmtYBGanMwqlusGryu0skZaB6DwK', 'mcdonalds@gmail.com', ''),
('Morandi', '', '', '41232567894', '$2b$08$x3phQ2Omh7qtGDVMsp6rHO.5AqOWxwt0BnKYl4UEki1x0vC0XRjlG', 'morandi@gmail.com', ''),
('Rey David', '', '', '02129912345', '$2b$08$kvh21hK2ayH93cTmaSUcae779aM3KIjhZZLW1DivaKrpZm7g24NGy', 'reydavid@gmail.com', ''),
('SolarEste', '', '', '4122347689', '$2b$08$5KV0M3hB0qsum2llQE.bDek3b8HI.tAg/zGi3s07jnmLRhVbi8CC.', 'solareste@gmail.com', ''),
('ve', '', '', '12', '12', 've@li', ''),
('ve1', '', '', '1', '1', 'vevef@f', ''),
('wendys', '', '', '02128974563', '$2b$08$w.K/5woUAyWxfvn6aY2gUudI0ajdRlJg6uzObyFPzJv.fZnrtoGhG', 'wendy@gmail.com', '');

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
  ADD PRIMARY KEY (`nombrePlato`),
  ADD KEY `fk_Restaurant` (`correoRes`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`idReserva`),
  ADD KEY `fk_Cliente` (`correoCli`),
  ADD KEY `fk_Mesa` (`idMesa`);

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
  ADD CONSTRAINT `fk_Mesa` FOREIGN KEY (`idMesa`) REFERENCES `mesa` (`id_Mesa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
