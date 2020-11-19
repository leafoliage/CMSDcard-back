const mailer = require('nodemailer')

const transport = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.EMAIL_ADD,
        pass: process.env.EMAIL_PASS,
    }
})

function sendRegisterEmail(name, email, tempPassword) {
    const content = `
        <h2>哈囉, ${name}, 歡迎你~</h2>
        <p>感謝您註冊協同學生論壇!</p>
        <p>這是您的暫時密碼: 
            <strong>${tempPassword}</strong><br />
            建議您盡快修改!<br />
            請在登入後點選進入"我的帳號"頁面以修改密碼
        </p>
        <p>祝您使用愉快!</p>
        <p>CMSForum團隊 敬上</p>
    `

    const mailOptions = {
        from: `"協同學生論壇" <${process.env.EMAIL_ADD}>`,
        to: email,
        subject: '註冊成功',
        generateTextFromHTML: true,
        html: content
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return err
        else return null
    })
} 

function sendForgotPassEmail(name, email, tempPassword) {
    const content = `
        <h2>${name}，您好</h2>
        <p>
            您的密碼已更新為
            <strong>${tempPassword}</strong>
        </p>
        <p>祝您使用愉快!</p>
        <p>CMSForum團隊 敬上</p>
    `

    const mailOptions = {
        from: `"協同學生論壇" <${process.env.EMAIL_ADD}>`,
        to: email,
        subject: '密碼修復成功',
        generateTextFromHTML: true,
        html: content
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return err
        else return null
    })
}

function sendPassSetEmail(name, email) {
    const content = `
        <h2>${name}，您好</h2>
        <p>
            您剛剛更新了您的密碼
        </p>
        <p>祝您使用愉快!</p>
        <p>CMSForum團隊 敬上</p>
    `

    const mailOptions = {
        from: `"協同學生論壇" <${process.env.EMAIL_ADD}>`,
        to: email,
        subject: '密碼更新通知',
        generateTextFromHTML: true,
        html: content
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return err
        else return null
    })
}

function sendCustomEmail(name, email, title, text) {
    const content = `
        <h2>${name}，您好</h2>
        <p>
            ${text}
        </p>
        <p>祝您使用愉快!</p>
        <p>CMSForum團隊 敬上</p>
    `

    const mailOptions = {
        from: `"協同學生論壇" <${process.env.EMAIL_ADD}>`,
        to: email,
        subject: title,
        generateTextFromHTML: true,
        html: content
    }

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return err
        else return null
    })
}

module.exports = {
    sendRegisterEmail,
    sendForgotPassEmail,
    sendPassSetEmail,
    sendCustomEmail
}