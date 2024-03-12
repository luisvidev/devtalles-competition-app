import prisma from '../lib/prisma';

async function main(){

  // 1. Delete previous records
  await Promise.all([
    prisma.user.deleteMany(),
  ]);

  // 2. Insert dummy data

  await prisma.user.createMany({
    data: [
      {name: 'Admin 1', email: 'admin1@test.com', role: 'admin', password: "1234"},
      {name: 'Admin 2', email: 'admin2@test.com', role: 'admin', password: "1234"},
      {name: 'Admin 3', email: 'admin3@test.com', role: 'admin', password: "1234"},
      {name: 'User 1', email: 'user1@test.com', role: 'user', password: "1234"},
      {name: 'User 2', email: 'user2@test.com', role: 'user', password: "1234"},
      {name: 'User 3', email: 'user3@test.com', role: 'user', password: "1234"},
    ]
  });


  console.log('Seed executed correctly!');
}


(()=>{
  main();
})();