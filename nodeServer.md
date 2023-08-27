这就是软件需要的后端，我写的比较简单，只包括登录和鉴权接口

app.post('/login', async (req, res) => {
  const { username, password } = req?.body
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username, password }, jwtKey)
    const data = {
      code: "200",
      token: '假设我是已经加密的admin-token',
    }
    res.send(data)
  }
  else if (username === '123' && password === '123') {
    const token = jwt.sign({ username, password }, jwtKey)
    const data = {
      code: "200",
      token: '假设我是已经加密的user-token',
    }
    res.send(data)
  } else {
    res.send({ code: "400" })
  }
})

app.post('/auth', async (req, res) => {
  console.log(req.body.auth, 'wishireqauth')
  const { auth } = req?.body
  if (auth === '假设我是已经加密的admin-token') {
    const data = {
      code: "200",
      ownerAuth: 'admin',
      info: {
        name: '管理员1'

      }
    }
    res.send(data)
  }
  else if (auth === '假设我是已经加密的user-token') {
    const data = {
      code: "200",
      ownerAuth: 'user',
      info: {
        name: '用户1'

      }
    }
    res.send(data)
  } else {
    res.send({ code: "400" })
  }

})
