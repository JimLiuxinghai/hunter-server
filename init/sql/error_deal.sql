/*
Navicat MySQL Data Transfer

Source Server         : 57
Source Server Version : 50173
Source Host           : 192.168.19.57:3306
Source Database       : hunter

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2018-04-18 17:56:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for error_deal
-- ----------------------------
DROP TABLE IF EXISTS `error_deal`;
CREATE TABLE `error_deal` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `key` varchar(255) DEFAULT NULL COMMENT '错误key：对error.msg md5加密',
  `user` varchar(255) DEFAULT NULL COMMENT '处理人',
  `reason` text COMMENT '错误原因',
  `updatetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
