import User from "../models/User";
import { hashPassword } from "../utilities/auth";

const users = [
  {
    "birth_date": "1990-01-01",
    "full_name": "Juan Pérez",
    "password": "123456",
    "user_name": "juanperez"
  },
  {
    "birth_date": "1985-02-14",
    "full_name": "María Gómez",
    "password": "abcdef",
    "user_name": "mariagomez"
  },
  {
    "birth_date": "1992-03-30",
    "full_name": "Carlos Rodríguez",
    "password": "qwerty",
    "user_name": "carlosrodriguez"
  },
  {
    "birth_date": "1988-04-25",
    "full_name": "Ana Torres",
    "password": "zxcvbn",
    "user_name": "anatorres"
  },
  {
    "birth_date": "1995-05-10",
    "full_name": "Luis Martínez",
    "password": "asdfgh",
    "user_name": "luismartinez"
  },
  {
    "birth_date": "1983-06-18",
    "full_name": "Sofía Sánchez",
    "password": "123qwe",
    "user_name": "sofisanchez"
  },
  {
    "birth_date": "1991-07-22",
    "full_name": "Diego Ramírez",
    "password": "456rty",
    "user_name": "diegoramirez"
  },
  {
    "birth_date": "1987-08-05",
    "full_name": "Laura Castro",
    "password": "789uio",
    "user_name": "lauracastro"
  },
  {
    "birth_date": "1993-09-12",
    "full_name": "Andrés Herrera",
    "password": "poiuyt",
    "user_name": "andresherrera"
  },
  {
    "birth_date": "1984-10-30",
    "full_name": "Isabel Moreno",
    "password": "hjklmn",
    "user_name": "isabelmoreno"
  },
  {
    "birth_date": "1990-11-20",
    "full_name": "Fernando Ruiz",
    "password": "bnm123",
    "user_name": "fernandoruiz"
  },
  {
    "birth_date": "1986-12-15",
    "full_name": "Claudia Ortega",
    "password": "mnb456",
    "user_name": "claudiaortega"
  },
  {
    "birth_date": "1992-01-28",
    "full_name": "Javier Delgado",
    "password": "123abc",
    "user_name": "javierdelgado"
  },
  {
    "birth_date": "1989-02-19",
    "full_name": "Patricia Romero",
    "password": "456def",
    "user_name": "patriciaromero"
  },
  {
    "birth_date": "1994-03-10",
    "full_name": "Ricardo Silva",
    "password": "789ghi",
    "user_name": "ricardosilva"
  },
  {
    "birth_date": "1982-04-17",
    "full_name": "Verónica Peña",
    "password": "qwe123",
    "user_name": "veronicapena"
  },
  {
    "birth_date": "1991-05-22",
    "full_name": "Cristian Aguirre",
    "password": "rty456",
    "user_name": "cristianaguirre"
  },
  {
    "birth_date": "1987-06-09",
    "full_name": "Gabriela Soto",
    "password": "uio789",
    "user_name": "gabrielasoto"
  },
  {
    "birth_date": "1993-07-12",
    "full_name": "Sergio Cordero",
    "password": "ytrewq",
    "user_name": "sergiocordero"
  },
  {
    "birth_date": "1985-08-25",
    "full_name": "Natalia Ríos",
    "password": "asdf123",
    "user_name": "nataliarios"
  },
  {
    "birth_date": "1990-09-30",
    "full_name": "Alejandro Mena",
    "password": "ghj456",
    "user_name": "alejandromena"
  },
  {
    "birth_date": "1988-10-18",
    "full_name": "Lorena Salazar",
    "password": "klz789",
    "user_name": "lorenasalazar"
  },
  {
    "birth_date": "1992-11-05",
    "full_name": "Esteban Vera",
    "password": "zxc123",
    "user_name": "estebanvera"
  },
  {
    "birth_date": "1983-12-12",
    "full_name": "Rocío Paredes",
    "password": "vbn456",
    "user_name": "rocioparedes"
  }
]


export async function seedUsers() {
  await User.destroy({ where: {} });

  const encryptedUsers = await Promise.all(
    users.map(async user => ({
      ...user,
      password: await hashPassword(user.password)
    }))
  );

  await User.bulkCreate(encryptedUsers);
  console.log('✔ Usuarios insertados');
}