CREATE TABLE IF NOT EXISTS administrador 
( id_administrador INT NOT NULL AUTO_INCREMENT , nombre VARCHAR(255) NOT NULL , 
psw_admin VARCHAR(255) NULL, email_admin VARCHAR(255) NOT NULL,  telefono_admin DOUBLE NOT NULL,PRIMARY KEY (id_administrador)) 
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS clientes 
( id_cliente INT NOT NULL AUTO_INCREMENT , razon_social_cliente VARCHAR(255) NOT NULL , 
direccion VARCHAR(255) NULL, email VARCHAR(255) NOT NULL,  telefono DOUBLE NOT NULL,PRIMARY KEY (id_cliente)) 
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS sucursales 
( id_sucursal INT NOT NULL AUTO_INCREMENT , id_cliente INT NOT NULL, 
razon_social_sucursal VARCHAR(255) NOT NULL, direccion_sucursal VARCHAR(255) NOT NULL, email_sucursal VARCHAR(255) NOT NULL,
telefono_sucursal DOUBLE NOT NULL,
PRIMARY KEY (id_sucursal)) 
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS planos 
( id_plano INT NOT NULL AUTO_INCREMENT , id_sucursal INT NOT NULL, 
url_imagen_plano LONGTEXT NOT NULL,
PRIMARY KEY (id_plano)) 
ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS visitas 
( id_visita INT NOT NULL AUTO_INCREMENT , id_tecnico INT NOT NULL , id_sucursal INT NOT NULL, 
id_cliente INT NOT NULL, fecha_visita DATE NOT NULL ,PRIMARY KEY (id_visita)) 
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS tecnicos 
( id_tecnico INT NOT NULL AUTO_INCREMENT , nombre_tecnico VARCHAR(255) NOT NULL, 
apellido_tecnico VARCHAR(255) NOT NULL , responsable BOOLEAN NOT NULL,estado_tecnico VARCHAR(255),
PRIMARY KEY (id_tecnico)) 
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS servicios 
(id_servicio INT NOT NULL AUTO_INCREMENT,nombre_servicio VARCHAR(255), 
qr BOOLEAN , PRIMARY KEY (id_servicio))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS campos 
(id_campo INT NOT NULL AUTO_INCREMENT,id_servicio INT, 
tipo_campo VARCHAR(255), PRIMARY KEY (id_campo))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS opciones 
(id_opcion INT NOT NULL AUTO_INCREMENT,id_campo INT, 
tipo_opcion VARCHAR(255), PRIMARY KEY (id_opcion))
ENGINE = InnoDB;


ALTER TABLE campos
ADD nombre_campo varchar(255);

ALTER TABLE visitas
ADD estado_visitas varchar(255);


CREATE TABLE IF NOT EXISTS servicios_adquiridos 
( id_servicios_adquirido INT NOT NULL AUTO_INCREMENT,id_servicio INT NOT NULL,
id_visita INT NOT NULL, 
PRIMARY KEY (id_servicios_adquirido))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS formularios 
(id_formulario INT NOT NULL AUTO_INCREMENT PRIMARY KEY , id_visita INT , 
id_servicio INT)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS respuestas 
(id_respuesta INT NOT NULL AUTO_INCREMENT PRIMARY KEY , id_campo INT , 
respuesta VARCHAR(255), id_formulario INT)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS equipos 
(id_equipo INT NOT NULL AUTO_INCREMENT , id_servicio INT, codigo_qr_equipo TEXT,  nombre_equipo VARCHAR(255),PRIMARY KEY (id_equipo)) 
ENGINE = InnoDB;

------------------------------------------------------------------------------------

ALTER TABLE tecnicos
ADD clave varchar(255);


ALTER TABLE tecnicos
ADD dni DOUBLE;

ALTER TABLE tecnicos
ADD email_tecnico varchar(255);

ALTER TABLE tecnicos
ADD telefono_tecnico varchar(255);

ALTER TABLE visitas
ADD firma_cliente TEXT;

ALTER TABLE visitas
ADD firma_tecnico TEXT;

ALTER TABLE visitas
ADD horario_entrada varchar(255);

ALTER TABLE visitas
ADD horario_salida varchar(255);

ALTER TABLE campos
ADD id_equipo INT;

ALTER TABLE visitas
ADD observaciones text;


ALTER TABLE `tecnicos` ADD `user_tecnico` VARCHAR(255) NOT NULL AFTER `estado_tecnico`; 
ALTER TABLE clientes ADD COLUMN logo_cliente LONGTEXT;

alter table 'servicios' add 'estado_servicio' varchar(255) NOT NULL;
alter table 'servicios_adquiridos' add 'estado_servicio_adquiridos' varchar(255) NOT NULL;