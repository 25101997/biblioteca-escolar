USE Examen;
GO

-- INSERTAR ESTUDIANTE
CREATE OR ALTER PROCEDURE dbo.sp_Estudiante_Insertar
    @CI         NVARCHAR(25),
    @Nombre     NVARCHAR(150),
    @Direccion  NVARCHAR(250) = NULL,
    @Carrera    NVARCHAR(120),
    @Edad       TINYINT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (SELECT 1 FROM dbo.Estudiante WHERE CI = @CI)
    BEGIN
        THROW 50001, 'Ya existe un estudiante con ese CI.', 1;
    END;

    INSERT INTO dbo.Estudiante (CI, Nombre, Direccion, Carrera, Edad)
    VALUES (@CI, @Nombre, @Direccion, @Carrera, @Edad);

    SELECT SCOPE_IDENTITY() AS IdLectorGenerado;
END;
GO

-- MODIFICAR ESTUDIANTE
CREATE OR ALTER PROCEDURE dbo.sp_Estudiante_Modificar
    @IdLector   INT,
    @CI         NVARCHAR(25),
    @Nombre     NVARCHAR(150),
    @Direccion  NVARCHAR(250) = NULL,
    @Carrera    NVARCHAR(120),
    @Edad       TINYINT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM dbo.Estudiante WHERE IdLector = @IdLector)
    BEGIN
        THROW 50002, 'El estudiante no existe.', 1;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM dbo.Estudiante
        WHERE CI = @CI
          AND IdLector <> @IdLector
    )
    BEGIN
        THROW 50003, 'Otro estudiante ya usa ese CI.', 1;
    END;

    UPDATE dbo.Estudiante
       SET CI = @CI,
           Nombre = @Nombre,
           Direccion = @Direccion,
           Carrera = @Carrera,
           Edad = @Edad
     WHERE IdLector = @IdLector;

    SELECT 'Estudiante modificado correctamente.' AS Mensaje;
END;
GO

-- ELIMINAR ESTUDIANTE
CREATE OR ALTER PROCEDURE dbo.sp_Estudiante_Eliminar
    @IdLector INT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM dbo.Estudiante WHERE IdLector = @IdLector)
    BEGIN
        THROW 50004, 'El estudiante no existe.', 1;
    END;

    IF EXISTS (SELECT 1 FROM dbo.Prestamo WHERE IdLector = @IdLector)
    BEGIN
        THROW 50005, 'No se puede eliminar el estudiante porque tiene préstamos relacionados.', 1;
    END;

    DELETE FROM dbo.Estudiante
    WHERE IdLector = @IdLector;

    SELECT 'Estudiante eliminado correctamente.' AS Mensaje;
END;
GO

/* ================================================================================================================== */

-- INSERTAR PRÉSTAMO
CREATE OR ALTER PROCEDURE dbo.sp_Prestamo_Insertar
    @IdLector          INT,
    @IdLibro           INT,
    @FechaPrestamo     DATETIME2(0),
    @FechaDevolucion   DATETIME2(0) = NULL,
    @Devuelto          BIT = 0
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM dbo.Estudiante WHERE IdLector = @IdLector)
    BEGIN
        THROW 50006, 'El estudiante indicado no existe.', 1;
    END;

    IF NOT EXISTS (SELECT 1 FROM dbo.Libro WHERE IdLibro = @IdLibro)
    BEGIN
        THROW 50007, 'El libro indicado no existe.', 1;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM dbo.Prestamo
        WHERE IdLector = @IdLector
          AND IdLibro = @IdLibro
          AND FechaPrestamo = @FechaPrestamo
    )
    BEGIN
        THROW 50008, 'Ya existe un préstamo con esa llave compuesta.', 1;
    END;

    IF @Devuelto = 0 AND @FechaDevolucion IS NOT NULL
    BEGIN
        THROW 50009, 'Si el préstamo no está devuelto, la fecha de devolución debe ser NULL.', 1;
    END;

    IF @Devuelto = 1 AND @FechaDevolucion IS NULL
    BEGIN
        THROW 50010, 'Si el préstamo está devuelto, debe indicar fecha de devolución.', 1;
    END;

    INSERT INTO dbo.Prestamo (IdLector, IdLibro, FechaPrestamo, FechaDevolucion, Devuelto)
    VALUES (@IdLector, @IdLibro, @FechaPrestamo, @FechaDevolucion, @Devuelto);

    SELECT 'Préstamo insertado correctamente.' AS Mensaje;
END;
GO

-- MODIFICAR PRÉSTAMO
-- Se localiza por la llave original:
-- @IdLector_Original, @IdLibro_Original, @FechaPrestamo_Original
CREATE OR ALTER PROCEDURE dbo.sp_Prestamo_Modificar
    @IdLector_Original        INT,
    @IdLibro_Original         INT,
    @FechaPrestamo_Original   DATETIME2(0),

    @IdLector_Nuevo           INT,
    @IdLibro_Nuevo            INT,
    @FechaPrestamo_Nueva      DATETIME2(0),
    @FechaDevolucion          DATETIME2(0) = NULL,
    @Devuelto                 BIT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS
    (
        SELECT 1
        FROM dbo.Prestamo
        WHERE IdLector = @IdLector_Original
          AND IdLibro = @IdLibro_Original
          AND FechaPrestamo = @FechaPrestamo_Original
    )
    BEGIN
        THROW 50011, 'El préstamo a modificar no existe.', 1;
    END;

    IF NOT EXISTS (SELECT 1 FROM dbo.Estudiante WHERE IdLector = @IdLector_Nuevo)
    BEGIN
        THROW 50012, 'El estudiante nuevo indicado no existe.', 1;
    END;

    IF NOT EXISTS (SELECT 1 FROM dbo.Libro WHERE IdLibro = @IdLibro_Nuevo)
    BEGIN
        THROW 50013, 'El libro nuevo indicado no existe.', 1;
    END;

    IF @Devuelto = 0 AND @FechaDevolucion IS NOT NULL
    BEGIN
        THROW 50014, 'Si el préstamo no está devuelto, la fecha de devolución debe ser NULL.', 1;
    END;

    IF @Devuelto = 1 AND @FechaDevolucion IS NULL
    BEGIN
        THROW 50015, 'Si el préstamo está devuelto, debe indicar fecha de devolución.', 1;
    END;

    IF EXISTS
    (
        SELECT 1
        FROM dbo.Prestamo
        WHERE IdLector = @IdLector_Nuevo
          AND IdLibro = @IdLibro_Nuevo
          AND FechaPrestamo = @FechaPrestamo_Nueva
          AND NOT (
                IdLector = @IdLector_Original
            AND IdLibro = @IdLibro_Original
            AND FechaPrestamo = @FechaPrestamo_Original
          )
    )
    BEGIN
        THROW 50016, 'Ya existe otro préstamo con la nueva llave compuesta.', 1;
    END;

    UPDATE dbo.Prestamo
       SET IdLector = @IdLector_Nuevo,
           IdLibro = @IdLibro_Nuevo,
           FechaPrestamo = @FechaPrestamo_Nueva,
           FechaDevolucion = @FechaDevolucion,
           Devuelto = @Devuelto
     WHERE IdLector = @IdLector_Original
       AND IdLibro = @IdLibro_Original
       AND FechaPrestamo = @FechaPrestamo_Original;

    SELECT 'Préstamo modificado correctamente.' AS Mensaje;
END;
GO

-- ELIMINAR PRÉSTAMO
CREATE OR ALTER PROCEDURE dbo.sp_Prestamo_Eliminar
    @IdLector        INT,
    @IdLibro         INT,
    @FechaPrestamo   DATETIME2(0)
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS
    (
        SELECT 1
        FROM dbo.Prestamo
        WHERE IdLector = @IdLector
          AND IdLibro = @IdLibro
          AND FechaPrestamo = @FechaPrestamo
    )
    BEGIN
        THROW 50017, 'El préstamo no existe.', 1;
    END;

    DELETE FROM dbo.Prestamo
    WHERE IdLector = @IdLector
      AND IdLibro = @IdLibro
      AND FechaPrestamo = @FechaPrestamo;

    SELECT 'Préstamo eliminado correctamente.' AS Mensaje;
END;
GO

/* ================================================================================================================== */

-- TOP 5 LIBROS MAS SOLICITADOS
CREATE OR ALTER PROCEDURE dbo.sp_Top5LibrosMasSolicitados_Estudiantes
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH Top5Libros AS
    (
        SELECT TOP (5)
               p.IdLibro,
               COUNT(*) AS TotalSolicitudes
        FROM dbo.Prestamo p
        GROUP BY p.IdLibro
        ORDER BY COUNT(*) DESC, p.IdLibro ASC
    )
    SELECT
        e.Nombre AS NombreEstudiante,
        l.Titulo AS TituloLibro,
        a.Nombre AS NombreAutor,
        p.FechaPrestamo,
        p.FechaDevolucion,
        p.Devuelto
    FROM dbo.Prestamo p
    INNER JOIN Top5Libros t
        ON p.IdLibro = t.IdLibro
    INNER JOIN dbo.Estudiante e
        ON p.IdLector = e.IdLector
    INNER JOIN dbo.Libro l
        ON p.IdLibro = l.IdLibro
    INNER JOIN dbo.LibAut la
        ON l.IdLibro = la.IdLibro
    INNER JOIN dbo.Autor a
        ON la.IdAutor = a.IdAutor
    ORDER BY l.Titulo, e.Nombre, p.FechaPrestamo;
END;
GO