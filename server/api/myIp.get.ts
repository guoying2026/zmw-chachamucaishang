export default defineEventHandler (async (e) => {
  return {
    code: 200, 
    message: '请求成功', 
    result: e.node.req.headers['x-forwarded-for'] // 判断是否有反向代理 IP
    || e.node.req.connection.remoteAddress // 判断 connection 的远程 IP
    || e.node.req.socket.remoteAddress // 判断后端的 socket 的 IP
  };
})