import {By, until} from 'selenium-webdriver';
// import assert from'assert';
import { assert } from 'chai';
import {getDriver, clearDriver} from "../helper/index.js";
import {BASE_URL} from "../../config.js";

function TestCoupon(){
    describe('Coupon', function () {
        this.timeout(10000); // Set the timeout for your tests as needed
        let driver;

        before(async ()=> driver= await getDriver());
        after(async()=> await clearDriver(driver));

        it('click claim reward btn with blank text and check error', async () => {
            // Navigate to a webpage
            await driver.get(BASE_URL);

            // Find an element by its CSS selector and interact with it
            let claim_reward_btn_id = 'btenviar_codigo';
            const element = await driver.findElement(By.id(claim_reward_btn_id));
            await element.click();

            let error_msg_id = 'alerta-errores';

            try{
                const errorBanner = await driver.findElement(By.id(error_msg_id))
                assert.isNotNull(errorBanner, 'Element should exists');
            }catch (error){
                assert.fail(`Element with ID ${error_msg_id} is not present`)
            }
        });

        it('click claim reward btn with incorrect coupon code and check error', async () => {


            // Navigate to a webpage
            await driver.get(BASE_URL);

            // Find the textbox element by its ID.
            const textBox = await driver.findElement(By.id('codigo'));
            await textBox.clear();
            await textBox.sendKeys('TestCouponDummyValue');

            // Find an element by its CSS selector and interact with it
            let claim_reward_btn_id = 'btenviar_codigo';
            const element = await driver.findElement(By.id(claim_reward_btn_id));
            await element.click();

            let expectedErrorMsg = 'We can’t recognize the code. Please, check if it’s correct and that you wrote it properly. [ERR-12]'
            const modalElement = await driver.wait(until.elementLocated(By.id('modal-alerta')), 5000);
            const modalBody = await driver.wait(until.elementLocated(By.xpath('//div[@id="modal-alerta"]/div/div/div[2]')), 5000);
            await driver.wait(until.elementIsVisible(modalBody), 5000);
            const modalText = await modalBody.getText();

            assert.equal(modalText, expectedErrorMsg, 'unable to get expected error message')
        });
    });
}

export default TestCoupon;