const { PubSub } = require('@google-cloud/pubsub');
const readline = require('readline');

async function createTopic() {
    const pubsub = new PubSub({ projectId: 'my-project' });

    const topicName = await askForTopicName();

    const [topic] = await pubsub.createTopic(topicName);
    console.log(`Topic ${topic.name} created.`);
}

async function askForTopicName() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,        
    });

    return new Promise((resolve) => {
        rl.question('Enter the topic name: ', (topicName) => {
            rl.close();
            resolve(topicName);
        });
    });
}

createTopic().catch(console.error);

