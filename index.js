document.addEventListener("DOMContentLoaded", () => {
    //返回顶部按钮
    const backToTop = document.createElement("button");
    backToTop.textContent = "⬆️";
    backToTop.style.position = "fixed";
    backToTop.style.bottom = "20px";
    backToTop.style.right = "20px";
    backToTop.style.padding = "10px";
    backToTop.style.borderRadius = "50%";
    backToTop.style.border = "none";
    backToTop.style.backgroundColor = "#f9a825";
    backToTop.style.color = "#1c1c1c";
    backToTop.style.display = "none";
    backToTop.style.cursor = "pointer";
    backToTop.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.4)";
    document.body.appendChild(backToTop);

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    //动态加载效果
    const elementsToAnimate = document.querySelectorAll(".feature, .gallery-grid img");
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("fade-in");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    elementsToAnimate.forEach((el) => observer.observe(el));

    //图片模态框
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    const modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    modal.style.display = "none";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "1000";

    const modalImage = document.createElement("img");
    modalImage.style.maxWidth = "80%";
    modalImage.style.maxHeight = "80%";
    modal.appendChild(modalImage);

    document.body.appendChild(modal);

    galleryImages.forEach((img) => {
        img.addEventListener("click", () => {
            modalImage.src = img.src;
            modal.style.display = "flex";
        });
    });

    modal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    //表单实时校验
    const form = document.querySelector(".contact-form");
    const emailInput = document.querySelector("#email");

    emailInput.addEventListener("input", () => {
        if (!emailInput.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
            emailInput.style.borderColor = "red";
        } else {
            emailInput.style.borderColor = "green";
        }
    });

    //滚动触发的文字动画
    const textElements = document.querySelectorAll(".intro h2, .intro p");
    textElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

    const textObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    textElements.forEach((el) => textObserver.observe(el));

});
