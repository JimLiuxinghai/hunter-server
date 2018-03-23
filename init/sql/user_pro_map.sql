/*
Navicat MySQL Data Transfer

Source Server         : 57
Source Server Version : 50173
Source Host           : 192.168.19.57:3306
Source Database       : hunter

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2018-03-23 18:31:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_pro_map
-- ----------------------------
DROP TABLE IF EXISTS `user_pro_map`;
CREATE TABLE `user_pro_map` (
  `userid` varchar(255) NOT NULL COMMENT '用户id',
  `projectId` varchar(255) NOT NULL COMMENT '项目id',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `updatetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
