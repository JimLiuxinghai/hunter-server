/*
Navicat MySQL Data Transfer

Source Server         : 57
Source Server Version : 50173
Source Host           : 192.168.19.57:3306
Source Database       : hunter

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2018-03-23 18:31:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for project_info
-- ----------------------------
DROP TABLE IF EXISTS `project_info`;
CREATE TABLE `project_info` (
  `project` varchar(255) DEFAULT NULL COMMENT '项目名称',
  `projectId` varchar(255) NOT NULL COMMENT '项目编号',
  `projectType` varchar(255) DEFAULT NULL COMMENT '项目类型：Angular, AngularJS, Vue, React, Js',
  `projectInfo` varchar(255) DEFAULT NULL COMMENT '项目简介',
  `updatetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`projectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
