const { PubSub } = require('@google-cloud/pubsub');
const readline = require('readline');

async function listAndSubscribe() {
    const pubsub = new PubSub({ projectId: 'my-project', apiEndpoint: process.env.PUBSUB_EMULATOR_HOST });

    try {
        const [topics] = await pubsub.getTopics();
        console.log('Topics:');
        topics.forEach((topic, index) => console.log(`${index + 1}. ${topic.name}`));

        const topicIndex = await askForTopicIndex(topics.length);
        const topicName = topics[topicIndex - 1].name;

        const [subscriptions] = await pubsub.topic(topicName).getSubscriptions();
        if (subscriptions.length > 0) {
            console.log('Subscriptions:');
            subscriptions.forEach((sub, index) => console.log(`${index + 1}. ${sub.name}`));
        } else {
            console.log('No subscriptions found for this topic.');
        }

        const subscriptionIndex = await askForSubscriptionIndex(subscriptions.length);
        let subscription;

        if (subscriptionIndex === 0) {
            const subscriptionName = await askForSubscriptionName();
            [subscription] = await pubsub.topic(topicName).createSubscription(subscriptionName);
            console.log(`Subscription ${subscription.name} created.`);
        } else {
            subscription = subscriptions[subscriptionIndex - 1];
            console.log(`Reusing existing subscription ${subscription.name}.`);
        }

        subscription.on('message', message => {
            console.log(`Received message: ${message.data.toString()}`);
            message.ack();
        });

        subscription.on('error', error => {
            console.error('Received error:', error);
        });
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

async function askForSubscriptionIndex(maxIndex) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(`Enter the subscription number (1-${maxIndex}) or 0 to create a new one: `, (index) => {
            rl.close();
            resolve(parseInt(index, 10));
        });
    });
}

async function askForSubscriptionName() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question('Enter the subscription name: ', (subscriptionName) => {
            rl.close();
            resolve(subscriptionName);
        });
    });
}

listAndSubscribe().catch(console.error);