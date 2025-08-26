/** In milliseconds, the time it takes for a popup animation to complete. */
const frameAnimationTime = parseInt(
  window
    .getComputedStyle(document.body)
    .getPropertyValue("--popup-transition-duration")
    .replace("ms", "")
);

/**
 * Animate a popup opening from the position of a clicked
 * button.
 * @param {HTMLDialogElement} popup
 * @param {HTMLButtonElement} button
 * @returns {HTMLDialogElement}
 */
function animateOpenPopup(popup, button) {
  const buttonRectangle = button.getBoundingClientRect();

  popup.style.top = `${buttonRectangle.top}px`;
  popup.style.left = `${buttonRectangle.left}px`;
  popup.style.width = `${buttonRectangle.width}px`;
  popup.style.height = `${buttonRectangle.height}px`;

  setTimeout(() => {
    popup.style.transitionDuration = "var(--popup-transition-duration)";
    popup.style.top = "2em";
    popup.style.left = "2em";
    popup.style.width = "calc(100% - 4em)";
    popup.style.height = "calc(100% - 4em)";
  }, 0);
}

/**
 * Animate a popup closing to the position of a clicked
 * button.
 * @param {HTMLDialogElement} popup
 * @param {HTMLButtonElement} button
 * @returns {HTMLDialogElement}
 */
function animateClosePopup(popup, button) {
  const buttonRectangle = button.getBoundingClientRect();

  popup.style.top = `${buttonRectangle.top}px`;
  popup.style.left = `${buttonRectangle.left}px`;
  popup.style.width = `${buttonRectangle.width}px`;
  popup.style.height = `${buttonRectangle.height}px`;

  setTimeout(() => {
    popup.style.transitionDuration = "0s";
  }, frameAnimationTime);
}

/**
 * Connect a button and a popup given their IDs.
 * @param {string} buttonId - the ID of the button
 * @param {string} popupId - the ID of the popup
 * @returns {void}
 */
function connectButtonToPopup(buttonId, popupId) {
  /** @type {HTMLButtonElement | null} */
  const button = document.querySelector(`button#${buttonId}`);

  if (button === null) {
    throw ReferenceError(`could not find button with id ${buttonId}`);
  }

  /** @type {HTMLDialogElement | null} */
  const popup = document.querySelector(`dialog#${popupId}`);

  if (popup === null) {
    throw ReferenceError(`could not find popup with id ${popupId}`);
  }

  button.addEventListener("click", () => {
    popup.showModal();
    animateOpenPopup(popup, button);
  });

  popup.addEventListener("cancel", (event) => {
    event.preventDefault();

    animateClosePopup(popup, button);

    setTimeout(() => {
      popup.close();
    }, frameAnimationTime);
  });
}

/**
 * Make the button with the given ID into a link with the given `url`.
 * @param {string} button_id
 * @param {string} url
 */
function makeButtonAsLink(button_id, url) {
  /** @type {HTMLButtonElement | null}  */
  const button = document.querySelector(`button#${button_id}`);

  if (button === null) {
    throw ReferenceError(`button with id ${button_id} could not be found`);
  }

  button.addEventListener("click", (_) => {
    window.location.assign(url);
  });
}

/**
 * Entry point.
 * @returns {void}
 */
function main() {
  makeButtonAsLink("button-music", "https://qexat.bandcamp.com/");
  connectButtonToPopup("button-members", "popup-members");
}

main();
