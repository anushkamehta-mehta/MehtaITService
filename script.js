
// ============================================================
// MOBILE MENU
// ============================================================

const burger = document.querySelector('.burger');
const nav = document.querySelector('nav');

if (burger && nav) {

  burger.addEventListener('click', () => {

    const isOpen = nav.classList.toggle('open');

    burger.setAttribute(
      'aria-expanded',
      isOpen
    );

  });

}


// ============================================================
// SERVICES DROPDOWN
// ============================================================

const dropdownToggle =
  document.querySelector('.dd-toggle');

if (dropdownToggle) {

  dropdownToggle.addEventListener('click', (event) => {

    event.currentTarget
      .parentElement
      .classList.toggle('open');

  });

}


// ============================================================
// CLOSE MOBILE MENU AFTER CLICKING A LINK
// ============================================================

document
  .querySelectorAll('nav a')
  .forEach((link) => {

    link.addEventListener('click', () => {

      if (nav) {
        nav.classList.remove('open');
      }

      if (burger) {

        burger.setAttribute(
          'aria-expanded',
          'false'
        );

      }

    });

  });


// ============================================================
// WEB3FORMS CONTACT FORM
// ============================================================

const contactForm =
  document.getElementById('contact-form');

const submitButton =
  document.getElementById('submit-btn');


// ============================================================
// POPUP ELEMENTS
// ============================================================

const formPopup =
  document.getElementById('form-popup');

const formPopupIcon =
  document.getElementById('form-popup-icon');

const formPopupTitle =
  document.getElementById('form-popup-title');

const formPopupText =
  document.getElementById('form-popup-text');

const formPopupClose =
  document.getElementById('form-popup-close');

const formPopupOk =
  document.getElementById('form-popup-ok');

const formPopupOverlay =
  document.getElementById('form-popup-overlay');


// ============================================================
// SHOW POPUP
// ============================================================

function showFormPopup(type, title, message) {

  // Safety check

  if (!formPopup) {
    console.error('Form popup element not found.');
    return;
  }


  // Set icon

  if (formPopupIcon) {

    formPopupIcon.textContent =
      type === 'success' ? '✓' : '!';

  }


  // Set title

  if (formPopupTitle) {

    formPopupTitle.textContent =
      title;

  }


  // Set message

  if (formPopupText) {

    formPopupText.textContent =
      message;

  }


  // Remove previous state

  formPopup.classList.remove(
    'success',
    'error'
  );


  // Add current state

  formPopup.classList.add(
    type
  );


  // Show popup

  formPopup.classList.add(
    'show'
  );

  formPopup.setAttribute(
    'aria-hidden',
    'false'
  );


  // Stop background scrolling

  document.body.classList.add(
    'popup-open'
  );

}


// ============================================================
// CLOSE POPUP
// ============================================================

function closeFormPopup() {

  if (!formPopup) {
    return;
  }


  // Hide popup

  formPopup.classList.remove(
    'show'
  );


  formPopup.setAttribute(
    'aria-hidden',
    'true'
  );


  // Allow background scrolling

  document.body.classList.remove(
    'popup-open'
  );

}


// ============================================================
// CONTACT FORM SUBMISSION
// ============================================================

if (contactForm) {

  contactForm.addEventListener(
    'submit',
    async (event) => {

      // Prevent normal form submission

      event.preventDefault();


      // --------------------------------------------------------
      // Make sure submit button exists
      // --------------------------------------------------------

      if (!submitButton) {

        console.error(
          'Submit button not found.'
        );

        return;

      }


      // --------------------------------------------------------
      // Change button to Sending...
      // --------------------------------------------------------

      submitButton.disabled = true;

      submitButton.textContent =
        'Sending...';


      // --------------------------------------------------------
      // Collect form data
      // --------------------------------------------------------

      const formData =
        new FormData(contactForm);


      try {

        // ------------------------------------------------------
        // Send form to Web3Forms
        // ------------------------------------------------------

        const response =
          await fetch(
            'https://api.web3forms.com/submit',
            {
              method: 'POST',
              body: formData
            }
          );


        // ------------------------------------------------------
        // Get response
        // ------------------------------------------------------

        const result =
          await response.json();


        console.log(
          'Web3Forms response:',
          result
        );


        // ------------------------------------------------------
        // SUCCESS
        // ------------------------------------------------------

        if (result.success) {

          // Clear the form

          contactForm.reset();


          // Show success popup

          showFormPopup(
            'success',
            'Message sent successfully',
            'Thank you for contacting Mehta Mehta. Your message has been received. We will get back to you within one business day.'
          );

        }


        // ------------------------------------------------------
        // ERROR
        // ------------------------------------------------------

        else {

          showFormPopup(
            'error',
            'Message could not be sent',
            'We were unable to send your message. Please try again or contact us directly at amit@mehta-mehta.com.'
          );

        }

      }


      // --------------------------------------------------------
      // NETWORK ERROR
      // --------------------------------------------------------

      catch (error) {

        console.error(
          'Contact form error:',
          error
        );


        showFormPopup(
          'error',
          'Something went wrong',
          'We could not connect to the email service. Please check your internet connection and try again.'
        );

      }


      // --------------------------------------------------------
      // Restore button
      // --------------------------------------------------------

      submitButton.disabled = false;

      submitButton.textContent =
        'Send message';

    }
  );

}


// ============================================================
// CLOSE POPUP — X BUTTON
// ============================================================

if (formPopupClose) {

  formPopupClose.addEventListener(
    'click',
    closeFormPopup
  );

}


// ============================================================
// CLOSE POPUP — OK BUTTON
// ============================================================

if (formPopupOk) {

  formPopupOk.addEventListener(
    'click',
    closeFormPopup
  );

}


// ============================================================
// CLOSE POPUP — CLICKING OUTSIDE
// ============================================================

if (formPopupOverlay) {

  formPopupOverlay.addEventListener(
    'click',
    closeFormPopup
  );

}


// ============================================================
// CLOSE POPUP — ESCAPE KEY
// ============================================================

document.addEventListener(
  'keydown',
  (event) => {

    if (
      event.key === 'Escape' &&
      formPopup &&
      formPopup.classList.contains('show')
    ) {

      closeFormPopup();

    }

  }
);
// ============================================================
// HOME PAGE EXTRAS: reveal on scroll + deadline countdown
// ============================================================
document.documentElement.classList.add('js');

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add('in'));
}

const daysEl = document.getElementById('days-left');
if (daysEl) {
  const left = Math.ceil((new Date('2027-05-13T00:00:00') - new Date()) / 86400000);
  daysEl.textContent = Math.max(left, 0);
}

// ============================================================
// HOME PAGE PHONE PROTOTYPE: tap a task to complete it
// ============================================================
const phoneTasks = document.querySelectorAll('.task');
const phoneDone = document.getElementById('done-count');
const phoneBar = document.getElementById('phone-bar');
const phoneReset = document.getElementById('phone-reset');

function updatePhone() {
  const done = document.querySelectorAll('.task.done').length;
  if (phoneDone) phoneDone.textContent = done;
  if (phoneBar) phoneBar.style.width = (done / phoneTasks.length * 100) + '%';
}

phoneTasks.forEach((task) => {
  task.addEventListener('click', () => {
    task.classList.toggle('done');
    task.setAttribute('aria-pressed', task.classList.contains('done'));
    updatePhone();
  });
});

if (phoneReset) {
  phoneReset.addEventListener('click', () => {
    phoneTasks.forEach((task) => {
      task.classList.remove('done');
      task.setAttribute('aria-pressed', 'false');
    });
    updatePhone();
  });
}