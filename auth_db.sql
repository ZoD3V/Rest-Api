-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 02 Apr 2023 pada 09.05
-- Versi server: 10.4.14-MariaDB
-- Versi PHP: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auth_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(8, 'eko', 'eko@gmail.com', '$2b$10$xgxBZFSFW30N5XnYFC2.Quq.qpXdNZqVSxMuzqAEt08Jam6hsBiqe', NULL, '2023-03-30 09:19:28', '2023-03-31 13:27:51'),
(13, 'adhi', 'adhi@gmail.com', '$2b$10$l4VRJTWi5YN/7EbtAEaAJeq1.jF/K.GST2w4f6OerKdBwY0V5drxi', NULL, '2023-03-31 13:27:11', '2023-03-31 13:27:11'),
(14, 'kafa', 'kafa@gmail.com', '$2b$10$DNFjYfWQcyfeqlfKjGFtOOhYwA4vsLMIVrOVqAY4Lt3RPtti0iHeW', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJuYW1lIjoia2FmYSIsImVtYWlsIjoia2FmYUBnbWFpbC5jb20iLCJpYXQiOjE2ODA0MTg1MDIsImV4cCI6MTY4MDUwNDkwMn0.PrC-tbr0OozoljkcPJ9S1Zyu3DlaItVP30koklWVR2k', '2023-04-02 06:51:41', '2023-04-02 06:55:02'),
(15, 'joko', 'joko@gmail.com', '$2b$10$kfdSlV6aehhwWwBOCtst4eW/9.W/82XC9PcZlgzKPkjwqJXJiuelS', NULL, '2023-04-02 06:52:39', '2023-04-02 06:52:39');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
