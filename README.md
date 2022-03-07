# api-test-caja

Para correr el proyecto, utilice el comando npm start api.js
El backend correrá en el puerto 8090

Los comandos utilizados para la creacion de la base de datos son los siguientes

create database test;

use test;

CREATE TABLE dbo.cliente  
   (idCLiente int PRIMARY KEY NOT NULL,  
   nombre varchar(25),
   apellidoPaterno varchar(25),
   apellidoMaterno varchar(25),
   rfc varchar(25),
   curp varchar(25),  
   fechaAlta datetime);

CREATE TABLE dbo.cliente_cuenta
(idClienteCuenta int PRIMARY KEY NOT NULL,
idCLiente int, 
idCuenta int,
saldoActual money,
fechaContratacion datetime,
fechaUltimoMovimiento datatime)

CREATE TABLE tipo_cuenta
(idCuenta int PRIMARY KEY NOT NULL,
nombreCuenta varchar(25))

ALTER TABLE test.dbo.cliente_cuenta
   ADD CONSTRAINT FK_Cliente_Cuenta FOREIGN KEY (idCLiente)
      REFERENCES dbo.cliente (idCliente)
      ON DELETE CASCADE
      ON UPDATE CASCADE
;

ALTER TABLE test.dbo.cliente_cuenta
   ADD CONSTRAINT FK_Cliente_Tipo_Cuenta FOREIGN KEY (idCuenta)
      REFERENCES dbo.tipo_cuenta (idCuenta)
      ON DELETE CASCADE
      ON UPDATE CASCADE
;

-- =============================================
CREATE PROCEDURE ShowAllClients 
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * from  [cliente];

END
GO

========================================================
CREATE PROCEDURE UpdateClient
        	@name VARCHAR(50),
		@firstname VARCHAR(50),
		@lastname VARCHAR(50),
		@rfc VARCHAR(50),
		@curp VARCHAR(50),
		@id int
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE [cliente] SET [nombre]= @name, [apellidoPaterno] =@firstname, [apellidoMaterno]=@lastname,[rfc]=@rfc,[curp]=@curp
	WHERE [idCliente] = @id
 
END
GO





EXEC UpdateClient @name= "test",@firstname='test',@lastname='test', @rfc='test',@curp='test',@id=1;

============================================================
CREATE PROCEDURE ShowSingleClient @id int
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * from  [cliente] inner join cliente_cuenta on cliente.idCLiente=cliente_cuenta.idCLiente
	inner join tipo_cuenta on cliente_cuenta.idCuenta=tipo_cuenta.idCuenta
	where cliente.idCliente = 1;
END
GO

exec ShowSingleCliente @id=1;

====================================================
 

CREATE PROCEDURE DeleteClient @id int
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	delete from [cliente] where idCliente = @id;
END
GO

exec ShowSingleCliente @id=@id;

==========================================
CREATE PROCEDURE InsertClient @id,@name,@firstname,@lastname,@rfc,@curp
AS 
BEGIN
insert into cliente values(@id,@name,@firstname,@lastname,@rfc,@curp,'2012-06-18 10:34:09.000')
END 
GO

exec InsertClient 
"# backend-cmv" 
