/*
Navicat MySQL Data Transfer

Source Server         : 57
Source Server Version : 50173
Source Host           : 192.168.19.57:3306
Source Database       : hunter

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2018-02-07 10:54:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for error_deal
-- ----------------------------
DROP TABLE IF EXISTS `error_deal`;
CREATE TABLE `error_deal` (
  `errorId` int(20) DEFAULT NULL COMMENT '错误id',
  `user` varchar(255) DEFAULT NULL COMMENT '处理人'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
