/* =========================================================
   HEADER
========================================================= */

const header = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});


mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });

});


/* =========================================================
   SCROLL REVEALS
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   STRUCTURE EXPLORER
========================================================= */

const structureData = {
    section: {
        label: "FOUNDATION",
        title: "Section",
        description:
            "A section is one of the basic building blocks of infantry organisation. It is normally commanded by a junior non-commissioned officer.",
        command: [
            {
                appointment: "Section Commander",
                rank: "Corporal",
                abbreviation: "Cpl",
                rankId: "corporal"
            },
            {
                appointment: "Second-in-Command",
                rank: "Lance Corporal",
                abbreviation: "LCpl",
                rankId: "lance-corporal"
            }
        ],
        groups: [
            {
                name: "Fire Team",
                count: 4
            },
            {
                name: "Fire Team",
                count: 4
            }
        ]
    },

    platoon: {
        label: "MULTIPLE SECTIONS",
        title: "Platoon",
        description:
            "Several sections can operate together as a platoon. A platoon provides a larger tactical organisation while remaining small enough to operate closely together.",
        command: [
            {
                appointment: "Platoon Commander",
                rank: "Lieutenant",
                abbreviation: "Lt",
                rankId: "lieutenant"
            },
            {
                appointment: "Platoon Sergeant",
                rank: "Sergeant",
                abbreviation: "Sgt",
                rankId: "sergeant"
            }
        ],
        groups: [
            { name: "Section", count: 8 },
            { name: "Section", count: 8 },
            { name: "Section", count: 8 }
        ]
    },

    company: {
        label: "MULTIPLE PLATOONS",
        title: "Company / Squadron",
        description:
            "Several platoons can form a company. Equivalent organisations in some parts of the Army use terms such as squadron or battery.",
        command: [
            {
                appointment: "Officer Commanding",
                rank: "Major",
                abbreviation: "Maj",
                rankId: "major"
            }
        ],
        groups: [
            { name: "Platoon", count: 30 },
            { name: "Platoon", count: 30 },
            { name: "Platoon", count: 30 }
        ]
    },

    battalion: {
        label: "TACTICAL UNIT",
        title: "Battalion / Regiment",
        description:
            "Multiple companies or squadrons form a substantial tactical unit. Terminology differs between different arms and services of the Army.",
        command: [
            {
                appointment: "Commanding Officer",
                rank: "Lieutenant Colonel",
                abbreviation: "Lt Col",
                rankId: "lieutenant-colonel"
            }
        ],
        groups: [
            { name: "Company", count: 1 },
            { name: "Company", count: 1 },
            { name: "Company", count: 1 },
            { name: "Support", count: 1 }
        ]
    },

    brigade: {
        label: "COMBINED FORMATION",
        title: "Brigade",
        description:
            "A brigade brings together several units and supporting capabilities into a larger formation capable of conducting complex operations.",
        command: [
            {
                appointment: "Brigade Commander",
                rank: "Brigadier",
                abbreviation: "Brig",
                rankId: "brigadier"
            }
        ],
        groups: [
            { name: "Battalion", count: 1 },
            { name: "Battalion", count: 1 },
            { name: "Battalion", count: 1 },
            { name: "Supporting Units", count: 1 }
        ]
    },

    division: {
        label: "LARGE FORMATION",
        title: "Division",
        description:
            "A division is a large formation containing multiple brigades together with command and supporting elements.",
        command: [
            {
                appointment: "Division Commander",
                rank: "Major General",
                abbreviation: "Maj Gen",
                rankId: "major-general"
            }
        ],
        groups: [
            { name: "Brigade", count: 1 },
            { name: "Brigade", count: 1 },
            { name: "Brigade", count: 1 },
            { name: "Divisional Support", count: 1 }
        ]
    }
};

const rankImages = {
    "private": "images/ranks/insignia/private.png",
    "lance-corporal": "images/ranks/insignia/lance-corporal.png",
    "corporal": "images/ranks/insignia/corporal.png",
    "sergeant": "images/ranks/insignia/sergeant.png",
    "colour-sergeant": "images/ranks/insignia/colour-sergeant.png",
    "warrant-officer-class-two": "images/ranks/insignia/warrant-officer-class-two.png",
    "warrant-officer-class-one": "images/ranks/insignia/warrant-officer-class-one.png",
    "2nd-lieutenant": "images/ranks/insignia/2nd-lieutenant.png",
    "lieutenant": "images/ranks/insignia/lieutenant.png",
    "captain": "images/ranks/insignia/captain.png",
    "major": "images/ranks/insignia/major.png",
    "lieutenant-colonel": "images/ranks/insignia/lieutenant-colonel.png",
    "colonel": "images/ranks/insignia/colonel.png",
    "brigadier": "images/ranks/insignia/brigadier.png",
    "major-general": "images/ranks/insignia/major-general.png",
    "lieutenant-general": "images/ranks/insignia/lieutenant-general.png",
    "general": "images/ranks/insignia/general.png",
    "fiel-marshal": "images/ranks/insignia/fiel-marshal.png",
}

function getRankImage(rankId) {
    return rankImages[rankId] || "";
}

const structureItems = document.querySelectorAll(".structure-item");

const displayLabel = document.getElementById("displayLabel");

const displayTitle = document.getElementById("displayTitle");

const displayDescription = document.getElementById("displayDescription");

const unitVisual = document.getElementById("unitVisual");


function renderUnitVisual(data) {
    unitVisual.innerHTML = "";

    const organisation = document.createElement("div");
    organisation.className = "organisation-chart";

    // Command row
    const commandRow = document.createElement("div");
    commandRow.className = "command-row";

    data.command.forEach(person => {
        const card = document.createElement("div");
        card.className = "command-card";

        card.innerHTML = `
            <div class="rank-insignia">
                <img
                    src="${getRankImage(person.rankId)}"
                    alt="${person.rank} rank insignia"
                >
            </div>

            <span class="appointment">
                ${person.appointment}
            </span>

            <strong>${person.rank}</strong>

            <small>${person.abbreviation}</small>
        `;

        commandRow.appendChild(card);
    });

    organisation.appendChild(commandRow);

    // Connecting line
    const connector = document.createElement("div");
    connector.className = "organisation-connector";
    organisation.appendChild(connector);

    // Sub-units
    const groupRow = document.createElement("div");
    groupRow.className = "group-row";

    data.groups.forEach((group, index) => {
        const groupCard = document.createElement("div");
        groupCard.className = "group-card";
        groupCard.style.animationDelay = `${index * 0.08}s`;

        const icon = document.createElement("div");
        icon.className = "group-icon";

        const visiblePeople = Math.min(group.count, 8);

        for (let i = 0; i < visiblePeople; i++) {
            const soldier = document.createElement("span");
            soldier.className = "mini-soldier";
            icon.appendChild(soldier);
        }

        const name = document.createElement("strong");
        name.textContent = group.name;

        groupCard.appendChild(icon);
        groupCard.appendChild(name);

        if (group.count > 1) {
            const size = document.createElement("small");
            size.textContent = `~${group.count} personnel`;
            groupCard.appendChild(size);
        }

        groupRow.appendChild(groupCard);
    });

    organisation.appendChild(groupRow);
    unitVisual.appendChild(organisation);
}


function selectStructureLevel(level) {

    const data = structureData[level];

    if (!data) {
        return;
    }

    structureItems.forEach(item => {
        item.classList.remove("active");
    });

    const selected =
        document.querySelector(
            `.structure-item[data-level="${level}"]`
        );

    selected.classList.add("active");

    displayLabel.textContent = data.label;
    displayTitle.textContent = data.title;
    displayDescription.textContent = data.description;

    renderUnitVisual(data);

}


structureItems.forEach(item => {

    item.addEventListener("click", () => {

        selectStructureLevel(item.dataset.level);

    });

});


renderUnitVisual(structureData.section);

/* =========================================================
   RANK EXPLORER
========================================================= */

const rankData = {

    soldiers: [

        {
            name: "Private",
            abbreviation: "Pte",
            image: "images/ranks/slides/private.png",
            description: "The starting rank for trained soldiers. The title varies between regiments and corps and can include Trooper, Gunner, Signaller, Sapper, Guardsman and Rifleman."
        },

        {
            name: "Lance Corporal",
            abbreviation: "LCpl",
            image: "images/ranks/slides/lance-corporal.png",
            description: "A junior non-commissioned officer who may command and administer a small team of around four soldiers."
        },

        {
            name: "Corporal",
            abbreviation: "Cpl",
            image: "images/ranks/slides/corporal.png",
            description: "A non-commissioned officer who commonly commands a section of around eight to ten soldiers."
        },

        {
            name: "Sergeant",
            abbreviation: "Sgt",
            image: "images/ranks/slides/sergeant.png",
            description: "A senior non-commissioned officer who can serve as the second-in-command of a platoon or troop and advise its junior officer commander."
        },

        {
            name: "Colour / Staff Sergeant",
            abbreviation: "CSgt/SSgt",
            image: "images/ranks/slides/colour-sergeant.png",
            description: "A senior rank within a sub-unit, often employed in technical, training or command roles. In the Infantry the rank is Colour Sergeant."
        },

        {
            name: "Warrant Officer Class Two",
            abbreviation: "WO2",
            image: "images/ranks/slides/warrant-officer-class-two.png",
            description: "A senior soldier rank. WO2s may hold Sergeant Major appointments and have major responsibilities for training, discipline and welfare within a sub-unit."
        },

        {
            name: "Warrant Officer Class One",
            abbreviation: "WO1",
            image: "images/ranks/slides/warrant-officer-class-one.png",
            description: "The most senior soldier rank. A Regimental Sergeant Major is normally a WO1 and acts as a senior adviser to the Commanding Officer."
        }

    ],

    officers: [

        {
            name: "Officer Cadet",
            abbreviation: "OCdt",
            image: "images/ranks/slides/officer-cadet.png",
            description: "The rank held while undertaking initial officer training, including at the Royal Military Academy Sandhurst."
        },

        {
            name: "Second Lieutenant",
            abbreviation: "2Lt",
            image: "images/ranks/slides/second-lieutenant.png",
            description: "The first commissioned officer rank after Sandhurst. A Second Lieutenant can lead a platoon or troop of up to around 30 soldiers."
        },

        {
            name: "Lieutenant",
            abbreviation: "Lt",
            image: "images/ranks/slides/lieutenant.png",
            description: "A junior officer who commonly commands a platoon or troop of around 30 soldiers."
        },

        {
            name: "Captain",
            abbreviation: "Capt",
            image: "images/ranks/slides/captain.png",
            description: "An experienced junior officer. Captains commonly serve as company or squadron second-in-command and hold planning, staff and specialist appointments."
        },

        {
            name: "Major",
            abbreviation: "Maj",
            image: "images/ranks/slides/major.png",
            description: "A field officer who commonly commands a company, squadron or battery of around 120 personnel."
        },

        {
            name: "Lieutenant Colonel",
            abbreviation: "Lt Col",
            image: "images/ranks/slides/lieutenant-colonel.png",
            description: "A senior field officer who typically commands a battalion or regiment as its Commanding Officer."
        },

        {
            name: "Colonel",
            abbreviation: "Col",
            image: "images/ranks/slides/colonel.png",
            description: "A senior officer commonly employed in staff, advisory and command appointments."
        },

        {
            name: "Brigadier",
            abbreviation: "Brig",
            image: "images/ranks/slides/brigadier.png",
            description: "A senior field officer who can command a brigade or hold senior staff and capability appointments."
        },

        {
            name: "Major General",
            abbreviation: "Maj Gen",
            image: "images/ranks/slides/major-general.png",
            description: "A general officer who can command a division-sized formation and hold senior Army or Ministry of Defence appointments."
        },

        {
            name: "Lieutenant General",
            abbreviation: "Lt Gen",
            image: "images/ranks/slides/lieutenant-general.png",
            description: "A senior general officer who can command a corps-sized formation and hold very senior command or staff appointments."
        },

        {
            name: "General",
            abbreviation: "Gen",
            image: "images/ranks/slides/general.png",
            description: "A four-star general officer rank associated with the Army's most senior command appointments."
        },

        {
            name: "Field Marshal",
            abbreviation: "FM",
            image: "images/ranks/slides/field-marshal.png",
            description: "The highest rank in the British Army. It is now an honorary rank rather than part of the normal active promotion path."
        }

    ]

}

const rankGrid = document.getElementById("rankGrid");
const rankTabs = document.querySelectorAll(".rank-tab");

function renderRanks(group) {
    
    const ranks = rankData[group];

    if (!ranks) {
        return;
    }

    rankGrid.innerHTML = "";

    ranks.forEach((rank, index) => {

        const card = document.createElement("article");
        card.className = "rank-card";
        card.style.animationDelay =`${index * 0.04}s`;


        card.innerHTML = `

            <div class="rank-card-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="rank-card-insignia">

                <img
                    src="${rank.image}"
                    alt="${rank.name} rank insignia"
                    loading="lazy"
                >

            </div>

            <div class="rank-card-content">

                <span class="rank-abbreviation">
                    ${rank.abbreviation}
                </span>

                <h3>
                    ${rank.name}
                </h3>

                <p>
                    ${rank.description}
                </p>

            </div>

        `;

        rankGrid.appendChild(card);

    });
}

rankTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const group = tab.dataset.rankGroup;

        rankTabs.forEach(button => {
            button.classList.remove("active");
        });

        tab.classList.add("active");

        renderRanks(group);
    });
});

renderRanks("soldiers");

/* =========================================================
   REGIMENT FILTER
========================================================= */

const filterButtons = document.querySelectorAll(".filter");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        renderMainOrganisations(filter);
    });
});

/* =========================================================
   REGIMENT DATA
========================================================= */

let organisationData = {};

const organisationExplorer = document.getElementById("organisationExplorer");
const organisationTitle = document.getElementById("organisationTitle");
const organisationType = document.getElementById("organisationType");
const organisationSummary = document.getElementById("organisationSummary");
const organisationGrid = document.getElementById("organisationGrid");
const organisationClose = document.getElementById("organisationClose");
const organisationBack = document.getElementById("organisationBack");

const organisationModal = document.getElementById("organisationModal");
const modalClose = document.getElementById("modalClose");
const modalBadge = document.getElementById("modalBadge");
const modalType = document.getElementById("modalType");
const modalTitle = document.getElementById("modalTitle");
const modalAbbreviation = document.getElementById("modalAbbreviation");
const modalSummary = document.getElementById("modalSummary");
const modalRole = document.getElementById("modalRole");
const modalComponent = document.getElementById("modalComponent");
const modalActions = document.getElementById("modalActions");

let currentOrganisation = null;

function renderOrganisation(id) {
    const organisation = organisationData[id];

    if (!organisation)
        return;

    currentOrganisation = id;

    // HEADER
    organisationTitle.textContent = organisation.name;
    organisationType.textContent = organisation.type || "ORGANISATION";
    organisationSummary.textContent = organisation.summary || "";

    // Back Button
    if (organisation.parent) {
        const parent = organisation[organisation.parent];
        organisationBack.hidden = false;
        organisationBack.dataset.target = organisation.parent;
        organisationBack.textContent = `← Back to ${parent.name}`;
    } else {
        organisationBack.hidden = true;
        organisationBack.dataset.target = "";
    }

    // Clear current cards
    organisationGrid.innerHTML = "";

    // Children
    const children = organisation.children || [];

    children.forEach((childId, index) => {
        const child = organisationData[childId];
        if (!child)
            return;

        const card = document.createElement("article");
        card.className = "organisation-card";
        card.style.animationDelay = `${index * 0.04}s`;

        // Badge
        if (child.badge) {
            const badgeContainer = document.createElement("div");
            badgeContainer.className = "organisation-badge";
            const badge = document.createElement("img");
            badge.src = child.badge;
            badge.alt = `${child.name} badge`;
            badge.loading = "lazy";

            badgeContainer.appendChild(badge);
            card.appendChild(badgeContainer);
        }

        // Type
        const type = document.createElement("span");
        type.className = "organisation-card-type";
        type.textContent = child.type || "Organisation";
        card.appendChild(type);

        // Name
        const name = document.createElement("h4");
        name.textContent = child.name;
        card.appendChild(name);

        // Abbreviation
        if (child.abbreviation) {
            const abbreviation = document.createElement("small");
            abbreviation.className = "organisation-abbreviation";
            abbreviation.textContent = child.abbreviation;
            card.appendChild(abbreviation);
        }

        // Summary
        if (child.summary) {
            const summary = document.createElement("p");
            summary.textContent = child.summary;
            card.appendChild(summary);
        }

        // Child organisations
        if (child.children && child.children.length) {
            const explore = document.createElement("button");
            explore.className = "organisation-card-action";
            explore.textContent = "Explore →";
            explore.addEventListener("click", () => {
                renderOrganisation(childId);
            });
            card.appendChild(explore);
        }

        // External website
        if (child.url) {
            const link = document.createElement("a");
            link.className = "organisation-external"
            link.href = child.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = "Official page ↗";
            card.appendChild(link);
        }

        organisationGrid.appendChild(card);
    });

    organisationExplorer.classList.add("open");
}

async function loadOrganisationData() {
    try {
        const response = await fetch("data/organisations.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        data = await response.json();

        organisationData = data.organisations;

        renderMainOrganisations();
        
        console.log("Organisation data loaded:", organisationData);
    } catch (error) {
        console.error("Could not load organisation data:", error);
    }
}

const regimentGrid = document.getElementById("regimentGrid");

function renderMainOrganisations(filter = "all") {
    regimentGrid.innerHTML = "";

    const organisations = Object.entries(organisationData).filter(([id, organisation]) => {
                const isTopLevel = organisation.parent === null;
                const matchesFilter = filter === "all" || organisation.category === filter;

                return (isTopLevel && matchesFilter);
    });


    organisations.forEach(([id, organisation], index) => {
            const card = createMainOrganisationCard(id, organisation);
            card.style.animationDelay = `${index * 0.04}s`;
            regimentGrid.appendChild(card);
    });
}

function createMainOrganisationCard(id, organisation) {
    const card = document.createElement("article");
    card.className = "regiment-card organisation-main-card";
    card.dataset.category = organisation.category;
    card.dataset.organisation = id;
    card.tabIndex = 0;

    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View details for ${organisation.name}`);

    // Category

    const tag = document.createElement("span");
    tag.className = "card-tag";
    tag.textContent = formatCategory(organisation.category);

    card.appendChild(tag);


    // Badge

    if (organisation.badge) {
        const badgeContainer = document.createElement("div");
        badgeContainer.className = "cap-badge";

        const badge = document.createElement("img");
        badge.src = organisation.badge;
        badge.alt = `${organisation.name} badge`;
        badge.loading = "lazy";

        badgeContainer.appendChild(badge);

        card.appendChild(badgeContainer);
    }


    // Name

    const heading = document.createElement("h3");

    heading.textContent = organisation.shortName || organisation.name;

    card.appendChild(heading);


    // Description

    if (organisation.summary) {
        const summary = document.createElement("p");
        summary.textContent = organisation.summary;

        card.appendChild(summary);
    }


    // Action Area

    const actions = document.createElement("div");
    actions.className = "regiment-card-actions";


    // Children

    if (organisation.children && organisation.children.length > 0) {
        const explore = document.createElement("button");
        explore.className = "card-expand";
        explore.type = "button";
        explore.textContent = getExploreLabel(organisation);

        explore.addEventListener("click", event => {
                // Don't open popup
                event.stopPropagation();

                renderOrganisation(id);

                organisationExplorer.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        });

        actions.appendChild(explore);
    }

    // Official Website

    if (organisation.url) {
        const link = document.createElement("a");
        link.className = "card-official-link";
        link.href = organisation.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Official website ↗";

        // Don't open popup when clicking the link

        link.addEventListener("click", event => {
                event.stopPropagation();
        });

        actions.appendChild(link);
    }

    if (actions.children.length) {
        card.appendChild(actions);
    }

    // Click Card -> Popup

    card.addEventListener("click", () => {
            openOrganisationModal(id);
    });

    // Keyboard Access

    card.addEventListener("keydown", event => {
        if (
            event.key === "Enter" ||
            event.key === " "
        ) {
            event.preventDefault();
            openOrganisationModal(id);
        }
    });

    return card;
}

function formatCategory(category) {
    const labels = {
        combat: "COMBAT",
        support: "COMBAT SUPPORT",
        service: "SUPPORT & SERVICES"
    };

    return (
        labels[category] ||
        category?.toUpperCase() ||
        ""
    );
}

function getExploreLabel(organisation) {
    if (
        organisation.type === "arm" &&
        organisation.name === "Infantry"
    ) {
        return "Explore regiments →";
    }

    if (organisation.type === "corps") {
        return "Explore units →";
    }

    return "Explore organisation →";
}

function openOrganisationModal(id) {
    const organisation = organisationData[id];

    if (!organisation) {
        return;
    }

    // Type

    modalType.textContent = organisation.type?.replaceAll("-", " ").toUpperCase() || "ORGANISATION";


    // Name

    modalTitle.textContent = organisation.name;


    // Abbreviation

    modalAbbreviation.textContent = organisation.abbreviation || "";
    modalAbbreviation.hidden = !organisation.abbreviation;


    // Summary

    modalSummary.textContent = organisation.summary || "";


    // Role

    modalRole.textContent = organisation.role || "Not specified";


    // Component

    modalComponent.textContent = formatComponent(organisation.component);


    // Badge

    if (organisation.badge) {
        modalBadge.src = organisation.badge;
        modalBadge.alt = `${organisation.name} badge`;
        modalBadge.parentElement.hidden = false;
    } else {
        modalBadge.parentElement.hidden = true;
    }


    // Actions

    modalActions.innerHTML = "";


    if (
        organisation.children &&
        organisation.children.length
    ) {
        const explore = document.createElement("button");
        explore.className = "modal-explore";
        explore.type = "button";
        explore.textContent = getExploreLabel(organisation);


        explore.addEventListener("click", () => {
            organisationModal.close();

            renderOrganisation(id);

            setTimeout(() => {
                organisationExplorer.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 100);
        });

        modalActions.appendChild(explore);

    }

    if (organisation.url) {
        const link = document.createElement("a");
        link.className = "modal-official";
        link.href = organisation.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Official Army website ↗";

        modalActions.appendChild(link);
    }
    
    organisationModal.showModal();
}

function formatComponent(component) {
    const labels = {
        regular: "Regular",
        reserve: "Army Reserve",
        mixed: "Regular & Reserve"
    };

    return (labels[component] || "Not specified");
}

document.querySelectorAll(".card-expand").forEach(button => {
    button.addEventListener("click", () => {
        const organisation = button.dataset.organisation;
        renderOrganisation(organisation);

        document.querySelectorAll(".card-expand").forEach(otherButton => {
            otherButton.setAttribute("aria-expanded", "false");
        });

        button.setAttribute("aria-expanded", "true");

        setTimeout(() => {
            organisationExplorer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    });
});

organisationBack.addEventListener("click", () => {
    const target = organisationBack.dataset.target;

    if (target) {
        renderOrganisation(target);
    }
});

organisationClose.addEventListener("click", () => {
    organisationExplorer.classList.remove("open");

    currentOrganisation = null;

    document.querySelectorAll(".card-expand").forEach(button => {
        button.setAttribute("aria-expanded", "false");
    });
});

modalClose.addEventListener("click", () => {
    organisationModal.close();
});

organisationModal.addEventListener("click", event => {
    if (event.target === organisationModal) {
        organisationModal.close();
    }
});

loadOrganisationData();