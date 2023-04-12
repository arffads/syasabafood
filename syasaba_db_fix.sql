-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 10, 2023 at 06:54 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `syasaba`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'MINUMAN'),
(2, 'MAKANAN');

-- --------------------------------------------------------

--
-- Table structure for table `detail_order`
--

CREATE TABLE `detail_order` (
  `id` int(11) NOT NULL,
  `order_id` int(30) DEFAULT NULL,
  `product_id` int(30) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `product_price` int(30) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_order`
--

INSERT INTO `detail_order` (`id`, `order_id`, `product_id`, `qty`, `product_price`, `createdAt`, `updatedAt`) VALUES
(1, 578, 12, 2, 20000, '2023-04-02', '2023-04-02'),
(2, 578, 14, 2, 7000, '2023-04-02', '2023-04-02'),
(3, 579, 12, 2, 20000, '2023-04-09', '2023-04-09'),
(4, 579, 14, 2, 7000, '2023-04-09', '2023-04-09'),
(5, 580, 12, 2, 20000, '2023-04-09', '2023-04-09'),
(6, 580, 14, 2, 7000, '2023-04-09', '2023-04-09'),
(7, 581, 12, 2, 20000, '2023-04-09', '2023-04-09'),
(8, 581, 14, 2, 7000, '2023-04-09', '2023-04-09'),
(9, 582, 12, 2, 20000, '2023-04-09', '2023-04-09'),
(10, 582, 14, 2, 7000, '2023-04-09', '2023-04-09'),
(11, 583, 12, 2, 20000, '2023-04-09', '2023-04-09'),
(12, 583, 14, 2, 7000, '2023-04-09', '2023-04-09'),
(13, 584, 12, 2, 20000, '2023-04-09', '2023-04-09'),
(14, 584, 14, 2, 7000, '2023-04-09', '2023-04-09'),
(15, 585, 15, 2, 15000, '2023-04-10', '2023-04-10'),
(16, 585, 13, 2, 7000, '2023-04-10', '2023-04-10');

-- --------------------------------------------------------

--
-- Table structure for table `food_tables`
--

CREATE TABLE `food_tables` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `no_meja` int(11) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `food_tables`
--

INSERT INTO `food_tables` (`id`, `userId`, `no_meja`, `password`) VALUES
(9, 9, 500, '$2b$10$XEJ2vy7EAnnpdDQ0rLzvuucY0NAek3X7szDZbL4Q5nmaa2Rj628Fu'),
(12, 9, 501, '$2b$10$OK0WJAUN3PaA74oATAzC7ec/SU1nbzh23zt0JNkF2cGVgtBQB7JEW'),
(13, 9, 505, '$2b$10$wICD23Cu8dT3362RXWIqs.1ef1jBwRrJAY7rLiprRdaoSzFhdr5zm'),
(16, 9, 588, '$2b$10$7OdyDcGYz1/Ce/XixgT3/uYbQvzbg.bedCR3pIl5E0M4ELV.hAmZa');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `tableId` int(11) NOT NULL,
  `no_meja` int(11) NOT NULL,
  `create_at` date DEFAULT NULL,
  `update_at` date DEFAULT NULL,
  `status` enum('on_progress','success') DEFAULT NULL,
  `customer_contact` varchar(30) DEFAULT NULL,
  `customer_name` varchar(30) DEFAULT NULL,
  `total_price` int(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `tableId`, `no_meja`, `create_at`, `update_at`, `status`, `customer_contact`, `customer_name`, `total_price`) VALUES
(578, 13, 505, '2023-04-02', '2023-04-02', 'success', '0812-1242-7854', 'Aldi', 54000),
(579, 13, 505, '2023-04-09', '2023-04-09', 'on_progress', '0812-1242-7854', 'Aldi', 54000),
(580, 13, 505, '2023-04-09', '2023-04-09', 'on_progress', '0812-1242-7854', 'Aldi', 54000),
(581, 13, 505, '2023-04-09', '2023-04-09', 'on_progress', '0812-1242-7854', 'Aldi', 54000),
(582, 13, 505, '2023-04-09', '2023-04-09', 'on_progress', '0812-1242-7854', 'Aldi', 54000),
(583, 13, 505, '2023-04-09', '2023-04-09', 'on_progress', '0812-1242-7854', 'Aldi', 54000),
(584, 13, 505, '2023-04-09', '2023-04-09', 'success', '0812-1242-7854', 'Aldi', 54000),
(585, 16, 588, '2023-04-10', '2023-04-10', 'success', '0812-1242-7854', 'Aldi', 44000);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `qty` int(9) NOT NULL,
  `create_at` date DEFAULT NULL,
  `update_at` date DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('MINUMAN','MAKANAN') DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `discount`, `qty`, `create_at`, `update_at`, `category_id`, `user_id`, `type`, `image`) VALUES
(12, 'Nasi Kucing', 20000, 0, -4, '2023-02-19', '2023-02-19', 2, 9, 'MAKANAN', '2.jpeg'),
(13, 'Aqua Botol 1000ml', 7000, 0, 8, '0000-00-00', '0000-00-00', 1, 9, 'MINUMAN', '2.jpeg'),
(15, 'Mie Goreng + Telor', 15000, 0, 11, '2023-04-10', '2023-04-10', 2, 20, 'MAKANAN', 'miegoreng.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `role` enum('superadmin','user') DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `name`, `password`) VALUES
(7, 'superadmin', 'admin', '$2b$10$2mn/aEekBLKXfbN4a8A.D.85VZCzgiKDhM4.IEdfSPKs9K/iRZHhW'),
(9, 'user', 'admin2', '$2b$10$nFmengC/d7EsJ92rlKkiCu6m0E754pOq.VWZtdkgxvZaS8CqCUwc2'),
(10, 'user', 'admin2', '$2b$10$BlAdez4fwS8QE6qIFtVtKOW56dwAQI9csXNctxocFupOMPafswXDm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detail_order`
--
ALTER TABLE `detail_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_detail_order` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `food_tables`
--
ALTER TABLE `food_tables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tableId` (`tableId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `detail_order`
--
ALTER TABLE `detail_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `food_tables`
--
ALTER TABLE `food_tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=586;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_order`
--
ALTER TABLE `detail_order`
  ADD CONSTRAINT `FK_detail_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);

--
-- Constraints for table `food_tables`
--
ALTER TABLE `food_tables`
  ADD CONSTRAINT `food_tables_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
