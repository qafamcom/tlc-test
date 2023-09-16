import {  By } from 'selenium-webdriver';
import assert from'assert';
import {getDriver, clearDriver} from "../helper/index.js";
import {BASE_URL} from "../../config.js";

function TestHomePage(){
    describe('Home Page', function () {
        this.timeout(10000); // Set the timeout for your tests as needed
        let driver;

        before(async ()=> driver= await getDriver());
        after(async()=> await clearDriver(driver));

        it('should open home and check title', async () => {
            // Navigate to a webpage
            await driver.get(BASE_URL);

            // Check the title of the webpage
            const title = await driver.getTitle();
            assert.strictEqual(title, 'Rewards for all');
        });

    });
}

export default TestHomePage;