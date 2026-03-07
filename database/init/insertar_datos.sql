USE Examen;
GO

-- AUTORES
INSERT INTO dbo.Autor (Nombre, Nacionalidad)
VALUES
(N'Gabriel García Márquez', N'Colombiana'),
(N'Isabel Allende', N'Chilena'),
(N'Mario Vargas Llosa', N'Peruana'),
(N'Julio Cortázar', N'Argentina'),
(N'Jorge Luis Borges', N'Argentina'),
(N'Paulo Coelho', N'Brasileña'),
(N'Carlos Ruiz Zafón', N'Española'),
(N'Miguel de Cervantes', N'Española'),
(N'Pablo Neruda', N'Chilena'),
(N'Octavio Paz', N'Mexicana');
GO

-- LIBROS
INSERT INTO dbo.Libro (Titulo, Editorial, Area)
VALUES
(N'Cien años de soledad', N'Sudamericana', N'Literatura'),
(N'La casa de los espíritus', N'Plaza & Janés', N'Literatura'),
(N'La ciudad y los perros', N'Seix Barral', N'Literatura'),
(N'Rayuela', N'Alfaguara', N'Literatura'),
(N'El Aleph', N'Emecé', N'Literatura'),
(N'El alquimista', N'Planeta', N'Literatura'),
(N'La sombra del viento', N'Planeta', N'Literatura'),
(N'Don Quijote de la Mancha', N'Francisco de Robles', N'Literatura'),
(N'Veinte poemas de amor y una canción desesperada', N'Nascimento', N'Poesía'),
(N'El laberinto de la soledad', N'Fondo de Cultura Económica', N'Ensayo');
GO

-- RELACION LIBRO-AUTOR
INSERT INTO dbo.LibAut (IdAutor, IdLibro)
VALUES
(1, 1), 
(2, 2), 
(3, 3), 
(4, 4), 
(5, 5), 
(6, 6),  
(7, 7),  
(8, 8),  
(9, 9),  
(10, 10); 
GO

-- ESTUDIANTES
INSERT INTO dbo.Estudiante (CI, Nombre, Direccion, Carrera, Edad)
VALUES
(N'30124567', N'Francisco López', N'El Naranjo, Mixco', N'Ingeniería en Sistemas', 27),
(N'40124568', N'Ana Pérez', N'Zona 1, Ciudad de Guatemala', N'Administración de Empresas', 22),
(N'50124569', N'Luis Gómez', N'Villa Nueva', N'Derecho', 24),
(N'60124570', N'María Hernández', N'Amatitlán', N'Psicología', 21),
(N'70124571', N'José Martínez', N'Zona 18, Ciudad de Guatemala', N'Contaduría Pública', 25),
(N'80124572', N'Andrea Ramírez', N'Mixco', N'Arquitectura', 23),
(N'90124573', N'Carlos Méndez', N'Villa Canales', N'Ingeniería Civil', 26),
(N'10124574', N'Karla López', N'Zona 7, Ciudad de Guatemala', N'Medicina', 20),
(N'11124575', N'Daniel Castro', N'San Miguel Petapa', N'Ingeniería Industrial', 24),
(N'12124576', N'Sofía Morales', N'Santa Catarina Pinula', N'Marketing', 22);
GO

-- PRESTAMOS
INSERT INTO dbo.Prestamo (IdLector, IdLibro, FechaPrestamo, FechaDevolucion, Devuelto)
VALUES
(1, 1, '2026-03-01 08:00:00', '2026-03-05 10:00:00', 1),
(2, 1, '2026-03-02 09:30:00', '2026-03-06 11:00:00', 1),
(3, 1, '2026-03-03 10:00:00', NULL, 0),
(4, 2, '2026-03-03 11:00:00', '2026-03-07 14:00:00', 1),
(5, 2, '2026-03-04 08:15:00', NULL, 0),
(6, 3, '2026-03-04 09:45:00', '2026-03-08 15:00:00', 1),
(7, 3, '2026-03-05 13:20:00', NULL, 0),
(8, 4, '2026-03-05 14:10:00', '2026-03-10 09:00:00', 1),
(9, 4, '2026-03-06 15:00:00', NULL, 0),
(10, 5, '2026-03-06 16:30:00', '2026-03-11 10:30:00', 1),
(1, 5, '2026-03-07 08:40:00', NULL, 0),
(2, 6, '2026-03-07 10:10:00', '2026-03-12 12:00:00', 1),
(3, 6, '2026-03-08 11:25:00', NULL, 0),
(4, 7, '2026-03-08 12:00:00', '2026-03-13 13:15:00', 1),
(5, 7, '2026-03-09 09:00:00', NULL, 0),
(6, 8, '2026-03-09 10:30:00', '2026-03-14 16:00:00', 1),
(7, 8, '2026-03-10 11:00:00', NULL, 0),
(8, 9, '2026-03-10 14:20:00', '2026-03-15 17:10:00', 1),
(9, 10, '2026-03-11 15:45:00', NULL, 0),
(10, 1, '2026-03-11 16:30:00', NULL, 0),
(1, 2, '2026-03-12 08:00:00', '2026-03-16 09:30:00', 1),
(2, 3, '2026-03-12 09:15:00', NULL, 0),
(3, 4, '2026-03-13 10:45:00', '2026-03-18 11:20:00', 1),
(4, 5, '2026-03-13 12:10:00', NULL, 0),
(5, 1, '2026-03-14 13:00:00', '2026-03-19 14:00:00', 1);
GO
