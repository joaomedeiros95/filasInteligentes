from aiohttp import web
import MySQLdb

async def index(request):
	db=MySQLdb.connect(passwd="123456",db="stanford",user="root")

	c=db.cursor()
	max_price=5
	c.execute("SELECT * FROM Friend;")

	print(c.fetchone())

	return web.Response(text='Hello Aiohttp!')

app = web.Application()
app.router.add_get('/', index)
web.run_app(app, host='127.0.0.1', port=8081)