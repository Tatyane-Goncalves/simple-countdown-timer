const btnMode = document.getElementById("mode")
const icon = document.getElementById("icon")
const body = document.querySelector("body")

btnMode.addEventListener("click", () => {
  body.classList.toggle("dark")
  const isDark = body.classList.contains("dark")

  icon.classList = isDark ? "ph-fill ph-sun" : "ph-fill ph-moon"
})