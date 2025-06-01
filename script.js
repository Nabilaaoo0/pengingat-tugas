function mintaIzinNotifikasi() {
  if ('Notification' in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        alert("Notifikasi diaktifkan!");
      } else {
        alert("Kamu menolak notifikasi.");
      }
    });
  } else {
    alert("Browser kamu tidak mendukung notifikasi.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = document.getElementById("subject").value;
    const task = document.getElementById("task").value;
    const deadline = document.getElementById("deadline").value;

    const deadlineDate = new Date(deadline);
    const today = new Date();
    const selisihHari = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));

    const li = document.createElement("li");
    li.classList.add("ta");
    li.innerText = `📚 ${subject} - ${task} (Deadline: ${deadline})`;

    if (selisihHari <= 2) {
      li.classList.add("deadline-close");

      if (Notification.permission === "granted") {
        new Notification("⏰ Tugas Segera Deadline!", {
          body: `${subject}: ${task} (deadline dalam ${selisihHari} hari!)`,
        });
      }
    }

    taskList.appendChild(li);
    form.reset();
  });
});