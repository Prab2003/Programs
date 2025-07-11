const { MongoClient, ObjectID, ObjectId } = require('mongodb'); 
 

const url = 'mongodb://localhost:27017'; 
 

const dbName = 'College'; 
 

const client = new MongoClient(url, { useNewUrlParser: true, 
useUnifiedTopology: true }); 
 

async function connectDB() { 
    try { 
        await client.connect(); 
        console.log('Connected to the database'); 
    } catch (error) { 
        console.error('Error connecting to the database:', error); 
    } 
} 
   
async function insertStudent(student) { 
    const db = client.db(dbName); 
    try { 
    const result = await db.collection('students').insertOne(student); 
    console.log(`Student with id ${result.insertedId} inserted successfully`); 
    } catch (err) { 
      console.error('Error inserting student:', err); 
    } 
} 
 
  
    async function updateStudent() { 
        const db = client.db(dbName); 
        try { 
        const result = await db.collection('students').updateOne( 
            {_id:new ObjectId('66667a24ace74f68b2cdcdf6')},{$set:{Dept:"CSE"}}); 
            console.log(`Student data updated successfully`); 
        } catch (err) { 
          console.error('Error updating student:', err); 
        } 
    } 
      

async function findAllStudents() { 
        const db = client.db(dbName); 
        try { 
        const students = await db.collection('students').find({}).toArray(); 
        console.log('All students:', students); 
        } catch (err) { 
          console.error('Error finding students:', err); 
        } 
    } 
     

async function deleteStudent(Id) { 
    const db = client.db(dbName); 
    try { 
    const result = await db.collection('students').deleteOne({ _id:new ObjectId(Id) }); 
    console.log(`Student with id ${Id} deleted successfully`); 
    } catch (err) { 
      console.error('Error deleting student:', err); 
    } 
} 

  connectDB() 
  .then(async () => { 
 

  const exampleStudent = { name: 'Monisha', age: 18, cgpa:6.38, Dept:"CSE"}; 
  await insertStudent(exampleStudent); 
 

  await findAllStudents(); 
 

  await updateStudent(); 
 

  const studentIdToDelete = '6833aa9781a44d89e3a65cde'; // Replace with an existing student id 
  await deleteStudent(studentIdToDelete); 
  

  client.close(); 
});