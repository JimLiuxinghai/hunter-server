/*
Navicat MySQL Data Transfer

Source Server         : 57
Source Server Version : 50173
Source Host           : 192.168.19.57:3306
Source Database       : hunter

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2018-02-06 14:12:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for error_status
-- ----------------------------
DROP TABLE IF EXISTS `error_status`;
CREATE TABLE `error_status` (
  `errorId` int(20) DEFAULT NULL COMMENT '错误id',
  `status` int(11) DEFAULT NULL COMMENT '错误处理状态 1: 未解决,2: 已解决',
  `user` varchar(255) DEFAULT NULL COMMENT '处理人'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
