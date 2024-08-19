import { Hono } from 'hono'
import { hc } from 'hono/client'
import { CounterComponent } from './app/components/CounterComponent';
import RootLayout from './app/layout';
import Landing from './app/pages/landing';
import NotFound from './app/pages/error/404';
import { NotFoundException } from '@/app/libs/error';

const app = new Hono()
const isBrowserRequest = (c: any) => {
  const acceptHeader = c.req.header('Accept');
  return acceptHeader && acceptHeader.includes('text/html');
};

const routes = app.get('/', (c) => c.html(
  <RootLayout title='Hello Hono - ENJOYS'>
    <Landing />
  </RootLayout>))

app.all('/render', (c) => {
  const initialCount = 0;
  return c.html(<CounterComponent initialCount={initialCount} />);
})

//  404 page
app.all('/*', (c) => {
  if (isBrowserRequest(c)) new NotFoundException()
  return c.html(
    <RootLayout title='Not Found'>
      <NotFound />
    </RootLayout>)
})

export type AppType = typeof routes
const rpc = hc<AppType>("/") // RPC client

export default app