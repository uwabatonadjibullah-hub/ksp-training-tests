import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, getDocs, onSnapshot, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { app } from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 Auth & Role Check
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "adminlogin.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists() || userSnap.data().role !== "admin") {
    alert("Access denied.");
    window.location.href = "adminlogin.html";
    return;
  }

  console.log("User is logged in ✅", user.email);
  testFirestore();
});

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "adminlogin.html";
    return;
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists() || userSnap.data().role !== "admin") {
    alert("Access denied.");
    window.location.href = "adminlogin.html";
    return;
  }

  console.log("User is logged in ✅", user.email);
  testFirestore();
});

// 🚪 Logout
window.logout = function () {
  signOut(auth).then(() => {
    alert("Logged out successfully.");
    window.location.href = "adminlogin.html";
  });
};

// 📂 Section Loader
window.loadSection = function (section) {
  const content = document.getElementById("content");
  switch (section) {
    case "trainees":
      content.innerHTML = `
        <h2>Trainee Data</h2>
        <input type="text" id="searchInput" placeholder="Search by name or email..." />
        <table class="trainee-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Progress</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody id="traineeTableBody"></tbody>
        </table>
      `;
      loadTrainees();
      break;

    case "quizzes":
      content.innerHTML = `
        <h2>Quiz Settings</h2>
        <button onclick="createNewQuiz()">Add Quiz</button>
        <div id="quizList"></div>
      `;
      break;

    case "analytics":
      content.innerHTML = "<h2>Analytics</h2><p>Coming soon...</p>";
      break;

    case "export":
      content.innerHTML = "<h2>Export</h2><p>Coming soon...</p>";
      break;

    default:
      content.innerHTML = "<p>Select a section from the sidebar to begin.</p>";
  }
};

// 👥 Trainee Data
let allTrainees = [];

function loadTrainees() {
  const traineeTableBody = document.getElementById("traineeTableBody");
  const searchInput = document.getElementById("searchInput");

  onSnapshot(collection(db, "trainees"), (snapshot) => {
    allTrainees = snapshot.docs.map(doc => doc.data());
    renderTraineeTable(allTrainees);
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = allTrainees.filter(t =>
      t.name.toLowerCase().includes(query) || t.email.toLowerCase().includes(query)
    );
    renderTraineeTable(filtered);
  });
}

function renderTraineeTable(data) {
  const tbody = document.getElementById("traineeTableBody");
  tbody.innerHTML = "";
  data.forEach(t => {
    tbody.innerHTML += `
      <tr>
        <td><img src="${t.profileUrl || 'default.jpg'}" class="profile-pic" /></td>
        <td>${t.name}</td>
        <td>${t.email}</td>
        <td>${t.progress || 0}%</td>
        <td>${t.score || '-'}</td>
      </tr>
    `;
  });
}

// 🔍 Firestore Test
async function testFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "trainees"));
    console.log("Firestore connected ✅");
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  } catch (error) {
    console.error("Firestore test failed ❌", error);
  }
}

// 🧪 Placeholder for Quiz Creation
window.createNewQuiz = function () {
  alert("Quiz creation coming soon...");
};