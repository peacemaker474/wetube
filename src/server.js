import express from 'express';
import morgan from 'morgan';
import globerRouter from './Routers/globalRouter';
import userRouter from './Routers/userRouter';
import videoRouter from './Routers/videoRouter';

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use("/", globerRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;