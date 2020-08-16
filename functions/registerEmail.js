const mailer = require('nodemailer')

const transport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.email_add,
        pass: process.env.email_pass,
    }
})

function sendRegisterEmail(name, email, tempPassword) {
    const content = `
        <h2>哈囉, ${name}, 歡迎你~</h2>
        <p>感謝您註冊協同學生意見平台!</p>
        <p>這是您的暫時密碼: 
            <strong>${tempPassword}</strong><br />
            建議您盡快修改!<br />
            <a href="http://cmsforum.com/user/account">前往修改密碼</a>
        </p>
        <p>祝您使用愉快!</p>
        <p>CMSForum團隊 敬上</p>
    `

    const mailOptions = {
        from: `"協同學生意見平台" <${process.env.emailAdd}>`,
        to: email,
        subject: '註冊成功',
        generateTextFromHTML: true,
        html: content
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) console.log('Resgister emal error: ', err)
    })
} 

module.exports = sendRegisterEmail