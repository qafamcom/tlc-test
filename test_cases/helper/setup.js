import { Builder} from 'selenium-webdriver';

async function getDriver(){
    return new Builder().forBrowser('chrome').build();
}

async function clearDriver(browserBuilder){
    await browserBuilder.quit()
}

export {
    getDriver,
    clearDriver
}

