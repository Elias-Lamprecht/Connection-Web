let ContentWrapper = document.getElementById("ContentWrapper");

GetProjectsList()

function GetProjectsList() {
    fetch("projects_list.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load JSON data");
            }
            return response.json();
        })
        .then(data => {
            console.log("Loaded data", data);
            GetProjects(data);

        })
        .catch(error => {
            console.log("Couldn't load data", error);
        })
}

function GetProjects(data) {
    console.log(data.projects)
    data.projects.forEach(project => {
        fetch("./Projects/" + project +".json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load JSON data");
                }
                return response.json();
            })
            .then(data => {
                console.log("Loaded data", data);
                CreateItem(data);

            })
            .catch(error => {
                console.log("Couldn't load data", error);
            })
    })
}

function CreateItem(data) {
    // Create Item
    const Item = document.createElement("div");
    Item.classList.add("Item");

    // Create Item Header
    const ItemHeader = document.createElement("h2");
    ItemHeader.classList.add("ItemHeader");
    ItemHeader.innerText = data.title;
    Item.append(ItemHeader);

    // Create Item Bild
    const ItemBild = document.createElement("img");
    ItemBild.classList.add("ItemBild");
    ItemBild.alt = data.title;
    ItemBild.src = data.image;
    Item.append(ItemBild);

    // Create Item Beschreibung
    const ItemBeschreibung = document.createElement("p");
    ItemBeschreibung.classList.add("ItemBeschreibung");
    ItemBeschreibung.innerHTML = data.description;
    Item.append(ItemBeschreibung);

    const ItemTypeWrapper = document.createElement("div");
    ItemTypeWrapper.classList.add("ItemTypeWrapper");
    Item.append(ItemTypeWrapper);

    // Create Item Type
    const ItemType = document.createElement("p");
    ItemType.classList.add("ItemType");
    ItemType.classList.add("Type" + data.type);
    ItemType.innerText = data.type;
    ItemTypeWrapper.append(ItemType);

    const DateDisplay = document.createElement("div");
    DateDisplay.classList.add("DateDisplay");

    // Create datebox for Start Date
    const DateBoxStart = document.createElement("div");
    DateBoxStart.classList.add("DateBox");
    DateBoxStart.innerText = data.start_date;
    DateDisplay.append(DateBoxStart);

    const Divider = document.createElement("div");
    Divider.classList.add("Divider");
    Divider.innerText = "→";
    DateDisplay.append(Divider);

    // Create datebox for End Date
    const DateBoxEnd = document.createElement("div");
    DateBoxEnd.classList.add("DateBox");
    DateBoxEnd.innerText = data.end_date;
    DateDisplay.append(DateBoxEnd);

    const TypeDateRow = document.createElement("div");
    TypeDateRow.classList.add("TypeDateRow");
    TypeDateRow.append(ItemTypeWrapper, DateDisplay);
    Item.append(TypeDateRow);


    const ItemTechSetWrapperHeader = document.createElement("h3");
    ItemTechSetWrapperHeader.innerHTML = "Tech";
    Item.append(ItemTechSetWrapperHeader);

    const ItemTechBar = document.createElement("div");
    const AllItemsTechBarValues= Object.values(data.techbar);
    const AllItemsTechBarNames = Object.keys(data.techbar);
    // Generate Techbar
    ItemTechBar.classList.add("ItemTechBar");
    console.log(AllItemsTechBarValues);
    for (let i = 0; i < AllItemsTechBarValues.length; i++) {
        const ItemTechBarItem = document.createElement("div");
        ItemTechBarItem.classList.add(AllItemsTechBarNames[i]);
        ItemTechBarItem.style.width = AllItemsTechBarValues[i] + "%";
        ItemTechBarItem.style.height = "8px";
        ItemTechBar.append(ItemTechBarItem);
    }
    console.log(data.techbar);

    // Generate Info Tech
    const ItemTechSetWrapper = document.createElement("ul");
    ItemTechSetWrapper.classList.add("ItemTechSetWrapper");

    // Create a li for each tech used with a dot and it's precent
    for (let i = 0; i < data.tech.length; i++) {
        const ItemTechSet = document.createElement("li");
        ItemTechSet.classList.add("ItemTechSet");

        const ItemTechSetCircle = document.createElement("svg");
        ItemTechSetCircle.classList.add("ItemTechSetCircle");
        ItemTechSetCircle.classList.add(AllItemsTechBarNames[i]);
        ItemTechSet.append(ItemTechSetCircle);

        const ItemTechSetTitle = document.createElement("p");
        ItemTechSetTitle.innerHTML = AllItemsTechBarNames[i];
        ItemTechSet.append(ItemTechSetTitle);

        const ItemTechSetPrecent = document.createElement("span");
        ItemTechSetPrecent.classList.add("ItemTechSetPrecent");
        ItemTechSetPrecent.innerHTML = AllItemsTechBarValues[i] + "%";
        ItemTechSet.append(ItemTechSetPrecent);

        ItemTechSetWrapper.append(ItemTechSet);
    }

    const TechSection = document.createElement("div");
    TechSection.classList.add("TechSection");
    TechSection.append(ItemTechBar, ItemTechSetWrapper);
    Item.append(TechSection);


    const ItemGithubLink = document.createElement("a");
    ItemGithubLink.classList.add("ItemGithubLink");
    ItemGithubLink.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style="margin-right:6px;">
            <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.75.08-.74.08-.74 1.21.08 1.85 1.26 1.85 1.26 1.07 1.84 2.8 1.31 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.31-5.48-1.34-5.48-5.97 0-1.32.47-2.39 1.24-3.23-.12-.31-.54-1.56.12-3.25 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0C17 4.41 18 4.73 18 4.73c.66 1.69.24 2.94.12 3.25.78.84 1.24 1.91 1.24 3.23 0 4.65-2.81 5.66-5.49 5.96.43.37.82 1.1.82 2.23v3.31c0 .32.21.69.83.57A12.01 12.01 0 0024 12C24 5.37 18.63 0 12 0z"/>
        </svg>
        GitHub
    `;
    ItemGithubLink.href = data.github;
    ItemGithubLink.target = "_blank";

    const ItemLiveLink = document.createElement("a");
    ItemLiveLink.classList.add("ItemLiveLink");
    ItemLiveLink.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style="margin-right:6px;">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 0 1 0-16c.86 0 1.69.14 2.46.39a8.003 8.003 0 0 1-5.78 12.97A7.98 7.98 0 0 1 12 20z"/>
    </svg>
    Live Demo
`;
    ItemLiveLink.href = data.live;
    ItemLiveLink.target = "_blank";

    const ItemStatus = document.createElement("p");
    ItemStatus.classList.add("ItemStatus");
    ItemStatus.innerText = data.status;
    ItemStatus.classList.add(data.status);

    const ItemVisibility = document.createElement("p");
    ItemVisibility.classList.add("ItemVisibility");
    ItemVisibility.classList.add(data.visibility);
    ItemVisibility.innerText = data.visibility;

    const StatusLinksRow = document.createElement("div");
    StatusLinksRow.classList.add("StatusLinksRow");
    StatusLinksRow.append(ItemStatus, ItemVisibility, ItemGithubLink, ItemLiveLink);
    Item.append(StatusLinksRow);


    ContentWrapper.appendChild(Item);
}