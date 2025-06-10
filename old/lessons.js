function checkPassword() {
  const password = document.getElementById("passwordInput").value;
  const correctPassword = "1234";

  if (password === correctPassword) {
    document.getElementById("loginBox").classList.remove("active");
    document.getElementById("lessonBox").classList.add("active");
    document.body.style.background =
      "linear-gradient(135deg, #fdfbfb, #ebedee)";

    const lesson2Time = localStorage.getItem("lesson2_unlock_time");
    if (lesson2Time) {
      const now = new Date().getTime();
      const timeLeft = Number(lesson2Time) - now;

      if (timeLeft <= 0) {
        unlockLesson2();
      } else {
        startCountdown(timeLeft);
      }
    }
  } else {
    alert("❌ كلمة السر غلط! جرّب تاني يا بطل.");
  }
}

function finishLesson1() {
  const now = new Date();
  let unlockTime = new Date(now);

  if (now.getHours() < 20) {
    unlockTime.setHours(20, 0, 0, 0); // النهاردة الساعة 8 بالليل
  } else {
    unlockTime.setDate(unlockTime.getDate() + 1);
    unlockTime.setHours(20, 0, 0, 0); // بكرة الساعة 8 بالليل
  }

  localStorage.setItem("lesson2_unlock_time", unlockTime.getTime());

  alert("✅ تمام! الدرس التاني هيفتح الساعة 8 بالليل إن شاء الله.");
  startCountdown(unlockTime.getTime() - now.getTime());
}

function unlockLesson2() {
  const lesson2 = document.getElementById("lesson2");
  lesson2.classList.remove("locked");
  document.getElementById("countdown").style.display = "none";
}

function startCountdown(ms) {
  const countdown = document.getElementById("countdown");
  countdown.style.display = "block";

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const target = Number(localStorage.getItem("lesson2_unlock_time"));
    const distance = target - now;

    if (distance <= 0) {
      clearInterval(interval);
      unlockLesson2();
      return;
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `⏳ فاضل ${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية على فتح الدرس التاني`;
  }, 1000);
}
