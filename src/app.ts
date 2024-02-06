import express, { type Application, type Request, type Response } from 'express';

class App {
	public app: Application;
  
	constructor() {
		this.app = express();
		this.routes();
	}

	routes(): void {
		this.app.get('/', (req: Request, res: Response) => {
			res.status(200).json({
				message: 'Hello world!'
			});
		});
	}
}

export default new App().app;