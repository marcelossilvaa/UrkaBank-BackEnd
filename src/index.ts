import express, {Request, Response} from 'express';
import { router } from './routes';

const server = express();

server.use(express.json())
server.use(router)

server.get('/', (request: Request, reposnse: Response) => {
  return reposnse.status(200).json({ message: 'DioBank API' })
})

server.listen(5000, () => console.log('Server on update'))