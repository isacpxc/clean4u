const express = require('express')
const cors = require('cors')
const app = express()
const port = 7788
const db = require('./db/connection')
const Users = require('./models/users')
const bodyParser = require('body-parser');

app.use(cors()) // para aceitar requisições
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json()); // processar solicitações http como json

app.post('/register', async (req,res)=>{

  const { email, name, tel, codx, cody} = req.body;
  const newU = await Users.create({ 
    email: email, 
    name: name, 
    tel: tel,
    codx: codx,
    cody: cody,
  }).then(()=>{
    res.status(200).send()
  }).catch(err => {
    console.log("O ERRO FOI: "+err)
  }).then(() => {res.status(200).send();/* return res.json(newL); */})
  .catch(err => {
    console.log('ERRRO FOI:'+err)
  });


})


app.post('/del/:id', async (req,res)=>{
  const id = req.params.id;
  //not found?
  if (id != undefined){
    if (!isNaN(id)){

      const user = await Users.findByPk(id);
      if (user == null) {
        res.status(404).send();
      } else {
        await Users.destroy({
          where: {id: id}
        }).then((ok)=>{
          res.status(200).send();
        });
      }

    }
    else {
      res.status(406).send();
    }
  }
  else {
    res.status(406).send();
  }

})

app.get('/info', async (req,res)=>{
  
  const users = await Users.findAll();
  
  return res.json(users);
})

app.post('/route/:id', async (req, res) => {
  const id = req.params.id;
  console.log('id:'+id)
  //not found?
  if (id != undefined){
    if (!isNaN(id)){

      const user = await Users.findByPk(id);
      const users = await Users.findAll();
      if (user == null) {
        res.status(404).send();
      } else {
        
        function calculateDistance(user, users) {
          // função para calcular a distância entre dois pontos (coordenadas cartesianas)
          function getDistance(point1, point2) {
              const dx = point1.codx - point2.codx;
              const dy = point1.cody - point2.cody;
              return Math.sqrt(dx * dx + dy * dy);
          }
      
          // inicializa a distância mínima com um valor alto
          let minDistance = Number.MAX_SAFE_INTEGER;
          let path = [];
      
          // gera todas as permutações possíveis dos usuários (exceto o próprio usuário)
          function generatePermutations(arr, start) {
              if (start === arr.length) {
                  // calcula a distância total para a permutação atual
                  let totalDistance = 0;
                  for (let i = 0; i < arr.length - 1; i++) {
                      totalDistance += getDistance(arr[i], arr[i + 1]);
                  }
                  // adiciona a distância de retorno ao usuário inicial
                  totalDistance += getDistance(arr[arr.length - 1], user);
      
                  // atualiza a distância mínima e o caminho se necessário
                  if (totalDistance < minDistance) {
                      minDistance = totalDistance;
                      path = [...arr, user.name];
                  }
              } else {
                  for (let i = start; i < arr.length; i++) {
                      [arr[start], arr[i]] = [arr[i], arr[start]];
                      generatePermutations(arr, start + 1);
                      [arr[start], arr[i]] = [arr[i], arr[start]]; 
                  }
              }
          }
      
          // remove o usuário atual da lista de usuários
          const otherUsers = users.filter(u => u !== user);
      
          // gera todas as permutações possíveis dos outros usuários
          generatePermutations(otherUsers, 0);
      
          // retorna o resultado como um objeto JSON
          return {minDistance,path};
      }

        

        const result = calculateDistance(user, users)

        var path = []

        for (const item of result.path){
          path.push(item.name)
        }
        

        console.log(`Distância mínima: ${result.minDistance}`);
        console.log(`path: ${path}`);
        res.status(200).send({minDistance: result.minDistance,path:path})


        ///////////////////////////

      }

    }
    else {
      res.status(406).send();
    }
  }
  else {
    res.status(406).send();
  }
})

app.listen(port, ()=>{
  console.log(`Running on port: ${port}\uD83D\uDE80`)
})


