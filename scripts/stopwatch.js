if (!document.getElementById("stopwatchWindow")) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("styles/stopwatch.css");
    document.head.appendChild(link);

    const stopwatchDiv = document.createElement("div");
    stopwatchDiv.id = "stopwatchWindow";
    stopwatchDiv.classList.add("floating-window");
    stopwatchDiv.innerHTML = `
        <div class="title-bar">
            <span class="title">⏱️ Stop Watch</span>
            <span class="minimize-btn ctrl" title="minimize">—</span>
            <span class="close-btn ctrl" title="Close">❌</span>
        </div>
        <div class="content">
            <div class="btns">
                <button id="startSW">Start</button>
                <button id="stopSW">Stop</button>
                <button id="resetSW">Reset</button>
            </div>
            <div id="swDisplay">00:00:00</div>
        </div>
    `;
    document.body.appendChild(stopwatchDiv);
    makeDraggable(stopwatchDiv);

    let swInterval;
    let elapsed = 0;

    function updateSW() {
        // hrs = total seconds ÷ 3600
        // mins = (remaining seconds after hours) ÷ 60
        // secs = remaining seconds after full minutes

        const hrs = String(Math.floor(elapsed / 3600)).padStart(2, "0");
        const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
        const secs = String(elapsed % 60).padStart(2, "0");
        document.getElementById("swDisplay").textContent = `${hrs}:${mins}:${secs}`;
    }

    document.getElementById("startSW").onclick = () => {
        if (swInterval) return;
        swInterval = setInterval(() => {
            elapsed++;
            updateSW();
        }, 1000);
    };

    document.getElementById("stopSW").onclick = () => {
        clearInterval(swInterval);
        swInterval = null;
    };

    document.getElementById("resetSW").onclick = () => {
        clearInterval(swInterval);
        swInterval = null;
        elapsed = 0;
        updateSW();
    };

    minimizeWindow(stopwatchDiv.querySelector(".minimize-btn"), stopwatchDiv);
    closeWindow(stopwatchDiv.querySelector(".close-btn"), stopwatchDiv, swInterval);
}
