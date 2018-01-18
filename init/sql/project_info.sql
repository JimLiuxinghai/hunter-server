/*
Navicat MySQL Data Transfer

Source Server         : 57
Source Server Version : 50173
Source Host           : 192.168.19.57:3306
Source Database       : hunter

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2017-12-11 17:34:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for project_info
-- ----------------------------
DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info` (
  `project` varchar(255) DEFAULT NULL COMMENT '项目名称',
  `project_id` varchar(255) DEFAULT NULL COMMENT '项目编号',
  `project_info` varchar(255) DEFAULT NULL COMMENT '项目简介'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
