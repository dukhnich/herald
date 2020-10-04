export const findThisMessage = (messages, chatID) => {
    return messages.reduce((prev,msg) =>
            msg.chat._id === chatID ? msg : prev
        , {
            chat: {_id: chatID},
            text: "",
            attach: [],
            replyTo: {},
            forwarded: {}
        })
}