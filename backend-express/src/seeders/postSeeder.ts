import Post from "../models/Post";
import User from "../models/User";

const posts = [
  { "content": "¡Buenos días a todos!", "user_id": 4 },
  { "content": "Hoy fue un gran día en el trabajo.", "user_id": 12 },
  { "content": "Estoy aprendiendo TypeScript y me encanta.", "user_id": 7 },
  { "content": "¿Alguien ha visto la nueva película?", "user_id": 18 },
  { "content": "No puedo dejar de escuchar esta canción 🎶", "user_id": 2 },
  { "content": "Mi perro hizo algo muy gracioso hoy 😂", "user_id": 16 },
  { "content": "Necesito recomendaciones de libros", "user_id": 9 },
  { "content": "El café de esta mañana estuvo increíble ☕", "user_id": 1 },
  { "content": "¡Me siento motivado para empezar la semana!", "user_id": 13 },
  { "content": "El clima está perfecto para salir a caminar.", "user_id": 10 },
  { "content": "Acabo de terminar un nuevo proyecto 🚀", "user_id": 3 },
  { "content": "Estoy probando una nueva receta de pasta 🍝", "user_id": 8 },
  { "content": "Hoy solo quiero dormir todo el día 😴", "user_id": 5 },
  { "content": "Qué día tan productivo 💪", "user_id": 6 },
  { "content": "¿Qué serie están viendo ahora?", "user_id": 14 },
  { "content": "Los lunes no deberían existir 😅", "user_id": 19 },
  { "content": "Amo los atardeceres en mi ciudad 🌇", "user_id": 11 },
  { "content": "¡Gracias por todo el apoyo amigos!", "user_id": 17 },
  { "content": "Revisando fotos viejas... qué nostalgia", "user_id": 15 },
  { "content": "Necesito vacaciones urgentemente 🏖️", "user_id": 20 },
  { "content": "Hoy comí mi comida favorita: sushi 🍣", "user_id": 4 },
  { "content": "Me duele todo después del gimnasio 😓", "user_id": 12 },
  { "content": "Amo cómo huele la lluvia 🌧️", "user_id": 2 },
  { "content": "Aprendí algo nuevo sobre JavaScript hoy", "user_id": 6 },
  { "content": "Hoy celebramos el cumpleaños de mi hermano 🎉", "user_id": 3 },
  { "content": "Quiero adoptar un gato 😺", "user_id": 7 },
  { "content": "Esta semana será diferente. Lo siento.", "user_id": 10 },
  { "content": "Nada como un buen libro y una taza de té 📚🍵", "user_id": 9 },
  { "content": "Domingo de limpieza y descanso 🧼🛋️", "user_id": 18 },
  { "content": "Estoy intentando ser más disciplinado 🧘", "user_id": 5 },
  { "content": "Hoy me dijeron algo que necesitaba oír", "user_id": 1 },
  { "content": "Probando un nuevo hobby: pintura 🎨", "user_id": 13 },
  { "content": "No todos los días son buenos, pero hay algo bueno en cada día", "user_id": 14 },
  { "content": "Me encanta cocinar para mi familia ❤️", "user_id": 8 },
  { "content": "A veces solo necesitamos respirar y seguir", "user_id": 11 },
  { "content": "Día nublado, perfecto para quedarse en casa ☁️", "user_id": 16 },
  { "content": "Quiero aprender a tocar guitarra 🎸", "user_id": 17 },
  { "content": "Gracias por estar aquí, aunque no lo sepas", "user_id": 15 },
  { "content": "Desconectando por un rato. Paz ✌️", "user_id": 19 },
  { "content": "El universo conspira a favor de los que creen 🌌", "user_id": 20 }
]


export async function seedPosts() {
  await Post.destroy({ where: {} });

  for (const post of posts) {
    const user = await User.findOne({ where: { id: post.user_id } });
    if (user) {
      await Post.create({
        content: post.content,
        user_id: user.id
      });
    }
  }

  console.log('✔ Posts insertados');
}