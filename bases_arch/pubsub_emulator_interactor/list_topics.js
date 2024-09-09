const { PubSub } = require('@google-cloud/pubsub');

async function listTopics() {
    const pubsub = new PubSub({ projectId: 'my-project', apiEndpoint: process.env.PUBSUB_EMULATOR_HOST });

    try {
        const [topics] = await pubsub.getTopics();
        console.log('Topics:');
        topics.forEach(topic => console.log(topic.name));
    } catch (error) {
        console.error('Error listing topics:', error);
    }
}

listTopics().catch(console.error);