import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init(process.env.REACT_APP_API_EMAIL_JS_publicKey);

// Function to send email
const sendEmail = (messageData) => {
  const templateParams = {
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    message: messageData.message
  };

  emailjs.send(
    process.env.REACT_APP_API_EMAIL_JS_serviceId,
    process.env.REACT_APP_API_EMAIL_JS_templateId,
    templateParams
  )
  .then((response) => {
    console.log('Email sent successfully:', response);
  })
  .catch((error) => {
    console.error('Email error:', error);
  });
};