const { PubSub } = require('@google-cloud/pubsub');

async function deleteAllTopicsAndSubscriptions() {
    const pubsub = new PubSub({ projectId: 'my-project', apiEndpoint: process.env.PUBSUB_EMULATOR_HOST });

    try {
        const [topics] = await pubsub.getTopics();
        console.log('Deleting all topics and their subscriptions...');

        for (const topic of topics) {
            const topicName = topic.name;
            console.log(`Processing topic: ${topicName}`);

            const [subscriptions] = await topic.getSubscriptions();
            for (const subscription of subscriptions) {
                console.log(`Deleting subscription: ${subscription.name}`);
                await subscription.delete();
            }

            console.log(`Deleting topic: ${topicName}`);
            await topic.delete();
        }

        console.log('All topics and subscriptions have been deleted.');
    } catch (error) {
        console.error('Error:', error);
    }
}

deleteAllTopicsAndSubscriptions().catch(console.error);