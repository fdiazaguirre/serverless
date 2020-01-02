const aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});
const sns = new aws.SNS();

exports.handler = async function (event, context) {
    const params = {
        Message: 'Hello World!',
        Subject: 'SNS Notification from Lambda',
        // After creation you could replace this for the value in order to debug locally 'arn:aws:sns:us-east-1:429463357492:sam-hello-world-2-HelloWorldTopic-9U2Z4PJDP8GG'
        TopicArn: process.env.SNS_TOPIC_ARN
    };
    try {
        console.log(`DEBUG: event name is ${process.env.SNS_TOPIC_ARN}`);
        await sns.publish(params).promise();
        return {statusCode: 200, body: 'Message sent'};
    } catch (err) {
        return {statusCode: 500, body: JSON.stringify(err)};
    }
};