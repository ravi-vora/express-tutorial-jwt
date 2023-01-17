import { createClient } from 'redis';
export const connectToRedis = () => {
    return new Promise(async (resolve, reject) => {
        const client = createClient({
            url: 'redis://127.0.0.1:6379'
        });
        client.on('error', (err) => {
            console.log('Redis Client Error', err.message);
            reject(err);
        });
        await client.connect();
        console.log('redis server connected ✔');
        resolve(true);
    });
};
//# sourceMappingURL=redis.service.js.map