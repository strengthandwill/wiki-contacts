DROP TABLE vvwdbadk_wikicontacts.contacts;

CREATE TABLE vvwdbadk_wikicontacts.`contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT "",
  `tags` varchar(255) DEFAULT "",
  `countryCode` varchar(255) DEFAULT "",
  `number` varchar(255) DEFAULT "",
  `description` varchar(255) DEFAULT "",
  `email` varchar(255) DEFAULT "",
  `address` varchar(255) DEFAULT "",
  `website` varchar(255) DEFAULT "",
  `spam` tinyint(1) DEFAULT 0,
  `imageUrl` varchar(255) DEFAULT "",
  PRIMARY KEY (`id`)
);