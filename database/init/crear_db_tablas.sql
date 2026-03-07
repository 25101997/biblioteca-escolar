USE master;
GO

IF DB_ID('Examen') IS NOT NULL
BEGIN
    ALTER DATABASE Examen SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE Examen;
END
GO

-- CREAR BASE DE DATOS
CREATE DATABASE Examen;
GO

USE Examen;
GO

-- Tabla Libro
CREATE TABLE dbo.Libro
(
    IdLibro       INT IDENTITY(1,1) NOT NULL,
    Titulo        NVARCHAR(200) NOT NULL,
    Editorial     NVARCHAR(150) NOT NULL,
    Area          NVARCHAR(100) NOT NULL,
    CONSTRAINT PK_Libro PRIMARY KEY CLUSTERED (IdLibro)
);
GO

-- Tabla Autor
CREATE TABLE dbo.Autor
(
    IdAutor        INT IDENTITY(1,1) NOT NULL,
    Nombre         NVARCHAR(150) NOT NULL,
    Nacionalidad   NVARCHAR(100) NOT NULL,
    CONSTRAINT PK_Autor PRIMARY KEY CLUSTERED (IdAutor)
);
GO

-- Tabla intermedia Libro-Autor
CREATE TABLE dbo.LibAut
(
    IdAutor       INT NOT NULL,
    IdLibro       INT NOT NULL,
    CONSTRAINT PK_LibAut PRIMARY KEY CLUSTERED (IdAutor, IdLibro),
    CONSTRAINT FK_LibAut_Autor FOREIGN KEY (IdAutor)
        REFERENCES dbo.Autor(IdAutor),
    CONSTRAINT FK_LibAut_Libro FOREIGN KEY (IdLibro)
        REFERENCES dbo.Libro(IdLibro)
);
GO

-- Tabla Estudiante
CREATE TABLE dbo.Estudiante
(
    IdLector      INT IDENTITY(1,1) NOT NULL,
    CI            NVARCHAR(25) NOT NULL,
    Nombre        NVARCHAR(150) NOT NULL,
    Direccion     NVARCHAR(250) NULL,
    Carrera       NVARCHAR(120) NOT NULL,
    Edad          TINYINT NOT NULL,
    CONSTRAINT PK_Estudiante PRIMARY KEY CLUSTERED (IdLector),
    CONSTRAINT UQ_Estudiante_CI UNIQUE (CI),
    CONSTRAINT CK_Estudiante_Edad CHECK (Edad BETWEEN 15 AND 100)
);
GO

-- Tabla Prestamo SIN IdPrestamo
CREATE TABLE dbo.Prestamo
(
    IdLector           INT NOT NULL,
    IdLibro            INT NOT NULL,
    FechaPrestamo      DATETIME2(0) NOT NULL,
    FechaDevolucion    DATETIME2(0) NULL,
    Devuelto           BIT NOT NULL CONSTRAINT DF_Prestamo_Devuelto DEFAULT (0),

    CONSTRAINT PK_Prestamo PRIMARY KEY CLUSTERED (IdLector, IdLibro, FechaPrestamo),

    CONSTRAINT FK_Prestamo_Estudiante FOREIGN KEY (IdLector)
        REFERENCES dbo.Estudiante(IdLector),

    CONSTRAINT FK_Prestamo_Libro FOREIGN KEY (IdLibro)
        REFERENCES dbo.Libro(IdLibro),

    CONSTRAINT CK_Prestamo_Fechas CHECK
    (
        FechaDevolucion IS NULL OR FechaDevolucion >= FechaPrestamo
    ),

    CONSTRAINT CK_Prestamo_Devuelto CHECK
    (
        (Devuelto = 0 AND FechaDevolucion IS NULL)
        OR
        (Devuelto = 1 AND FechaDevolucion IS NOT NULL)
    )
);
GO

-- ÍNDICES PARA RENDIMIENTO

CREATE UNIQUE NONCLUSTERED INDEX IX_Estudiante_CI
ON dbo.Estudiante(CI);
GO

CREATE NONCLUSTERED INDEX IX_Prestamo_IdLibro_FechaPrestamo
ON dbo.Prestamo(IdLibro, FechaPrestamo)
INCLUDE (IdLector, Devuelto, FechaDevolucion);
GO

CREATE NONCLUSTERED INDEX IX_Prestamo_IdLector_FechaPrestamo
ON dbo.Prestamo(IdLector, FechaPrestamo)
INCLUDE (IdLibro, Devuelto, FechaDevolucion);
GO

CREATE NONCLUSTERED INDEX IX_LibAut_IdLibro
ON dbo.LibAut(IdLibro);
GO
