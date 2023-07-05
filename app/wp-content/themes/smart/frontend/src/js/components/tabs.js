export default function Tabs() {

    const tabs = document.querySelectorAll("[data-tab-target]");
    const tabContents = document.querySelectorAll(".s-our__tabs-content");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((tab) => {
                tab.classList.remove("active");
            });
            tab.classList.add("active");
            tabContents.forEach((tabContent) => {
                tabContent.classList.remove("active");
            });
            const target = document.querySelector(tab.dataset.tabTarget);
            target.classList.add("active");
        });
    });

    const accordionBtns = document.querySelectorAll(".s-our__accordion-item");

    accordionBtns.forEach((accordion) => {
        accordion.onclick = function () {
            this.classList.toggle("is-open");

            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        };
    });


}
