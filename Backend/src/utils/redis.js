import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
    constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });

        this.client.on('error', (err) => console.error('Redis Client Error', err));
        this.client.on('connect', () => console.log('Redis connected'));

        // Promisify methods
        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setExAsync = promisify(this.client.setEx).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);

        // Connect to Redis
        this.connect();
    }

    async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }

    async get(key) {
        try {
            const data = await this.client.get(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Redis get error:', error);
            return null;
        }
    }

    async set(key, value, ttl = 3600) { // Default TTL: 1 hour
        try {
            await this.client.setEx(key, ttl, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Redis set error:', error);
            return false;
        }
    }

    async del(key) {
        try {
            await this.client.del(key);
            return true;
        } catch (error) {
            console.error('Redis delete error:', error);
            return false;
        }
    }

    // Generate cache key for health packages
    generateHealthPackagesKey(weekRange) {
        return `health_packages:${weekRange.monday}_${weekRange.sunday}`;
    }
    
    async invalidateHealthPackagesCache() {
        const keys = await this.client.keys('health_packages:*');
        if (keys.length > 0) {
            await this.client.del(...keys);
        }
    }
}

// Create a singleton instance
export const redis = new RedisClient();

export default redis;
