(function () {
  "use strict";

  // Ceremony: May 2, 2026 at 4:00 PM in the visitor's local timezone
  var WEDDING_DATE = new Date(2026, 4, 2, 16, 0, 0, 0);

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatTargetDate(d) {
    var opts = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    };
    try {
      return d.toLocaleString(undefined, opts);
    } catch (e) {
      return d.toString();
    }
  }

  function updateCountdown() {
    var now = new Date();
    var diff = WEDDING_DATE - now;

    var elDays = document.getElementById("cd-days");
    var elHours = document.getElementById("cd-hours");
    var elMinutes = document.getElementById("cd-minutes");
    var elSeconds = document.getElementById("cd-seconds");
    var elTarget = document.getElementById("countdown-target");

    if (!elDays || !elHours || !elMinutes || !elSeconds) return;

    if (elTarget && !elTarget.textContent) {
      elTarget.textContent = "Counting down to " + formatTargetDate(WEDDING_DATE);
    }

    if (diff <= 0) {
      elDays.textContent = "0";
      elHours.textContent = "0";
      elMinutes.textContent = "0";
      elSeconds.textContent = "0";
      if (elTarget) {
        elTarget.textContent = "We’re married — thank you for celebrating with us!";
      }
      return;
    }

    var seconds = Math.floor(diff / 1000);
    var days = Math.floor(seconds / 86400);
    seconds -= days * 86400;
    var hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    var minutes = Math.floor(seconds / 60);
    seconds %= 60;

    elDays.textContent = pad(days);
    elHours.textContent = pad(hours);
    elMinutes.textContent = pad(minutes);
    elSeconds.textContent = pad(seconds);
  }

  function initCountdown() {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  function initRsvp() {
    var form = document.getElementById("rsvp-form");
    var status = document.getElementById("form-status");
    if (!form || !status) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.classList.remove("is-error");
      status.textContent = "";

      var name = form.elements.name && form.elements.name.value.trim();
      var email = form.elements.email && form.elements.email.value.trim();
      var guests = form.elements.guests && form.elements.guests.value;

      if (!name || !email || !guests) {
        status.classList.add("is-error");
        status.textContent = "Please fill in all required fields.";
        return;
      }

      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailOk) {
        status.classList.add("is-error");
        status.textContent = "Please enter a valid email address.";
        return;
      }

      // Demo: no backend — replace with fetch() to your API or form service.
      status.textContent =
        "Thank you, " + name.split(" ")[0] + ". Your RSVP has been noted. (This is a demo — connect your form endpoint to save responses.)";
      form.reset();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initCountdown();
      initRsvp();
    });
  } else {
    initCountdown();
    initRsvp();
  }
})();
