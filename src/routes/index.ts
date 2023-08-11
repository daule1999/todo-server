import categoryRouter from "./category"
import taskRouter from "./task"
import userRouter from "./user"

type RoutesProps = {
  routes: {
    path: string,
    router: any
  }[]
  init: (app:any) => never
}
const routes = [
  { path: '/auth', router: userRouter },
  { path: '/tasks', router: taskRouter },
  { path: '/categories', router: categoryRouter },
]
const Routes: RoutesProps = {
  routes,
  init: (app) => {
    if (!app || !app.use) {
      console.error('[Error] Route Initialization Failed: app / app.use is undefined')
      return process.exit(1)
    }
    // Custom Routes
    routes.forEach(route => app.use(route.path, route.router))

    // Final Route Pipeline
    app.use('*', (request, response, next) => {
      console.log(request.isMatched)
      if (!request.isMatched) {
        const { method, originalUrl } = request
        const message = `Cannot ${method} ${originalUrl}`
        response.status(500).send({ message })
      }
      return response
    })
  }
}


export default Routes

