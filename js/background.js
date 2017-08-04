function getJSON(sAddress) {
    var sReturn = null,
        oRequest = new XMLHttpRequest();

    if (window.XDomainRequest) {
        oRequest = new XDomainRequest();
    } else if (window.XMLHttpRequest) {
        oRequest = new XMLHttpRequest();
    }
    oRequest.open('GET', 'https://ethermine.org/api/miner_new/' + sAddress, false);

    oRequest.onload = function () {
        sReturn = oRequest.responseText;
    };

    oRequest.send();
    return sReturn;
}

var sAddress = '0x8c4e7D38AB16db726D1CF97140239b5f2f9a657d',
    oJson = JSON.parse(getJSON(sAddress));

setInterval(function () {
    oJson = JSON.parse(getJSON(sAddress));
}, 30 * 1000);

chrome.extension.onConnect.addListener(function (port) {
    port.postMessage(oJson);
});