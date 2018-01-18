/*
Navicat MySQL Data Transfer

Source Server         : 57
Source Server Version : 50173
Source Host           : 192.168.19.57:3306
Source Database       : hunter

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2017-12-11 17:43:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for error
-- ----------------------------
DROP TABLE IF EXISTS `error`;
CREATE TABLE `error` (
  `id` int(20) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `project_id` varchar(255) NOT NULL COMMENT '项目id',
  `ua` varchar(255) DEFAULT NULL COMMENT 'useragent',
  `url` varchar(255) DEFAULT NULL COMMENT '当前页面链接',
  `timestamp` datetime DEFAULT NULL COMMENT '时间',
  `projectType` varchar(255) DEFAULT NULL COMMENT '设备类型',
  `title` varchar(255) DEFAULT NULL COMMENT '页面title',
  `screenSize` varchar(255) DEFAULT NULL COMMENT '屏幕分辨率',
  `referer` varchar(255) DEFAULT NULL COMMENT 'referer',
  `host` varchar(255) DEFAULT NULL,
  `env` varchar(255) DEFAULT NULL COMMENT '当前环境',
  `msg` varchar(255) DEFAULT NULL COMMENT '错误详情',
  `rowNum` bigint(20) DEFAULT NULL COMMENT '行号',
  `colNum` bigint(20) DEFAULT NULL COMMENT '列号',
  `level` int(8) DEFAULT NULL COMMENT '级别',
  PRIMARY KEY (`id`,`project_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
