
const userNameEl = document.getElementById("userName");
const userStatusEl = document.getElementById("role");
const userIDEl = document.getElementById("userID");
const userEmailEl = document.getElementById("userEmail");
const contactNumberEl = document.getElementById("contactNumber");

auth.onAuthStateChanged(async (user) => {
    if (user) {
      const docRef = db.collection("users").doc(user.uid);
      const doc = await docRef.get();
  
      if (doc.exists) {
        const data = doc.data();
        document.getElementById("userName").textContent = `${data.firstName} ${data.lastName}`;
        document.getElementById("userStatus").textContent = data.role || "No status";
        document.getElementById("userID").textContent = user.uid;
        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("contactNumber").value = data.contactNumber || "";
      } else {
        console.log("No such document!");
      }
    } else {
      window.location.href = "/login.html";
    }
  });
  
  function logout() {
    auth.signOut().then(() => {
      window.location.href = "/login.html";
    });
  }
  
  function updateContactNumber(event) {
    const number = event.target.value;
    const user = auth.currentUser;
    if (user) {
      db.collection("users").doc(user.uid).update({
        contactNumber: number
      });
    }
  }
  
  function updateHeaderPhoto(event) {
    console.log("Header photo selected", event.target.files[0]);
  }
  
  function updateProfilePhoto(event) {
    console.log("Profile photo selected", event.target.files[0]);
  }