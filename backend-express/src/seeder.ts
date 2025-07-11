import { db } from "./config/db";
import { seedUsers } from "./seeders/authSeeder";
import { seedLikes } from "./seeders/likeSeeder";
import { seedPosts } from "./seeders/postSeeder";


async function runSeeders() {
  try {
    await db.sync({ force: true }); // cuidado: elimina datos existentes
    await seedUsers();
    await seedPosts();
    await seedLikes();
    await db.close();
    console.log('Seed completado correctamente');
  } catch (error) {
    console.error('Error ejecutando los seeders:', error);
  }
}

runSeeders();