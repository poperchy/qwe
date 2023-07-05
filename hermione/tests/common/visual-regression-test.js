it('visual regression test', async function() {
    await this.browser.url('/');
    await this.browser.assertView('homepage', '.body');

    await this.browser.url('/404');
    await this.browser.assertView('404', '.body');
});