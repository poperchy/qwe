<?php

use \EsGlobal\PhpErrorReportingDisableHelper;

$composerAutoloadFilePath = ABSPATH . 'vendor/autoload.php';
if (!file_exists($composerAutoloadFilePath)) {
    user_error('Autoload file wsn\'t found. Possible solution: run nex command in the application root > composer install ', E_USER_ERROR);
}
require_once $composerAutoloadFilePath;

$errorReportingDisableHelper = new PhpErrorReportingDisableHelper();
// disable error
// Deprecated: block_categories is <strong>deprecated</strong> since version 5.8.0! Use block_categories_all instead. in /var/www/wordpress/wp-includes/functions.php on line 5586
// on /wp-admin/post.php?post=255&action=edit
$errorReportingDisableHelper->disableErrorType(E_USER_DEPRECATED);