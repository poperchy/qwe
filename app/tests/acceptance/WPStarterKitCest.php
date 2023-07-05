<?php

declare(strict_types=1);

namespace Tests\Acceptance;

use AcceptanceTester;
use Codeception\Util\HttpCode;

class WPStarterKitCest
{
    public function mainPageTest(AcceptanceTester $I)
    {
        $I->amOnUrl('http://site.localhost:8000');
        $I->seeResponseCodeIs(HttpCode::OK);
        $I->dontSeeResponseCodeIs(HttpCode::NOT_FOUND);
        $I->canSeeElement('.js-form');
        $I->canSeeElement('.t-base__footer');
    }
}
