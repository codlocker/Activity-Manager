/**
 * Created by shuttle3468 on 10/10/17.
 */
let getCurrent = null;
let new_url = "", res = new Set();
document.addEventListener("DOMContentLoaded", restoreOptions);

function startCheck(e) {
    e.preventDefault();
    getLink();
    getCurrent = browser.storage.local.get("url");
    getCurrent.then(addMoreLinks, saveLinks);
}
function getLink() {
    new_url = $("#url_complete").val();
    console.log(new_url);
}
function saveLinks(error) {
    console.log(`Error: ${error}`);
    browser.storage.local.set({'url': new_url});
}

function addMoreLinks(result) {
    browser.storage.local.set(
        {
            'url': new_url
        });
}

function restoreOptions() {
    getCurrent = browser.storage.local.get("url");
    getCurrent.then(setData, errorData);
}

function setData(result) {
    res = result.url;
    if (res === null) {
        $("#allowed_urls").append("<p>No URL Added yet!</p>");
    } else {
        let url_content = createDivForLink(res);
        $("#allowed_urls").append(url_content);
    }
}

function errorData(error) {
    console.log(`Error: ${error}`);
}

function createDivForLink(u) {
    "use strict";
    let row, col8, col4, p_tag, button;
    row = document.createElement("div");
    $(row).addClass("row");
    col8 = document.createElement("div");
    $(col8).addClass("small-8"); $(col8).addClass("columns");
    col4 = document.createElement("div");
    $(col4).addClass("small-4"); $(col4).addClass("columns");

    p_tag = document.createElement("p");
    $(p_tag).addClass("label").addClass("success");
    $(p_tag).text(u);

    button = document.createElement("button");
    $(button).addClass("button").addClass("alert");
    $(button).attr("data-value", u);
    $(button).text("DELETE");
    $(button).on("click", function () {
        console.log("Deleting:" + u);
        res = null
        browser.storage.local.set(
            {
                'url': null
            });
        $(this).text("DELETED");
        $(this).addClass("disabled").removeClass("alert");
    });

    // Append All Data
    $(col8).append(p_tag);
    $(col4).append(button);
    $(row).append(col8, col4);
    return row;
}
document.querySelector("form").addEventListener("submit", startCheck);