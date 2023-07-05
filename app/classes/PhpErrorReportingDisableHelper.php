<?php

namespace EsGlobal;

/**
 * Class should be used for more covenient work with Notifications, Warnings or Deprecated messages in developent environment.
 * By default all notifications should be enabled in developent environment - proper practice for minimizing errors in development.
 * But sometimes we have to use plugins that are not so respectful to code quality, and these messages prevent working.
 * In that case we can disable one particlular type of notifications. This is helper class for that.
 *
 * Please add comments why you disabled the type of errors. So that after the problem is resolved we could enable error
 * notifications back!
 */
class PhpErrorReportingDisableHelper
{

    public function disableErrorType($errorTypeConstant)
    {
        $currentErrorReporting = error_reporting();
        error_reporting($currentErrorReporting & ~$errorTypeConstant);
        return $this;
    }


}
