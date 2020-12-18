export default function pipeline (context, middleware, index = 1) {
  {
    const nextMiddleware = middleware[index]
    if (!nextMiddleware) {
      return context.next
    }

    return any => {
      const nextPipeline = pipeline(context, middleware, index + 1)
      console.log(nextPipeline)
      nextMiddleware({ ...context, next: nextPipeline })
    }
  }
}
