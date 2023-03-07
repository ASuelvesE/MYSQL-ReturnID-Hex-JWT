

CREATE DATABASE `piramipet_Angel` /*!40100 DEFAULT CHARACTER SET latin1 */;


CREATE TABLE `animales` (
  `DNI` varchar(20) NOT NULL,
  `chip` varchar(20) DEFAULT NULL,
  `nombre` varchar(20) DEFAULT NULL,
  `genero` varchar(20) DEFAULT NULL,
  `color` varchar(20) DEFAULT NULL,
  `fechaNacimiento` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;