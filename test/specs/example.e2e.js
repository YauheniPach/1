
const expect = require('chai').expect;

describe(' Log in to the mail and sent a email from drafts', () => {
  it('Input the login and click on the next button', async () => {
    await browser.url('https://www.yahoo.com/');
    expect(await browser.getUrl()).is.equal('https://www.yahoo.com/');
    await $('//a[@class="_yb_re8zj"]').click();
    await $('#login-username').click();
    await browser.keys('test1w_io');
    await $('#login-signin').click();
    expect(await $('[class="yid"]').getText()).is.equal('test1w_io');
    });

    it('Input the password and click on the next button', async () => {
        await $('#login-passwd').click();
        await browser.keys('passord_wio');
        await $('#login-signin').click();
        expect(await $('//span[@role="presentation"]').getText()).is.equal('test1');
    });

    it('Create new email and save it as a draft', async () => {
        await $('//a[@id="root_1"]').click();
        await $('[class*="e_dRA l_T cn_dBP cg_FJ"]').click();
        await $('#message-to-field').setValue('Hola@aol.com');
        await $('//input[@placeholder="Subject"]').setValue('Anna');
        await $('[data-test-id="rte"]').setValue('My favorite mentor');
        expect(await $('[data-test-id="rte"]').getText()).is.equal('My favorite mentor');
        await $('//button[contains(@title,"Close (and save to drafts)")]').click();
    });

    it('Verify that the mail is in the "Draft" with same adress, subject, body, send it', async () => {
        await $('[aria-live="true"][role="heading"][aria-label="Drafts, "]').click();
        await $('span[class="o_h J_x em_N G_e"]').isDisplayed();
        expect(await $('span[class="o_h J_x em_N G_e"]').getText()).is.equal('Hola@aol.com');
        expect(await $('[data-test-id="message-subject"]').getText()).is.equal('Anna');
        expect(await $('div[class="J_x o_h G_e C_Z1YRXYn"]').getText()).is.equal('My favorite mentor'); 
        await $('span[class="o_h J_x em_N G_e"]').click();
        await $('button[data-test-id="compose-send-button"]').click();
    });    

    it('Verify that email is not in the draft folder', async () => {
        await $('[data-test-folder-name="Sent"]').click();
        expect(await $('span[class="o_h J_x em_N G_e"]').isDisplayed()).is.equal(false);
    });

    it('Verify that email is in the sent folder', async () => {
        await $('[data-test-folder-name="Sent"]').click();
        expect(await $('span[class="o_h J_x em_N G_e"]').waitForDisplayed()).is.equal(true);
    });

    it('Log off', async () => {
        await $('//span[@role="presentation"]').moveTo();
        expect(await $('//span[@class="_yb_1tc2t _yb_cj31j _yb_1tcfl"]').waitForDisplayed()).is.equal(true);
        await $('//span[@class="_yb_1tc2t _yb_cj31j _yb_1tcfl"]').click();
    }); 
});