/*
Navicat MySQL Data Transfer

Source Server         : 57
Source Server Version : 50173
Source Host           : 192.168.19.57:3306
Source Database       : hunter

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2018-02-26 15:31:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for error_deal
-- ----------------------------
DROP TABLE IF EXISTS `error_deal`;
CREATE TABLE `error_deal` (
  `errorId` int(20) NOT NULL COMMENT '错误id',
  `user` varchar(255) DEFAULT NULL COMMENT '处理人',
  `reason` text COMMENT '错误原因',
  `updatetime` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`errorId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
