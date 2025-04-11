function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    // Toggle the 'active' class to show or hide the sidebar
    sidebar.classList.toggle("active");
  }

  document.getElementById("btnClasses").addEventListener("click", () => {
    window.location.href = "class-management.html";
  });
  
  document.getElementById("btnPDF").addEventListener("click", () => {
    window.location.href = "pdf.html";
  });
  
  document.getElementById("btnProfile").addEventListener("click", () => {
    window.location.href = "profile.html";
  });
  
  document.getElementById("logoutButton").addEventListener("click", logoutUser);
