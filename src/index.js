/*
What we want to do:
1. Fetch the students from firestore
2. Display the students.
3. Add a student
4. Delete a student.
All should be realtime.
*/
import  { initializeApp} from 'firebase/app'
import { getFirestore, collection, onSnapshot, addDoc, doc, deleteDoc, query } from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyAxSvT1pTioBk3tuDPtjHkL1I50OadCzds",
    authDomain: "fir-introduction-tutorial.firebaseapp.com",
    projectId: "fir-introduction-tutorial",
    storageBucket: "fir-introduction-tutorial.appspot.com",
    messagingSenderId: "143811920639",
    appId: "1:143811920639:web:72d116b282e6f1422942ca"
  };

// Initialize the application
initializeApp(firebaseConfig)

// initialize services.
const db = getFirestore();

// Collection ref
const colRef = collection(db, 'students')

// Realtime data fetching.
onSnapshot(colRef, (snapshot)=>{
    let students = [];
    snapshot.docs.map((doc)=>{
        students.push({...doc.data(), id: doc.id,})
    })
    console.log(students)
})


// Adding a student.
const studentAddForm = document.querySelector('.addStudentForm')
studentAddForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    addDoc(colRef, {
        name: studentAddForm.name.value,
        age: parseInt(studentAddForm.age.value)
    })
    .then(()=>studentAddForm.reset())
});

// On deleting a student.
const deleteStudentForm = document.querySelector('.deleteStudentForm')
deleteStudentForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const docRef = doc(db, 'students', deleteStudentForm.id.value)

    // Actual delete
    deleteDoc(docRef)
    .then(()=>deleteStudentForm.reset())
})
