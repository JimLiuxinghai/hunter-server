/*
Navicat MySQL Data Transfer

Source Server         : 57
Source Server Version : 50173
Source Host           : 192.168.19.57:3306
Source Database       : hunter

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2017-12-11 17:41:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for user_pro_map
-- ----------------------------
DROP TABLE IF EXISTS `user_pro_map`;
CREATE TABLE `user_pro_map` (
  `userid` varchar(255) DEFAULT NULL COMMENT '用户id',
  `project_id` varchar(255) DEFAULT NULL COMMENT '项目id',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
