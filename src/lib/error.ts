/* eslint-disable no-console */
// error通知：現在はconsole.errorでエラーを通知しているが、将来的にsentryなどエラー通知の仕組みを導入する想定

export const captureException = (message: string, error: Error | unknown) =>
  console.error(`${message}: ${error}`);
