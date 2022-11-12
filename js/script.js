// variareis
let outDB, inputName, inputPhone, contactForm, dataList, db;

const dbName = "meusContatos";
const storeName = "contact";

const createDB = () => {
  if (window.indexedDB) {
    const dbRequest = window.indexedDB.open(dbName, 1);

    dbRequest.onerror = (event) => {
      console.log("on Error: " + event.target.errorcode);
      outDB.innerHTML = "Error request";
    };

    dbRequest.onsuccess = (event) => {
      db = dbRequest.result;
      console.log("on Sucess", dbRequest.result, event);
      outDB.innerHTML = "Sucess request";
      readData();
    };

    dbRequest.onupgradeneeded = (event) => {
      // pegando o db como resultado
      db = event.target.result;

      //obj store - 'tabela'
      const objectStoreContact = db.createObjectStore(storeName, {
        keyPath: "id",
        autoIncrement: true,
      });

      // criando index da 'tabela'
      objectStoreContact.createIndex("name", "name", { unique: false });
      objectStoreContact.createIndex("phone", "phone", { unique: false });

      console.log("on Upgrade", event);
      outDB.innerHTML = "Upgrade request";
    };
  } else {
    console.log("U don't hv support");
    outDB.innerHTML = "Upgrade request";
  }
};

const readData = () => {
  cleanList();
  let transaction = db.transaction(storeName);
  let objectStore = transaction.objectStore(storeName);
  objectStore.openCursor().onsuccess = (event) => {
    let cursor = event.target.result;

    if (cursor) {
      //criando elementos
      const listItem = document.createElement("li");
      const deleteButton = document.createElement("button");

      // css nos elementos criados
      listItem.style.marginTop = "10px";
      listItem.style.marginBottom = "10px";
      deleteButton.style.float = "right";
      deleteButton.className = "delete";

      // chama os valores
      const textItem = `Nome ---> ${cursor.value.name} ---> Telefone: ${cursor.value.phone} `;

      // creation delete button
      deleteButton.textContent = "Delete";
      deleteButton.setAttribute("data-contact-id", cursor.value.id);
      deleteButton.addEventListener("click", removeContact);

      listItem.textContent = textItem;
      listItem.appendChild(deleteButton);

      // adding listItem to the general list
      dataList.appendChild(listItem);

      cursor.continue();
    } else if (!dataList.firstChild) {
      const listItem = document.createElement("li");
      listItem.textContent = "No contact saved";
      dataList.appendChild(listItem);
    }
  };
};

const addData = (event) => {
  event.preventDefault();

  const newContact = {
    name: inputName.value,
    phone: inputPhone.value,
  };

  const transactionAdd = db.transaction([storeName], "readwrite");
  const objectStore = transactionAdd.objectStore(storeName);
  const request = objectStore.add(newContact);

  request.onsuccess = () => {
    inputName.value = "";
    inputName.value = "";
  };

  transactionAdd.oncomplete = (event) => {
    console.log("add transaction completed", event);
    location.reload();

    readData();
  };

  transaction.onerror = (event) => {
    console.log("add transaction error", event);
  };
};

const cleanList = () => {
  dataList.innerHTML = "";
};

const removeContact = (eventClick) => {
  const contactId = parseInt(
    eventClick.target.getAttribute("data-contact-id"),
    10
  );

  let deleteTransaction = db.transaction([storeName], "readwrite");
  let objectStore = deleteTransaction.objectStore(storeName);
  let request = objectStore.delete(contactId);

  request.onsuccess = (event) => {
    console.log("request success ", event);
  };

  deleteTransaction.oncomplete = (event) => {
    console.log(`delete contact ${contactId} transaction completed`, event);
    readData();
  };

  deleteTransaction.onerror = (event) => {
    console.log("delete transaction error", event);
  };
};

const deleteDataBase = () => {
  var dbRequest = indexedDB.deleteDatabase(dbName);

  dbRequest.onerror = (event) => {
    console.log("on Error: " + event.target.errorcode);
    outDB.innerHTML = "Error request";
  };

  dbRequest.onsuccess = (event) => {
    console.log("Deleted database successfully");
  };

  dbRequest.onblocked = (event) => {
    console.log("Couldn't delete database due to the operation being blocked");
  };

  location.reload();
};

document.addEventListener("DOMContentLoaded", () => {
  outDB = document.getElementById("outputDB");
  inputName = document.getElementById("inputName");
  inputPhone = document.getElementById("inputPhone");
  contactForm = document.getElementById("contactForm");
  dataList = document.getElementById("data-list");

  contactForm.onsubmit = addData;

  createDB();
});
