import { DataSource } from "typeorm"
import { User } from "../entities/User"

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/database/db.sqlite",
  entities: [
    User
  ],
  migrations: process.env.NODE_ENV === 'production'
    ? ["dist/database/migrations/*.js"]
    : ["src/database/migrations/*.ts"],
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((error) => {
    console.error(error)
  })