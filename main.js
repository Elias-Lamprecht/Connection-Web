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

    // Create Item Type
    const ItemType = document.createElement("p");
    ItemType.classList.add("ItemType");
    ItemType.innerText = data.type;
    Item.append(ItemType);

    // Create Item Start Date
    const ItemStartDate = document.createElement("p");
    ItemStartDate.classList.add("ItemStartDate");
    ItemStartDate.innerHTML = data.start_date;
    Item.append(ItemStartDate);

    // Create Item End Date
    const ItemEndDate = document.createElement("p");
    ItemEndDate.classList.add("ItemEndDate");
    ItemEndDate.innerHTML = data.end_date;
    Item.append(ItemEndDate);

    const ItemGithubLink = document.createElement("a");
    ItemGithubLink.classList.add("ItemGithubLink");
    ItemGithubLink.innerHTML = data.github;
    ItemGithubLink.href = data.github;
    ItemGithubLink.target = "_blank";
    Item.append(ItemGithubLink);

    const ItemLiveLink = document.createElement("a");
    ItemLiveLink.classList.add("ItemLiveLink");
    ItemLiveLink.innerHTML = data.live;
    ItemLiveLink.href = data.live;
    ItemLiveLink.target = "_blank";
    Item.append(ItemLiveLink);

    const ItemStatus = document.createElement("p");
    ItemStatus.classList.add("ItemStatus");
    ItemStatus.innerText = data.status;
    ItemStatus.classList.add(data.status);
    Item.append(ItemStatus);

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
    Item.append(ItemTechBar);

    // Generate Info Tech
    const ItemTechSetWrapper = document.createElement("ul");
    ItemTechSetWrapper.classList.add("ItemTechSetWrapper");
    let FullTechSet = "";
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
    Item.append(ItemTechSetWrapper);

    ContentWrapper.appendChild(Item);
}
