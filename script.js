document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  const task = document.getElementById("task").value;
  const deadline = new Date(document.getElementById("deadline").value);
  const today = new Date();

  const li = document.createElement("li");
  li.classList.add("ta");

  const diffTime = deadline - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 2) {
    li.classList.add("ta", "deadline-close");

    // Notifikasi jika deadline dekat
    if (Notification.permission === "granted") {
      new Notification("⚠️ Tugas Hampir Deadline!", {
        body: `${task} (${subject}) tinggal ${diffDays} hari lagi!`,
      });
    }
  }

  li.textContent = `${subject}: ${task} - Deadline: ${deadline.toLocaleDateString("id-ID")}`;
  document.getElementById("taskList").appendChild(li);

  // Reset form
  document.getElementById("taskForm").reset();
});

function mintaIzinNotifikasi() {
  if ("Notification" in window) {
    Notification.requestPermission().then(function (result) {
      if (result === "granted") {
        alert("Notifikasi diaktifkan! Sekarang kamu akan diingatkan kalau tugasnya mepet deadline 🔔");
      }
    });
  } else {
    alert("Browser kamu tidak mendukung notifikasi.");
  }
}