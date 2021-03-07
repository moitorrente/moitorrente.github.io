const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

activateURLUpdate();

function toggleAutoUpdate(updateURL) {
    if (updateURL) {
        activateURLUpdate();
    } else {
        deactivateURLUpdate();
    }
}

const urlInput = urlParams.get("input");

if (urlInput){
    textInput.value = atob(urlInput);

}


function activateURLUpdate() {
    textInput.addEventListener("input", updateURL);
    textInputExpanded.addEventListener("input", updateURL);
}

function deactivateURLUpdate() {
    textInput.removeEventListener("input", updateURL);
    textInputExpanded.removeEventListener("input", updateURL);
}


function updateURL(keep) {

    let input = this.value;

    if(!keep){
        console.log(clear)
        input = "";
    }

    let parm = encodeToB64(input);
    if (window.history.replaceState) {
        window.history.replaceState({}, null, `?input=${parm}`);
    }
}

function encodeToB64(message) {
    let encoded = btoa(message);
    encoded = encoded.replaceAll("=", "")
    encoded = encoded.replaceAll("+", "");
    encoded = encoded.replaceAll("/", "");
    return encoded;
}
