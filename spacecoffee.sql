-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2025 at 04:04 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spacecoffee`
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
(17, 9, 1, '$2b$10$Tn3BoN.aFzEXC7nrMIVwJePTusNL2Fn3LY8t9IjLNhbJBFFx3oefK'),
(18, 9, 2, '$2b$10$VKKwxqlRL9VcKlQslCFGY.W.aLshcYu3FV7eVnncQ15cdjql31yWK'),
(19, 9, 3, '$2b$10$HcUv6/AeIlOCypvn7IEpy.oVo/SCpKU5kid1KSQJ17YXMLC0r5A3i'),
(20, 9, 4, '$2b$10$ePXKx56VkP3MAlqO.NIl..Iegdh.aOIwEOsjN3JhHgloWh86hyde.'),
(21, 9, 5, '$2b$10$/s.x1gJju2X3QgfsED79s.dsumU0z9YllJ1gOyS9ynty7rtdHdpwC'),
(22, 9, 6, '$2b$10$Jo.4JtiiiWv1OUoccJdKcOsts78sZFX6wYmdGLXMRYWAn6jTyvd2.'),
(23, 9, 7, '$2b$10$MVddkgUuplow444krgh0duVyFxH738sWzTGSiQvvNP2mPYfNUjI46'),
(24, 9, 8, '$2b$10$phwlAfeimbw82nIowIzlbO/PG/TT0NcisA7h2mf/CL1bb5SrN4Gzy'),
(25, 9, 9, '$2b$10$ywdLDSbSM65CNrr1NWjIJeZ5JH4PIHsPZTU.iDd0MgPx10px6MMZ6'),
(26, 9, 10, '$2b$10$CeRffHqXWJhS/5XI1FA73OA56bofsaubPoQy/maVFM1dtSbGtkQ6G');

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
(16, 'Vietnam Drip', 15000, 0, 50, '2025-01-20', '2025-01-20', 1, 9, 'MINUMAN', 'VietnamDrip.jpg'),
(17, 'Coffee Aren', 15000, 0, 50, '2025-01-20', '2025-01-20', 1, 9, 'MINUMAN', 'coffeeAren.jpg'),
(18, 'Caffe Latte Ice', 15000, 0, 50, '2025-01-20', '2025-01-20', 1, 9, 'MINUMAN', 'CaffeLatteIce.jpg'),
(19, 'Caffe Latte Hot', 15000, 0, 50, '2025-01-20', '2025-01-20', 1, 9, 'MINUMAN', 'CaffeLatteHot.jpg'),
(20, 'Espresso Ice', 15000, 0, 50, '2025-01-20', '2025-01-20', 1, 9, 'MINUMAN', 'IceEspresso.jpg'),
(21, 'Espresso Hot', 15000, 0, 50, '2025-01-20', '2025-01-20', 1, 9, 'MINUMAN', 'HotEspresso.jpg'),
(22, 'Espresso Matcha Ice', 15000, 0, 50, '2025-01-20', '2025-01-20', 1, 9, 'MINUMAN', 'icedEspressoMatcha.jpg'),
(23, 'Sosis Goreng', 15000, 0, 50, '2025-01-20', '2025-01-20', 2, 9, 'MAKANAN', 'SosisGoreng.jpg'),
(24, 'Sosis Bakar', 15000, 0, 50, '2025-01-20', '2025-01-20', 2, 9, 'MAKANAN', 'sosisBakar.jpg'),
(25, 'Kentang Goreng', 15000, 0, 50, '2025-01-20', '2025-01-20', 2, 9, 'MAKANAN', 'kentangGoreng.jpg'),
(26, 'Telur Gulung', 15000, 0, 50, '2025-01-20', '2025-01-20', 2, 9, 'MAKANAN', 'Telor gulung.jpg');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=586;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
