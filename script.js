const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

// Minta izin notifikasi saat pertama kali website dibuka
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = document.getElementById("subject").value;
  const task = document.getElementById("task").value;
  const deadline = document.getElementById("deadline").value;

  const li = document.createElement("li");
  li.classList.add("ta");

  const today = new Date();
  const taskDeadline = new Date(deadline);
  const timeDiff = taskDeadline - today;
  const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

  if (dayDiff <= 1) {
    li.classList.add("deadline-close");

    // Tampilkan notifikasi popup jika deadline dekat
    if (Notification.permission === "granted") {
      new Notification("📢 Deadline Tugas!",
        {
          body: `${subject}: ${task} harus dikumpulkan segera!`,
          icon: "https://cdn-icons-png.flaticon.com/512/1828/1828665.png" // opsional icon
        });
    }
  }

  li.innerHTML = `<strong>${subject}</strong>: ${task} (Deadline: ${deadline})`;
  taskList.appendChild(li);

  form.reset();
});