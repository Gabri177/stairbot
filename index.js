document.addEventListener("DOMContentLoaded", () => {
    // 返回顶部按钮
    const backToTop = document.createElement("button");
    backToTop.textContent = "⬆";
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

    // 滚轮切换部分功能
    const sections = document.querySelectorAll("header, .features, .gallery, .contact"); // 包含所有部分
    let currentIndex = 0; // 当前部分索引

    const scrollToSection = (index) => {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: "smooth" });
            currentIndex = index;
        }
    };

    let isScrolling = false; // 防止多次触发滚动
    window.addEventListener("wheel", (event) => {
        if (isScrolling) return; // 如果正在滚动，直接返回

        const sensitivityThreshold = 30; // 滚动灵敏度阈值
        if (Math.abs(event.deltaY) < sensitivityThreshold) return; // 如果滚动距离太小，不触发翻页

        if (event.deltaY > 0 && currentIndex < sections.length - 1) {
            // 向下滚动
            isScrolling = true;
            scrollToSection(currentIndex + 1);
        } else if (event.deltaY < 0 && currentIndex > 0) {
            // 向上滚动
            isScrolling = true;
            scrollToSection(currentIndex - 1);
        }

        // 延迟解除滚动锁定
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // 滚动动画完成时间
    });

    // 添加键盘事件支持
    window.addEventListener("keydown", (event) => {
        if (isScrolling) return; // 如果正在滚动，直接返回

        if (event.key === "ArrowDown" && currentIndex < sections.length - 1) {
            // 按下下箭头
            isScrolling = true;
            scrollToSection(currentIndex + 1);
        } else if (event.key === "ArrowUp" && currentIndex > 0) {
            // 按下上箭头
            isScrolling = true;
            scrollToSection(currentIndex - 1);
        }

        // 延迟解除滚动锁定
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // 滚动动画完成时间
    });

    // 动态加载效果
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

    // 图片模态框
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

    // 表单实时校验
    const form = document.querySelector(".contact-form");
    const emailInput = document.querySelector("#email");

    emailInput.addEventListener("input", () => {
        if (!emailInput.value.match(/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/)) {
            emailInput.style.borderColor = "red";
        } else {
            emailInput.style.borderColor = "green";
        }
    });
});
