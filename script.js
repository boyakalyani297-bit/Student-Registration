const form = document.getElementById("registrationForm");

const submitBtn = document.getElementById("submitBtn");

const studentNameInput = document.getElementById("studentName");
const studentMobileInput = document.getElementById("studentMobile");

const fatherNameInput = document.getElementById("fatherName");
const fatherMobileInput = document.getElementById("fatherMobile");


// ===============================
// CONVERT NAMES TO CAPITAL LETTERS
// ===============================

studentNameInput.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});

fatherNameInput.addEventListener("input", function () {
    this.value = this.value.toUpperCase();
});


// ===============================
// ALLOW ONLY NUMBERS IN MOBILE
// ===============================

function allowOnlyNumbers(input) {

    input.addEventListener("input", function () {

        this.value = this.value
            .replace(/\D/g, "")
            .slice(0, 10);

    });

}

allowOnlyNumbers(studentMobileInput);
allowOnlyNumbers(fatherMobileInput);


// ===============================
// FORM SUBMISSION
// ===============================

form.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get values
    const studentName =
        studentNameInput.value.trim();

    const studentMobile =
        studentMobileInput.value.trim();

    const qualification =
        document.getElementById("qualification").value.trim();

    const fatherName =
        fatherNameInput.value.trim();

    const fatherMobile =
        fatherMobileInput.value.trim();

    const village =
        document.getElementById("village").value.trim();

    const mandal =
        document.getElementById("mandal").value;


    // ===============================
    // MOBILE NUMBER VALIDATION
    // ===============================

    const mobilePattern = /^[6-9][0-9]{9}$/;


    if (!mobilePattern.test(studentMobile)) {

        alert(
            "Please enter a valid 10-digit Student Mobile Number starting with 6, 7, 8 or 9."
        );

        studentMobileInput.focus();

        return;
    }


    if (!mobilePattern.test(fatherMobile)) {

        alert(
            "Please enter a valid 10-digit Father Mobile Number starting with 6, 7, 8 or 9."
        );

        fatherMobileInput.focus();

        return;
    }


    // ===============================
    // DISABLE BUTTON
    // ===============================

    submitBtn.disabled = true;

    submitBtn.textContent = "Submitting...";


    // ===============================
    // GOOGLE APPS SCRIPT URL
    // ===============================

    const scriptURL =
        "https://script.google.com/macros/s/AKfycbyyy8VMYSBx8W_Ne3mGjvzmlYpfmd3pNM7YBCpy-a7L9b8aEZB0Ax17-IQdjYHAgDI-/exec";


    // ===============================
    // JSONP CALLBACK
    // ===============================

    const callbackName =
        "googleSheetCallback_" + Date.now();


    window[callbackName] = function (response) {

        if (response && response.success) {

            document.getElementById("successMessage").textContent =
                "Registration ID: " + response.registrationId;


            document.getElementById("successPopup").style.display =
                "flex";


            // Clear form
            form.reset();

        
        }
        else {

    if (response && response.alreadyRegistered) {

        alert(
            "This student is already registered.\n\n" +
            "Registration ID: " +
            response.registrationId
        );

    }

    else {

        alert(
            response && response.message
                ? response.message
                : "Registration failed. Please try again."
        );

    }

}


        // Enable button
        submitBtn.disabled = false;

        submitBtn.textContent = "Submit";


        // Remove callback
        delete window[callbackName];

    };


    // ===============================
    // CREATE REQUEST URL
    // ===============================

    const url =
        scriptURL +

        "?studentName=" +
        encodeURIComponent(studentName) +

        "&studentMobile=" +
        encodeURIComponent(studentMobile) +

        "&qualification=" +
        encodeURIComponent(qualification) +

        "&fatherName=" +
        encodeURIComponent(fatherName) +

        "&fatherMobile=" +
        encodeURIComponent(fatherMobile) +

        "&village=" +
        encodeURIComponent(village) +

        "&mandal=" +
        encodeURIComponent(mandal) +

        "&callback=" +
        encodeURIComponent(callbackName);


    // ===============================
    // SEND TO GOOGLE APPS SCRIPT
    // ===============================

    const script =
        document.createElement("script");


    script.src = url;


    script.onerror = function () {

        alert(
            "Unable to connect to the registration server. Please try again."
        );


        submitBtn.disabled = false;

        submitBtn.textContent = "Submit";

        delete window[callbackName];

        script.remove();

    };


    document.body.appendChild(script);


    script.onload = function () {

        script.remove();

    };

});


// ===============================
// CLOSE SUCCESS POPUP
// ===============================

function closePopup() {

    document.getElementById("successPopup").style.display =
        "none";

}