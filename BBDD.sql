-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.3 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla bienesraices_node_mvc.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienesraices_node_mvc.categorias: ~5 rows (aproximadamente)
INSERT INTO `categorias` (`id`, `nombre`, `createdAt`, `updatedAt`) VALUES
	(1, 'Casa', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(2, 'Departamento', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(3, 'Almacen', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(4, 'Terreno', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(5, 'Cabaña', '2025-01-13 15:12:22', '2025-01-13 15:12:22');

-- Volcando estructura para tabla bienesraices_node_mvc.mensajes
CREATE TABLE IF NOT EXISTS `mensajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mensaje` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `usuarioId` int DEFAULT NULL,
  `propiedadId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuarioId` (`usuarioId`),
  KEY `propiedadId` (`propiedadId`),
  CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`propiedadId`) REFERENCES `propiedades` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienesraices_node_mvc.mensajes: ~6 rows (aproximadamente)
INSERT INTO `mensajes` (`id`, `mensaje`, `createdAt`, `updatedAt`, `usuarioId`, `propiedadId`) VALUES
	(1, 'Estoy interesado en comprar la propiedad, cuando pueda pongase en contacto conmigo.', '2025-01-21 18:59:30', '2025-01-21 18:59:30', 2, 'e087d9a1-df76-43b3-abfa-42049e328531'),
	(2, 'Quiero saber más del entorno de la propiedad, por favor llamame al 9696875868', '2025-01-21 19:04:55', '2025-01-21 19:04:55', 2, 'e087d9a1-df76-43b3-abfa-42049e328531'),
	(3, 'Quiero saber más del entorno de la propiedad, por favor llamame al 9696875868', '2025-01-21 19:07:20', '2025-01-21 19:07:20', 2, 'e087d9a1-df76-43b3-abfa-42049e328531'),
	(4, 'Quiero saber más del entorno de la propiedad, por favor llamame al 9696875868', '2025-01-21 19:07:21', '2025-01-21 19:07:21', 2, 'e087d9a1-df76-43b3-abfa-42049e328531'),
	(5, 'Quiero saber más del entorno de la propiedad, por favor llamame al 9696875868', '2025-01-21 19:07:22', '2025-01-21 19:07:22', 2, 'e087d9a1-df76-43b3-abfa-42049e328531'),
	(6, 'Quiero saber más del entorno de la propiedad, por favor llamame al 9696875868', '2025-01-21 19:08:26', '2025-01-21 19:08:26', 2, 'e087d9a1-df76-43b3-abfa-42049e328531');

-- Volcando estructura para tabla bienesraices_node_mvc.precios
CREATE TABLE IF NOT EXISTS `precios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `precio` varchar(30) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienesraices_node_mvc.precios: ~10 rows (aproximadamente)
INSERT INTO `precios` (`id`, `precio`, `createdAt`, `updatedAt`) VALUES
	(1, '0 - 10,000€', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(2, '10,000 € - 30,000 €', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(3, '30,000 € -50,000 €', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(4, '50,000 € -75,000 €', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(5, '75,000 € - 100,000 €', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(6, '100,000 € - 150,000 €', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(7, '150,000 € - 200,000 €', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(8, '200,000 € - 300,000 €', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(9, '300,000 € - 500,000 €', '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(10, '+ 500,000 €', '2025-01-13 15:12:22', '2025-01-13 15:12:22');

-- Volcando estructura para tabla bienesraices_node_mvc.propiedades
CREATE TABLE IF NOT EXISTS `propiedades` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `habitaciones` int NOT NULL,
  `estacionamiento` int NOT NULL,
  `wc` int NOT NULL,
  `calle` varchar(100) NOT NULL,
  `lat` varchar(255) NOT NULL,
  `lng` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `publicado` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `precioId` int DEFAULT NULL,
  `categoriaId` int DEFAULT NULL,
  `usuarioId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `precioId` (`precioId`),
  KEY `categoriaId` (`categoriaId`),
  KEY `usuarioId` (`usuarioId`),
  CONSTRAINT `propiedades_ibfk_1` FOREIGN KEY (`precioId`) REFERENCES `precios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `propiedades_ibfk_2` FOREIGN KEY (`categoriaId`) REFERENCES `categorias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `propiedades_ibfk_3` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienesraices_node_mvc.propiedades: ~14 rows (aproximadamente)
INSERT INTO `propiedades` (`id`, `titulo`, `descripcion`, `habitaciones`, `estacionamiento`, `wc`, `calle`, `lat`, `lng`, `img`, `publicado`, `createdAt`, `updatedAt`, `precioId`, `categoriaId`, `usuarioId`) VALUES
	('05fe8e4a-54c6-4db8-9456-9ee74b486f80', 'Cabaña en la montaña', 'Preciosa cabaña de monte', 2, 3, 1, 'Lugar El Mayes 4', '38.11443960672', '-1.377770137683', 'jsj0h54s8ro1ihphthc1.jpg', 1, '2025-01-17 07:16:14', '2025-01-24 10:25:51', 2, 3, 1),
	('0fc4ddcf-f752-42a2-9e28-b09b15a37566', 'Casa con piscina', 'gasdfgsdaf dasfasdfasdfasdf', 3, 2, 3, 'Carril Sauras 22', '37.955802575665', '-1.100501223048', '3makuev25s1ihpi4uao.jpg', 1, '2025-01-17 07:20:17', '2025-01-24 10:23:04', 6, 1, 1),
	('1043df2f-cfc7-41f9-ba21-ccaa00aa38eb', 'Casa de mis padres', 'Algo antigua pero reformada se revaloriza', 1, 1, 1, 'Calle Párroco Pedro Martínez Conesa 11', '37.984774997151', '-1.117116729137', '2vo3hratd8g1ihpi2p9s.jpg', 1, '2025-01-17 07:19:07', '2025-01-24 10:14:47', 4, 1, 1),
	('4111d7e7-7dd8-4e46-9333-b58b06230d2c', 'casa en el bosque', 'La mejor casa de tu vida', 1, 1, 2, 'Lugar Aliagar 124', '38.208786853686', '-1.890069461376', 'q18dbf0adug1ihpj63j2.jpg', 1, '2025-01-17 07:38:22', '2025-01-24 10:14:37', 4, 5, 1),
	('54ce5505-8d50-41a9-9e6e-0d859c5f7a43', 'Casa preciosa', 'en un lugar magico, con vecinos inmejorables y vistas espectaculares', 2, 1, 3, 'Calle de la Rabasa 4', '37.809941646771', '-0.800333117365', 'uql43ff9a6g1ihpj1ag7.jpg', 1, '2025-01-17 07:35:47', '2025-01-17 07:35:56', 6, 2, 1),
	('66183fee-f975-4ec9-8605-abb08e1f9267', 'Primera choza', 'muy pequeña', 1, 3, 1, 'Calle del Corregidor Vicente Cano Altares 12', '37.992322162994', '-1.118711980474', '4oj7pr7tu61ihid1u1k.PNG', 1, '2025-01-14 12:36:37', '2025-01-15 09:11:45', 1, 5, 1),
	('6650e669-49d5-41cf-b88b-5b1efa924ef4', 'Piso reformada experior con garaje y piscina comunitaria', 'afadfs', 3, 1, 3, 'Avenida de la Marina Española 39', '37.9952331', '-1.121817', 'vsqppdfdeq1ihi05c0e.PNG', 1, '2025-01-13 17:16:18', '2025-01-14 08:51:25', 8, 4, 1),
	('74ae6c5b-ff8d-4b8a-a80f-37e26fc0435d', 'Casa de lujo', 'Preciosa casa cerca del mar para vivir en familia o si te gusta tener mucho espacio', 5, 2, 3, 'Avenida Poniente-Ur S.Gines Az 57', '37.568743176557', '-1.18514805156', '7oh0cfmtq51ihpision.jpg', 1, '2025-01-17 07:33:04', '2025-01-17 07:33:21', 10, 1, 1),
	('a6beb2b5-fd08-4346-9ba4-9b429adff9fd', 'Apartamento de lujo', 'todo de primerisima calidad, a estrenar, calefacción, buenas ventanas, chimenea', 4, 1, 2, 'Calle Linares 4', '37.357519552093', '-1.654913144441', '42ju1m4uuj81ihpionfq.jpg', 1, '2025-01-17 07:31:06', '2025-01-17 07:31:15', 9, 1, 1),
	('b092749e-401f-4d82-a704-899f86bd0225', 'Almacen dentro de apartamento', 'Gran almacen dentro de una bonita casa', 1, 1, 1, 'Paseo Misionero Luis Fontes 3', '38.002546899022', '-1.139122602129', '7fv472ln44o1ihphv5r8.jpg', 1, '2025-01-17 07:17:12', '2025-01-17 07:17:17', 3, 3, 1),
	('b900e32f-fa16-447d-af44-308bb642aef5', 'Casi en la playa', 'Preciosa casa en la playa con vistas al mar y con una infinidad de planes que puedes hacer por la zona. Preferiblemente sin mascotas, pero si tienes hablame por privado y lo vemos, depende mucho del tipo de animal. Hay pocos vecinos y mucho silencio en todo el año, los meses de verano son más ajetreados pero aun así no se llena el edificio entero nunca, siempre hay aparcamiento. ', 3, 2, 2, 'Avenida de los Espejos', '37.577221340209', '-1.22041045206', 'g0l2m9g5q41ihphrlas.jpg', 1, '2025-01-17 07:14:08', '2025-01-17 07:20:48', 5, 2, 1),
	('b9782cb5-45c0-448e-b58f-4cbcfee2bfb1', 'casa con cocina amueblada', 'recien amueblada toda la casa, a estrenar', 2, 1, 1, 'Avenida Nuestra Señora de Atocha 35', '38.001838251018', '-1.128729712744', '2e4pd0pf3oo1ihpiv3ca.jpg', 1, '2025-01-17 07:34:32', '2025-01-17 07:34:43', 3, 1, 1),
	('d39a6241-ddfe-428d-b4ae-8b74a2e8a673', 'casa recien construida', 'Casa recien reformada, todo incluido.', 4, 3, 3, 'Calle Calvario 13', '37.935448381088', '-1.132454462877', 'fo8be6317s1ihpi0v2s.jpg', 1, '2025-01-17 07:18:11', '2025-01-17 07:18:16', 10, 1, 1),
	('e087d9a1-df76-43b3-abfa-42049e328531', 'Casa en el corazon de la ciudad', 'Características Principales:\r\nSuperficie: 120 m² distribuidos de manera funcional para aprovechar al máximo cada rincón.\r\nCocina: Totalmente equipada con electrodomésticos de última generación y espacio para comedor.\r\nSalón: Un salón-comedor espacioso y luminoso con ventanales que ofrecen vistas despejadas.\r\nExtras: Suelo de parquet, aire acondicionado, calefacción central y armarios empotrados en todas las habitaciones.\r\n\r\n¿Es este el hogar que siempre soñaste? Ven y descúbrelo. ❤️', 3, 1, 2, 'Calle de Alfaro 7', '37.986071421177', '-1.130662271182', 'k1p5crqukfg1ihpjcaij.jpg', 1, '2025-01-17 07:41:46', '2025-01-21 07:55:51', 9, 1, 1);

-- Volcando estructura para tabla bienesraices_node_mvc.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `confirmado` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla bienesraices_node_mvc.usuarios: ~2 rows (aproximadamente)
INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `token`, `confirmado`, `createdAt`, `updatedAt`) VALUES
	(1, 'Jaime', 'jmg1095@gmail.com', '$2b$10$tRjwdY3i5K2Hh14k0NkOxu72ubmcPM.xHRSBo4fnaMj4mXlRD7vPO', NULL, 1, '2025-01-13 15:12:22', '2025-01-13 15:12:22'),
	(2, 'Pepe', 'pepito@gmail.com', '$2b$10$Y6VrVUqgsLo13F6EMmb/5ONUQArDoiCEzGdqFE.BYEdqk3dMVB7VG', NULL, 1, '2025-01-13 18:32:25', '2025-01-13 18:32:35');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
