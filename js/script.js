document.addEventListener("DOMContentLoaded", initialize);
let lastNEvents = [];
const nEvents = 50;
let totalEvents = 0;

function initialize() {
    // look for all elements
    console.log("loaded. initalize() called.");
    subscribeToAllEvents(document.getElementById("section-form"));


    // Hook up the reset event log button
    document.getElementById("reset-event-log").addEventListener("click", () => {
        console.log("reset button clicked");
        lastNEvents = [];
        totalEvents = 0;
        displayEvents();
    });

    // puts the number in the number of events
    document.getElementById("n-events").innerText = nEvents;

}

function subscribeToAllEvents(element) {
    // Recursive logic
    // First process the element's parent
    for (let key in element) {
        if (key.search("on") === 0) {
            element.addEventListener(key.slice(2), listener);
        }
    }
    // Recurse to children
    for (ele of element.children) {
        subscribeToAllEvents(ele);
    }

    function listener(ev) {
        ev.stopPropagation();
        totalEvents++;

        /* 
            The unshift() method of Array instances adds the specified elements
             to the beginning of an array and returns the new length of the array.
        */
        lastNEvents.unshift(
            ev.type +
            " on target " +
            ev.currentTarget.nodeName +
            ":" +
            ev.currentTarget.id
        );

        while (lastNEvents.length > nEvents) {
            lastNEvents.pop(); // remove last element to make room!
        }
        displayEvents();

    }

    function displayEvents() {
        document.getElementById("total-events").innerText = totalEvents;
        document.getElementById("last-n-events").innerText = lastNEvents.join("\r\n");
    }

}