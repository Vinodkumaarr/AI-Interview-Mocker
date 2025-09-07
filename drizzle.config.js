/**@type { import("drizzle-kit").Config} */

export default {
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_iQJXsG36PdjN@ep-restless-rice-a85jcb9l-pooler.eastus2.azure.neon.tech/ai-interview-mocker?sslmode=require'
    }
};

