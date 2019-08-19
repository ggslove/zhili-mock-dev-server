import Koa from 'koa';
import path from 'path';
const app = new Koa();
import Router from 'koa-router';
var workDir = path.resolve('.');
const mockPath=path.join(workDir,"/mock/");
console.log('mockPath is '+mockPath);

const routerOpts: Router.IRouterOptions = {
  prefix: '/mock',
};
//读取 mock 文件路径
const router = new Router(routerOpts);
router.all("/:path1/:path2", async ctx => {
  const path1=ctx.params.path1;
  const path2=ctx.params.path2;
  ctx.body=require(`${mockPath}/${path1}/${path2}.js`)
  ctx.status = 301;
})
app.use(router.routes());

const enableMockServer =process.env.ENABLE_MOCK_SERVER
const mockPort=process.env.MOCK_PORT?Number.parseInt(process.env.MOCK_PORT):3000;
if (enableMockServer) {
  app.listen( mockPort,
    () => console.log(`mock server is started at port: ${mockPort}!`))
}