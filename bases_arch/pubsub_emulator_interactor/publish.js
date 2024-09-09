const { PubSub } = require('@google-cloud/pubsub');
const readline = require('readline');

async function publishMessage() {
    const pubsub = new PubSub({ projectId: 'my-project', apiEndpoint: process.env.PUBSUB_EMULATOR_HOST });

    try {
        const [topics] = await pubsub.getTopics();
        console.log('Topics:');
        topics.forEach((topic, index) => console.log(`${index + 1}. ${topic.name}`));

        const topicIndex = await askForTopicIndex(topics.length);
        const topicName = topics[topicIndex - 1].name;
        const message = await askForMessage();

        const dataBuffer = Buffer.from(message);
        await pubsub.topic(topicName).publish(dataBuffer);
        console.log(`Message "${message}" published to topic ${topicName}.`);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function askForTopicIndex(maxIndex) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(`Enter the topic number (1-${maxIndex}): `, (index) => {
            rl.close();
            resolve(parseInt(index, 10));
        });
    });
}

async function askForMessage() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question('Enter the message to publish: ', (message) => {
            rl.close();
            resolve(message);
        });
    });
}

publishMessage().catch(console.error);