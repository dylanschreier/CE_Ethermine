function updateDOM(oJson) {
    var oDiv = document.getElementById('content'),
        iHashRate = 0,
        sHTML;
    sHTML = '<table>';
    sHTML += '<tr>';
    sHTML += '<th>Worker</th>';
    sHTML += '<th>Current Hash rate</th>';
    sHTML += '</tr>';
    for (var sWorkerName in oJson.workers) {
        if (oJson.workers.hasOwnProperty(sWorkerName)) {
            iHashRate += parseFloat(oJson.workers[sWorkerName].hashrate.substr(0, oJson.workers[sWorkerName].hashrate.length - 5));
            sHTML += '<tr>';
            sHTML += '<td>' + sWorkerName + '</td>';
            sHTML += '<td>' + oJson.workers[sWorkerName].hashrate + '</td>';
            sHTML += '</tr>';
        }
    }
    sHTML += '</table>';
    oDiv.innerHTML = sHTML;
    updateFigures(iHashRate, oJson.unpaid);
}

function updateFigures(iHashRate, iEtherum) {
    var oSpanHashRate = document.getElementById('total-hashrate'),
        oSpanUnpaidBalance = document.getElementById('unpaid-balance');

    iEtherum = iEtherum * Math.pow(10, -18);
    oSpanHashRate.innerHTML = iHashRate;
    oSpanUnpaidBalance.innerHTML = iEtherum.toFixed(5);
}

var port = chrome.extension.connect({
    name: "Communication"
});

port.onMessage.addListener(function (oJson) {
    updateDOM(oJson);
});