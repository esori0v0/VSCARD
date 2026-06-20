document.addEventListener("DOMContentLoaded", () => {
  console.log("웹 명함 페이지가 로드되었습니다.");

  const card = document.querySelector(".card");

  if (card) {
    card.style.transition = "transform 0.25s ease, box-shadow 0.25s ease";

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow =
        "0 0 35px rgba(238, 83, 163, 0.28), 0 28px 70px rgba(0, 0, 0, 0.65)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow =
        "0 0 25px rgba(238, 83, 163, 0.15), 0 20px 50px rgba(0, 0, 0, 0.45)";
    });
  }

  const emailLink =
    document.querySelector('a[href^="mailto:"]') ||
    Array.from(document.querySelectorAll(".value, a")).find((element) =>
      element.textContent.includes("@")
    );

  if (emailLink) {
    emailLink.style.cursor = "pointer";

    emailLink.addEventListener("click", async (event) => {
      event.preventDefault();

      const email = emailLink.textContent.trim();

      try {
        await navigator.clipboard.writeText(email);
        showCopyMessage("이메일이 복사되었습니다.");
      } catch (error) {
        copyFallback(email);
      }
    });
  }
});

function copyFallback(text) {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);

  textarea.select();
  document.execCommand("copy");

  document.body.removeChild(textarea);

  showCopyMessage("이메일이 복사되었습니다.");
}

function showCopyMessage(message) {
  const oldToast = document.querySelector(".copy-toast");

  if (oldToast) {
    oldToast.remove();
  }

  const toast = document.createElement("div");

  toast.className = "copy-toast";
  toast.textContent = message;

  toast.style.position = "fixed";
  toast.style.left = "50%";
  toast.style.bottom = "32px";
  toast.style.transform = "translateX(-50%)";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "999px";
  toast.style.background = "#ee53a3";
  toast.style.color = "#ffffff";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "700";
  toast.style.boxShadow = "0 10px 30px rgba(238, 83, 163, 0.35)";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1600);
}