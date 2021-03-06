## #14-reverse-engineering-authentication-sequelize
![Project license](https://img.shields.io/badge/license-MIT,https://choosealicense.com/licenses/mit/-brightgreen)

<h3>Sequelize authentication application accompanied with a codebase walk-through featuring reverse engineered, commented code.</h3>
<p>Github Repository Page: https://github.com/palowenstein/reverse-engineering-authentication-sequelize</p>
<p>White Paper: The PDF containing the dissertation is password protected, please use the password provided via the Bootcamp Dashboard.</p>

# Table of Contents
  * [Structure](#Structure)
  * [Installation](#Installation)
  * [Installation-Screenshots](#Installation-Screenshots)
  * [Execution](#Execution)
  * [Execution-Screenshots](#Execution-Screenshots)
  * [Walkthrough](#Walkthrough)
  * [References](#References)
  * [License](#License)
  * [Contact](#Contact)

## Structure

![Sequelize Authentication Application — Tree Structure (PNG)](./demo_assets/14-reverse-engineering-authentication-sequelize-0-application-tree-structure.png "Sequelize Authentication Application — Tree Structure (PNG)")
<p>Fig. 0. Sequelize Authentication Application — Tree Structure (PNG)</p>
<br />

## Installation
<ul>
<li>In Terminal, locate the application folder, move into it with <kbd>cd application</kbd> command.</li>
<li>Run the NPM Install command which will install the following dependencies based on the package.json:
<br />
  <code>
  <ul style="list-style-type: none;">
  <li>bcryptjs</li>
  <li>express</li>
  <li>express-session</li>
  <li>mysql2</li>
  <li>passport</li>
  <li>passport-local</li>
  <li>sequelize</li>
  </ul>
  </code>
<br />
</li>
<li>In MySQL Workbench, create a query containing the following code:
<br />
  <code>
  <ul style="list-style-type: none;">
  <li>DROP SCHEMA IF EXISTS passport_demo;</li>
  <li>CREATE SCHEMA passport_demo;</li>
  <li style="list-style: none;"></li>
  <li>DROP SCHEMA IF EXISTS database_test;</li>
  <li>CREATE SCHEMA database_test;</li>
  <li style="list-style: none;"></li>
  <li>DROP SCHEMA IF EXISTS database_production;</li>
  <li>CREATE SCHEMA database_production;</li>
  </ul>
  </code>
<br />
</li>
<li>Click on the bolt symbol to execute the query, this will create the databases needed for the application to run.</li>
<li>Back in Terminal, type "node server.js", this will generate the tables needed for the databases and start the application.</li>
<li>In Terminal, the following tables generation should appear:
<br />
  <code>
  <ul style="list-style-type: none;">
  <li>Executing (default): CREATE TABLE IF NOT EXISTS `Users`(</li>
  <li>`id` INTEGER NOT NULL auto_increment ,</li>
  <li>`email` VARCHAR(255) NOT NULL UNIQUE,</li>
  <li>`password` VARCHAR(255) NOT NULL,</li>
  <li>`createdAt` DATETIME NOT NULL,</li>
  <li>`updatedAt` DATETIME NOT NULL,</li>
  <li>PRIMARY KEY (`id`)</li>
  <li>) ENGINE=InnoDB;</li>
  <li>Executing (default): SHOW INDEX FROM `Users` FROM `passport_demo`</li>
  </ul>
  </code>
<li>Once the tables are generated and the index shown, the application will execute:
    <p><code>Listening on port 8080. Visit http://localhost:8080/ in your browser.</code></p>
</li>
</ul>

## Installation-Screenshots

![Sequelize Authentication Application — Databases Creation Process in MySQL Workbench (PNG)](./demo_assets/14-reverse-engineering-authentication-sequelize-1-mysql-workbench-creating-databases.png "Sequelize Authentication Application — Databases Creation Process in MySQL Workbench (PNG)")
<p>Fig. 1. Sequelize Authentication Application — Databases Creation Process in MySQL Workbench (PNG)
<br />

![Sequelize Authentication Application — Database tables creation in Terminal prior to launching the application (PNG)](./demo_assets/14-reverse-engineering-authentication-sequelize-2-terminal-node-server-js.png "Sequelize Authentication Application — Database tables creation in Terminal prior to launching the application (PNG)")
<p>Fig. 2. Sequelize Authentication Application — Database tables creation in Terminal prior to launching the application (PNG)</p>
<br />

## Execution

<ul>
<li>In your browser, type <kbd>localhost:8080</kbd>, this will load the application.</li>
<li>When facing the sign up form, type an e-mail address and a password.</li>
<li>If the e-mail had already been added to the database, a red alert box will appear.</li>
<li>If the e-mail is new, you will be taken to your welcome page.</li>
<li>From there, you can log out and log in again but, this time, as a previously registered user.</li>
<li>Everytime you log in, or sign up as another new user, you will be taken to the welcome page.</li>
</ul>

## Execution-Screenshots

![Sequelize Authentication Application — In Browser Application Execution: User Registration (PNG)](./demo_assets/14-reverse-engineering-authentication-sequelize-3-in-browser-application-user-registration.png "Sequelize Authentication Application — In Browser Application Execution: User Registration (PNG)")
<p>Fig. 3. Sequelize Authentication Application — Application Execution in Browser Setting: User Registration (PNG)</p>

![Sequelize Authentication Application — In Browser Application Execution: Alerady Existing User (PNG)](./demo_assets/14-reverse-engineering-authentication-sequelize-3a-red-alert-already-existing-user.png "Sequelize Authentication Application — In Browser Application Execution: Already Existing User (PNG)")
<p>Fig. 3a. Sequelize Authentication Application — Red Alert! Already Existing User (PNG)</p>

![Sequelize Authentication Application — In Browser Application Execution: User Registration Confirmation (PNG)](./demo_assets/14-reverse-engineering-authentication-sequelize-4-in-browser-application-user-registration-receipt.png "Sequelize Authentication Application — In Browser Application Execution: User Registration Confirmation (PNG)")
<p>Fig. 4. Sequelize Authentication Application — Application Execution in Browser Setting: User Registration Confirmation (PNG)</p>

## Walkthrough
<p>The final, password protected 22 pages dissertation describing this Sequelize application is located in the demo_assets directory. Please use the password provided via the Bootcamp dashboard to open the document.</p>

## References
<ul>
<li>Node.js</li>
<li>Sequelize</li>
<li>Passport</li>
<li>Express</li>
<li>MySQL</li>
<li><a href="https://www.npmjs.com/package/bcryptjs" title="bcryptjs (Encription JS Library)">bcryptjs (Encription JS Library)</a></li>
</ul>

## License
<p>
<a href="./MITlicense.txt">MIT License</a> | Copyright © [2021] Pierre André Lowenstein
</p>

## Contact
<p>
<a href="http://pierreandrelowenstein.com" title="[www] Pierre Andr&eacute; Lowenstein" target="_blank">[www] pierreandrelowenstein.com</a>
&nbsp;|&nbsp;
<a href="mailto:coder@pierreandrelowenstein.com" title="Courriel / E-Mail">[e-mail] Send me a 'courriel'</a>
</p>
