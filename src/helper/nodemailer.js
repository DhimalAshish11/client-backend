import nodemailer from "nodemailer";

export const accountVerificationEmail = async (obj) => {
  const { email, fName, link } = obj;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"EST Store " <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Account activation required", // Subject line
    text: `hello ${fName}, please follow the link to activate your account. ${link}`, // plain text body
    html: `
        <p>
        Hello ${fName}
    </p>
    <p>
    please follow the link below to activate your account.
    </p>
    <br />
    <br />
    <p>
       <a href=${link}>  ${link} </a>
    </p>
    <br />
    <br />
    
    <p>
        Regareds, <br />
        EST Store <br />
        Customer Support Team
    </p>
        
        `, // html body
  });
};

export const accountVerifiedNotification = async (obj) => {
  const { email, fName } = obj;
  // 1. smtp config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"EST Store " <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Account has been verified", // Subject line
    text: `hello ${fName}, Your account has been verified, you may sign in now`, // plain text body
    html: `
    <p>
    Hello ${fName}
</p>
<p>
Your account has been verified, you may 
<a href="${process.env.WEB_DOMAIN}">
sign
</a>
in now
</p>
<br />
<br />
 

<p>
    Regareds, <br />
    EST Store <br />
    Customer Support Team
</p>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export const sendOTPNotification = async (obj) => {
  const { email, fName, otp } = obj;
  // 1. smtp config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: ` "EST Store " ${process.env.SMTP_USER}`, // sender address
    to: email, // list of receivers
    subject: "OTP for reset password", // Subject line
    text: `hello ${fName}, This is the OTP to reset password ${otp}`, // plain text body
    html: `
    <p>
    Hello ${fName}
</p>
<p>
Here is your OTP   to reset password 
</p>
<p>
${otp}
</p>

 

<p>
    Regareds, <br />
    EST Store <br />
    Customer Support Team
</p>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export const passwordChangedNotification = async (obj) => {
  const { email, fName } = obj;
  // 1. smtp config
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"EST Store " <${process.env.SMTP_USER}>`, // sender address
    to: email, // list of receivers
    subject: "Your account info is changed", // Subject line
    text: `hello ${fName}, recently your password is changed, if this is not you, contact us immideatly`, // plain text body
    html: `
    <p>
    Hello ${fName}
</p>
<p>
recently your password is changed, if this is not you, contact us immideatly

</p>
<p>
 

</p>

<br />
 
 

<p>
    Regareds, <br />
    EST Store <br />
    Customer Support Team
</p>
    
    `, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
