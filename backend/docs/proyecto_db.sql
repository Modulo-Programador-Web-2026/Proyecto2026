-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: proyecto_db
-- ------------------------------------------------------
-- Server version	8.4.5

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',3,'add_permission'),(6,'Can change permission',3,'change_permission'),(7,'Can delete permission',3,'delete_permission'),(8,'Can view permission',3,'view_permission'),(9,'Can add group',2,'add_group'),(10,'Can change group',2,'change_group'),(11,'Can delete group',2,'delete_group'),(12,'Can view group',2,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add rol',7,'add_rol'),(22,'Can change rol',7,'change_rol'),(23,'Can delete rol',7,'delete_rol'),(24,'Can view rol',7,'view_rol'),(25,'Can add grupo sanguineo',6,'add_gruposanguineo'),(26,'Can change grupo sanguineo',6,'change_gruposanguineo'),(27,'Can delete grupo sanguineo',6,'delete_gruposanguineo'),(28,'Can view grupo sanguineo',6,'view_gruposanguineo'),(29,'Can add user',8,'add_usuario'),(30,'Can change user',8,'change_usuario'),(31,'Can delete user',8,'delete_usuario'),(32,'Can view user',8,'view_usuario'),(33,'Can add inscripcion',9,'add_inscripcion'),(34,'Can change inscripcion',9,'change_inscripcion'),(35,'Can delete inscripcion',9,'delete_inscripcion'),(36,'Can view inscripcion',9,'view_inscripcion'),(37,'Can add campania',10,'add_campania'),(38,'Can change campania',10,'change_campania'),(39,'Can delete campania',10,'delete_campania'),(40,'Can view campania',10,'view_campania'),(41,'Can add estado_ campania',11,'add_estado_campania'),(42,'Can change estado_ campania',11,'change_estado_campania'),(43,'Can delete estado_ campania',11,'delete_estado_campania'),(44,'Can view estado_ campania',11,'view_estado_campania');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campanias_campania`
--

DROP TABLE IF EXISTS `campanias_campania`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campanias_campania` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(1500) NOT NULL,
  `ubicacion` varchar(100) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `estado_campania_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `campanias_campania_estado_campania_id_08cfbac1_fk_campanias` (`estado_campania_id`),
  CONSTRAINT `campanias_campania_estado_campania_id_08cfbac1_fk_campanias` FOREIGN KEY (`estado_campania_id`) REFERENCES `campanias_estado_campania` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campanias_campania`
--

LOCK TABLES `campanias_campania` WRITE;
/*!40000 ALTER TABLE `campanias_campania` DISABLE KEYS */;
INSERT INTO `campanias_campania` VALUES (1,'Donación de Sangre Hospital Central','Campaña solidaria para pacientes en cirugías y emergencias críticas.','Hospital Central Córdoba','2026-06-10','2026-06-15',1),(2,'Jornada Donación Plaza Central','Evento abierto para donantes voluntarios de todos los grupos sanguíneos.','Plaza Central Córdoba','2026-07-01','2026-07-02',2);
/*!40000 ALTER TABLE `campanias_campania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `campanias_estado_campania`
--

DROP TABLE IF EXISTS `campanias_estado_campania`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `campanias_estado_campania` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `estado` (`estado`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campanias_estado_campania`
--

LOCK TABLES `campanias_estado_campania` WRITE;
/*!40000 ALTER TABLE `campanias_estado_campania` DISABLE KEYS */;
INSERT INTO `campanias_estado_campania` VALUES (1,'Activa'),(2,'Finalizada'),(3,'Proximamente');
/*!40000 ALTER TABLE `campanias_estado_campania` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_usuarios_usuario_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_usuarios_usuario_id` FOREIGN KEY (`user_id`) REFERENCES `usuarios_usuario` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2026-05-10 17:37:11.924896','11','ammaia admin',1,'[{\"added\": {}}]',8,4),(2,'2026-05-10 18:20:13.157404','12','irina pirles',1,'[{\"added\": {}}]',8,4),(3,'2026-05-10 18:31:45.051045','13','vainilla Pirles',1,'[{\"added\": {}}]',8,4),(4,'2026-05-10 18:35:13.747465','14','Abigail Picone',1,'[{\"added\": {}}]',8,4);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(2,'auth','group'),(3,'auth','permission'),(10,'campanias','campania'),(11,'campanias','estado_campania'),(4,'contenttypes','contenttype'),(9,'inscripciones','inscripcion'),(5,'sessions','session'),(6,'usuarios','gruposanguineo'),(7,'usuarios','rol'),(8,'usuarios','usuario');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2026-05-09 15:21:11.620458'),(2,'contenttypes','0002_remove_content_type_name','2026-05-09 15:21:13.371658'),(3,'auth','0001_initial','2026-05-09 15:21:17.546203'),(4,'auth','0002_alter_permission_name_max_length','2026-05-09 15:21:18.497845'),(5,'auth','0003_alter_user_email_max_length','2026-05-09 15:21:18.533343'),(6,'auth','0004_alter_user_username_opts','2026-05-09 15:21:18.602205'),(7,'auth','0005_alter_user_last_login_null','2026-05-09 15:21:18.658190'),(8,'auth','0006_require_contenttypes_0002','2026-05-09 15:21:18.709443'),(9,'auth','0007_alter_validators_add_error_messages','2026-05-09 15:21:18.780743'),(10,'auth','0008_alter_user_username_max_length','2026-05-09 15:21:18.847092'),(11,'auth','0009_alter_user_last_name_max_length','2026-05-09 15:21:18.954984'),(12,'auth','0010_alter_group_name_max_length','2026-05-09 15:21:19.140385'),(13,'auth','0011_update_proxy_permissions','2026-05-09 15:21:19.177650'),(14,'auth','0012_alter_user_first_name_max_length','2026-05-09 15:21:19.221960'),(15,'usuarios','0001_initial','2026-05-09 15:21:29.077322'),(16,'admin','0001_initial','2026-05-09 15:21:31.359544'),(17,'admin','0002_logentry_remove_auto_add','2026-05-09 15:21:31.412225'),(18,'admin','0003_logentry_add_action_flag_choices','2026-05-09 15:21:31.482364'),(19,'campanias','0001_initial','2026-05-09 15:21:32.449529'),(20,'inscripciones','0001_initial','2026-05-09 15:21:33.913250'),(21,'inscripciones','0002_initial','2026-05-09 15:21:35.321495'),(22,'sessions','0001_initial','2026-05-09 15:21:35.965602'),(23,'campanias','0002_campania_estado_campania','2026-05-09 15:35:24.539560'),(24,'usuarios','0002_alter_usuario_email','2026-05-10 18:10:30.032078');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('0p330r79fhqz9frmj68m7bcbpwt90o8v','.eJxVjEEOwiAQAP_C2ZBC6IIevfsGsssuUjWQlPZk_Lsh6UGvM5N5q4j7VuLeZY0Lq4ty6vTLCNNT6hD8wHpvOrW6rQvpkejDdn1rLK_r0f4NCvYytjwTOp9YJGOA5OaUrQEgMpMAAGEwApIpmOBhEutQDNHZBsuQwavPFw7LOJs:1wM8jh:QjlLyklsUXCK-tiLGh3fySc-A5SeVCeDsgzVT-8PZw4','2026-05-24 18:18:41.850168');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones_inscripcion`
--

DROP TABLE IF EXISTS `inscripciones_inscripcion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones_inscripcion` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `fecha_inscripcion` datetime(6) NOT NULL,
  `campania_id` bigint NOT NULL,
  `usuario_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inscripciones_inscri_campania_id_bda42df4_fk_campanias` (`campania_id`),
  KEY `inscripciones_inscri_usuario_id_481272be_fk_usuarios_` (`usuario_id`),
  CONSTRAINT `inscripciones_inscri_campania_id_bda42df4_fk_campanias` FOREIGN KEY (`campania_id`) REFERENCES `campanias_campania` (`id`),
  CONSTRAINT `inscripciones_inscri_usuario_id_481272be_fk_usuarios_` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_usuario` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones_inscripcion`
--

LOCK TABLES `inscripciones_inscripcion` WRITE;
/*!40000 ALTER TABLE `inscripciones_inscripcion` DISABLE KEYS */;
INSERT INTO `inscripciones_inscripcion` VALUES (1,'2026-05-09 00:00:00.000000',1,1),(2,'2026-05-09 00:00:00.000000',1,2),(3,'2026-05-09 00:00:00.000000',2,3),(5,'2026-05-10 19:04:29.793128',1,15);
/*!40000 ALTER TABLE `inscripciones_inscripcion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_gruposanguineo`
--

DROP TABLE IF EXISTS `usuarios_gruposanguineo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_gruposanguineo` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `grupo` varchar(5) NOT NULL,
  `factor` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_gruposanguineo_grupo_factor_990eaf2e_uniq` (`grupo`,`factor`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_gruposanguineo`
--

LOCK TABLES `usuarios_gruposanguineo` WRITE;
/*!40000 ALTER TABLE `usuarios_gruposanguineo` DISABLE KEYS */;
INSERT INTO `usuarios_gruposanguineo` VALUES (2,'A','-'),(1,'A','+'),(6,'AB','-'),(5,'AB','+'),(4,'B','-'),(3,'B','+'),(8,'O','-'),(7,'O','+');
/*!40000 ALTER TABLE `usuarios_gruposanguineo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_rol`
--

DROP TABLE IF EXISTS `usuarios_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_rol` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipo_rol` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo_rol` (`tipo_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_rol`
--

LOCK TABLES `usuarios_rol` WRITE;
/*!40000 ALTER TABLE `usuarios_rol` DISABLE KEYS */;
INSERT INTO `usuarios_rol` VALUES (1,'Administrador'),(2,'Usuario Estandar'),(3,'Usuario Invitado');
/*!40000 ALTER TABLE `usuarios_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_usuario`
--

DROP TABLE IF EXISTS `usuarios_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `dni` varchar(20) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `fecha_registro` date NOT NULL,
  `grupo_sanguineo_id` bigint DEFAULT NULL,
  `rol_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `dni` (`dni`),
  UNIQUE KEY `usuarios_usuario_email_0a82e5f9_uniq` (`email`),
  KEY `usuarios_usuario_grupo_sanguineo_id_c55ac207_fk_usuarios_` (`grupo_sanguineo_id`),
  KEY `usuarios_usuario_rol_id_b0d64932_fk_usuarios_rol_id` (`rol_id`),
  CONSTRAINT `usuarios_usuario_grupo_sanguineo_id_c55ac207_fk_usuarios_` FOREIGN KEY (`grupo_sanguineo_id`) REFERENCES `usuarios_gruposanguineo` (`id`),
  CONSTRAINT `usuarios_usuario_rol_id_b0d64932_fk_usuarios_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `usuarios_rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_usuario`
--

LOCK TABLES `usuarios_usuario` WRITE;
/*!40000 ALTER TABLE `usuarios_usuario` DISABLE KEYS */;
INSERT INTO `usuarios_usuario` VALUES (1,'pbkdf2_sha256$1200000$wXiA0Xwh9bp2Ua7SeAvuaR$W2TJ2C9OfaBcW6qTx1X4QnPntly6UAa5KdOoDB61Rpc=',NULL,1,'administrador','','','administrador@gmail.com',1,1,'2026-05-09 15:38:33.474120','30111222','Sofia','Lopez','2026-05-09',1,1),(2,'pbkdf2_sha256$1200000$iu2g2oNsXobdSuTijNEGCb$sgBseS2362y7JZnks9wTuMtdDkkxOVJ2Vg+G5cT1ybE=',NULL,0,'deanwinchester','','','dean@gmail.com',0,1,'2026-05-09 15:38:33.478843','40111222','Dean','Winchester','2026-05-09',7,2),(3,'pbkdf2_sha256$1200000$bDxtiVFTGhENXdmKA54OxA$cCOJueIOSazP5kglJPZ7R9TcObYPwBgR8ycABeWp+sE=',NULL,0,'empanadathebest','','','empanadita@gmail.com',0,1,'2026-05-09 15:38:33.479987','30111333','Carlos','Lopez','2026-05-09',5,2),(4,'pbkdf2_sha256$1200000$4TOKwYxIXWotc7scR2kFMS$3f55r0KV05EmFpsWCnlCjPy5R4Ji8twtD0+ndE+7wMA=','2026-05-10 18:18:41.731018',1,'admin','','','admin@gmail.com',1,1,'2026-05-09 15:52:18.510739','','','','2026-05-09',NULL,NULL),(11,'pbkdf2_sha256$1200000$x3tUNCL6iqlVqVayAf1luU$tGLyFYarJUkb1Qq1iqNf2ROvHbWslTXG9g8BOhRYSGQ=','2026-05-10 17:32:37.000000',0,'ammaia','ammaia','admin','ammaia@gmail.com',0,1,'2026-05-10 17:32:17.000000','123456789','ammaia','admin','2026-05-10',1,1),(12,'123456','2026-05-10 18:18:56.000000',0,'irina','irina','pirles','irinaprueba@gmail.com',0,1,'2026-05-10 18:18:47.000000','12745889','irina','pirles','2026-05-10',7,1),(13,'pbkdf2_sha256$1200000$Y0fcRelXWgXQVLWnJ39i0w$Ws/E7OJ8JJAmsb7suTlpttlltWtmef8OOUg96R+5s44=',NULL,0,'vainilla','','','vainilla@gmail.com',0,1,'2026-05-10 18:31:43.997539','47717888','vainilla','Pirles','2026-05-10',NULL,1),(14,'pbkdf2_sha256$1200000$tyDVsFFF70pchZ9YFkZKM1$K3g7YxxFxDsBhMShdK7KrwI5LM2jxSSOIzH1/CACroI=',NULL,0,'abigail','','','abigail@gmail.com',0,1,'2026-05-10 18:35:12.726935','12456777','Abigail','Picone','2026-05-10',NULL,2),(15,'',NULL,0,'','','','',0,1,'2026-05-10 19:04:27.975914','12345666','juana','perez','2026-05-10',1,NULL);
/*!40000 ALTER TABLE `usuarios_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_usuario_groups`
--

DROP TABLE IF EXISTS `usuarios_usuario_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_usuario_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_usuario_groups_usuario_id_group_id_4ed5b09e_uniq` (`usuario_id`,`group_id`),
  KEY `usuarios_usuario_groups_group_id_e77f6dcf_fk_auth_group_id` (`group_id`),
  CONSTRAINT `usuarios_usuario_gro_usuario_id_7a34077f_fk_usuarios_` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_usuario` (`id`),
  CONSTRAINT `usuarios_usuario_groups_group_id_e77f6dcf_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_usuario_groups`
--

LOCK TABLES `usuarios_usuario_groups` WRITE;
/*!40000 ALTER TABLE `usuarios_usuario_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_usuario_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_usuario_user_permissions`
--

DROP TABLE IF EXISTS `usuarios_usuario_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_usuario_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `usuario_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuarios_usuario_user_pe_usuario_id_permission_id_217cadcd_uniq` (`usuario_id`,`permission_id`),
  KEY `usuarios_usuario_use_permission_id_4e5c0f2f_fk_auth_perm` (`permission_id`),
  CONSTRAINT `usuarios_usuario_use_permission_id_4e5c0f2f_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `usuarios_usuario_use_usuario_id_60aeea80_fk_usuarios_` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios_usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_usuario_user_permissions`
--

LOCK TABLES `usuarios_usuario_user_permissions` WRITE;
/*!40000 ALTER TABLE `usuarios_usuario_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios_usuario_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-10 22:18:02
