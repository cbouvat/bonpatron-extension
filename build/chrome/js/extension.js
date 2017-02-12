class BonPatronExtension {

    constructor() {
        this.urlCheckTab = 'http://bonpatron.com/?typedText=';
        this.urlCheckProTab = 'http://pro.bonpatron.com/?typedText=';
    }

    background() {
        console.log('Background init');

        chrome.contextMenus.create({
            'id': 'checkTab',
            'type': 'normal',
            'title': 'Vérifier avec BonPatron',
            'contexts': ["selection"]
        });

        chrome.contextMenus.onClicked.addListener(function(info, tab) {
            if (info.menuItemId == 'checkTab') {
                BonPatron.openCheckTab(info.selectionText);
            }
        });
    }

    openCheckTab(text) {
        this.tabNewSet(this.urlCheckTab + encodeURI(text));
    }

    tabSet(url) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.update(tabs[0].id, {
                url: url
            });
        });
    }

    tabNewSet(url) {
        chrome.tabs.create({url : url});
    }
}
