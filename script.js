console.log("xReDDy Mods pornit cu succes.");

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================
       SCROLL LIN
    ===================================== */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID =
                this.getAttribute("href");

            if (targetID === "#") {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });



    /* =====================================
       CAUTARE MODURI
    ===================================== */

    const searchInput =
        document.getElementById("modSearch");

    const modCards =
        document.querySelectorAll(".mod-search-item");

    const filterButtons =
        document.querySelectorAll(".filter-button");

    const noModsFound =
        document.getElementById("noModsFound");

    const modsCount =
        document.getElementById("modsCount");


    let activeCategory = "toate";


    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    }


    function updateMods() {

        if (!modCards.length) {
            return;
        }


        let searchText = "";

        if (searchInput) {

            searchText =
                normalizeText(searchInput.value.trim());

        }


        let visibleMods = 0;


        modCards.forEach(function (card) {


            const cardCategory =
                card.dataset.category || "";


            const cardName =
                normalizeText(
                    card.dataset.name || ""
                );


            const matchesSearch =
                cardName.includes(searchText);


            const matchesCategory =
                activeCategory === "toate" ||
                cardCategory === activeCategory;


            if (matchesSearch && matchesCategory) {

                card.classList.remove("hidden");

                visibleMods++;

            } else {

                card.classList.add("hidden");

            }


        });


        /* NUMAR MODURI */

        if (modsCount) {

            if (visibleMods === 1) {

                modsCount.textContent =
                    "1 mod găsit";

            } else {

                modsCount.textContent =
                    visibleMods + " moduri găsite";

            }

        }


        /* NICIUN MOD */

        if (noModsFound) {

            if (visibleMods === 0) {

                noModsFound.classList.add("show");

            } else {

                noModsFound.classList.remove("show");

            }

        }

    }



    /* =====================================
       SCRIERE IN SEARCH
    ===================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            updateMods
        );

    }



    /* =====================================
       FILTRE CATEGORII
    ===================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {


                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove("active");

                    }
                );


                this.classList.add("active");


                activeCategory =
                    this.dataset.filter;


                updateMods();

            }
        );

    });



    /* =====================================
       CATEGORIE DIN URL

       Exemplu:
       mods.html?category=utilaje
    ===================================== */

    if (filterButtons.length) {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const urlCategory =
            params.get("category");


        if (urlCategory) {

            const wantedButton =
                document.querySelector(
                    '.filter-button[data-filter="' +
                    urlCategory +
                    '"]'
                );


            if (wantedButton) {

                filterButtons.forEach(
                    function (btn) {

                        btn.classList.remove("active");

                    }
                );


                wantedButton.classList.add("active");

                activeCategory = urlCategory;

            }

        }


        updateMods();

    }


});